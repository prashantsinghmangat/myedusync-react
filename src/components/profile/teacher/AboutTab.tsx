
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ProfileInfoItem } from "../shared/ProfileInfoItem";

interface AboutTabProps {
  profileData: any;
  isLoading: boolean;
}

export const AboutTab = ({ profileData, isLoading }: AboutTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ProfileInfoItem
                label="Full Name"
                value={profileData?.data?.name}
              />
              <ProfileInfoItem
                label="Email"
                value={profileData?.data?.emailId}
              />
              <ProfileInfoItem
                label="Phone"
                value={profileData?.data?.phoneNumber}
              />
              <ProfileInfoItem
                label="Location"
                value={profileData?.data?.location}
              />
            </div>
            <ProfileInfoItem
              label="Bio"
              value={profileData?.data?.aboutMe}
              className="mb-6"
            />
            <div>
              <Label className="text-sm text-gray-500">Skills</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {(profileData?.data?.skills || "Mathematics,Physics,Chemistry,Biology")
                  .split(',')
                  .map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
