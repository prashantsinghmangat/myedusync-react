
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, Book, FileText, LockKeyhole } from "lucide-react";
import { ProfileAvatar } from "../shared/ProfileAvatar";
import { AboutMeTab } from "./tabs/AboutMeTab";
import { AcademicsTab } from "./tabs/AcademicsTab";
import { DocumentsTab } from "./tabs/DocumentsTab";
import { SecurityTab } from "./tabs/SecurityTab";

interface StudentProfileContentProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    school: string;
    grade: string;
    bio: string;
  };
  setIsEditProfileOpen: (isOpen: boolean) => void;
  setIsChangePasswordOpen: (isOpen: boolean) => void;
}

export const StudentProfileContent = ({
  formData,
  setIsEditProfileOpen,
  setIsChangePasswordOpen
}: StudentProfileContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 mb-8">
      <Card>
        <CardContent className="pt-6 flex flex-col items-center">
          <ProfileAvatar 
            src="https://i.pravatar.cc/150?img=11"
            alt={formData.name}
            fallback={formData.name?.substring(0, 2) || "JS"}
            size="lg"
            editable={true}
          />
          <h2 className="text-xl font-semibold mt-4">{formData.name}</h2>
          <p className="text-gray-500 mb-4">{formData.grade} • {formData.school}</p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsEditProfileOpen(true)}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="about">
        <TabsList className="mb-4">
          <TabsTrigger value="about">
            <UserRound className="h-4 w-4 mr-2" />
            About
          </TabsTrigger>
          <TabsTrigger value="academics">
            <Book className="h-4 w-4 mr-2" />
            Academics
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="security">
            <LockKeyhole className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <AboutMeTab formData={formData} />
        </TabsContent>

        <TabsContent value="academics">
          <AcademicsTab formData={formData} />
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
        
        <TabsContent value="security">
          <SecurityTab setIsChangePasswordOpen={setIsChangePasswordOpen} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
