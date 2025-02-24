
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CourseDetail } from "@/types/courses";

const CourseDetail = () => {
  const { id } = useParams();

  const { data: courseData, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await fetch(`https://api.myedusync.com/courseDetails/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch course details');
      }

      const data = await response.json();
      return data?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500">Loading course details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500">Course not found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={courseData.courseThumbnail}
                  alt={courseData.subject}
                  className="w-full md:w-1/3 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-4">{courseData.subject}</CardTitle>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={courseData.profilePic} alt={courseData.name} />
                      <AvatarFallback>{courseData.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{courseData.name}</p>
                      <p className="text-sm text-muted-foreground">{courseData.currentDesignation}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium">Board:</span> {courseData.board}</p>
                    <p><span className="font-medium">Class:</span> {courseData.className}</p>
                    <p><span className="font-medium">Sessions:</span> {courseData.weeklySessions} per week</p>
                    <p><span className="font-medium">Mode:</span> {courseData.mode}</p>
                    <p><span className="font-medium">Language:</span> {courseData.language}</p>
                    <p className="text-primary font-semibold">
                      {courseData.costPerSessions} {courseData.currency} per session
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">About the Instructor</h3>
                  <p className="text-gray-600">{courseData.aboutMe}</p>
                  <p className="text-sm text-muted-foreground mt-2">Location: {courseData.location}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                  <div className="prose max-w-none">
                    {courseData.aboutThisCourse.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
