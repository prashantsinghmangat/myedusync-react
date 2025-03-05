
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLoading } from "@/providers/LoadingProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { apiGet } from "@/utils/apiInterceptor";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";
import { Search, Filter, Star, MapPin } from "lucide-react";
import { Course } from "@/types/courses";

const TutorFinder = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsLoading } = useLoading();
  
  // Filter states
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [classLevel, setClassLevel] = useState(searchParams.get('class') || '');
  const [board, setBoard] = useState(searchParams.get('board') || '');
  const [mode, setMode] = useState(searchParams.get('mode') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  
  // Search and results
  const [searchQuery, setSearchQuery] = useState('');
  const [tutors, setTutors] = useState<Course[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Form options
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
  const boardOptions = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE'];
  const subjectOptions = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  const modeOptions = ['Online', 'Offline', 'Hybrid'];

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      setIsLoading(true);
      
      try {
        // Build URL with any existing filter params
        let url = API_ENDPOINTS.tutors.find;
        const params = new URLSearchParams();
        
        if (subject) params.append('subject', subject);
        if (classLevel) params.append('class', classLevel);
        if (board) params.append('board', board);
        if (mode) params.append('mode', mode);
        if (location) params.append('location', location);
        
        const urlWithParams = `${url}?${params.toString()}`;
        const response = await apiGet(urlWithParams);
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          setTutors(data);
          setFilteredTutors(data);
        } else {
          setTutors([]);
          setFilteredTutors([]);
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
        toast.error("Error loading tutors. Please try again.");
        setTutors([]);
        setFilteredTutors([]);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [subject, classLevel, board, mode, location, setIsLoading]);

  // Apply search filter
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTutors(tutors);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = tutors.filter(tutor => 
      tutor.subject.toLowerCase().includes(query) ||
      tutor.board.toLowerCase().includes(query) ||
      tutor.className.toLowerCase().includes(query) ||
      tutor.mode.toLowerCase().includes(query)
    );
    
    setFilteredTutors(filtered);
  }, [searchQuery, tutors]);

  // Apply filters and update URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (classLevel) params.append('class', classLevel);
    if (board) params.append('board', board);
    if (mode) params.append('mode', mode);
    if (location) params.append('location', location);
    
    setSearchParams(params);
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSubject('');
    setClassLevel('');
    setBoard('');
    setMode('');
    setLocation('');
    setSearchParams({});
  };

  // View tutor details
  const viewTutorDetails = (tutorId: string) => {
    navigate(`/tutor/${tutorId}`);
  };

  const tutorImages = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  ];

  // Function to get a random tutor image
  const getRandomTutorImage = (index: number) => {
    return tutorImages[index % tutorImages.length];
  };

  return (
    <>
      <SEO
        title="Find Tutors - MyEduSync"
        description="Find the best tutors for your needs on MyEduSync."
      />
      <Header />
      <main className="py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Find Your Perfect Tutor
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Browse through our extensive list of qualified tutors who can help you achieve your educational goals.
              Use the filters to find tutors specific to your needs.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search by subject, board, class..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button 
                variant="outline" 
                className="flex-shrink-0"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button 
                variant="orange"
                className="flex-shrink-0"
                onClick={() => navigate("/find-tutor-steps")}
              >
                Advanced Search
              </Button>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
              <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Subject</SelectItem>
                      {subjectOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select value={classLevel} onValueChange={setClassLevel}>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Class</SelectItem>
                      {classOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="board">Board</Label>
                  <Select value={board} onValueChange={setBoard}>
                    <SelectTrigger id="board">
                      <SelectValue placeholder="Select Board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Board</SelectItem>
                      {boardOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mode">Mode</Label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger id="mode">
                      <SelectValue placeholder="Select Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Mode</SelectItem>
                      {modeOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="sm:col-span-2 md:col-span-3 lg:col-span-5 flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={resetFilters}>Reset</Button>
                  <Button variant="orange" onClick={applyFilters}>Apply Filters</Button>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Found {filteredTutors.length} tutors matching your criteria
            </p>
          </div>

          {/* Tutor Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <Card key={index} className="opacity-60 animate-pulse">
                  <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
                  <CardContent className="pt-6">
                    <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor, index) => (
                <Card key={tutor._id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                      <span className="text-[#f57e2c]">{tutor.costPerSessions} {tutor.currency}</span>
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
                      onClick={() => viewTutorDetails(tutor._id)}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tutors found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any tutors matching your criteria. Try adjusting your search parameters.
              </p>
              <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-2511613-2132878.png" 
                alt="No results" 
                className="max-w-xs mx-auto"
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TutorFinder;
