
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui";
import { 
  BookOpen, 
  Video, 
  Award
} from "lucide-react";

interface AboutTabProps {
  tutorProfile: any;
}

export const AboutTab = ({ tutorProfile }: AboutTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About {tutorProfile.name}</CardTitle>
        <CardDescription>
          {tutorProfile.currentDesignation} with a passion for teaching
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Bio</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {tutorProfile.aboutMe}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Teaching Approach</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <div className="bg-[#f57e2c]/10 p-2 rounded-full mr-3">
                <BookOpen className="h-5 w-5 text-[#f57e2c]" />
              </div>
              <div>
                <h4 className="font-medium">Personalized Learning</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tailored approach to meet individual student needs and learning pace.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#f57e2c]/10 p-2 rounded-full mr-3">
                <Video className="h-5 w-5 text-[#f57e2c]" />
              </div>
              <div>
                <h4 className="font-medium">Interactive Sessions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Engaging learning experience with practical examples and real-world applications.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#f57e2c]/10 p-2 rounded-full mr-3">
                <Award className="h-5 w-5 text-[#f57e2c]" />
              </div>
              <div>
                <h4 className="font-medium">Result-Oriented</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Focus on achieving academic goals and building strong foundations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
