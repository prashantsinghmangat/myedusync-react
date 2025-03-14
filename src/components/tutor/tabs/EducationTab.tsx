
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui";
import { GraduationCap } from "lucide-react";

interface Education {
  _id: string;
  instituteName: string;
  courseName: string;
  fieldOfStudy: string;
  startTime: string;
  endTime: string;
  grade: string;
  credentialUrl?: string;
}

interface EducationTabProps {
  education: Education[];
}

export const EducationTab = ({ education }: EducationTabProps) => {
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
          <GraduationCap className="mr-2 h-5 w-5 text-[#f57e2c]" />
          Education
        </CardTitle>
        <CardDescription>
          Academic qualifications and certifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {education.length > 0 ? (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-[#f57e2c]"></div>
                <div className="mb-1 text-lg font-medium">{edu.instituteName}</div>
                <div className="mb-2 text-gray-600 dark:text-gray-400">
                  {edu.courseName}, {edu.fieldOfStudy}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                  {formatDate(edu.startTime)} - {edu.endTime ? formatDate(edu.endTime) : 'Present'}
                </div>
                {edu.grade && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Grade: <span className="font-medium">{edu.grade}</span>
                  </div>
                )}
                {edu.credentialUrl && (
                  <div className="mt-2">
                    <a 
                      href={edu.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#f57e2c] hover:underline text-sm inline-flex items-center"
                    >
                      View Credential
                      <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No education details available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
