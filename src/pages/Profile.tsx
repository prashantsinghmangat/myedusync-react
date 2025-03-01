
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
declare var localStorage: Storage;
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { fetchWithInterceptor } from "@/utils/apiInterceptor";

const Profile = () => {
  // const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  // const token = user.token;

  const [openModal, setOpenModal] = useState<"profile" | "education" | "experience" | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullAddress: "",
    WhatsAppNumber: "",
    aboutMe: "",
    currentDesignation: "",
    shortBio: "",
    skills: "",

    // New fields for education
    instituteName: "",
    courseName: "",
    fieldOfStudy: "",
    startTime: "",
    endTime: "",
    grade: "",
    credentialUrl: "",
    // New fields for experience
    organisationName: "",
    designation: "",
    type: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(storedUser);
      setToken(storedUser?.token || null);
    }
  }, []);


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form (Dynamically for profile, education, experience)
  const handleSubmit = async (type: "profile" | "education" | "experience") => {
    let apiURL = "";
    let payload = {};

    if (type === "profile") {
      apiURL = "https://api.myedusync.com/addTutorBasicDetails";
      payload = { ...formData };
    } else if (type === "education") {
      apiURL = "http://api.myedusync.com/addTutorsEducationDetails";
      payload = {
        instituteName: formData.instituteName,
        courseName: formData.courseName,
        fieldOfStudy: formData.fieldOfStudy,
        startTime: formData.startTime,
        endTime: formData.endTime,
        grade: formData.grade,
        credentialUrl: formData.credentialUrl,
      };
    } else if (type === "experience") {
      apiURL = "http://api.myedusync.com/addTutorsExperienceDetails";
      payload = {
        organisationName: formData.organisationName,
        designation: formData.designation,
        type: formData.type,
        startTime: formData.startTime,
        endTime: formData.endTime,
        credentialUrl: formData.credentialUrl,
      };
    }

    try {
      await fetchWithInterceptor(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        requiresAuth: true,
      });

      toast({ title: `${type} updated successfully!` });
      setOpenModal(null);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Update failed!" });
    }
  };



  const { data: profileData } = useQuery({
    queryKey: ["tutorProfile"],
    queryFn: async () => {
      const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.getTutorProfile, {
        requiresAuth: true,
      });
      return response.json();
    },
  });

  const { data: educationList = [] } = useQuery({
    queryKey: ["tutorEducation"],
    queryFn: async () => {
      const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.educationList, {
        requiresAuth: true,
      });
      const data = await response.json();
      return data?.data;
    },
  });


  const { data: experienceList = [] } = useQuery({
    queryKey: ["tutorExperience"],
    queryFn: async () => {
      const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.experienceList, {
        requiresAuth: true,
      });
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
                    <div className="flex justify-between">
                      <CardTitle>Account Details</CardTitle>
                      <Button onClick={() => setOpenModal("profile")}>Update Profile</Button>
                    </div>
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
                    <div className="flex justify-between">
                      <CardTitle>Education</CardTitle>
                      <Button onClick={() => setOpenModal("education")}>Add Education</Button>
                    </div>
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
                    <div className="flex justify-between">
                      <CardTitle>Experience</CardTitle>
                      <Button onClick={() => setOpenModal("experience")}>Add Experience</Button>
                    </div>
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


            <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {openModal === "profile" && "Edit Profile"}
                    {openModal === "education" && "Add Education"}
                    {openModal === "experience" && "Add Experience"}
                  </DialogTitle>
                </DialogHeader>

                {openModal === "profile" && (
                  <div className="space-y-3">
                    <Input
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={handleChange}
                      placeholder="Full Address"
                    />
                    <Input
                      name="WhatsAppNumber"
                      value={formData.WhatsAppNumber}
                      onChange={handleChange}
                      placeholder="WhatsApp Number"
                    />
                    <Textarea
                      name="aboutMe"
                      value={formData.aboutMe}
                      onChange={handleChange}
                      placeholder="About Me"
                    />
                    <Input
                      name="currentDesignation"
                      value={formData.currentDesignation}
                      onChange={handleChange}
                      placeholder="Current Designation"
                    />
                    <Textarea
                      name="shortBio"
                      value={formData.shortBio}
                      onChange={handleChange}
                      placeholder="Short Bio"
                    />
                    <Input
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="Skills (comma-separated)"
                    />
                  </div>
                )}

                {openModal === "education" && (
                  <div className="space-y-3">
                    <Input
                      name="instituteName"
                      value={formData.instituteName}
                      onChange={handleChange}
                      placeholder="Institute Name"
                    />
                    <Input
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      placeholder="Course Name"
                    />
                    <Input
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleChange}
                      placeholder="Field of Study"
                    />
                    <Input
                      name="startTime"
                      type="date"
                      value={formData.startTime}
                      onChange={handleChange}
                      placeholder="Start Date"
                    />
                    <Input
                      name="endTime"
                      type="date"
                      value={formData.endTime}
                      onChange={handleChange}
                      placeholder="End Date"
                    />
                    <Input
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      placeholder="Grade"
                    />
                    <Input
                      name="credentialUrl"
                      value={formData.credentialUrl}
                      onChange={handleChange}
                      placeholder="Credential URL"
                    />
                  </div>
                )}

                {openModal === "experience" && (
                  <div className="space-y-3">
                    <Input
                      name="organisationName"
                      value={formData.organisationName}
                      onChange={handleChange}
                      placeholder="Organization Name"
                    />
                    <Input
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Designation"
                    />
                    <Input
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      placeholder="Type (e.g., Self, Company)"
                    />
                    <Input
                      name="startTime"
                      type="date"
                      value={formData.startTime}
                      onChange={handleChange}
                      placeholder="Start Date"
                    />
                    <Input
                      name="endTime"
                      type="date"
                      value={formData.endTime}
                      onChange={handleChange}
                      placeholder="End Date"
                    />
                    <Input
                      name="credentialUrl"
                      value={formData.credentialUrl}
                      onChange={handleChange}
                      placeholder="Credential URL"
                    />
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={() => setOpenModal(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleSubmit(openModal!)} className="ml-2">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
