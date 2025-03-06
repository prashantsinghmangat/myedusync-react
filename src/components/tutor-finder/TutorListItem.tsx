import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, BookOpen, GraduationCap, Briefcase, Clock } from "lucide-react";
import { Tutor } from "./TutorGrid";
import { Badge } from "@/components/ui/badge";
import { generateStructuredData } from "@/utils/seo";

interface TutorListItemProps {
  tutor: Tutor;
  index: number;
}

export const TutorListItem = ({ tutor, index }: TutorListItemProps) => {
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
  
  // Generate hourly rate display
  const hourlyRate = tutor.hourlyRate || '₹500-₹1000';
  
  // Generate structured data for this tutor
  const tutorStructuredData = generateStructuredData('Person', {
    name: tutor.name,
    jobTitle: tutor.currentDesignation,
    description: tutor.shortBio || `${tutor.name} is a tutor specializing in ${subjects.join(', ')}`,
    image: tutor.profilePic || getRandomTutorImage(index),
    knowsAbout: subjects
  });

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-52 overflow-hidden">
          <img 
            src={tutor.profilePic || getRandomTutorImage(index)}
            alt={`Tutor ${tutor.name}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getRandomTutorImage(index);
            }}
          />
        </div>
        
        <div className="flex-1 p-5">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold">{tutor.name}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                <span>{tutor.currentDesignation}</span>
              </div>
              {tutor.location && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{tutor.location}</span>
                </div>
              )}
              {tutor.responseTime && (
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Responds quickly</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-end mt-2 md:mt-0">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {hourlyRate}
                <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/hr</span>
              </div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium">{tutor.rating || 4.8}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  ({tutor.reviewCount || 0} reviews)
                </span>
              </div>
              {tutor.lessonsCompleted && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {tutor.lessonsCompleted} lessons
                </div>
              )}
            </div>
          </div>
          
          {tutor.shortBio && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
              {tutor.shortBio}
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {subjects.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Subjects:</span>
                <div className="flex flex-wrap gap-1">
                  {subjects.slice(0, 3).map((subject, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  {subjects.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{subjects.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {classes.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Classes:</span>
                <div className="flex flex-wrap gap-1">
                  {classes.slice(0, 3).map((cls, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      Class {cls}
                    </Badge>
                  ))}
                  {classes.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{classes.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {boards.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Boards:</span>
                <div className="flex flex-wrap gap-1">
                  {boards.slice(0, 3).map((board, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {board}
                    </Badge>
                  ))}
                  {boards.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{boards.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="orange" 
              className="w-full md:w-auto"
              onClick={() => navigate(`/tutor/${tutor._id}`)}
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hidden structured data for SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tutorStructuredData) }}
      />
    </Card>
  );
};