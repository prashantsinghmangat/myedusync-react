
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Course } from "@/types/courses";

const Courses = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses', selectedBoard, selectedClass, selectedSubject],
    queryFn: async () => {
      const baseUrl = 'https://api.myedusync.com/courses';
      const url = selectedBoard && selectedClass && selectedSubject
        ? `${baseUrl}?page=0&limit=10&board=${selectedBoard}&class=${selectedClass}&subject=${selectedSubject}`
        : baseUrl;

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      return data?.data || [];
    },
  });

  const boards = ["CBSE", "ICSE", "IGCSE", "Edexcel"];
  const classes = Array.from({ length: 5 }, (_, i) => (i + 8).toString());
  const subjects = ["Mathematics", "Science", "English", "Geography", "History"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Available Courses</h1>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="board-select">Board</Label>
              <Select onValueChange={setSelectedBoard} value={selectedBoard}>
                <SelectTrigger id="board-select">
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map((board) => (
                    <SelectItem key={board} value={board.toLowerCase()}>
                      {board}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class-select">Class</Label>
              <Select onValueChange={setSelectedClass} value={selectedClass}>
                <SelectTrigger id="class-select">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((classNum) => (
                    <SelectItem key={classNum} value={classNum}>
                      Class {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject-select">Subject</Label>
              <Select onValueChange={setSelectedSubject} value={selectedSubject}>
                <SelectTrigger id="subject-select">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject.toLowerCase()}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p className="col-span-full text-center text-gray-500">Loading courses...</p>
            ) : courses.length > 0 ? (
              courses.map((course: Course) => (
                <Card 
                  key={course._id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  <CardHeader>
                    {course.courseThumbnail && (
                      <img
                        src={course.courseThumbnail}
                        alt={course.subject}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                      />
                    )}
                    <CardTitle className="text-xl">{course.subject}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><span className="font-medium">Board:</span> {course.board}</p>
                      <p><span className="font-medium">Class:</span> {course.className}</p>
                      <p><span className="font-medium">Sessions:</span> {course.weeklySessions} per week</p>
                      <p className="text-primary font-semibold">
                        {course.costPerSessions} {course.currency} per session
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No courses found for the selected criteria.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
