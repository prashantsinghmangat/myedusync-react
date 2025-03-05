
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddEducationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    instituteName: string;
    courseName: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    grade: string;
    credentialUrl: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePic' | 'courseThumbnail' | 'credentialUrl') => void;
  handleAddEducation: (e: React.FormEvent) => void;
}

export const AddEducationModal = ({
  isOpen,
  onOpenChange,
  formData,
  handleChange,
  handleFileInputChange,
  handleAddEducation
}: AddEducationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Education</DialogTitle>
          <DialogDescription>
            Add your educational background
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddEducation}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="instituteName">Institution Name</Label>
              <Input
                id="instituteName"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="courseName">Degree/Course Name</Label>
              <Input
                id="courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="grade">Grade/GPA</Label>
              <Input
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="credentialUrl">Certificate URL (if any)</Label>
              <Input
                id="credentialUrl"
                name="credentialUrl"
                value={formData.credentialUrl}
                onChange={handleChange}
                placeholder="https://example.com/certificate.pdf"
              />
            </div>
            <div>
              <Label>Upload Certificate</Label>
              <div className="mt-1 flex items-center">
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileInputChange(e, 'credentialUrl')}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Education</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
