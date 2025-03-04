
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

interface UploadPhotoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    profilePic: string;
  };
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePic' | 'courseThumbnail' | 'credentialUrl') => void;
  handleProfilePicUpdate: (e: React.FormEvent) => void;
}

export const UploadPhotoModal = ({
  isOpen,
  onOpenChange,
  formData,
  handleFileInputChange,
  handleProfilePicUpdate
}: UploadPhotoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            Upload a new profile picture
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleProfilePicUpdate}>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Select Image</Label>
              <div className="mt-1 flex items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, 'profilePic')}
                  className="flex-1"
                />
              </div>
              {formData.profilePic && (
                <div className="mt-4 flex justify-center">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                    <AvatarImage src={formData.profilePic} />
                    <AvatarFallback>
                      <UserRound className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!formData.profilePic}>
              Update Photo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
