
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { Course } from "@/types/courses";

interface TutorCardProps {
  tutor: Course;
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

  // Function to get a random tutor image
  const getRandomTutorImage = (idx: number) => {
    return tutorImages[idx % tutorImages.length];
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={tutor.courseThumbnail || getRandomTutorImage(index)} 
          alt={tutor.subject} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 m-2 bg-primary text-white px-2 py-1 rounded text-sm">
          {tutor.mode}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{tutor.subject}</span>
          <span className="text-accent">{tutor.costPerSessions} {tutor.currency}</span>
        </CardTitle>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center mr-4">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span>4.8</span>
          </div>
          {tutor.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
              <span>{tutor.location}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Board:</span>
            <span className="font-medium">{tutor.board}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Class:</span>
            <span className="font-medium">{tutor.className}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Sessions/Week:</span>
            <span className="font-medium">{tutor.weeklySessions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Language:</span>
            <span className="font-medium">{tutor.language || "English"}</span>
          </div>
        </div>
        
        {tutor.aboutThisCourse && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-2">About this course:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{tutor.aboutThisCourse}</p>
          </div>
        )}
        
        <Button 
          variant="orange" 
          className="w-full mt-4"
          onClick={() => navigate(`/tutor/${tutor._id}`)}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};
