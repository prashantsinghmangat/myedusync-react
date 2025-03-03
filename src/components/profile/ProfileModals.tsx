
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchWithInterceptor } from "@/utils/apiInterceptor";

interface ProfileModalsProps {
  openModal: "profile" | "education" | "experience" | "updateProfileImg" | null;
  setOpenModal: (modal: "profile" | "education" | "experience" | "updateProfileImg" | null) => void;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ProfileModals = ({ 
  openModal, 
  setOpenModal, 
  formData, 
  handleChange 
}: ProfileModalsProps) => {
  const { toast } = useToast();

  const { refetch: refetchProfileData } = useQuery({
    queryKey: ["tutorProfile"],
    queryFn: async () => (await fetchWithInterceptor("https://api.myedusync.com/getTutorProfile", { requiresAuth: true })).json(),
    enabled: false
  });

  const { refetch: refetchEducationList } = useQuery({
    queryKey: ["tutorEducation"],
    queryFn: async () => {
      const response = await fetchWithInterceptor("https://api.myedusync.com/getTutorsEducationDetails", { requiresAuth: true });
      return response.json();
    },
    enabled: false
  });

  const { refetch: refetchExperienceList } = useQuery({
    queryKey: ["tutorExperience"],
    queryFn: async () => {
      const response = await fetchWithInterceptor("https://api.myedusync.com/getTutorsExperienceDetails", { requiresAuth: true });
      return response.json();
    },
    enabled: false
  });

  const refetchData = (type: string) => {
    if (type === "education") refetchEducationList();
    else if (type === "experience") refetchExperienceList();
    else refetchProfileData();
  };

  const handleSubmit = async (type: string) => {
    const endpoints = {
      profile: "addTutorBasicDetails",
      education: "addTutorsEducationDetails",
      experience: "addTutorsExperienceDetails",
      updateProfileImg: "uploadTutorProfilePic",
    };

    const payloads: Record<string, any> = {
      profile: formData,
      education: { 
        instituteName: formData.instituteName, 
        courseName: formData.courseName, 
        fieldOfStudy: formData.fieldOfStudy, 
        startTime: formData.startTime, 
        endTime: formData.endTime, 
        grade: formData.grade, 
        credentialUrl: formData.credentialUrl 
      },
      experience: { 
        organisationName: formData.organisationName, 
        designation: formData.designation, 
        type: formData.type, 
        startTime: formData.startTime, 
        endTime: formData.endTime, 
        credentialUrl: formData.credentialUrl 
      },
      updateProfileImg: { profilePic: formData.newProfilePic },
    };

    try {
      await fetchWithInterceptor(`https://api.myedusync.com/${endpoints[type]}`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payloads[type]), 
        requiresAuth: true 
      });

      refetchData(type);
      toast({ title: `${type} updated successfully!` });
      setOpenModal(null);
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Update failed!" });
    }
  };

  return (
    <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {openModal === "profile" && "Edit Profile"}
            {openModal === "education" && "Add Education"}
            {openModal === "experience" && "Add Experience"}
            {openModal === "updateProfileImg" && "Update Profile Image"}
          </DialogTitle>
        </DialogHeader>

        {openModal === "updateProfileImg" && (
          <div className="space-y-3">
            <Input 
              name="newProfilePic" 
              value={formData.newProfilePic} 
              onChange={handleChange} 
              placeholder="Enter URL of new profile image" 
            />
          </div>
        )}

        {openModal === "profile" && (
          <div className="space-y-3">
            <Input 
              name="fullAddress" 
              value={formData.fullAddress} 
              onChange={handleChange} 
              placeholder="Full Address" 
            />
            <Input 
              name="WhatsAppNumber" 
              value={formData.WhatsAppNumber} 
              onChange={handleChange} 
              placeholder="WhatsApp Number" 
            />
            <Textarea 
              name="aboutMe" 
              value={formData.aboutMe} 
              onChange={handleChange} 
              placeholder="About Me" 
            />
            <Input 
              name="currentDesignation" 
              value={formData.currentDesignation} 
              onChange={handleChange} 
              placeholder="Current Designation" 
            />
            <Textarea 
              name="shortBio" 
              value={formData.shortBio} 
              onChange={handleChange} 
              placeholder="Short Bio" 
            />
            <Input 
              name="skills" 
              value={formData.skills} 
              onChange={handleChange} 
              placeholder="Skills (comma-separated)" 
            />
          </div>
        )}

        {openModal === "education" && (
          <div className="space-y-3">
            <Input 
              name="instituteName" 
              value={formData.instituteName} 
              onChange={handleChange} 
              placeholder="Institute Name" 
            />
            <Input 
              name="courseName" 
              value={formData.courseName} 
              onChange={handleChange} 
              placeholder="Course Name" 
            />
            <Input 
              name="fieldOfStudy" 
              value={formData.fieldOfStudy} 
              onChange={handleChange} 
              placeholder="Field of Study" 
            />
            <Input 
              name="startTime" 
              type="date" 
              value={formData.startTime} 
              onChange={handleChange} 
              placeholder="Start Date" 
            />
            <Input 
              name="endTime" 
              type="date" 
              value={formData.endTime} 
              onChange={handleChange} 
              placeholder="End Date" 
            />
            <Input 
              name="grade" 
              value={formData.grade} 
              onChange={handleChange} 
              placeholder="Grade" 
            />
            <Input 
              name="credentialUrl" 
              value={formData.credentialUrl} 
              onChange={handleChange} 
              placeholder="Credential URL" 
            />
          </div>
        )}

        {openModal === "experience" && (
          <div className="space-y-3">
            <Input 
              name="organisationName" 
              value={formData.organisationName} 
              onChange={handleChange} 
              placeholder="Organization Name" 
            />
            <Input 
              name="designation" 
              value={formData.designation} 
              onChange={handleChange} 
              placeholder="Designation" 
            />
            <Input 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              placeholder="Type (e.g., Self, Company)" 
            />
            <Input 
              name="startTime" 
              type="date" 
              value={formData.startTime} 
              onChange={handleChange} 
              placeholder="Start Date" 
            />
            <Input 
              name="endTime" 
              type="date" 
              value={formData.endTime} 
              onChange={handleChange} 
              placeholder="End Date" 
            />
            <Input 
              name="credentialUrl" 
              value={formData.credentialUrl} 
              onChange={handleChange} 
              placeholder="Credential URL" 
            />
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => setOpenModal(null)}>Cancel</Button>
          <Button onClick={() => handleSubmit(openModal!)} className="ml-2">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
