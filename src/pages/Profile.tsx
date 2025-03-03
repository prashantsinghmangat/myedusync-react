
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { AccountDetailsTab } from "@/components/profile/AccountDetailsTab";
import { EducationTab } from "@/components/profile/EducationTab";
import { ExperienceTab } from "@/components/profile/ExperienceTab";
import { PasswordTab } from "@/components/profile/PasswordTab";
import { ProfileModals } from "@/components/profile/ProfileModals";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState<"profile" | "education" | "experience" | "updateProfileImg" | null>(null);
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
    newProfilePic: ""
  });

  useEffect(() => setUser(JSON.parse(localStorage.getItem("user") || "{}")), []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({ title: "Success", description: "You have been logged out" });
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
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="account">Account Details</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
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

              <TabsContent value="password">
                <PasswordTab />
              </TabsContent>
            </Tabs>

            <ProfileModals 
              openModal={openModal} 
              setOpenModal={setOpenModal} 
              formData={formData} 
              handleChange={handleChange} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
