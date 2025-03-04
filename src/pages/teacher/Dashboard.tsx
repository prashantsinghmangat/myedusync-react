
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Users, 
  Book, 
  PenSquare,
  TrendingUp,
  DollarSign,
  Plus,
  CheckCircle2,
  CircleAlert,
  BarChart3
} from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

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

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary mb-2">Teacher Dashboard</h1>
          <p className="text-gray-500 mb-8">Welcome back! Here's an overview of your teaching activity.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Classes Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">scheduled sessions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-500">across all courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Book className="h-5 w-5 text-purple-500" />
                  Active Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">currently teaching</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-500" />
                  New Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500">unread messages</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="upcoming" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
                  <TabsTrigger value="courses">My Courses</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Schedule</CardTitle>
                      <CardDescription>May 15, 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-start p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="bg-accent/10 p-3 rounded-lg mr-4 flex-shrink-0">
                              <Clock className="h-5 w-5 text-accent" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{["Advanced Physics", "Calculus II", "Chemistry Lab"][i-1]}</h4>
                                  <p className="text-sm text-gray-500">Grade 11 • {["10:00 AM - 11:30 AM", "1:00 PM - 2:30 PM", "3:00 PM - 4:30 PM"][i-1]}</p>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    Materials
                                  </Button>
                                  <Button size="sm">Start Class</Button>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center text-sm">
                                <Users className="h-4 w-4 mr-1 text-gray-500" />
                                <span className="text-gray-500">{i * 3 + 2} students</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View Full Schedule</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="courses">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>My Courses</CardTitle>
                        <CardDescription>Manage your active courses</CardDescription>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Course
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="h-14 w-14 bg-gray-200 rounded-lg mr-3 flex-shrink-0 overflow-hidden">
                              <img 
                                src={`https://picsum.photos/seed/${i+40}/200/200`} 
                                alt="Course thumbnail"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{["Physics 101", "Advanced Mathematics", "Chemistry Basics", "Biology Fundamentals", "Computer Science Intro"][i-1]}</h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <Users className="h-3 w-3 mr-1" />
                                <span>{i * 2 + 3} students</span>
                                <span className="mx-2">•</span>
                                <span>Grade {9 + i}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="students">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student List</CardTitle>
                      <CardDescription>View and manage your students</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                              <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Avatar" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{["John Smith", "Emily Johnson", "Michael Brown", "Sarah Williams", "David Miller"][i-1]}</h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <span>Grade {9 + (i % 4)}</span>
                                <span className="mx-2">•</span>
                                <span>{["Physics", "Mathematics", "Chemistry", "Biology", "Computer Science"][i-1]}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">Message</Button>
                              <Button variant="outline" size="sm">Profile</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Stats Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Course Completion Rate</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full w-[87%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Student Attendance</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full w-[92%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Assignment Submission</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div className="bg-yellow-500 h-2 rounded-full w-[78%]"></div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-2">
                    <p className="text-3xl font-bold">$1,240</p>
                    <p className="text-sm text-gray-500">Earnings this month</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 border-t pt-4">
                    <div>
                      <p className="text-sm text-gray-500">Last Month</p>
                      <p className="font-medium">$980</p>
                    </div>
                    <div className="text-green-500 text-sm font-medium flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +26.5%
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenSquare className="h-5 w-5 text-purple-500" />
                    Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Grade Physics Assignments</p>
                        <p className="text-xs text-gray-500">Due today</p>
                      </div>
                    </div>
                    <div className="flex items-start p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <CircleAlert className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Prepare Chemistry Lab</p>
                        <p className="text-xs text-gray-500">Due in 2 days</p>
                      </div>
                    </div>
                    <div className="flex items-start p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <CircleAlert className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Update Course Materials</p>
                        <p className="text-xs text-gray-500">Due in 5 days</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-3 w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
