
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserRound, GraduationCap, Briefcase, BookOpen, LockKeyhole } from "lucide-react";

// Import all the tab content components
import { AboutTab } from "@/components/teacher/profile/AboutTab";
import { EducationTab } from "@/components/teacher/profile/EducationTab";
import { ExperienceTab } from "@/components/teacher/profile/ExperienceTab";
import { CoursesTab } from "@/components/teacher/profile/CoursesTab";
import { SecurityTab } from "@/components/teacher/profile/SecurityTab";

interface TabNavigationProps {
  defaultValue: string;
  onTabChange: (value: string) => void;
  profileData: any;
  formData: any;
  setIsEditProfileOpen: (isOpen: boolean) => void;
  setIsAddEducationOpen: (isOpen: boolean) => void;
  setIsAddExperienceOpen: (isOpen: boolean) => void;
  setIsChangePasswordOpen: (isOpen: boolean) => void;
}

export const TabNavigation = ({ 
  defaultValue, 
  onTabChange, 
  profileData, 
  formData,
  setIsEditProfileOpen,
  setIsAddEducationOpen,
  setIsAddExperienceOpen,
  setIsChangePasswordOpen
}: TabNavigationProps) => {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-4 w-full justify-start overflow-x-auto">
        <TabsTrigger value="about" className="px-4">
          <UserRound className="h-4 w-4 mr-2" />
          About
        </TabsTrigger>
        <TabsTrigger value="education" className="px-4">
          <GraduationCap className="h-4 w-4 mr-2" />
          Education
        </TabsTrigger>
        <TabsTrigger value="experience" className="px-4">
          <Briefcase className="h-4 w-4 mr-2" />
          Experience
        </TabsTrigger>
        <TabsTrigger value="courses" className="px-4">
          <BookOpen className="h-4 w-4 mr-2" />
          Courses
        </TabsTrigger>
        <TabsTrigger value="security" className="px-4">
          <LockKeyhole className="h-4 w-4 mr-2" />
          Security
        </TabsTrigger>
      </TabsList>

      <TabsContent value="about">
        <AboutTab profileData={profileData} formData={formData} />
      </TabsContent>

      <TabsContent value="education">
        <EducationTab setIsAddEducationOpen={setIsAddEducationOpen} />
      </TabsContent>
      
      <TabsContent value="experience">
        <ExperienceTab setIsAddExperienceOpen={setIsAddExperienceOpen} />
      </TabsContent>
      
      <TabsContent value="courses">
        <CoursesTab />
      </TabsContent>
      
      <TabsContent value="security">
        <SecurityTab setIsChangePasswordOpen={setIsChangePasswordOpen} />
      </TabsContent>
    </Tabs>
  );
};
