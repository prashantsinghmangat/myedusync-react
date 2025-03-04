
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from '@/config/api';
import { fetchWithInterceptor } from "@/utils/apiInterceptor";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { 
  Button, 
  Label, 
  Input, 
  Avatar, 
  AvatarFallback, 
  AvatarImage,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { 
  Pencil, 
  UserRound, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  LockKeyhole,
  Plus,
  Trash,
  Star
} from "lucide-react";
import { toast } from "sonner";

const TeacherProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    designation: "",
    skills: "",
    instituteName: "",
    courseName: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    companyName: "",
    position: "",
    startDateExp: "",
    endDateExp: "",
    description: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const { data: profileData } = useQuery({
    queryKey: ["tutorProfile"],
    queryFn: async () => {
      try {
        const response = await fetchWithInterceptor(API_ENDPOINTS.tutors.getTutorProfile, { requiresAuth: true });
        return await response.json();
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
        return null;
      }
    },
    enabled: !!user
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role?.toLowerCase() !== "teacher") {
      navigate("/");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  useEffect(() => {
    if (profileData?.data) {
      setFormData({
        ...formData,
        name: profileData.data.name || "",
        email: profileData.data.emailId || "",
        phone: profileData.data.phoneNumber || "",
        location: profileData.data.location || "",
        bio: profileData.data.aboutMe || "",
        designation: profileData.data.currentDesignation || "",
        skills: profileData.data.skills || ""
      });
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    toast.success("Profile updated successfully");
    setIsEditProfileOpen(false);
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    toast.success("Education added successfully");
    setIsAddEducationOpen(false);
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    toast.success("Experience added successfully");
    setIsAddExperienceOpen(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    // In a real app, you'd send this data to your API
    toast.success("Password changed successfully");
    setIsChangePasswordOpen(false);
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Teacher Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-md mb-4">
                      <AvatarImage src={profileData?.data?.profilePic || "https://i.pravatar.cc/150?img=12"} />
                      <AvatarFallback>{profileData?.data?.name?.[0] || "T"}</AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute bottom-4 right-0 rounded-full bg-white shadow"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold">{profileData?.data?.name || formData.name}</h2>
                  <p className="text-gray-500 mb-2">{profileData?.data?.currentDesignation || formData.designation}</p>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    ))}
                    <span className="text-sm ml-1">5.0</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mb-2"
                    onClick={() => setIsEditProfileOpen(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    Preview Public Profile
                  </Button>
                </CardContent>
              </Card>

              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">
                    <UserRound className="h-4 w-4 mr-2" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="experience">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="courses">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <LockKeyhole className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label className="text-sm text-gray-500">Full Name</Label>
                          <p className="font-medium">{profileData?.data?.name || formData.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Email</Label>
                          <p className="font-medium">{profileData?.data?.emailId || formData.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Phone</Label>
                          <p className="font-medium">{profileData?.data?.phoneNumber || formData.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Location</Label>
                          <p className="font-medium">{profileData?.data?.location || formData.location}</p>
                        </div>
                      </div>
                      <div className="mb-6">
                        <Label className="text-sm text-gray-500">Bio</Label>
                        <p className="mt-1">{profileData?.data?.aboutMe || formData.bio || "No bio provided yet."}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Skills</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {(profileData?.data?.skills || formData.skills || "Mathematics,Physics,Chemistry,Biology").split(',').map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Education</CardTitle>
                        <CardDescription>Your academic background</CardDescription>
                      </div>
                      <Button onClick={() => setIsAddEducationOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Sample Education Items */}
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">PhD in Physics</h3>
                              <p className="text-sm text-gray-500">Stanford University</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-500">2015 - 2019</p>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                              GPA: 3.95/4.0
                            </span>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">MSc in Theoretical Physics</h3>
                              <p className="text-sm text-gray-500">MIT</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-500">2013 - 2015</p>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                              GPA: 3.9/4.0
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="experience">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Experience</CardTitle>
                        <CardDescription>Your professional background</CardDescription>
                      </div>
                      <Button onClick={() => setIsAddExperienceOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Sample Experience Items */}
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">Senior Physics Professor</h3>
                              <p className="text-sm text-gray-500">University of California, Berkeley</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">2019 - Present</p>
                          <p className="mt-2 text-sm">
                            Teaching advanced physics courses to undergraduate and graduate students.
                            Leading research in quantum mechanics and supervising doctoral candidates.
                          </p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">Research Scientist</h3>
                              <p className="text-sm text-gray-500">CERN, Switzerland</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">2015 - 2019</p>
                          <p className="mt-2 text-sm">
                            Conducted research on particle physics and contributed to the Large Hadron Collider experiments.
                            Published 12 papers in top-tier scientific journals.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="courses">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>My Courses</CardTitle>
                        <CardDescription>Courses you created and teach</CardDescription>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Course
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <Card key={i} className="overflow-hidden border">
                            <div className="h-40 bg-gray-200 relative">
                              <img 
                                src={`https://picsum.photos/seed/${i+70}/500/300`} 
                                alt="Course thumbnail"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold">
                                {["Physics", "Advanced Math", "Quantum Mechanics", "Electromagnetism"][i-1]}
                              </div>
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">
                                {["Introduction to Classical Mechanics", 
                                  "Calculus and Linear Algebra", 
                                  "Quantum Physics for Beginners", 
                                  "Electromagnetic Theory"][i-1]}
                              </CardTitle>
                              <CardDescription className="flex items-center text-xs">
                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
                                  {["CBSE", "ICSE", "IB", "Cambridge"][i-1]}
                                </span>
                                <span>Grade {10 + i}</span>
                              </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between pt-0">
                              <span className="text-sm">
                                <span className="font-medium">{i * 5 + 10}</span> students
                              </span>
                              <Button variant="outline" size="sm">Manage</Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-semibold mb-2 flex items-center">
                            <LockKeyhole className="h-5 w-5 mr-2 text-gray-500" />
                            Password
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            It's a good idea to use a strong password that you don't use elsewhere
                          </p>
                          <Button 
                            variant="outline"
                            onClick={() => setIsChangePasswordOpen(true)}
                          >
                            Change Password
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your professional information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProfileUpdate}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="designation">Current Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Education Dialog */}
      <Dialog open={isAddEducationOpen} onOpenChange={setIsAddEducationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
            <DialogDescription>
              Add your educational background
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddEducation}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="instituteName">Institution Name</Label>
                <Input
                  id="instituteName"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="courseName">Degree/Course Name</Label>
                <Input
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="grade">Grade/GPA</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Education</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Experience Dialog */}
      <Dialog open={isAddExperienceOpen} onOpenChange={setIsAddExperienceOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogDescription>
              Add your professional experience
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddExperience}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="companyName">Company/Organization Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="position">Position/Title</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDateExp">Start Date</Label>
                  <Input
                    id="startDateExp"
                    name="startDateExp"
                    type="date"
                    value={formData.startDateExp}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endDateExp">End Date</Label>
                  <Input
                    id="endDateExp"
                    name="endDateExp"
                    type="date"
                    value={formData.endDateExp}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Experience</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordChange}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default TeacherProfile;
