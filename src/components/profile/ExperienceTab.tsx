
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from '@/config/api';
import { fetchWithInterceptor } from "@/utils/apiInterceptor";

interface ExperienceTabProps {
  setOpenModal: (modal: "profile" | "education" | "experience" | "updateProfileImg" | null) => void;
}

export const ExperienceTab = ({ setOpenModal }: ExperienceTabProps) => {
  const { data: experienceList = [] } = useQuery({
    queryKey: ["tutorExperience"],
    queryFn: async () => {
      const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.experienceList, { requiresAuth: true });
      return (await response.json())?.data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Experience</CardTitle>
          <Button onClick={() => setOpenModal("experience")}>Add Experience</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {experienceList.length > 0 ? (
            experienceList.map((experience: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold">{experience.organisationName}</h3>
                <p className="text-muted-foreground">{experience.designation}</p>
                <p className="text-sm text-gray-600">{experience.type}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    {new Date(experience.startTime).toLocaleDateString()} -{" "}
                    {new Date(experience.endTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No work experience available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
