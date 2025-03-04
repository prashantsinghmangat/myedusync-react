
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, GraduationCap, Briefcase, BookOpen, LockKeyhole } from "lucide-react";

interface TabNavigationProps {
  defaultValue: string;
  onTabChange: (value: string) => void;
}

export const TabNavigation = ({ defaultValue, onTabChange }: TabNavigationProps) => {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onTabChange} className="mb-4">
      <TabsList className="mb-4">
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
        <TabsTrigger value="security">
          <LockKeyhole className="h-4 w-4 mr-2" />
          Security
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
