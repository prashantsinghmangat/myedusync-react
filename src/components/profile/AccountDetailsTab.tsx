
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from '@/config/api';
import { fetchWithInterceptor } from "@/utils/apiInterceptor";

interface AccountDetailsTabProps {
  setOpenModal: (modal: "profile" | "education" | "experience" | "updateProfileImg" | null) => void;
}

export const AccountDetailsTab = ({ setOpenModal }: AccountDetailsTabProps) => {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["tutorProfile"],
    queryFn: async () => {
      const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.getTutorProfile, { requiresAuth: true });
      return (await response.json())?.data;
    }
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Account Details</CardTitle>
          <Button onClick={() => setOpenModal("profile")}>Update Profile</Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image & Name */}
            <div className="flex flex-col items-center md:items-start relative">
              <Avatar className="h-28 w-28 border-2 border-gray-300">
                <AvatarImage src={profileData?.profilePic} alt={profileData?.name} />
                <AvatarFallback>{profileData?.name?.[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold mt-4 text-center md:text-left">{profileData?.name}</h2>
              <p className="text-muted-foreground text-sm text-center md:text-left">{profileData?.currentDesignation}</p>
              <button
                className="absolute top-0 right-0 bg-gray-200 p-1 rounded-full shadow-md hover:bg-gray-300"
                onClick={() => setOpenModal("updateProfileImg")}
              >
                ✏️
              </button>
            </div>

            {/* Grid Layout for Account Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-sm text-gray-700">
              <div>
                <Label className="font-semibold">Email</Label>
                <p className="bg-gray-100 p-2 rounded-md">{profileData?.emailId}</p>
              </div>
              <div>
                <Label className="font-semibold">Phone</Label>
                <p className="bg-gray-100 p-2 rounded-md">{profileData?.phoneNumber}</p>
              </div>
              <div>
                <Label className="font-semibold">Location</Label>
                <p className="bg-gray-100 p-2 rounded-md">{profileData?.location}</p>
              </div>
              <div>
                <Label className="font-semibold">Role</Label>
                <p className="bg-gray-100 p-2 rounded-md">{profileData?.role}</p>
              </div>
              <div className="sm:col-span-2">
                <Label className="font-semibold">Short Bio</Label>
                <p className="bg-gray-100 p-2 rounded-md">{profileData?.shortBio || "No short bio available"}</p>
              </div>
              <div className="sm:col-span-2">
                <Label className="font-semibold">About Me</Label>
                <p className="bg-gray-100 p-2 rounded-md">{profileData?.aboutMe || "No about me information available"}</p>
              </div>
              <div className="sm:col-span-2">
                <Label className="font-semibold">Skills</Label>
                <p className="bg-gray-100 p-2 rounded-md">{profileData?.skills || "No skills listed"}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
