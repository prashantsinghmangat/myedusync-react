
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui";
import { ProfileInfoItem } from "../../shared/ProfileInfoItem";

interface AboutMeTabProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
  };
}

export const AboutMeTab = ({ formData }: AboutMeTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ProfileInfoItem label="Full Name" value={formData.name} />
          <ProfileInfoItem label="Email" value={formData.email} />
          <ProfileInfoItem label="Phone" value={formData.phone} />
          <ProfileInfoItem label="Location" value={formData.location} />
        </div>
        <div>
          <Label className="text-sm text-gray-500">Bio</Label>
          <p className="mt-1">{formData.bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};
