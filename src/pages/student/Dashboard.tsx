
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MessageSquare, User, Book, BookOpen } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

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
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary mb-2">Student Dashboard</h1>
          <p className="text-gray-500 mb-8">Welcome back! Here's an overview of your learning journey.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">classes this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Book className="h-5 w-5 text-green-500" />
                  Active Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">courses in progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-500" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-gray-500">unread messages</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="classes" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="classes">Upcoming Classes</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="classes">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 bg-gray-100 md:h-auto flex items-center justify-center p-4">
                        <div className="text-center">
                          <p className="text-lg font-bold">MAY</p>
                          <p className="text-3xl font-bold">{i + 10}</p>
                          <p className="text-sm">2024</p>
                        </div>
                      </div>
                      <div className="p-4 w-full md:w-2/3">
                        <h3 className="font-semibold mb-1">Advanced Mathematics</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>10:00 AM - 11:30 AM</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <User className="h-4 w-4 mr-1" />
                          <span>Prof. Robert Johnson</span>
                        </div>
                        <Button variant="outline" size="sm">Join Class</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-40 bg-gray-200 relative">
                      <img 
                        src={`https://picsum.photos/seed/${i+10}/500/300`} 
                        alt="Course thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold">
                        {i === 1 ? 'Physics' : i === 2 ? 'Chemistry' : 'Biology'}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{i === 1 ? 'Introduction to Physics' : i === 2 ? 'Organic Chemistry Basics' : 'Human Anatomy'}</CardTitle>
                      <CardDescription>Prof. {i === 1 ? 'Alan Walker' : i === 2 ? 'Emily Chen' : 'David Brown'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2 bg-gray-100 h-2 rounded-full">
                        <div className={`bg-accent h-2 rounded-full w-${i * 10 + 40}%`}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Progress</span>
                        <span>{i * 10 + 40}%</span>
                      </div>
                      <Button className="w-full mt-4">Continue Learning</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Stay in touch with your tutors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?img=${i+20}`} alt="Avatar" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium">{["Prof. Johnson", "Dr. Williams", "Prof. Miller", "Dr. Davis", "Prof. Garcia"][i-1]}</h4>
                            <span className="text-xs text-gray-500">Yesterday</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">Hello! I wanted to follow up on your question about the homework assignment...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View All Messages</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  Recommended Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <div className="h-16 w-16 bg-gray-200 rounded-md mr-3 flex-shrink-0">
                        <img 
                          src={`https://picsum.photos/seed/${i+30}/200/200`} 
                          alt="Note thumbnail"
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{i === 1 ? 'Calculus Formulas' : i === 2 ? 'Chemistry Equations' : 'Biology Diagrams'}</h4>
                        <p className="text-xs text-gray-500">Added 3 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-3 w-full">View All Notes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <div className="h-12 w-12 bg-accent/10 rounded-md mr-3 flex-shrink-0 flex items-center justify-center">
                        <p className="font-bold text-accent">{i+14}</p>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{i === 1 ? 'Physics Lab' : i === 2 ? 'Math Tutorial' : 'Biology Quiz'}</h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{i === 1 ? '9:00 AM - 11:00 AM' : i === 2 ? '1:00 PM - 2:30 PM' : '3:00 PM - 4:00 PM'}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-3 w-full">Full Schedule</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
