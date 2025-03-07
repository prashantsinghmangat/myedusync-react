
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLoading } from "@/providers/LoadingProvider";
import { apiGet } from "@/utils/apiInterceptor";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  Globe, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Star, 
  Video, 
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  AlertTriangle,
  Check
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';

interface TutorEducation {
  _id: string;
  instituteName: string;
  courseName: string;
  fieldOfStudy: string;
  startTime: string;
  endTime: string;
  grade: string;
  credentialUrl: string;
}

interface TutorExperience {
  _id: string;
  organisationName: string;
  designation: string;
  type: string;
  startTime: string;
  endTime: string;
}

interface TutorCourse {
  _id: string;
  subject: string;
  board: string;
  className: string;
  weeklySessions: string;
  costPerSessions: string;
  currency: string;
  courseThumbnail: string;
  language: string;
  mode: string;
}

interface TutorProfile {
  _id: string;
  name: string;
  location: string;
  profilePic: string;
  currentDesignation: string;
  shortBio?: string;
  aboutMe: string;
  skills: string;
  boards: string;
  classes: string;
  subjects: string;
  education: TutorEducation[];
  experience: TutorExperience[];
  course: TutorCourse[];
}

const TutorDetailNew = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const [contactMode, setContactMode] = useState<'message' | 'call' | null>(null);

  const tutorId = id || "67264f27f9dbdb4f90c7a062"; // Default to the provided tutor ID if none in URL

  // Use React Query to fetch tutor profile
  const { data: tutorResponse, isLoading, error } = useQuery({
    queryKey: ['tutorProfile', tutorId],
    queryFn: async () => {
      try {
        const response = await apiGet(`${API_ENDPOINTS.tutors.getTutorProfile}/${tutorId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching tutor data:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });

  // Extract tutor profile data safely
  const tutorProfile: TutorProfile | null = tutorResponse?.isSuccess ? tutorResponse.data : null;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const handleContact = (mode: 'message' | 'call') => {
    setContactMode(mode);
    toast.success(`You'll be connected with ${tutorProfile?.name || 'the tutor'} soon via ${mode === 'message' ? 'message' : 'call'}.`);
    
    // In a real app, we'd send a request to the backend
    setTimeout(() => setContactMode(null), 2000);
  };

  // Format arrays of skills, boards, classes and subjects for display
  const skillsArray = tutorProfile?.skills ? tutorProfile.skills.split(',').map(s => s.trim()) : [];
  const boardsArray = tutorProfile?.boards ? tutorProfile.boards.split(',').map(b => b.trim()) : [];
  const classesArray = tutorProfile?.classes ? tutorProfile.classes.split(',').map(c => c.trim()) : [];
  const subjectsArray = tutorProfile?.subjects ? tutorProfile.subjects.split(',').map(s => s.trim()) : [];

  if (error) {
    return (
      <>
        <SEO
          title="Tutor Not Found"
          description="The tutor profile you're looking for could not be found."
        />
        <Header />
        <main className="py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Tutor Profile Unavailable</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We couldn't load this tutor's profile. It may have been removed or there's a temporary issue.
            </p>
            <Button onClick={() => navigate('/tutor-finder')} variant="default">
              Browse Available Tutors
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={tutorProfile ? `${tutorProfile.name} - Tutor Profile` : "Tutor Profile"}
        description={tutorProfile?.shortBio || tutorProfile?.aboutMe || "View detailed information about this tutor."}
      />
      <Header />
      <main className="py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 animate-pulse">
                <div className="md:w-1/3">
                  <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="md:w-2/3">
                  <div className="h-12 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : tutorProfile ? (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
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
                    <CardHeader>
                      <CardTitle className="text-xl">Expertise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {skillsArray.map((skill, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Boards</h4>
                          <div className="flex flex-wrap gap-2">
                            {boardsArray.map((board, index) => (
                              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                {board}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Classes</h4>
                          <div className="flex flex-wrap gap-2">
                            {classesArray.map((cls, index) => (
                              <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                                Class {cls}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Subjects</h4>
                          <div className="flex flex-wrap gap-2">
                            {subjectsArray.map((subject, index) => (
                              <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Tabs Section */}
                <div className="md:w-2/3">
                  <Tabs defaultValue="about">
                    <TabsList className="w-full">
                      <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                      <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
                      <TabsTrigger value="experience" className="flex-1">Experience</TabsTrigger>
                      <TabsTrigger value="courses" className="flex-1">Courses</TabsTrigger>
                      <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                    </TabsList>
                    
                    {/* About Tab */}
                    <TabsContent value="about" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>About {tutorProfile.name}</CardTitle>
                          <CardDescription>
                            {tutorProfile.currentDesignation} with a passion for teaching
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-2">Bio</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                              {tutorProfile.aboutMe}
                            </p>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-2">Teaching Approach</h3>
                            <div className="space-y-2">
                              <div className="flex items-start">
                                <div className="bg-[#f57e2c]/10 p-2 rounded-full mr-3">
                                  <BookOpen className="h-5 w-5 text-[#f57e2c]" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Personalized Learning</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Tailored approach to meet individual student needs and learning pace.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="bg-[#f57e2c]/10 p-2 rounded-full mr-3">
                                  <Video className="h-5 w-5 text-[#f57e2c]" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Interactive Sessions</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Engaging learning experience with practical examples and real-world applications.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="bg-[#f57e2c]/10 p-2 rounded-full mr-3">
                                  <Award className="h-5 w-5 text-[#f57e2c]" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Result-Oriented</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Focus on achieving academic goals and building strong foundations.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    {/* Education Tab */}
                    <TabsContent value="education" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <GraduationCap className="mr-2 h-5 w-5 text-[#f57e2c]" />
                            Education
                          </CardTitle>
                          <CardDescription>
                            Academic qualifications and certifications
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {tutorProfile.education && tutorProfile.education.length > 0 ? (
                            <div className="space-y-6">
                              {tutorProfile.education.map((edu, index) => (
                                <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0">
                                  <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-[#f57e2c]"></div>
                                  <div className="mb-1 text-lg font-medium">{edu.instituteName}</div>
                                  <div className="mb-2 text-gray-600 dark:text-gray-400">
                                    {edu.courseName}, {edu.fieldOfStudy}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                                    {edu.startTime} - {edu.endTime || 'Present'}
                                  </div>
                                  {edu.grade && (
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      Grade: <span className="font-medium">{edu.grade}</span>
                                    </div>
                                  )}
                                  {edu.credentialUrl && (
                                    <div className="mt-2">
                                      <a 
                                        href={edu.credentialUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[#f57e2c] hover:underline text-sm inline-flex items-center"
                                      >
                                        View Credential
                                        <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                      </a>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No education details available
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    {/* Experience Tab */}
                    <TabsContent value="experience" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Briefcase className="mr-2 h-5 w-5 text-[#f57e2c]" />
                            Professional Experience
                          </CardTitle>
                          <CardDescription>
                            Work and teaching experience
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {tutorProfile.experience && tutorProfile.experience.length > 0 ? (
                            <div className="space-y-6">
                              {tutorProfile.experience.map((exp, index) => (
                                <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0">
                                  <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-[#f57e2c]"></div>
                                  <div className="mb-1 text-lg font-medium">{exp.organisationName}</div>
                                  <div className="mb-2 text-gray-600 dark:text-gray-400">
                                    {exp.designation} • {exp.type}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-500">
                                    {exp.startTime} - {exp.endTime || 'Present'}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No experience details available
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    {/* Courses Tab */}
                    <TabsContent value="courses" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BookOpen className="mr-2 h-5 w-5 text-[#f57e2c]" />
                            Courses Offered
                          </CardTitle>
                          <CardDescription>
                            Subjects and classes taught by this tutor
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {tutorProfile.course && tutorProfile.course.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {tutorProfile.course.map((course, index) => (
                                <Card key={index} className="overflow-hidden">
                                  <div className="h-40 bg-gray-100 relative">
                                    <img
                                      src={course.courseThumbnail || "https://via.placeholder.com/400x200?text=Course+Image"}
                                      alt={course.subject}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold">
                                      {course.subject}
                                    </div>
                                  </div>
                                  <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-lg">{course.subject}</CardTitle>
                                    <CardDescription className="flex items-center flex-wrap gap-2">
                                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                                        {course.board}
                                      </span>
                                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                                        Class {course.className}
                                      </span>
                                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
                                        {course.language}
                                      </span>
                                      <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
                                        {course.mode}
                                      </span>
                                    </CardDescription>
                                  </CardHeader>
                                  <CardFooter className="p-4 pt-2 flex justify-between items-center">
                                    <div>
                                      <p className="text-gray-600 text-sm">
                                        <Clock className="inline-block w-3 h-3 mr-1" />
                                        {course.weeklySessions} sessions/week
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-[#f57e2c] font-bold">
                                        {course.costPerSessions} {course.currency}
                                        <span className="text-xs font-normal text-gray-500">/session</span>
                                      </p>
                                    </div>
                                  </CardFooter>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No courses available at this time
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    {/* Reviews Tab */}
                    <TabsContent value="reviews" className="pt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Star className="mr-2 h-5 w-5 text-yellow-500 fill-yellow-500" />
                            Student Reviews
                          </CardTitle>
                          <CardDescription>
                            What students are saying
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8">
                            <div className="text-7xl font-bold text-gray-800 dark:text-white">5.0</div>
                            <div className="flex justify-center my-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                            <div className="text-gray-500 mb-6">Based on recent reviews</div>
                            
                            <div className="text-center">
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                No reviews yet. Be the first to leave a review after booking a session.
                              </p>
                              <Button variant="outline">
                                Write a Review
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              {/* Related Courses Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Recommended Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tutorProfile.course && tutorProfile.course.slice(0, 3).map((course, i) => (
                    <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.courseThumbnail || "https://via.placeholder.com/400x200?text=Course+Image"}
                          alt={course.subject} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-1">{course.subject}</h3>
                        <p className="text-gray-500 text-sm mb-2">
                          {course.board}, Class {course.className}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-600">
                            <Clock className="inline-block w-3 h-3 mr-1" />
                            {course.weeklySessions} sessions/week
                          </span>
                          <span className="text-[#f57e2c] font-bold">
                            {course.costPerSessions} {course.currency}
                          </span>
                        </div>
                        <Button variant="orange" size="sm" className="w-full">
                          View Course
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Tutor not found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find the tutor you're looking for. They may have removed their profile.
              </p>
              <Button variant="orange" asChild>
                <Link to="/tutor-finder">Browse All Tutors</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TutorDetailNew;
