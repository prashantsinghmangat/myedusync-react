
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui";
import { Briefcase } from "lucide-react";

interface Experience {
  _id: string;
  organisationName: string;
  designation: string;
  type: string;
  startTime: string;
  endTime: string;
}

interface ExperienceTabProps {
  experience: Experience[];
}

export const ExperienceTab = ({ experience }: ExperienceTabProps) => {
  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-[#f57e2c]" />
          Professional Experience
        </CardTitle>
        <CardDescription>
          Work and teaching experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        {experience.length > 0 ? (
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-[#f57e2c]"></div>
                <div className="mb-1 text-lg font-medium">{exp.organisationName}</div>
                <div className="mb-2 text-gray-600 dark:text-gray-400">
                  {exp.designation} • {exp.type}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  {formatDate(exp.startTime)} - {exp.endTime ? formatDate(exp.endTime) : 'Present'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No experience details available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
