
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Star } from "lucide-react";

interface ProfileSidebarProps {
  profileData: any;
  setIsEditProfileOpen: (isOpen: boolean) => void;
  setIsUploadPhotoOpen: (isOpen: boolean) => void;
}

export const ProfileSidebar = ({
  profileData,
  setIsEditProfileOpen,
  setIsUploadPhotoOpen
}: ProfileSidebarProps) => {
  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-white shadow-md mb-4">
            <AvatarImage src={profileData?.data?.profilePic || "https://i.pravatar.cc/150?img=12"} />
            <AvatarFallback>{profileData?.data?.name?.[0] || "T"}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-4 right-0 rounded-full bg-white shadow"
            onClick={() => setIsUploadPhotoOpen(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-xl font-semibold">{profileData?.data?.name}</h2>
        <p className="text-gray-500 mb-2">{profileData?.data?.currentDesignation}</p>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" />
          ))}
          <span className="text-sm ml-1">5.0</span>
        </div>
        <Button
          variant="outline"
          className="w-full mb-2"
          onClick={() => setIsEditProfileOpen(true)}
        >
          Edit Profile
        </Button>
        <Button
          variant="outline"
          className="w-full"
        >
          Preview Public Profile
        </Button>
      </CardContent>
    </Card>
  );
};
