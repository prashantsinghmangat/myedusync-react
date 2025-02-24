
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
import { Separator } from "@/components/ui/separator";

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
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profileData } = useQuery({
    queryKey: ['tutorProfile'],
    queryFn: async () => {
      const response = await fetch('https://api.myedusync.com/getTutorProfile', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
  });

  const { data: educationList = [] } = useQuery({
    queryKey: ['tutorEducation'],
    queryFn: async () => {
      const response = await fetch('https://api.myedusync.com/allTutorEducationList', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });
      if (!response.ok) throw new Error('Failed to fetch education');
      return response.json();
    },
  });

  const { data: experienceList = [] } = useQuery({
    queryKey: ['tutorExperience'],
    queryFn: async () => {
      const response = await fetch('https://api.myedusync.com/allTutorExperienceList', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });
      if (!response.ok) throw new Error('Failed to fetch experience');
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
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileData?.profilePic} alt={profileData?.name} />
                        <AvatarFallback>{profileData?.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-semibold">{profileData?.name}</h2>
                        <p className="text-muted-foreground">{profileData?.currentDesignation}</p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div>
                        <Label>Email</Label>
                        <p className="text-gray-700">{profileData?.emailId}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="text-gray-700">{profileData?.phoneNumber}</p>
                      </div>
                      <div>
                        <Label>Location</Label>
                        <p className="text-gray-700">{profileData?.location}</p>
                      </div>
                      <div>
                        <Label>About Me</Label>
                        <p className="text-gray-700">{profileData?.aboutMe}</p>
                      </div>
                      <div>
                        <Label>Skills</Label>
                        <p className="text-gray-700">{profileData?.skills}</p>
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
                      {educationList.map((education: Education) => (
                        <div key={education._id.timestamp} className="border rounded-lg p-4">
                          <h3 className="text-lg font-semibold">{education.instituteName}</h3>
                          <p className="text-muted-foreground">{education.courseName} - {education.fieldOfStudy}</p>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Grade: {education.grade}</p>
                            <p>
                              {new Date(education.startTime).getFullYear()} - {new Date(education.endTime).getFullYear()}
                            </p>
                          </div>
                        </div>
                      ))}
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
                      {experienceList.map((experience: Experience) => (
                        <div key={experience._id.timestamp} className="border rounded-lg p-4">
                          <h3 className="text-lg font-semibold">{experience.organisationName}</h3>
                          <p className="text-muted-foreground">{experience.designation}</p>
                          <p className="text-sm text-gray-600">{experience.type}</p>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>
                              {new Date(experience.startTime).toLocaleDateString()} - {" "}
                              {new Date(experience.endTime).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
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
