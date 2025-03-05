
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddExperienceModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const AddExperienceModal = ({
  isOpen,
  setIsOpen,
  formData,
  handleChange,
  handleSubmit
}: AddExperienceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
          <DialogDescription>
            Add your professional experience
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="companyName">Company/Organization Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="position">Position/Title</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
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
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
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
