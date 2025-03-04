
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { Pencil, UserRound, Book, FileText, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    school: "",
    grade: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role?.toLowerCase() !== "student") {
      navigate("/");
      return;
    }

    setUser(parsedUser);
    // In a real app, you'd fetch profile data from an API here
    setFormData({
      ...formData,
      name: "John Smith",
      email: parsedUser.email || "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      school: "Riverdale High School",
      grade: "11th Grade",
      bio: "I'm a dedicated student focused on STEM subjects with a particular interest in physics and mathematics. I enjoy solving complex problems and participating in science competitions."
    });
  }, [navigate]);

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
            <h1 className="text-3xl font-bold text-primary mb-6">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-md mb-4">
                      <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute bottom-4 right-0 rounded-full bg-white shadow"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold">{formData.name}</h2>
                  <p className="text-gray-500 mb-4">{formData.grade} • {formData.school}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsEditProfileOpen(true)}
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">
                    <UserRound className="h-4 w-4 mr-2" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="academics">
                    <Book className="h-4 w-4 mr-2" />
                    Academics
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
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
                          <p className="font-medium">{formData.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Email</Label>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Phone</Label>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Location</Label>
                          <p className="font-medium">{formData.location}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Bio</Label>
                        <p className="mt-1">{formData.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="academics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label className="text-sm text-gray-500">School</Label>
                          <p className="font-medium">{formData.school}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Grade</Label>
                          <p className="font-medium">{formData.grade}</p>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mt-6 mb-4">Enrolled Courses</h3>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="h-14 w-14 bg-gray-200 rounded-lg mr-3 flex-shrink-0 overflow-hidden">
                              <img 
                                src={`https://picsum.photos/seed/${i+60}/200/200`} 
                                alt="Course thumbnail"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{["Advanced Physics", "Calculus II", "Organic Chemistry"][i-1]}</h4>
                              <p className="text-sm text-gray-500">Prof. {["Robert Johnson", "Emily Chen", "David Wilson"][i-1]}</p>
                              <div className="mt-1 flex space-x-2">
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                  {["Physics", "Mathematics", "Chemistry"][i-1]}
                                </span>
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                                  Grade 11
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Documents</CardTitle>
                      <CardDescription>Access and manage your academic documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg mr-3 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{["Report Card - Fall 2023", "Certificate - Science Olympiad", "Recommendation Letter"][i-1]}</h4>
                              <p className="text-xs text-gray-500">Uploaded on {["May 10, 2024", "April 22, 2024", "March 15, 2024"][i-1]}</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        ))}
                      </div>
                      <Button className="mt-4">
                        <Pencil className="h-4 w-4 mr-2" />
                        Upload New Document
                      </Button>
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
              Update your personal information
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
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
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
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
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

export default StudentProfile;
