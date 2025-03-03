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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import React from "react";

interface ProfileModalsProps {
  openModal: "profile" | "education" | "experience" | "updateProfileImg" | "course" | null;
  setOpenModal: (modal: "profile" | "education" | "experience" | "updateProfileImg" | "course" | null) => void;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ProfileModals = ({ openModal, setOpenModal, formData, handleChange }: ProfileModalsProps) => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();

    const apiUrl = `https://api.myedusync.com/updateTutorProfile`;
    const payload = {
      fullAddress: formData.fullAddress,
      WhatsAppNumber: formData.WhatsAppNumber,
      aboutMe: formData.aboutMe,
      currentDesignation: formData.currentDesignation,
      shortBio: formData.shortBio,
      skills: formData.skills,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        setOpenModal(null);
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update profile",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the profile",
      });
    }
  };

  const handleEducationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.myedusync.com/createTutorEducation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`,
        },
        body: JSON.stringify({
          instituteName: formData.instituteName,
          courseName: formData.courseName,
          fieldOfStudy: formData.fieldOfStudy,
          startTime: formData.startTime,
          endTime: formData.endTime,
          grade: formData.grade,
          credentialUrl: formData.credentialUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Education details added successfully",
        });
        setOpenModal(null);
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to add education details",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding education details",
      });
    }
  };

  const handleExperienceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.myedusync.com/createTutorExperience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`,
        },
        body: JSON.stringify({
          organisationName: formData.organisationName,
          designation: formData.designation,
          type: formData.type,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Experience details added successfully",
        });
        setOpenModal(null);
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to add experience details",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding experience details",
      });
    }
  };

  // Add a new submit handler for courses
  const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://api.myedusync.com/createCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`,
        },
        body: JSON.stringify({
          subject: formData.subject,
          board: formData.board,
          className: formData.className,
          weeklySessions: parseInt(formData.weeklySessions),
          costPerSessions: parseInt(formData.costPerSessions),
          currency: formData.currency,
          aboutThisCourse: formData.aboutThisCourse,
          courseThumbnail: formData.courseThumbnail,
          language: formData.language,
          mode: formData.mode,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Course added successfully");
        setOpenModal(null);
        // Trigger a page refresh to show the new course
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the course");
    }
  };

  return (
    <>
      {/* Profile Modal */}
      <Dialog open={openModal === "profile"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => handleSubmit(e, "profile")} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullAddress">Full Address</Label>
              <Input id="fullAddress" name="fullAddress" value={formData.fullAddress} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="WhatsAppNumber">WhatsApp Number</Label>
              <Input id="WhatsAppNumber" name="WhatsAppNumber" value={formData.WhatsAppNumber} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutMe">About Me</Label>
              <Textarea id="aboutMe" name="aboutMe" placeholder="Tell us a little bit about yourself" value={formData.aboutMe} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentDesignation">Current Designation</Label>
              <Input id="currentDesignation" name="currentDesignation" value={formData.currentDesignation} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortBio">Short Bio</Label>
              <Input id="shortBio" name="shortBio" value={formData.shortBio} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Education Modal */}
      <Dialog open={openModal === "education"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
            <DialogDescription>Add your education details here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEducationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instituteName">Institute Name</Label>
              <Input id="instituteName" name="instituteName" placeholder="Enter institute name" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input id="courseName" name="courseName" placeholder="Enter course name" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input id="fieldOfStudy" name="fieldOfStudy" placeholder="Enter field of study" onChange={handleChange} />
            </div>
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input type="date" id="startTime" name="startTime" onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input type="date" id="endTime" name="endTime" onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input id="grade" name="grade" placeholder="Enter grade" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Credential URL</Label>
              <Input id="credentialUrl" name="credentialUrl" placeholder="Enter credential URL" onChange={handleChange} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Experience Modal */}
      <Dialog open={openModal === "experience"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogDescription>Add your experience details here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleExperienceSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organisationName">Organisation Name</Label>
              <Input id="organisationName" name="organisationName" placeholder="Enter organisation name" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" name="designation" placeholder="Enter designation" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input id="type" name="type" placeholder="Enter type" onChange={handleChange} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Course Modal */}
      <Dialog open={openModal === "course"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Create a new course to teach students. Fill in all the details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="e.g. Mathematics" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="board">Board</Label>
                <Input 
                  id="board" 
                  name="board" 
                  placeholder="e.g. CBSE, ICSE, IB" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="className">Class</Label>
                <Input 
                  id="className" 
                  name="className" 
                  placeholder="e.g. 10, 11, 12" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weeklySessions">Weekly Sessions</Label>
                <Input 
                  id="weeklySessions" 
                  name="weeklySessions" 
                  type="number" 
                  placeholder="e.g. 2" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="costPerSessions">Cost Per Session</Label>
                <Input 
                  id="costPerSessions" 
                  name="costPerSessions" 
                  type="number" 
                  placeholder="e.g. 20" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input 
                  id="currency" 
                  name="currency" 
                  placeholder="e.g. USD, EUR, INR" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input 
                  id="language" 
                  name="language" 
                  placeholder="e.g. English, Hindi" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mode">Mode</Label>
                <Input 
                  id="mode" 
                  name="mode" 
                  placeholder="e.g. Online, In-person" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="courseThumbnail">Course Thumbnail URL</Label>
              <Input 
                id="courseThumbnail" 
                name="courseThumbnail" 
                placeholder="https://example.com/image.jpg" 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aboutThisCourse">About This Course</Label>
              <Textarea 
                id="aboutThisCourse" 
                name="aboutThisCourse" 
                placeholder="Describe your course content, objectives, and what students will learn..." 
                rows={5}
                onChange={handleChange} 
                required 
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Add Course</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
