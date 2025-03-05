
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/types/courses";
import { Trash } from "lucide-react";

interface CoursesTabContentProps {
  coursesList: Course[];
  isLoading: boolean;
  setIsAddCourseOpen: (isOpen: boolean) => void;
  deleteCourse: (id: string) => void;
}

export const CoursesTabContent = ({
  coursesList,
  isLoading,
  setIsAddCourseOpen,
  deleteCourse
}: CoursesTabContentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>Courses you created and teach</CardDescription>
        </div>
        <Button onClick={() => setIsAddCourseOpen(true)}>
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coursesList.length > 0 ? (
              coursesList.map((course: Course) => (
                <Card key={course._id} className="overflow-hidden border">
                  <div className="h-40 bg-gray-200 relative">
                    <img
                      src={course.courseThumbnail || "/placeholder.svg"}
                      alt="Course thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold">
                      {course.subject}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {course.subject} - {course.board}
                    </CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
                        {course.board}
                      </span>
                      <span>Grade {course.className}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between pt-0">
                    <span className="text-sm">
                      <span className="font-medium">{course.costPerSessions} {course.currency}</span> per session
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this course?")) {
                            deleteCourse(course._id);
                          }
                        }}
                      >
                        <Trash className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 py-8">
                <p>You haven't created any courses yet.</p>
                <p className="mt-2">Create your first course to start teaching!</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
