
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircleCheck, Search, X } from 'lucide-react';
import { apiGet } from '@/utils/apiInterceptor';
import { API_ENDPOINTS } from '@/config/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

export const Courses = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Common filter options
  const boards = ["CBSE", "ICSE", "IGCSE", "Edexcel"];
  const classes = Array.from({ length: 5 }, (_, i) => (i + 8).toString());
  const subjects = ["Mathematics", "Science", "English", "Geography", "History"];

  const { data: courses = [], isLoading, error, refetch } = useQuery({
    queryKey: ['homepageCourses', selectedBoard, selectedClass, selectedSubject, searchTerm],
    queryFn: async () => {
      // Build query parameters
      const params = new URLSearchParams();
      if (selectedBoard) params.append('board', selectedBoard);
      if (selectedClass) params.append('class', selectedClass);
      if (selectedSubject) params.append('subject', selectedSubject);
      if (searchTerm) params.append('search', searchTerm);
      
      // Add limit for homepage
      params.append('limit', '6');
      params.append('page', '0');
      params.append('board', 'IGCSE');
      params.append('class', '10');
      params.append('subject', 'Science');
      
      // Make API call
      const url = `${API_ENDPOINTS.courses.list}?${params.toString()}`;
      const response = await apiGet(url, {
        requiresAuth: true
      });

      const data = await response.json();
      return data?.data || [];
    },
  });

  const applyFilters = () => {
    refetch();
  };

  const clearFilters = () => {
    setSelectedBoard("");
    setSelectedClass("");
    setSelectedSubject("");
    setSearchTerm("");
    refetch();
  };

  const viewAllCourses = () => {
    // Navigate to courses page with current filters
    const params = new URLSearchParams();
    if (selectedBoard) params.append('board', selectedBoard);
    if (selectedClass) params.append('class', selectedClass);
    if (selectedSubject) params.append('subject', selectedSubject);
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
                <SelectItem value="">All Boards</SelectItem>
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
                <SelectItem value="">All Classes</SelectItem>
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
        {isLoading && <p className="text-center text-gray-500">Loading courses...</p>}
        {error && <p className="text-center text-red-500">{error.message}</p>}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.length > 0 ? (
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
                    {course.aboutThisCourse.length > 100
                      ? `${course.aboutThisCourse.slice(0, 100)}...`
                      : course.aboutThisCourse}
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
            !isLoading && <p className="text-center text-gray-500 col-span-3">No courses available.</p>
          )}
        </div>
        
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
