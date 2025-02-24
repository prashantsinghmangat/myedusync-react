import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, PlayCircle } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const CourseDetail = () => {
  const { id } = useParams();

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.myedusync.com/courseDetails/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }

      const data = await response.json();
      return data?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 flex justify-center items-center">
          <p className="text-gray-500">Loading course details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!courseData) {
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

      <div className="min-h-screen bg-gray-50">
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
                  <h3 className="text-xl font-semibold">About This Course</h3>
                  <p className="text-gray-600">{courseData?.aboutThisCourse}</p>
                  <Separator />

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
      </div>

      {/* <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={courseData.courseThumbnail}
                  alt={courseData.subject}
                  className="w-full md:w-1/3 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold mb-4">
                    {courseData.subject}
                  </CardTitle>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage
                        src={courseData.profilePic}
                        alt={courseData.name}
                      />
                      <AvatarFallback>{courseData.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{courseData.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {courseData.currentDesignation}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                    <p>
                      <span className="font-medium">Board:</span>{" "}
                      {courseData.board}
                    </p>
                    <p>
                      <span className="font-medium">Class:</span>{" "}
                      {courseData.className}
                    </p>
                    <p>
                      <span className="font-medium">Sessions:</span>{" "}
                      {courseData.weeklySessions} per week
                    </p>
                    <p>
                      <span className="font-medium">Mode:</span>{" "}
                      {courseData.mode}
                    </p>
                    <p>
                      <span className="font-medium">Language:</span>{" "}
                      {courseData.language}
                    </p>
                    <p className="text-primary font-semibold">
                      {courseData.costPerSessions} {courseData.currency} per
                      session
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    About the Instructor
                  </h3>
                  <p className="text-gray-600">{courseData.aboutMe}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Location: {courseData.location}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                  <div className="prose max-w-none">
                    {courseData.aboutThisCourse
                      .split("\n")
                      .map((line, index) => (
                        <p key={index} className="mb-2">
                          {line}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main> */}
      <Footer />
    </div>
  );
};

export default CourseDetail;
