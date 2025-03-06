import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from '@/config/api';
import { fetchWithInterceptor, apiPost } from "@/utils/apiInterceptor";
import { toast } from "sonner";
import { Course, Education, Experience } from "@/types/courses";
import { useProfileTabs } from "@/hooks/useProfileTabs";
import { 
  UserRound, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  LockKeyhole,
  BookOpenCheck
} from "lucide-react";

import { ProfileSidebar } from "@/components/profile/teacher/ProfileSidebar";
import { AboutTab } from "@/components/profile/teacher/AboutTab";
import { EducationTabContent } from "@/components/profile/teacher/EducationTabContent";
import { ExperienceTabContent } from "@/components/profile/teacher/ExperienceTabContent";
import { CoursesTabContent } from "@/components/profile/teacher/CoursesTabContent";
import { SecurityTabContent } from "@/components/profile/teacher/SecurityTabContent";
import { OfferingTabContent } from "@/components/profile/teacher/OfferingTabContent";

import { EditProfileModal } from "@/components/profile/teacher/modals/EditProfileModal";
import { AddEducationModal } from "@/components/profile/teacher/modals/AddEducationModal";
import { AddExperienceModal } from "@/components/profile/teacher/modals/AddExperienceModal";
import { ChangePasswordModal } from "@/components/profile/teacher/modals/ChangePasswordModal";
import { AddCourseModal } from "@/components/profile/teacher/modals/AddCourseModal";
import { UploadPhotoModal } from "@/components/profile/teacher/modals/UploadPhotoModal";

const TeacherProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const { activeTab, setActiveTab } = useProfileTabs();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false);
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
    credentialUrl: "",
    companyName: "",
    position: "",
    jobType: "Full-Time",
    startDateExp: "",
    endDateExp: "",
    description: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    subject: "",
    board: "",
    className: "",
    weeklySessions: "",
    costPerSession: "",
    currency: "USD",
    aboutCourse: "",
    language: "English",
    mode: "Online",
    courseThumbnail: "",
    profilePic: "",
    boards: "",
    classes: "",
    subjects: ""
  });

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
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

  const { data: educationList = [], isLoading: isEducationLoading, refetch: refetchEducation } = useQuery({
    queryKey: ["tutorEducation"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.educationList, { requiresAuth: true });
        const data = await response.json();
        return data?.data || [];
      } catch (error) {
        console.error("Error fetching education:", error);
        return [];
      }
    },
    enabled: activeTab === "education" && !!user
  });

  const { data: experienceList = [], isLoading: isExperienceLoading, refetch: refetchExperience } = useQuery({
    queryKey: ["tutorExperience"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.experienceList, { requiresAuth: true });
        const data = await response.json();
        return data?.data || [];
      } catch (error) {
        console.error("Error fetching experience:", error);
        return [];
      }
    },
    enabled: activeTab === "experience" && !!user
  });

  const { data: coursesList = [], isLoading: isCoursesLoading, refetch: refetchCourses } = useQuery({
    queryKey: ["tutorCourses"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.courses.tutorCourses, { requiresAuth: true });
        const data = await response.json();
        return data?.data || data || [];
      } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
      }
    },
    enabled: activeTab === "courses" && !!user
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
      setFormData(prev => ({
        ...prev,
        name: profileData.data.name || "",
        email: profileData.data.emailId || "",
        phone: profileData.data.phoneNumber || "",
        location: profileData.data.location || "",
        bio: profileData.data.aboutMe || "",
        designation: profileData.data.currentDesignation || "",
        skills: profileData.data.skills || "",
        boards: profileData.data.boards || "",
        classes: profileData.data.classes || "",
        subjects: profileData.data.subjects || ""
      }));
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "education") {
      refetchEducation();
    } else if (value === "experience") {
      refetchExperience();
    } else if (value === "courses") {
      refetchCourses();
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.getTutorProfile, {
        name: formData.name,
        aboutMe: formData.bio,
        currentDesignation: formData.designation,
        skills: formData.skills,
        location: formData.location,
        phoneNumber: formData.phone
      }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
        setIsEditProfileOpen(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const educationData = {
        instituteName: formData.instituteName,
        courseName: formData.courseName,
        fieldOfStudy: formData.fieldOfStudy,
        startTime: formData.startDate,
        endTime: formData.endDate,
        grade: formData.grade,
        credentialUrl: formData.credentialUrl
      };
      
      const response = await apiPost(API_ENDPOINTS.tutors.addEducation, educationData, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Education added successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorEducation"] });
        setIsAddEducationOpen(false);
        setFormData(prev => ({
          ...prev,
          instituteName: "",
          courseName: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          grade: "",
          credentialUrl: ""
        }));
      } else {
        toast.error("Failed to add education");
      }
    } catch (error) {
      console.error("Error adding education:", error);
      toast.error("An error occurred while adding education");
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const experienceData = {
        organisationName: formData.companyName,
        designation: formData.position,
        type: formData.jobType,
        startTime: formData.startDateExp,
        endTime: formData.endDateExp
      };
      
      const response = await apiPost(API_ENDPOINTS.tutors.addExperience, experienceData, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Experience added successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorExperience"] });
        setIsAddExperienceOpen(false);
        setFormData(prev => ({
          ...prev,
          companyName: "",
          position: "",
          jobType: "Full-Time",
          startDateExp: "",
          endDateExp: "",
          description: ""
        }));
      } else {
        toast.error("Failed to add experience");
      }
    } catch (error) {
      console.error("Error adding experience:", error);
      toast.error("An error occurred while adding experience");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    try {
      const passwordData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      };
      
      const response = await apiPost(API_ENDPOINTS.auth.profile, {
        ...passwordData,
        changePassword: true
      }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Password changed successfully");
        setIsChangePasswordOpen(false);
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }));
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing password");
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const courseData = {
        subject: formData.subject,
        board: formData.board,
        className: formData.className,
        weeklySessions: formData.weeklySessions,
        costPerSessions: formData.costPerSession,
        currency: formData.currency,
        aboutThisCourse: formData.aboutCourse,
        language: formData.language,
        mode: formData.mode,
        courseThumbnail: formData.courseThumbnail
      };
      
      const response = await apiPost(API_ENDPOINTS.courses.create, courseData, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Course added successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorCourses"] });
        setIsAddCourseOpen(false);
        setFormData(prev => ({
          ...prev,
          subject: "",
          board: "",
          className: "",
          weeklySessions: "",
          costPerSession: "",
          currency: "USD",
          aboutCourse: "",
          language: "English",
          mode: "Online",
          courseThumbnail: ""
        }));
      } else {
        toast.error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("An error occurred while adding course");
    }
  };

  const handleSaveOfferings = async (offeringData: { boards: string, classes: string, subjects: string }) => {
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.addTutorBasicDetails, {
        currentDesignation: profileData?.data?.currentDesignation || "",
        shortBio: profileData?.data?.shortBio || "",
        aboutMe: profileData?.data?.aboutMe || "",
        skills: profileData?.data?.skills || "",
        WhatsAppNumber: profileData?.data?.WhatsAppNumber || "",
        FullAdddress: profileData?.data?.FullAdddress || "",
        boards: offeringData.boards,
        classes: offeringData.classes,
        subjects: offeringData.subjects
      }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Offerings updated successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
      } else {
        toast.error("Failed to update offerings");
      }
    } catch (error) {
      console.error("Error updating offerings:", error);
      toast.error("An error occurred while updating offerings");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePic' | 'courseThumbnail' | 'credentialUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.profilePic) {
      toast.error("Please select an image");
      return;
    }
    
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.uploadProfilePic, {
        profilePic: formData.profilePic
      }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Profile picture updated successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
        setIsUploadPhotoOpen(false);
        setFormData(prev => ({ ...prev, profilePic: "" }));
      } else {
        toast.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("An error occurred while updating profile picture");
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.deleteEducation, { educationId: id }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Education deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorEducation"] });
      } else {
        toast.error("Failed to delete education");
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("An error occurred while deleting education");
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const response = await apiPost(API_ENDPOINTS.tutors.deleteExperience, { experienceId: id }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Experience deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorExperience"] });
      } else {
        toast.error("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("An error occurred while deleting experience");
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const response = await apiPost(API_ENDPOINTS.courses.deleteCourse, { courseId: id }, { requiresAuth: true });
      
      if (response.ok) {
        toast.success("Course deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["tutorCourses"] });
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("An error occurred while deleting course");
    }
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
              <ProfileSidebar 
                profileData={profileData}
                setIsEditProfileOpen={setIsEditProfileOpen}
                setIsUploadPhotoOpen={setIsUploadPhotoOpen}
              />

              <Tabs defaultValue="about" value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-4 grid grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="about">
                    <UserRound className="h-4 w-4 mr-2" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="experience">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="courses">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value="offerings">
                    <BookOpenCheck className="h-4 w-4 mr-2" />
                    Offerings
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <LockKeyhole className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                  <AboutTab 
                    profileData={profileData}
                    isLoading={isProfileLoading}
                  />
                </TabsContent>

                <TabsContent value="education">
                  <EducationTabContent 
                    educationList={educationList}
                    isLoading={isEducationLoading}
                    setIsAddEducationOpen={setIsAddEducationOpen}
                    deleteEducation={deleteEducation}
                  />
                </TabsContent>
                
                <TabsContent value="experience">
                  <ExperienceTabContent 
                    experienceList={experienceList}
                    isLoading={isExperienceLoading}
                    setIsAddExperienceOpen={setIsAddExperienceOpen}
                    deleteExperience={deleteExperience}
                  />
                </TabsContent>
                
                <TabsContent value="courses">
                  <CoursesTabContent 
                    coursesList={coursesList}
                    isLoading={isCoursesLoading}
                    setIsAddCourseOpen={setIsAddCourseOpen}
                    deleteCourse={deleteCourse}
                  />
                </TabsContent>
                
                <TabsContent value="offerings">
                  <OfferingTabContent 
                    profileData={profileData}
                    isLoading={isProfileLoading}
                    onSaveOfferings={handleSaveOfferings}
                  />
                </TabsContent>
                
                <TabsContent value="security">
                  <SecurityTabContent 
                    setIsChangePasswordOpen={setIsChangePasswordOpen}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <EditProfileModal 
        isOpen={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        formData={formData}
        handleChange={handleChange}
        handleProfileUpdate={handleProfileUpdate}
      />

      <AddEducationModal 
        isOpen={isAddEducationOpen}
        onOpenChange={setIsAddEducationOpen}
        formData={formData}
        handleChange={handleChange}
        handleFileInputChange={handleFileInputChange}
        handleAddEducation={handleAddEducation}
      />

      <AddExperienceModal 
        isOpen={isAddExperienceOpen}
        onOpenChange={setIsAddExperienceOpen}
        formData={formData}
        handleChange={handleChange}
        handleAddExperience={handleAddExperience}
        setFormData={setFormData}
      />

      <ChangePasswordModal 
        isOpen={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
        formData={formData}
        handleChange={handleChange}
        handlePasswordChange={handlePasswordChange}
      />

      <AddCourseModal 
        isOpen={isAddCourseOpen}
        onOpenChange={setIsAddCourseOpen}
        formData={formData}
        handleChange={handleChange}
        handleFileInputChange={handleFileInputChange}
        handleAddCourse={handleAddCourse}
        setFormData={setFormData}
      />

      <UploadPhotoModal 
        isOpen={isUploadPhotoOpen}
        onOpenChange={setIsUploadPhotoOpen}
        formData={formData}
        handleFileInputChange={handleFileInputChange}
        handleProfilePicUpdate={handleProfilePicUpdate}
      />

      <Footer />
    </div>
  );
};

export default TeacherProfile;
