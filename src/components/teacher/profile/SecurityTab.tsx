
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";

interface SecurityTabProps {
  setIsChangePasswordOpen: (isOpen: boolean) => void;
}

export const SecurityTab = ({ setIsChangePasswordOpen }: SecurityTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <LockKeyhole className="h-5 w-5 mr-2 text-gray-500" />
              Password
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              It's a good idea to use a strong password that you don't use elsewhere
            </p>
            <Button 
              variant="outline"
              onClick={() => setIsChangePasswordOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
