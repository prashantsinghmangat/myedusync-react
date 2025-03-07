
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircleCheck, Search, X } from 'lucide-react';
import { apiGet } from '@/utils/apiInterceptor';
import { API_ENDPOINTS } from '@/config/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Courses = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<string>("all-boards");
  const [selectedClass, setSelectedClass] = useState<string>("all-classes");
  const [selectedSubject, setSelectedSubject] = useState<string>("all-subjects");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Common filter options
  const boards = ["CBSE", "ICSE", "IGCSE", "Edexcel"];
  const classes = Array.from({ length: 5 }, (_, i) => (i + 8).toString());
  const subjects = ["Mathematics", "Science", "English", "Geography", "History", "Hindi"];

  const { data: coursesResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['homepageCourses', selectedBoard, selectedClass, selectedSubject, searchTerm],
    queryFn: async () => {
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (selectedBoard && selectedBoard !== "all-boards") params.append('board', selectedBoard);
        if (selectedClass && selectedClass !== "all-classes") params.append('class', selectedClass);
        if (selectedSubject && selectedSubject !== "all-subjects") params.append('subject', selectedSubject);
        if (searchTerm) params.append('search', searchTerm);
        
        // Add limit for homepage
        params.append('limit', '6');
        params.append('page', '0');
        
        // Make API call
        const url = `${API_ENDPOINTS.courses.list}?${params.toString()}`;
        console.log("Fetching courses from:", url);
        
        try {
          const response = await apiGet(url, {
            requiresAuth: true
          });
          
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching courses:", error);
          // Return a mock response structure when API fails
          return { 
            isSuccess: false, 
            data: [],
            error: "Failed to load courses" 
          };
        }
      } catch (error) {
        console.error("Error in query function:", error);
        return { 
          isSuccess: false, 
          data: [],
          error: "Failed to process course data" 
        };
      }
    },
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  // Extract courses safely from the response, handling both API success and error cases
  const courses = Array.isArray(coursesResponse?.data) ? coursesResponse.data : [];

  const applyFilters = () => {
    refetch();
  };

  const clearFilters = () => {
    setSelectedBoard("all-boards");
    setSelectedClass("all-classes");
    setSelectedSubject("all-subjects");
    setSearchTerm("");
    refetch();
  };

  const viewAllCourses = () => {
    // Navigate to courses page with current filters
    const params = new URLSearchParams();
    if (selectedBoard && selectedBoard !== "all-boards") params.append('board', selectedBoard);
    if (selectedClass && selectedClass !== "all-classes") params.append('class', selectedClass);
    if (selectedSubject && selectedSubject !== "all-subjects") params.append('subject', selectedSubject);
    if (searchTerm) params.append('search', searchTerm);
    
    navigate(`/courses?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#FFF5F5] py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="inline-block px-4 py-2 bg-orange-100 rounded-full mb-4">
              <span className="text-orange-500">Our Courses</span>
            </div>
            <h2 className="text-3xl font-bold">Explore Our Courses</h2>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Input
                placeholder="Search Courses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="min-w-[200px]"
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <Select value={selectedBoard} onValueChange={setSelectedBoard}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Boards" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-boards">All Boards</SelectItem>
                {boards.map(board => (
                  <SelectItem key={board} value={board.toLowerCase()}>{board}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-classes">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex space-x-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="w-1/2 md:w-auto"
              >
                Clear
              </Button>
              <Button 
                onClick={applyFilters}
                className="w-1/2 md:w-auto"
              >
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && (error || !coursesResponse?.isSuccess) && (
          <div className="text-center bg-red-50 p-8 rounded-lg border border-red-100">
            <p className="text-red-500 font-medium mb-4">We encountered an error loading courses</p>
            <p className="text-gray-600 mb-4">Don't worry! You can still browse all our courses.</p>
            <Button onClick={viewAllCourses}>View All Courses</Button>
          </div>
        )}

        {/* Course Grid - Only show when not loading and no error */}
        {!isLoading && !error && coursesResponse?.isSuccess && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <div 
                  key={course._id} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  <img
                    src={course.courseThumbnail || 'https://via.placeholder.com/400x200?text=Course+Image'}
                    alt={course.subject}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CircleCheck className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-500">
                        {course.board} - Class {course.className}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.subject}</h3>
                    <p className="text-sm text-gray-600 truncate">
                      {course.aboutThisCourse?.length > 100
                        ? `${course.aboutThisCourse.slice(0, 100)}...`
                        : course.aboutThisCourse || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-600">
                        {course.weeklySessions} sessions/week
                      </span>
                      <span className="text-orange-500 font-bold">
                        {course.costPerSessions} {course.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 mb-4">No courses available or matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        )}
        
        {/* Fallback Grid - Show when API fails or returns errors */}
        {!isLoading && (error || !coursesResponse?.isSuccess) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => navigate('/courses')}
              >
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Course image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <CircleCheck className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-500">
                      Featured Course
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {index === 0 ? "Mathematics" : index === 1 ? "Science" : "English"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Explore our popular courses with expert tutors.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-600">
                      Multiple sessions available
                    </span>
                    <span className="text-orange-500 font-bold">
                      View details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <Button 
            onClick={viewAllCourses} 
            variant="outline" 
            className="px-8 py-2"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </div>
  );
};
