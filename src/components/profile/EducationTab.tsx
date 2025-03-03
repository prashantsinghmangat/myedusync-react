
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from '@/config/api';
import { fetchWithInterceptor } from "@/utils/apiInterceptor";

interface EducationTabProps {
  setOpenModal: (modal: "profile" | "education" | "experience" | "updateProfileImg" | null) => void;
}

export const EducationTab = ({ setOpenModal }: EducationTabProps) => {
  const { data: educationList = [] } = useQuery({
    queryKey: ["tutorEducation"],
    queryFn: async () => {
      const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.educationList, { requiresAuth: true });
      return (await response.json())?.data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={() => setOpenModal("education")}>Add Education</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {educationList.length > 0 ? (
            educationList.map((education: any, index: number) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-md bg-white flex flex-col md:flex-row gap-6"
              >
                {/* Left: Text Details */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-semibold text-primary">{education.instituteName}</h3>
                  <p className="text-muted-foreground text-sm">{education.courseName} - {education.fieldOfStudy}</p>

                  {/* Grid Layout for Additional Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    <p><strong>Grade:</strong> {education.grade}</p>
                    <p><strong>Start Date:</strong> {new Date(education.startTime).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(education.endTime).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Right: Certificate Image */}
                {education.credentialUrl && (
                  <div className="flex-shrink-0">
                    <p className="font-semibold text-gray-800">Certificate:</p>
                    <a href={education.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={education.credentialUrl}
                        alt="Certificate"
                        className="mt-2 w-40 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                      />
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No education history available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
