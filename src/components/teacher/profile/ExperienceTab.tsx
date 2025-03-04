
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Pencil, Trash, Plus } from "lucide-react";

interface ExperienceTabProps {
  setIsAddExperienceOpen: (isOpen: boolean) => void;
}

export const ExperienceTab = ({ setIsAddExperienceOpen }: ExperienceTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Experience</CardTitle>
          <CardDescription>Your professional background</CardDescription>
        </div>
        <Button onClick={() => setIsAddExperienceOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Sample Experience Items */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">Senior Physics Professor</h3>
                <p className="text-sm text-gray-500">University of California, Berkeley</p>
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
            <p className="text-sm text-gray-500 mt-2">2019 - Present</p>
            <p className="mt-2 text-sm">
              Teaching advanced physics courses to undergraduate and graduate students.
              Leading research in quantum mechanics and supervising doctoral candidates.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">Research Scientist</h3>
                <p className="text-sm text-gray-500">CERN, Switzerland</p>
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
            <p className="text-sm text-gray-500 mt-2">2015 - 2019</p>
            <p className="mt-2 text-sm">
              Conducted research on particle physics and contributed to the Large Hadron Collider experiments.
              Published 12 papers in top-tier scientific journals.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
