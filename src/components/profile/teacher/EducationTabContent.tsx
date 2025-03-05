
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Education } from "@/types/courses";
import { Pencil, Trash, Link } from "lucide-react";

interface EducationTabContentProps {
  educationList: Education[];
  isLoading: boolean;
  setIsAddEducationOpen: (isOpen: boolean) => void;
  deleteEducation: (id: string) => void;
}

export const EducationTabContent = ({
  educationList,
  isLoading,
  setIsAddEducationOpen,
  deleteEducation
}: EducationTabContentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Education</CardTitle>
          <CardDescription>Your academic background</CardDescription>
        </div>
        <Button onClick={() => setIsAddEducationOpen(true)}>
          Add Education
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {educationList.length > 0 ? (
              educationList.map((education: Education) => (
                <div
                  key={education._id.timestamp + education._id.counter}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{education.courseName}</h3>
                      <p className="text-sm text-gray-500">{education.instituteName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this education?")) {
                            deleteEducation(education._id.timestamp.toString());
                          }
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {new Date(education.startTime).toLocaleDateString()} - {new Date(education.endTime).toLocaleDateString()}
                    </p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      Grade: {education.grade}
                    </span>
                  </div>
                  {education.credentialUrl && (
                    <div className="mt-2">
                      <a
                        href={education.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center"
                      >
                        <Link className="h-3 w-3 mr-1" />
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No education records found. Add your first education history.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
