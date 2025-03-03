
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, PlayCircle } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/utils/apiInterceptor";
import { useEffect } from "react";
import { useLoading } from "@/providers/LoadingProvider";

const CourseDetail = () => {
  const { id } = useParams();
  const { setIsLoading } = useLoading();

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await apiGet(
        `https://api.myedusync.com/courseDetails/${id}`,
        {
          requiresAuth: true
        }
      );

      const data = await response.json();
      return data?.data;
    },
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  if (!courseData && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 flex justify-center items-center">
          <p className="text-gray-500">Course not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        {courseData && (
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* LEFT - Course Details */}
              <div className="md:col-span-2 space-y-6">
                {/* About This Course */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">Course Details</CardTitle>
                    <p className="text-gray-600">Home / Course Details</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                   

                    {/* Course Info */}
                    <h3 className="text-xl font-semibold">Course Information</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                      <li>📚 Subject: {courseData?.subject}</li>
                      <li>🏫 Board: {courseData?.board}</li>
                      <li>🎓 Class: {courseData?.className}</li>
                      <li>🕒 Weekly Sessions: {courseData?.weeklySessions}</li>
                      <li>💲 Cost Per Session: {courseData?.costPerSessions} {courseData?.currency}</li>
                      <li>🌐 Mode: {courseData?.mode}</li>
                    </ul>
                    <Separator />

                    {/* What You'll Learn */}
                    <h3 className="text-xl font-semibold">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                      {courseData?.aboutThisCourse
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                        .slice(0, 8) // Limiting first 8 points
                        .map((point, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="text-blue-500 w-5 h-5" />
                            {point}
                          </li>
                        ))}
                    </ul>
                    <Separator />

                    <h3 className="text-xl font-semibold">About This Course</h3>
                    <p className="text-gray-600">{courseData?.aboutThisCourse}</p>
                    <Separator />
                  </CardContent>
                </Card>

                {/* Curriculum Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Curriculum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {courseData?.aboutThisCourse
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                        .slice(8) // The remaining part as curriculum
                        .map((lesson, index) => (
                          <AccordionItem key={index} value={`lesson-${index}`}>
                            {lesson}
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT - Side Panel */}
              <div className="space-y-6">
                {/* Video & Join Course */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="relative">
                      <img
                        src={courseData?.courseThumbnail}
                        alt={courseData?.subject}
                        className="w-full rounded-lg"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full bg-blue-600 text-white">Join Course</Button>
                    <ul className="mt-4 text-gray-600 space-y-2">
                      <li>✅ 20+ Video Lessons</li>
                      <li>✅ Full Lifetime Access</li>
                      <li>✅ Certificate of Completion</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Teacher Profile */}
                <Card className="shadow-lg">
                  <CardHeader className="text-center">
                    <img
                      src={courseData?.profilePic}
                      alt={courseData?.name}
                      className="w-24 h-24 mx-auto rounded-full"
                    />
                    <h3 className="text-xl font-bold">{courseData?.name}</h3>
                    <p className="text-gray-600">{courseData?.currentDesignation}</p>
                    <p className="text-gray-500">{courseData?.location}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700">{courseData?.aboutMe}</p>
                  </CardContent>
                </Card>

                {/* FAQ / Contact */}
                <Card className="bg-blue-600 text-white">
                  <CardContent className="text-center space-y-3">
                    <h3 className="text-xl font-semibold">Have Any Questions?</h3>
                    <p className="text-white text-opacity-90">Reach out to us for more details.</p>
                    <p className="text-lg font-bold">📞 +1 234 567 890</p>
                    <p>📧 support@example.com</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
