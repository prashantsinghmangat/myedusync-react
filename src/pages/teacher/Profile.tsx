import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from '@/config/api';
import { fetchWithInterceptor } from "@/utils/apiInterceptor";
import { toast } from "sonner";

// Import component tabs
import { ProfileHeader } from "@/components/teacher/profile/ProfileHeader";
import { TabNavigation } from "@/components/teacher/profile/TabNavigation";

// Import modals
import { EditProfileModal } from "@/components/teacher/profile/modals/EditProfileModal";
import { AddEducationModal } from "@/components/teacher/profile/modals/AddEducationModal";
import { AddExperienceModal } from "@/components/teacher/profile/modals/AddExperienceModal";
import { ChangePasswordModal } from "@/components/teacher/profile/modals/ChangePasswordModal";

const TeacherProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("about");
  
  // Modal state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    designation: "",
    skills: "",
    instituteName: "",
    courseName: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    companyName: "",
    position: "",
    startDateExp: "",
    endDateExp: "",
    description: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const { data: profileData } = useQuery({
    queryKey: ["tutorProfile"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.getTutorProfile, { requiresAuth: true });
        return await response.json();
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
        return null;
      }
    },
    enabled: !!user
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role?.toLowerCase() !== "teacher") {
      navigate("/");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  useEffect(() => {
    if (profileData?.data) {
      setFormData({
        ...formData,
        name: profileData.data.name || "",
        email: profileData.data.emailId || "",
        phone: profileData.data.phoneNumber || "",
        location: profileData.data.location || "",
        bio: profileData.data.aboutMe || "",
        designation: profileData.data.currentDesignation || "",
        skills: profileData.data.skills || ""
      });
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    toast.success("Profile updated successfully");
    setIsEditProfileOpen(false);
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    toast.success("Education added successfully");
    setIsAddEducationOpen(false);
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    toast.success("Experience added successfully");
    setIsAddExperienceOpen(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    // In a real app, you'd send this data to your API
    toast.success("Password changed successfully");
    setIsChangePasswordOpen(false);
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Teacher Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 mb-8">
              <ProfileHeader 
                profileData={profileData?.data} 
                formData={formData}
                setIsEditProfileOpen={setIsEditProfileOpen}
              />

              <div>
                <TabNavigation 
                  defaultValue={activeTab} 
                  onTabChange={setActiveTab} 
                  profileData={profileData?.data}
                  formData={formData}
                  setIsEditProfileOpen={setIsEditProfileOpen}
                  setIsAddEducationOpen={setIsAddEducationOpen}
                  setIsAddExperienceOpen={setIsAddExperienceOpen}
                  setIsChangePasswordOpen={setIsChangePasswordOpen}
                />
              </div>
            </div>
            
            {/* Modals */}
            <EditProfileModal 
              isOpen={isEditProfileOpen}
              setIsOpen={setIsEditProfileOpen}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleProfileUpdate}
            />
            
            <AddEducationModal 
              isOpen={isAddEducationOpen}
              setIsOpen={setIsAddEducationOpen}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleAddEducation}
            />
            
            <AddExperienceModal 
              isOpen={isAddExperienceOpen}
              setIsOpen={setIsAddExperienceOpen}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleAddExperience}
            />
            
            <ChangePasswordModal 
              isOpen={isChangePasswordOpen}
              setIsOpen={setIsChangePasswordOpen}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handlePasswordChange}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherProfile;
