
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface ProfileModalsProps {
  openModal: "profile" | "education" | "experience" | "updateProfileImg" | "course" | null;
  setOpenModal: (modal: "profile" | "education" | "experience" | "updateProfileImg" | "course" | null) => void;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (formType: string) => void;
}

export const ProfileModals = ({ 
  openModal, 
  setOpenModal, 
  formData, 
  handleChange,
  handleSubmit
}: ProfileModalsProps) => {
  const handleSelectChange = (name: string, value: string) => {
    const event = {
      target: {
        name,
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(event);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (openModal) {
      handleSubmit(openModal);
    }
  };

  return (
    <>
      {/* Profile Modal */}
      <Dialog open={openModal === "profile"} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="fullAddress">Full Address</Label>
                <Input
                  id="fullAddress"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="WhatsAppNumber">WhatsApp Number</Label>
                <Input
                  id="WhatsAppNumber"
                  name="WhatsAppNumber"
                  value={formData.WhatsAppNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="aboutMe">About Me</Label>
                <Textarea
                  id="aboutMe"
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="currentDesignation">Current Designation</Label>
                <Input
                  id="currentDesignation"
                  name="currentDesignation"
                  value={formData.currentDesignation}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="shortBio">Short Bio</Label>
                <Textarea
                  id="shortBio"
                  name="shortBio"
                  value={formData.shortBio}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics, Physics, Chemistry"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Education Modal */}
      <Dialog open={openModal === "education"} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="instituteName">Institute Name</Label>
                <Input
                  id="instituteName"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="startTime">Start Date</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="date"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="endTime">End Date</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="date"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="credentialUrl">Credential URL (optional)</Label>
                <Input
                  id="credentialUrl"
                  name="credentialUrl"
                  value={formData.credentialUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/certificate.pdf"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Experience Modal */}
      <Dialog open={openModal === "experience"} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="organisationName">Organization Name</Label>
                <Input
                  id="organisationName"
                  name="organisationName"
                  value={formData.organisationName}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("type", value)}
                  defaultValue={formData.type}
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
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="startTime">Start Date</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="date"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="endTime">End Date</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="date"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Profile Picture Update Modal */}
      <Dialog open={openModal === "updateProfileImg"} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="newProfilePic">Profile Picture URL</Label>
                <Input
                  id="newProfilePic"
                  name="newProfilePic"
                  value={formData.newProfilePic}
                  onChange={handleChange}
                  placeholder="https://example.com/profile.jpg"
                />
              </div>
              {formData.newProfilePic && (
                <div className="flex justify-center">
                  <img 
                    src={formData.newProfilePic} 
                    alt="New profile preview" 
                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }} 
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Course Modal */}
      <Dialog open={openModal === "course"} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="board">Board</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("board", value)}
                  defaultValue={formData.board}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="State Board">State Board</SelectItem>
                    <SelectItem value="IB">IB</SelectItem>
                    <SelectItem value="IGCSE">IGCSE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="className">Class</Label>
                <Input
                  id="className"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="weeklySessions">Weekly Sessions</Label>
                  <Input
                    id="weeklySessions"
                    name="weeklySessions"
                    type="number"
                    value={formData.weeklySessions}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="costPerSessions">Cost Per Session</Label>
                  <Input
                    id="costPerSessions"
                    name="costPerSessions"
                    type="number"
                    value={formData.costPerSessions}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("currency", value)}
                  defaultValue={formData.currency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="aboutThisCourse">About This Course</Label>
                <Textarea
                  id="aboutThisCourse"
                  name="aboutThisCourse"
                  value={formData.aboutThisCourse}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="courseThumbnail">Course Thumbnail URL</Label>
                <Input
                  id="courseThumbnail"
                  name="courseThumbnail"
                  value={formData.courseThumbnail}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("language", value)}
                    defaultValue={formData.language}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="mode">Mode</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("mode", value)}
                    defaultValue={formData.mode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
