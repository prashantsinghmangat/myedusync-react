
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserRound, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  LockKeyhole,
  BookOpenCheck
} from "lucide-react";

// Custom hooks
import { useTeacherProfile } from "@/hooks/useTeacherProfile";
import { useProfileTabs } from "@/hooks/useProfileTabs";
import { useProfileModals } from "@/hooks/useProfileModals";

// Components
import { ProfileSidebar } from "@/components/profile/teacher/ProfileSidebar";
import { AboutTab } from "@/components/profile/teacher/AboutTab";
import { EducationTabContent } from "@/components/profile/teacher/EducationTabContent";
import { ExperienceTabContent } from "@/components/profile/teacher/ExperienceTabContent";
import { CoursesTabContent } from "@/components/profile/teacher/CoursesTabContent";
import { SecurityTabContent } from "@/components/profile/teacher/SecurityTabContent";
import { OfferingTabContent } from "@/components/profile/teacher/OfferingTabContent";

// Modals
import { EditProfileModal } from "@/components/profile/teacher/modals/EditProfileModal";
import { AddEducationModal } from "@/components/profile/teacher/modals/AddEducationModal";
import { AddExperienceModal } from "@/components/profile/teacher/modals/AddExperienceModal";
import { ChangePasswordModal } from "@/components/profile/teacher/modals/ChangePasswordModal";
import { AddCourseModal } from "@/components/profile/teacher/modals/AddCourseModal";
import { UploadPhotoModal } from "@/components/profile/teacher/modals/UploadPhotoModal";

const TeacherProfile = () => {
  // Custom hooks for state and data management
  const profile = useTeacherProfile();
  const { activeTab, setActiveTab } = useProfileTabs();
  const modals = useProfileModals();

  // Handle tab change with refetching if needed
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "education") {
      profile.refetchEducation();
    } else if (value === "experience") {
      profile.refetchExperience();
    } else if (value === "courses") {
      profile.refetchCourses();
    }
  };

  if (!profile.user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Teacher Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 mb-8">
              <ProfileSidebar 
                profileData={profile.profileData}
                setIsEditProfileOpen={modals.setIsEditProfileOpen}
                setIsUploadPhotoOpen={modals.setIsUploadPhotoOpen}
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
                    profileData={profile.profileData}
                    isLoading={profile.isProfileLoading}
                  />
                </TabsContent>

                <TabsContent value="education">
                  <EducationTabContent 
                    educationList={profile.educationList}
                    isLoading={profile.isEducationLoading}
                    setIsAddEducationOpen={modals.setIsAddEducationOpen}
                    deleteEducation={profile.deleteEducation}
                  />
                </TabsContent>
                
                <TabsContent value="experience">
                  <ExperienceTabContent 
                    experienceList={profile.experienceList}
                    isLoading={profile.isExperienceLoading}
                    setIsAddExperienceOpen={modals.setIsAddExperienceOpen}
                    deleteExperience={profile.deleteExperience}
                  />
                </TabsContent>
                
                <TabsContent value="courses">
                  <CoursesTabContent 
                    coursesList={profile.coursesList}
                    isLoading={profile.isCoursesLoading}
                    setIsAddCourseOpen={modals.setIsAddCourseOpen}
                    deleteCourse={profile.deleteCourse}
                  />
                </TabsContent>
                
                <TabsContent value="offerings">
                  <OfferingTabContent 
                    profileData={profile.profileData}
                    isLoading={profile.isProfileLoading}
                    onSaveOfferings={profile.handleSaveOfferings}
                  />
                </TabsContent>
                
                <TabsContent value="security">
                  <SecurityTabContent 
                    setIsChangePasswordOpen={modals.setIsChangePasswordOpen}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <EditProfileModal 
        isOpen={modals.isEditProfileOpen}
        onOpenChange={modals.setIsEditProfileOpen}
        formData={profile.formData}
        handleChange={profile.handleChange}
        handleProfileUpdate={profile.handleProfileUpdate}
      />

      <AddEducationModal 
        isOpen={modals.isAddEducationOpen}
        onOpenChange={modals.setIsAddEducationOpen}
        formData={profile.formData}
        handleChange={profile.handleChange}
        handleFileInputChange={profile.handleFileInputChange}
        handleAddEducation={profile.handleAddEducation}
      />

      <AddExperienceModal 
        isOpen={modals.isAddExperienceOpen}
        onOpenChange={modals.setIsAddExperienceOpen}
        formData={profile.formData}
        handleChange={profile.handleChange}
        handleAddExperience={profile.handleAddExperience}
        setFormData={profile.setFormData}
      />

      <ChangePasswordModal 
        isOpen={modals.isChangePasswordOpen}
        onOpenChange={modals.setIsChangePasswordOpen}
        formData={profile.formData}
        handleChange={profile.handleChange}
        handlePasswordChange={profile.handlePasswordChange}
      />

      <AddCourseModal 
        isOpen={modals.isAddCourseOpen}
        onOpenChange={modals.setIsAddCourseOpen}
        formData={profile.formData}
        handleChange={profile.handleChange}
        handleFileInputChange={profile.handleFileInputChange}
        handleAddCourse={profile.handleAddCourse}
        setFormData={profile.setFormData}
      />

      <UploadPhotoModal 
        isOpen={modals.isUploadPhotoOpen}
        onOpenChange={modals.setIsUploadPhotoOpen}
        formData={profile.formData}
        handleFileInputChange={profile.handleFileInputChange}
        handleProfilePicUpdate={profile.handleProfilePicUpdate}
      />

      <Footer />
    </div>
  );
};

export default TeacherProfile;
