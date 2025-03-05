
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Experience } from "@/types/courses";
import { Pencil, Trash } from "lucide-react";

interface ExperienceTabContentProps {
  experienceList: Experience[];
  isLoading: boolean;
  setIsAddExperienceOpen: (isOpen: boolean) => void;
  deleteExperience: (id: string) => void;
}

export const ExperienceTabContent = ({
  experienceList,
  isLoading,
  setIsAddExperienceOpen,
  deleteExperience
}: ExperienceTabContentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Experience</CardTitle>
          <CardDescription>Your professional background</CardDescription>
        </div>
        <Button onClick={() => setIsAddExperienceOpen(true)}>
          Add Experience
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {experienceList.length > 0 ? (
              experienceList.map((experience: Experience) => (
                <div
                  key={experience._id.timestamp + experience._id.counter}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{experience.designation}</h3>
                      <p className="text-sm text-gray-500">{experience.organisationName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this experience?")) {
                            deleteExperience(experience._id.timestamp.toString());
                          }
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {new Date(experience.startTime).toLocaleDateString()} - {new Date(experience.endTime).toLocaleDateString()}
                    </p>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                      {experience.type}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No experience records found. Add your first professional experience.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
