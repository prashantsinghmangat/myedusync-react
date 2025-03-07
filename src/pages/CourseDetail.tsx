
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, PlayCircle, AlertTriangle } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/utils/apiInterceptor";
import { useEffect } from "react";
import { useLoading } from "@/providers/LoadingProvider";
import { SEO } from "@/components/SEO";
import { generateStructuredData } from "@/utils/seo";
import { Course } from "@/types/courses";
import { API_ENDPOINTS } from "@/config/api";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  // Fetch course details
  const { data: courseData, isLoading: isLoadingCourse, error: courseError } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      try {
        const response = await apiGet(
          `https://api.myedusync.com/courseDetails/${id}`,
          {
            requiresAuth: true
          }
        );

        const data = await response.json();
        return data?.isSuccess ? data.data : null;
      } catch (error) {
        console.error("Error fetching course details:", error);
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });

  // Fetch related courses based on this course's board, class, and subject
  const { data: relatedCoursesResponse, isLoading: isLoadingRelated } = useQuery({
    queryKey: ["relatedCourses", courseData?.board, courseData?.className, courseData?.subject],
    queryFn: async () => {
      if (!courseData) return { isSuccess: false, data: [] };
      
      try {
        const params = new URLSearchParams();
        if (courseData.board) params.append('board', courseData.board);
        if (courseData.className) params.append('class', courseData.className);
        if (courseData.subject) params.append('subject', courseData.subject);
        params.append('limit', '3'); // Limit to 3 related courses
        
        const response = await apiGet(
          `${API_ENDPOINTS.courses.list}?${params.toString()}`,
          {
            requiresAuth: true
          }
        );

        const data = await response.json();
        // Filter out the current course from related courses
        return {
          isSuccess: data?.isSuccess || false,
          data: (data?.isSuccess && data?.data) 
            ? data.data.filter((course: Course) => course._id !== id)
            : []
        };
      } catch (error) {
        console.error("Error fetching related courses:", error);
        return { isSuccess: false, data: [] };
      }
    },
    // Only fetch related courses once we have the course data
    enabled: !!courseData,
    refetchOnWindowFocus: false,
  });

  // Extract related courses safely
  const relatedCourses = relatedCoursesResponse?.isSuccess ? relatedCoursesResponse.data : [];

  useEffect(() => {
    setIsLoading(isLoadingCourse || isLoadingRelated);
  }, [isLoadingCourse, isLoadingRelated, setIsLoading]);

  // Generate structured data for SEO
  const courseStructuredData = courseData ? generateStructuredData('Course', {
    name: `${courseData.subject} for ${courseData.className}`,
    description: courseData.aboutThisCourse,
    provider: {
      '@type': 'Organization',
      name: 'MyEduSync',
      url: 'https://myedusync.com'
    },
    courseCode: courseData._id,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: courseData.mode,
      instructor: {
        '@type': 'Person',
        name: courseData.name
      }
    }
  }) : null;

  if (courseError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 flex justify-center items-center">
          <div className="text-center p-8 max-w-2xl">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
            <h1 className="text-2xl font-bold mb-2">Course Not Available</h1>
            <p className="text-gray-600 mb-6">We couldn't load this course. It may have been removed or there's a temporary issue.</p>
            <Button onClick={() => navigate('/courses')}>Browse All Courses</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!courseData && !isLoadingCourse) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 flex justify-center items-center">
          <div className="text-center p-8 max-w-2xl">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
            <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
            <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/courses')}>Browse All Courses</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={courseData ? `${courseData.subject} Course | Class ${courseData.className}` : 'Course Details'}
        description={courseData ? `Learn ${courseData.subject} for ${courseData.board} Class ${courseData.className} with ${courseData.name}` : ''}
        structuredData={courseStructuredData}
      />
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        {isLoadingCourse ? (
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow animate-pulse p-6">
                  <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-8"></div>
                  
                  <div className="h-6 bg-gray-200 rounded-md w-1/3 mb-4"></div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-5 bg-gray-200 rounded-md"></div>
                    ))}
                  </div>
                  
                  <div className="h-6 bg-gray-200 rounded-md w-1/3 mb-4"></div>
                  <div className="space-y-2 mb-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-5 bg-gray-200 rounded-md"></div>
                    ))}
                  </div>
                  
                  <div className="h-6 bg-gray-200 rounded-md w-1/3 mb-4"></div>
                  <div className="h-24 bg-gray-200 rounded-md mb-6"></div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow animate-pulse p-6">
                  <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-md mb-6"></div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded-md"></div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow animate-pulse p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded-md w-1/2 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-2/3 mx-auto mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        ) : courseData && (
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
                            <AccordionTrigger>{`Lesson ${index + 1}: ${lesson.substring(0, 30)}...`}</AccordionTrigger>
                            <AccordionContent>{lesson}</AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </CardContent>
                </Card>
                
                {/* Related Courses */}
                {!isLoadingRelated && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">Related Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingRelated ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg border animate-pulse p-4">
                              <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                              <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                              <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                              <div className="h-5 w-1/4 bg-gray-200 rounded mt-4"></div>
                            </div>
                          ))}
                        </div>
                      ) : relatedCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {relatedCourses.map((course: Course) => (
                            <Card key={course._id} className="cursor-pointer hover:shadow-sm" onClick={() => navigate(`/courses/${course._id}`)}>
                              <div className="p-4">
                                <h4 className="font-semibold">{course.subject}</h4>
                                <p className="text-sm text-gray-600">Class {course.className}</p>
                                <p className="text-sm text-gray-600">{course.board}</p>
                                <p className="text-primary text-sm mt-2 font-medium">
                                  {course.costPerSessions} {course.currency}/session
                                </p>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center py-4 text-gray-500">No related courses found.</p>
                      )}
                    </CardContent>
                  </Card>
                )}
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
                  <CardContent className="text-center space-y-3 p-6">
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
