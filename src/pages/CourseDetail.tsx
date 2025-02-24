
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

  const { data: course, isLoading } = useQuery({
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

      return response.json();
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

  if (!course) {
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
                  src={course.courseThumbnail}
                  alt={course.subject}
                  className="w-full md:w-1/3 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-4">{course.subject}</CardTitle>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={course.profilePic} alt={course.name} />
                      <AvatarFallback>{course.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.currentDesignation}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium">Board:</span> {course.board}</p>
                    <p><span className="font-medium">Class:</span> {course.className}</p>
                    <p><span className="font-medium">Sessions:</span> {course.weeklySessions} per week</p>
                    <p><span className="font-medium">Mode:</span> {course.mode}</p>
                    <p><span className="font-medium">Language:</span> {course.language}</p>
                    <p className="text-primary font-semibold">
                      {course.costPerSessions} {course.currency} per session
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">About the Instructor</h3>
                  <p className="text-gray-600">{course.aboutMe}</p>
                  <p className="text-sm text-muted-foreground mt-2">Location: {course.location}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                  <div className="prose max-w-none">
                    {course.aboutThisCourse.split('\n').map((line, index) => (
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
