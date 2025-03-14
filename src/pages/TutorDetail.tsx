
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLoading } from "@/providers/LoadingProvider";
import { apiGet } from "@/utils/apiInterceptor";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";
import { CourseDetail, Education, Experience } from "@/types/courses";

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
  Award
} from "lucide-react";

const TutorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { setIsLoading } = useLoading();
  const [tutorProfile, setTutorProfile] = useState<CourseDetail | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactMode, setContactMode] = useState<'message' | 'call' | null>(null);

  useEffect(() => {
    const fetchTutorProfile = async () => {
      if (!id) return;
      
      setLoading(true);
      setIsLoading(true);
      
      try {
        // Fetch tutor profile
        const response = await apiGet(`${API_ENDPOINTS.tutors.detail(id)}`);
        const profileData = await response.json();
        
        if (profileData && profileData.data) {
          setTutorProfile(profileData.data);
        } else {
          toast.error("Failed to load tutor profile");
        }
        
      } catch (error) {
        console.error("Error fetching tutor data:", error);
        toast.error("Error loading tutor details. Please try again.");
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchTutorProfile();
  }, [id, setIsLoading]);

  const handleContact = (mode: 'message' | 'call') => {
    setContactMode(mode);
    toast.success(`You'll be connected with the tutor soon via ${mode === 'message' ? 'message' : 'call'}.`);
    
    // In a real app, we'd send a request to the backend
    setTimeout(() => setContactMode(null), 2000);
  };

  return (
    <>
      <SEO
        title={tutorProfile ? `${tutorProfile.name} - Tutor Profile` : "Tutor Profile"}
        description={tutorProfile?.aboutMe || "View detailed information about this tutor."}
      />
      <Header />
      <main className="py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {loading ? (
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
                  
                  {/* Course Info Card */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Course Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Subject:</span>
                          <span className="font-medium">{tutorProfile.subject}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Board:</span>
                          <span className="font-medium">{tutorProfile.board}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Class:</span>
                          <span className="font-medium">{tutorProfile.className}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Mode:</span>
                          <div className="flex items-center">
                            {tutorProfile.mode === 'Online' ? (
                              <Video className="mr-1 h-4 w-4 text-green-500" />
                            ) : tutorProfile.mode === 'Hybrid' ? (
                              <Globe className="mr-1 h-4 w-4 text-blue-500" />
                            ) : (
                              <MapPin className="mr-1 h-4 w-4 text-orange-500" />
                            )}
                            <span className="font-medium">{tutorProfile.mode}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Sessions/Week:</span>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-blue-500" />
                            <span className="font-medium">{tutorProfile.weeklySessions}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Duration/Session:</span>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-purple-500" />
                            <span className="font-medium">60 min</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Language:</span>
                          <span className="font-medium">{tutorProfile.language || "English"}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-lg font-medium">Fee:</span>
                          <span className="text-lg font-bold text-[#f57e2c]">
                            {tutorProfile.costPerSessions} {tutorProfile.currency}
                            <span className="text-sm font-normal text-gray-500">/session</span>
                          </span>
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
                              {tutorProfile.aboutMe || "No bio provided yet."}
                            </p>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-2">About This Course</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                              {tutorProfile.aboutThisCourse || "No course description provided yet."}
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
                          {education.length > 0 ? (
                            <div className="space-y-6">
                              {education.map((edu, index) => (
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
                          {experience.length > 0 ? (
                            <div className="space-y-6">
                              {experience.map((exp, index) => (
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
              
              {/* Related Tutors */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Other Tutors You Might Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={`https://images.unsplash.com/photo-${i === 1 ? '1568602471122-7832951cc4c5' : i === 2 ? '1544005313-94ddf0286df2' : '1573496359142-b8d87734a5a2'}?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80`}
                          alt="Tutor" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-1">
                          {i === 1 ? 'Math Tutor' : i === 2 ? 'Science Expert' : 'English Specialist'}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                          {i === 1 ? 'CBSE, Class 10' : i === 2 ? 'ICSE, Class 12' : 'CBSE, Class 8'}
                        </p>
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          ))}
                          <span className="text-xs ml-1">5.0</span>
                        </div>
                        <Button variant="orange" size="sm" className="w-full" asChild>
                          <Link to={`/tutor/${i}`}>View Profile</Link>
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

export default TutorDetail;
