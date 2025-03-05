
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddExperienceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    companyName: string;
    position: string;
    jobType: string;
    startDateExp: string;
    endDateExp: string;
    description: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddExperience: (e: React.FormEvent) => void;
  setFormData: (data: any) => void;
}

export const AddExperienceModal = ({
  isOpen,
  onOpenChange,
  formData,
  handleChange,
  handleAddExperience,
  setFormData
}: AddExperienceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
          <DialogDescription>
            Add your professional experience
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddExperience}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="companyName">Company/Organization Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Position/Title</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="jobType">Employment Type</Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => setFormData((prev: any) => ({ ...prev, jobType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDateExp">Start Date</Label>
                <Input
                  id="startDateExp"
                  name="startDateExp"
                  type="date"
                  value={formData.startDateExp}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDateExp">End Date</Label>
                <Input
                  id="endDateExp"
                  name="endDateExp"
                  type="date"
                  value={formData.endDateExp}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
