
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface OfferingTabContentProps {
  profileData: any;
  isLoading: boolean;
  onSaveOfferings: (data: { boards: string, classes: string, subjects: string }) => void;
}

export const OfferingTabContent = ({ 
  profileData, 
  isLoading,
  onSaveOfferings
}: OfferingTabContentProps) => {
  const [boards, setBoards] = useState<string>(profileData?.data?.boards || "");
  const [classes, setClasses] = useState<string>(profileData?.data?.classes || "");
  const [subjects, setSubjects] = useState<string>(profileData?.data?.subjects || "");
  
  const boardOptions = ["CBSE", "ICSE", "UPBoard", "StateBoard", "IB", "IGCSE", "CentralUniversity"];
  const classOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "Graduation", "Post Graduation"];
  const subjectOptions = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "Computer Science", "English", "Hindi", "Geography", 
    "History", "Economics", "Business Studies", "Accountancy"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveOfferings({
      boards,
      classes,
      subjects
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Teaching Offerings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="boards">Boards</Label>
                <div className="flex items-center gap-2">
                  <Select onValueChange={(value) => setBoards(boards ? `${boards}, ${value}` : value)}>
                    <SelectTrigger id="boards" className="w-full">
                      <SelectValue placeholder="Select a board to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {boardOptions.map((board) => (
                        <SelectItem key={board} value={board}>
                          {board}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {boards && (
                  <div className="mt-2 p-2 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Selected Boards:</h4>
                    <div className="flex flex-wrap gap-2">
                      {boards.split(',').map((board, index) => (
                        <div key={index} className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded-full">
                          <span className="text-sm">{board.trim()}</span>
                          <button 
                            type="button"
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => {
                              const updatedBoards = boards
                                .split(',')
                                .filter((_, i) => i !== index)
                                .join(', ');
                              setBoards(updatedBoards);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="classes">Classes</Label>
                <div className="flex items-center gap-2">
                  <Select onValueChange={(value) => setClasses(classes ? `${classes}, ${value}` : value)}>
                    <SelectTrigger id="classes" className="w-full">
                      <SelectValue placeholder="Select a class to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {classOptions.map((classItem) => (
                        <SelectItem key={classItem} value={classItem}>
                          {classItem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {classes && (
                  <div className="mt-2 p-2 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Selected Classes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {classes.split(',').map((classItem, index) => (
                        <div key={index} className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded-full">
                          <span className="text-sm">{classItem.trim()}</span>
                          <button 
                            type="button"
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => {
                              const updatedClasses = classes
                                .split(',')
                                .filter((_, i) => i !== index)
                                .join(', ');
                              setClasses(updatedClasses);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects</Label>
                <div className="flex items-center gap-2">
                  <Select onValueChange={(value) => setSubjects(subjects ? `${subjects}, ${value}` : value)}>
                    <SelectTrigger id="subjects" className="w-full">
                      <SelectValue placeholder="Select a subject to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {subjects && (
                  <div className="mt-2 p-2 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Selected Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subjects.split(',').map((subject, index) => (
                        <div key={index} className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded-full">
                          <span className="text-sm">{subject.trim()}</span>
                          <button 
                            type="button"
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => {
                              const updatedSubjects = subjects
                                .split(',')
                                .filter((_, i) => i !== index)
                                .join(', ');
                              setSubjects(updatedSubjects);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">Save Offerings</Button>
            </form>
          )}
        </CardContent>
      </Card>

      {profileData?.data?.boards || profileData?.data?.classes || profileData?.data?.subjects ? (
        <Card>
          <CardHeader>
            <CardTitle>Current Offerings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profileData?.data?.boards && (
                <div>
                  <h4 className="font-medium">Boards:</h4>
                  <p className="text-gray-600">{profileData.data.boards}</p>
                </div>
              )}
              
              {profileData?.data?.classes && (
                <div>
                  <h4 className="font-medium">Classes:</h4>
                  <p className="text-gray-600">{profileData.data.classes}</p>
                </div>
              )}
              
              {profileData?.data?.subjects && (
                <div>
                  <h4 className="font-medium">Subjects:</h4>
                  <p className="text-gray-600">{profileData.data.subjects}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};
