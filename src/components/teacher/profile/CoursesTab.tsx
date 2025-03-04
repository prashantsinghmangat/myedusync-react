
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const CoursesTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>Courses you created and teach</CardDescription>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden border">
              <div className="h-40 bg-gray-200 relative">
                <img 
                  src={`https://picsum.photos/seed/${i+70}/500/300`} 
                  alt="Course thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold">
                  {["Physics", "Advanced Math", "Quantum Mechanics", "Electromagnetism"][i-1]}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {["Introduction to Classical Mechanics", 
                    "Calculus and Linear Algebra", 
                    "Quantum Physics for Beginners", 
                    "Electromagnetic Theory"][i-1]}
                </CardTitle>
                <CardDescription className="flex items-center text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
                    {["CBSE", "ICSE", "IB", "Cambridge"][i-1]}
                  </span>
                  <span>Grade {10 + i}</span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between pt-0">
                <span className="text-sm">
                  <span className="font-medium">{i * 5 + 10}</span> students
                </span>
                <Button variant="outline" size="sm">Manage</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
