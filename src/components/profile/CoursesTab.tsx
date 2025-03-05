
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINTS } from "@/config/api";
import { fetchWithInterceptor } from "@/utils/apiInterceptor";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Course } from "@/types/courses";

interface CoursesTabProps {
  setOpenModal: (modal: "profile" | "education" | "experience" | "updateProfileImg" | "course" | null) => void;
}

export const CoursesTab = ({ setOpenModal }: CoursesTabProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetchWithInterceptor(API_ENDPOINTS.courses.tutorCourses, {
        requiresAuth: true,
      });
      
      const data = await response.json();
      if (data) {
        setCourses(data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Courses</CardTitle>
        <Button onClick={() => setOpenModal("course")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Course
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>You haven't added any courses yet.</p>
            <p className="mt-2">Click the 'Add Course' button to create your first course.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course._id} className="overflow-hidden">
                <div className="relative h-40">
                  <img 
                    src={course.courseThumbnail || "/placeholder.svg"} 
                    alt={course.subject} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{course.subject}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Board: {course.board}</p>
                    <p>Class: {course.className}</p>
                    <p>Sessions: {course.weeklySessions} per week</p>
                    <p>Price: {course.costPerSessions} {course.currency} per session</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
