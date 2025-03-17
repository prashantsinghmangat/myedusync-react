
import { useState } from 'react';
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  Avatar, 
  AvatarImage, 
  AvatarFallback,
  Button,
  Badge
} from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Star 
} from "lucide-react";

interface TutorSidebarProps {
  tutorProfile: any; // Using any here to match the existing code pattern
}

export const TutorSidebar = ({ tutorProfile }: TutorSidebarProps) => {
  const [contactMode, setContactMode] = useState<'message' | 'call' | null>(null);

  const handleContact = (mode: 'message' | 'call') => {
    setContactMode(mode);
    toast.success(`You'll be connected with ${tutorProfile?.name || 'the tutor'} soon via ${mode === 'message' ? 'message' : 'call'}.`);
    
    // In a real app, we'd send a request to the backend
    setTimeout(() => setContactMode(null), 2000);
  };

  // Format arrays of skills, boards, classes and subjects for display
  const skillsArray = tutorProfile?.skills ? tutorProfile.skills.split(',').map((s: string) => s.trim()) : [];
  const boardsArray = tutorProfile?.boards ? tutorProfile.boards.split(',').map((b: string) => b.trim()) : [];
  const classesArray = tutorProfile?.classes ? tutorProfile.classes.split(',').map((c: string) => c.trim()) : [];
  const subjectsArray = tutorProfile?.subjects ? tutorProfile.subjects.split(',').map((s: string) => s.trim()) : [];

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="h-36 w-36 mb-4">
              <AvatarImage src={tutorProfile.profilePic} alt={tutorProfile.name} />
              <AvatarFallback>{tutorProfile.name?.[0] || "T"}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{tutorProfile.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{tutorProfile.currentDesignation}</p>
            
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="ml-2 text-sm text-gray-500">5.0</span>
            </div>
          </div>
          
          {/* Contact Buttons */}
          <div className="space-y-3">
            <Button 
              variant="orange" 
              className="w-full"
              onClick={() => handleContact('message')}
              disabled={contactMode === 'message'}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {contactMode === 'message' ? 'Sending request...' : 'Message Tutor'}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleContact('call')}
              disabled={contactMode === 'call'}
            >
              <Phone className="mr-2 h-4 w-4" />
              {contactMode === 'call' ? 'Requesting call...' : 'Schedule a Call'}
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="mt-6 space-y-3 text-sm">
            <Separator />
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Mail className="mr-3 h-4 w-4" />
              <span>contact@myedusync.com</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Phone className="mr-3 h-4 w-4" />
              <span>+91 99XXXXXXXX</span>
            </div>
            {tutorProfile.location && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="mr-3 h-4 w-4" />
                <span>{tutorProfile.location}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Expertise Card */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Expertise</h3>
          <div className="space-y-4">
            {skillsArray.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {boardsArray.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Boards</h4>
                <div className="flex flex-wrap gap-2">
                  {boardsArray.map((board: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                      {board}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {classesArray.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Classes</h4>
                <div className="flex flex-wrap gap-2">
                  {classesArray.map((cls: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                      Class {cls}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {subjectsArray.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {subjectsArray.map((subject: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
