
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from '@/config/api';

interface Education {
  _id: {
    timestamp: number;
    counter: number;
    randomValue1: number;
    randomValue2: number;
  };
  teacherId: string;
  instituteName: string;
  courseName: string;
  fieldOfStudy: string;
  startTime: string;
  endTime: string;
  grade: string;
  credentialUrl: string;
}

interface Experience {
  _id: {
    timestamp: number;
    counter: number;
    randomValue1: number;
    randomValue2: number;
  };
  teacherId: string;
  organisationName: string;
  designation: string;
  type: string;
  startTime: string;
  endTime: string;
}

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profileData } = useQuery({
    queryKey: ['tutorProfile'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.tutors.getTutorProfile, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
  });

  const { data: educationList = [] } = useQuery({
    queryKey: ["tutorEducation"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.tutors.educationList, {
        headers: {
          'Accept': "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch education");

      const data = await response.json();
      console.log(data.data);
      return data?.data;
    },
  });


  const { data: experienceList = [] } = useQuery({
    queryKey: ["tutorExperience"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.tutors.experienceList, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch experience");

      return response.json();
    },
  });

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Password updated successfully",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Success",
      description: "You have been logged out",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-primary">Profile</h1>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </Button>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="account">Account Details</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* Profile Image & Name */}
                      <div className="flex flex-col items-center md:items-start">
                        <Avatar className="h-28 w-28 border-2 border-gray-300">
                          <AvatarImage src={profileData?.data?.profilePic} alt={profileData?.data?.name} />
                          <AvatarFallback>{profileData?.data?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-semibold mt-4 text-center md:text-left">{profileData?.data?.name}</h2>
                        <p className="text-muted-foreground text-sm text-center md:text-left">{profileData?.data?.currentDesignation}</p>
                      </div>

                      {/* Grid Layout for Account Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-sm text-gray-700">
                        <div>
                          <Label className="font-semibold">Email</Label>
                          <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.emailId}</p>
                        </div>
                        <div>
                          <Label className="font-semibold">Phone</Label>
                          <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.phoneNumber}</p>
                        </div>
                        <div>
                          <Label className="font-semibold">Location</Label>
                          <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.location}</p>
                        </div>
                        <div>
                          <Label className="font-semibold">Role</Label>
                          <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.role}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="font-semibold">Short Bio</Label>
                          <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.shortBio}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="font-semibold">About Me</Label>
                          <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.aboutMe}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="font-semibold">Skills</Label>
                          <p className="bg-gray-100 p-2 rounded-md">{profileData?.data?.skills}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>


              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {educationList.length > 0 ? (
                        educationList.map((education, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-6 shadow-md bg-white flex flex-col md:flex-row gap-6"
                          >
                            {/* Left: Text Details */}
                            <div className="flex-1 space-y-3">
                              <h3 className="text-lg font-semibold text-primary">{education.instituteName}</h3>
                              <p className="text-muted-foreground text-sm">{education.courseName} - {education.fieldOfStudy}</p>

                              {/* Grid Layout for Additional Details */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                                <p><strong>Grade:</strong> {education.grade}</p>
                                <p><strong>Start Date:</strong> {new Date(education.startTime).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> {new Date(education.endTime).toLocaleDateString()}</p>
                              </div>
                            </div>

                            {/* Right: Certificate Image */}
                            {education.credentialUrl && (
                              <div className="flex-shrink-0">
                                <p className="font-semibold text-gray-800">Certificate:</p>
                                <a href={education.credentialUrl} target="_blank" rel="noopener noreferrer">
                                  <img
                                    src={education.credentialUrl}
                                    alt="Certificate"
                                    className="mt-2 w-40 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                                  />
                                </a>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center">No education history available.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>



              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {experienceList.length > 0 ? (
                        experienceList.map((experience, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h3 className="text-lg font-semibold">{experience.organisationName}</h3>
                            <p className="text-muted-foreground">{experience.designation}</p>
                            <p className="text-sm text-gray-600">{experience.type}</p>
                            <div className="mt-2 text-sm text-gray-600">
                              <p>
                                {new Date(experience.startTime).toLocaleDateString()} -{" "}
                                {new Date(experience.endTime).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No work experience available.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button type="submit" className="w-full">Update Password</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
