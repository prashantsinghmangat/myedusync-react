
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface AboutTabProps {
  profileData: any;
  formData: any;
}

export const AboutTab = ({ profileData, formData }: AboutTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label className="text-sm text-gray-500">Full Name</Label>
            <p className="font-medium">{profileData?.name || formData.name}</p>
          </div>
          <div>
            <Label className="text-sm text-gray-500">Email</Label>
            <p className="font-medium">{profileData?.emailId || formData.email}</p>
          </div>
          <div>
            <Label className="text-sm text-gray-500">Phone</Label>
            <p className="font-medium">{profileData?.phoneNumber || formData.phone}</p>
          </div>
          <div>
            <Label className="text-sm text-gray-500">Location</Label>
            <p className="font-medium">{profileData?.location || formData.location}</p>
          </div>
        </div>
        <div className="mb-6">
          <Label className="text-sm text-gray-500">Bio</Label>
          <p className="mt-1">{profileData?.aboutMe || formData.bio || "No bio provided yet."}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Skills</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {(profileData?.skills || formData.skills || "Mathematics,Physics,Chemistry,Biology").split(',').map((skill: string, index: number) => (
              <span 
                key={index} 
                className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
