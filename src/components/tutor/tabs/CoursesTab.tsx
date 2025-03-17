
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from "@/components/ui";
import { BookOpen, Clock } from "lucide-react";

interface Course {
  _id: string;
  subject: string;
  board: string;
  className: string;
  weeklySessions: string;
  costPerSessions: string;
  currency: string;
  courseThumbnail?: string;
  language: string;
  mode: string;
}

interface CoursesTabProps {
  courses: Course[];
}

export const CoursesTab = ({ courses }: CoursesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-[#f57e2c]" />
          Courses Offered
        </CardTitle>
        <CardDescription>
          Subjects and classes taught by this tutor
        </CardDescription>
      </CardHeader>
      <CardContent>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-40 bg-gray-100 relative">
                  <img
                    src={course.courseThumbnail || "https://via.placeholder.com/400x200?text=Course+Image"}
                    alt={course.subject}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold">
                    {course.subject}
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{course.subject}</CardTitle>
                  <CardDescription className="flex items-center flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                      {course.board}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                      Class {course.className}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
                      {course.language}
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
                      {course.mode}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-2 flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">
                      <Clock className="inline-block w-3 h-3 mr-1" />
                      {course.weeklySessions} sessions/week
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#f57e2c] font-bold">
                      {course.costPerSessions} {course.currency}
                      <span className="text-xs font-normal text-gray-500">/session</span>
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No courses available at this time
          </div>
        )}
      </CardContent>
    </Card>
  );
};
