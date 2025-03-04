
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { AccountDetailsTab } from "@/components/profile/AccountDetailsTab";
import { EducationTab } from "@/components/profile/EducationTab";
import { ExperienceTab } from "@/components/profile/ExperienceTab";
import { PasswordTab } from "@/components/profile/PasswordTab";
import { CoursesTab } from "@/components/profile/CoursesTab";
import { ProfileModals } from "@/components/profile/ProfileModals";
import { toast } from "sonner";
import { fetchWithInterceptor, apiPost } from "@/utils/apiInterceptor";
import { API_ENDPOINTS } from "@/config/api";
import { useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState<"profile" | "education" | "experience" | "updateProfileImg" | "course" | null>(null);
  const [formData, setFormData] = useState({
    fullAddress: "", 
    WhatsAppNumber: "", 
    aboutMe: "", 
    currentDesignation: "",
    shortBio: "", 
    skills: "", 
    instituteName: "", 
    courseName: "", 
    fieldOfStudy: "",
    startTime: "", 
    endTime: "", 
    grade: "", 
    credentialUrl: "", 
    organisationName: "",
    designation: "", 
    type: "", 
    newProfilePic: "",
    subject: "",
    board: "",
    className: "",
    weeklySessions: "",
    costPerSessions: "",
    currency: "USD",
    aboutThisCourse: "",
    courseThumbnail: "",
    language: "English",
    mode: "Online"
  });

  useEffect(() => setUser(JSON.parse(localStorage.getItem("user") || "{}")), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (formType: string) => {
    try {
      let endpoint = "";
      let payload = {};

      switch (formType) {
        case "profile":
          endpoint = API_ENDPOINTS.tutors.getTutorProfile;
          payload = {
            fullAddress: formData.fullAddress,
            WhatsAppNumber: formData.WhatsAppNumber,
            aboutMe: formData.aboutMe,
            currentDesignation: formData.currentDesignation,
            shortBio: formData.shortBio,
            skills: formData.skills
          };
          break;
        case "education":
          endpoint = API_ENDPOINTS.tutors.educationList;
          payload = {
            instituteName: formData.instituteName,
            courseName: formData.courseName,
            fieldOfStudy: formData.fieldOfStudy,
            startTime: formData.startTime,
            endTime: formData.endTime,
            grade: formData.grade,
            credentialUrl: formData.credentialUrl
          };
          break;
        case "experience":
          endpoint = API_ENDPOINTS.tutors.experienceList;
          payload = {
            organisationName: formData.organisationName,
            designation: formData.designation,
            type: formData.type,
            startTime: formData.startTime,
            endTime: formData.endTime
          };
          break;
        case "updateProfileImg":
          endpoint = API_ENDPOINTS.tutors.uploadProfilePic;
          payload = {
            profilePic: formData.newProfilePic
          };
          break;
        case "course":
          endpoint = API_ENDPOINTS.courses.create;
          payload = {
            subject: formData.subject,
            board: formData.board,
            className: formData.className,
            weeklySessions: formData.weeklySessions,
            costPerSessions: formData.costPerSessions,
            currency: formData.currency,
            aboutThisCourse: formData.aboutThisCourse,
            courseThumbnail: formData.courseThumbnail,
            language: formData.language,
            mode: formData.mode
          };
          break;
        default:
          return;
      }

      const response = await apiPost(endpoint, payload, { requiresAuth: true });
      const data = await response.json();

      if (data) {
        toast.success(`${formType.charAt(0).toUpperCase() + formType.slice(1)} updated successfully`);
        
        // Clear form fields
        setFormData({
          ...formData,
          fullAddress: "", 
          WhatsAppNumber: "", 
          aboutMe: "", 
          currentDesignation: "",
          shortBio: "", 
          skills: "", 
          instituteName: "", 
          courseName: "", 
          fieldOfStudy: "",
          startTime: "", 
          endTime: "", 
          grade: "", 
          credentialUrl: "", 
          organisationName: "",
          designation: "", 
          type: "", 
          newProfilePic: "",
          subject: "",
          board: "",
          className: "",
          weeklySessions: "",
          costPerSessions: "",
          currency: "USD",
          aboutThisCourse: "",
          courseThumbnail: "",
          language: "English",
          mode: "Online"
        });
        
        // Invalidate and refetch the relevant queries
        switch (formType) {
          case "profile":
            queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
            break;
          case "education":
            queryClient.invalidateQueries({ queryKey: ["tutorEducation"] });
            break;
          case "experience":
            queryClient.invalidateQueries({ queryKey: ["tutorExperience"] });
            break;
          case "course":
            queryClient.invalidateQueries({ queryKey: ["tutorCourses"] });
            break;
          default:
            break;
        }
        
        setOpenModal(null);
      }
    } catch (error) {
      console.error(`Error updating ${formType}:`, error);
      toast.error(`Failed to update ${formType}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("You have been logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-primary">Profile</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-600 rounded-md text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                <TabsTrigger value="account">Account Details</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <AccountDetailsTab setOpenModal={setOpenModal} />
              </TabsContent>

              <TabsContent value="education">
                <EducationTab setOpenModal={setOpenModal} />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceTab setOpenModal={setOpenModal} />
              </TabsContent>
              
              <TabsContent value="courses">
                <CoursesTab setOpenModal={setOpenModal} />
              </TabsContent>

              <TabsContent value="password">
                <PasswordTab />
              </TabsContent>
            </Tabs>

            <ProfileModals 
              openModal={openModal} 
              setOpenModal={setOpenModal} 
              formData={formData} 
              handleChange={handleChange}
              handleSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
