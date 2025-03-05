
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

interface AddCourseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    subject: string;
    board: string;
    className: string;
    weeklySessions: string;
    costPerSession: string;
    currency: string;
    aboutCourse: string;
    language: string;
    mode: string;
    courseThumbnail: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePic' | 'courseThumbnail' | 'credentialUrl') => void;
  handleAddCourse: (e: React.FormEvent) => void;
  setFormData: (data: any) => void;
}

export const AddCourseModal = ({
  isOpen,
  onOpenChange,
  formData,
  handleChange,
  handleFileInputChange,
  handleAddCourse,
  setFormData
}: AddCourseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill out the details to create a new course
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddCourse}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="board">Board/Curriculum</Label>
                <Select
                  value={formData.board}
                  onValueChange={(value) => setFormData((prev: any) => ({ ...prev, board: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="IGCSE">IGCSE</SelectItem>
                    <SelectItem value="IB">IB</SelectItem>
                    <SelectItem value="State">State Board</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="className">Class/Grade</Label>
                <Input
                  id="className"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weeklySessions">Weekly Sessions</Label>
                <Input
                  id="weeklySessions"
                  name="weeklySessions"
                  type="number"
                  min="1"
                  max="7"
                  value={formData.weeklySessions}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="costPerSession">Cost Per Session</Label>
                <div className="flex gap-2">
                  <Input
                    id="costPerSession"
                    name="costPerSession"
                    type="number"
                    min="1"
                    value={formData.costPerSession}
                    onChange={handleChange}
                    required
                    className="flex-1"
                  />
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData((prev: any) => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData((prev: any) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Mandarin">Mandarin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mode">Teaching Mode</Label>
                <Select
                  value={formData.mode}
                  onValueChange={(value) => setFormData((prev: any) => ({ ...prev, mode: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="In-Person">In-Person</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="aboutCourse">About This Course</Label>
              <Textarea
                id="aboutCourse"
                name="aboutCourse"
                value={formData.aboutCourse}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
            <div>
              <Label>Course Thumbnail</Label>
              <div className="mt-1 flex items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, 'courseThumbnail')}
                  className="flex-1"
                />
              </div>
              {formData.courseThumbnail && (
                <div className="mt-2">
                  <img
                    src={formData.courseThumbnail}
                    alt="Course thumbnail preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
