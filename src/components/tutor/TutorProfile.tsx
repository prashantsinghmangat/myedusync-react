
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui";

import { AboutTab } from "./tabs/AboutTab";
import { EducationTab } from "./tabs/EducationTab";
import { ExperienceTab } from "./tabs/ExperienceTab";
import { CoursesTab } from "./tabs/CoursesTab";
import { ReviewsTab } from "./tabs/ReviewsTab";

interface TutorProfileProps {
  tutorProfile: any; // Using any here to match the existing code pattern
}

export const TutorProfile = ({ tutorProfile }: TutorProfileProps) => {
  return (
    <Tabs defaultValue="about">
      <TabsList className="w-full">
        <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
        <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
        <TabsTrigger value="experience" className="flex-1">Experience</TabsTrigger>
        <TabsTrigger value="courses" className="flex-1">Courses</TabsTrigger>
        <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
      </TabsList>
      
      {/* About Tab */}
      <TabsContent value="about" className="pt-6">
        <AboutTab tutorProfile={tutorProfile} />
      </TabsContent>
      
      {/* Education Tab */}
      <TabsContent value="education" className="pt-6">
        <EducationTab education={tutorProfile.education || []} />
      </TabsContent>
      
      {/* Experience Tab */}
      <TabsContent value="experience" className="pt-6">
        <ExperienceTab experience={tutorProfile.experience || []} />
      </TabsContent>
      
      {/* Courses Tab */}
      <TabsContent value="courses" className="pt-6">
        <CoursesTab courses={tutorProfile.course || []} />
      </TabsContent>
      
      {/* Reviews Tab */}
      <TabsContent value="reviews" className="pt-6">
        <ReviewsTab />
      </TabsContent>
    </Tabs>
  );
};
