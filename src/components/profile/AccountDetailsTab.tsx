
import { useState } from "react";
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
  const { data: profileData } = useQuery({
    queryKey: ["tutorProfile"],
    queryFn: async () => (await fetchWithInterceptor(API_ENDPOINTS.tutors.getTutorProfile, { requiresAuth: true })).json()
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
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image & Name */}
          <div className="flex flex-col items-center md:items-start relative">
            <Avatar className="h-28 w-28 border-2 border-gray-300">
              <AvatarImage src={profileData?.data?.profilePic} alt={profileData?.data?.name} />
              <AvatarFallback>{profileData?.data?.name?.[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-semibold mt-4 text-center md:text-left">{profileData?.data?.name}</h2>
            <p className="text-muted-foreground text-sm text-center md:text-left">{profileData?.data?.currentDesignation}</p>
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
              <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.emailId}</p>
            </div>
            <div>
              <Label className="font-semibold">Phone</Label>
              <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.phoneNumber}</p>
            </div>
            <div>
              <Label className="font-semibold">Location</Label>
              <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.location}</p>
            </div>
            <div>
              <Label className="font-semibold">Role</Label>
              <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.role}</p>
            </div>
            <div className="sm:col-span-2">
              <Label className="font-semibold">Short Bio</Label>
              <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.shortBio}</p>
            </div>
            <div className="sm:col-span-2">
              <Label className="font-semibold">About Me</Label>
              <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.aboutMe}</p>
            </div>
            <div className="sm:col-span-2">
              <Label className="font-semibold">Skills</Label>
              <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.skills}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
