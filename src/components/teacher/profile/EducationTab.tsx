
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";

interface EducationTabProps {
  setIsAddEducationOpen: (isOpen: boolean) => void;
}

export const EducationTab = ({ setIsAddEducationOpen }: EducationTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Education</CardTitle>
          <CardDescription>Your academic background</CardDescription>
        </div>
        <Button onClick={() => setIsAddEducationOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Sample Education Items */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">PhD in Physics</h3>
                <p className="text-sm text-gray-500">Stanford University</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">2015 - 2019</p>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                GPA: 3.95/4.0
              </span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">MSc in Theoretical Physics</h3>
                <p className="text-sm text-gray-500">MIT</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">2013 - 2015</p>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                GPA: 3.9/4.0
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
