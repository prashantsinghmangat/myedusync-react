
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, BookOpen, GraduationCap, Briefcase } from "lucide-react";
import { Tutor } from "./TutorGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TutorCardProps {
  tutor: Tutor;
  index: number;
}

export const TutorCard = ({ tutor, index }: TutorCardProps) => {
  const navigate = useNavigate();
  
  const tutorImages = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  ];

  const getRandomTutorImage = (idx: number) => {
    return tutorImages[idx % tutorImages.length];
  };
  
  // Format subjects, classes, and boards as arrays if they exist
  const subjects = tutor.subjects?.split(',').map(s => s.trim()) || [];
  const classes = tutor.classes?.split(',').map(c => c.trim()) || [];
  const boards = tutor.boards?.split(',').map(b => b.trim()) || [];
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tutor.profilePic || getRandomTutorImage(index)}
          alt={tutor.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getRandomTutorImage(index);
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-xl">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border-2 border-accent">
              <AvatarImage src={tutor.profilePic} />
              <AvatarFallback>{tutor.name?.[0] || "T"}</AvatarFallback>
            </Avatar>
            <span>{tutor.name}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm">4.8</span>
          </div>
        </CardTitle>
        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
          <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
          <span>{tutor.currentDesignation}</span>
        </div>
        {tutor.location && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
            <span>{tutor.location}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {tutor.shortBio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {tutor.shortBio}
          </p>
        )}
        
        <div className="space-y-3 mb-4">
          {subjects.length > 0 && (
            <div className="flex items-start">
              <BookOpen className="h-4 w-4 text-accent mt-1 mr-2" />
              <div>
                <span className="text-sm font-medium block mb-1">Subjects:</span>
                <div className="flex flex-wrap gap-1">
                  {subjects.map((subject, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {classes.length > 0 && (
            <div className="flex items-start">
              <GraduationCap className="h-4 w-4 text-accent mt-1 mr-2" />
              <div>
                <span className="text-sm font-medium block mb-1">Classes:</span>
                <div className="flex flex-wrap gap-1">
                  {classes.map((cls, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      Class {cls}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {boards.length > 0 && (
            <div className="flex items-start">
              <BookOpen className="h-4 w-4 text-accent mt-1 mr-2" />
              <div>
                <span className="text-sm font-medium block mb-1">Boards:</span>
                <div className="flex flex-wrap gap-1">
                  {boards.map((board, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {board}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {tutor.skills && (
            <div className="flex items-start">
              <Briefcase className="h-4 w-4 text-accent mt-1 mr-2" />
              <div>
                <span className="text-sm font-medium block mb-1">Skills:</span>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {tutor.skills}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          variant="orange" 
          className="w-full mt-2"
          onClick={() => navigate(`/tutor/${tutor._id}`)}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};
