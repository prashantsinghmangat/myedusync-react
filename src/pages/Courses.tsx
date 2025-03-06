
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import type { Course } from "@/types/courses";
import { apiGet } from "@/utils/apiInterceptor";
import { useLoading } from "@/providers/LoadingProvider";
import { API_ENDPOINTS } from "@/config/api";
import { Search, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { generateStructuredData } from "@/utils/seo";

const Courses = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsLoading } = useLoading();
  
  // Filter states
  const [selectedBoard, setSelectedBoard] = useState<string>(searchParams.get('board') || "");
  const [selectedClass, setSelectedClass] = useState<string>(searchParams.get('class') || "");
  const [selectedSubject, setSelectedSubject] = useState<string>(searchParams.get('subject') || "");
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || "");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '0'));
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Filter data
  const boards = ["CBSE", "ICSE", "IGCSE", "Edexcel"];
  const classes = Array.from({ length: 5 }, (_, i) => (i + 8).toString());
  const subjects = ["Mathematics", "Science", "English", "Geography", "History"];

  // SEO data
  const pageTitle = selectedSubject 
    ? `${selectedSubject} Courses${selectedClass ? ` for Class ${selectedClass}` : ''}${selectedBoard ? ` (${selectedBoard})` : ''}`
    : "Browse Our Expert-Led Tutoring Courses";
    
  const pageDescription = `Find qualified tutors${selectedSubject ? ` for ${selectedSubject}` : ''}${selectedClass ? ` for class ${selectedClass}` : ''}${selectedBoard ? ` following ${selectedBoard} curriculum` : ''}. Book a free consultation today!`;
  
  // Structured data for this page
  const pageStructuredData = generateStructuredData('ItemList', {
    itemListElement: [], // Will be populated dynamically
    numberOfItems: 0,
    itemListOrder: "https://schema.org/ItemListOrderDescending"
  });

  const { data: courses = [], isLoading, refetch } = useQuery({
    queryKey: ['courses', selectedBoard, selectedClass, selectedSubject, searchTerm, currentPage],
    queryFn: async () => {
      // Build query parameters
      const params = new URLSearchParams();
      if (selectedBoard) params.append('board', selectedBoard);
      if (selectedClass) params.append('class', selectedClass);
      if (selectedSubject) params.append('subject', selectedSubject);
      if (searchTerm) params.append('search', searchTerm);
      
      // Add pagination params
      params.append('page', currentPage.toString());
      params.append('limit', ITEMS_PER_PAGE.toString());
      
      // Make API call
      const url = `${API_ENDPOINTS.courses.list}?${params.toString()}`;
      const response = await apiGet(url, {
        requiresAuth: true
      });

      const data = await response.json();
      
      // Update total pages if totalCount is available
      if (data?.totalCount) {
        setTotalPages(Math.ceil(data.totalCount / ITEMS_PER_PAGE));
      }
      
      return data?.data || [];
    },
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  // Apply filters and update URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedBoard) params.append('board', selectedBoard);
    if (selectedClass) params.append('class', selectedClass);
    if (selectedSubject) params.append('subject', selectedSubject);
    if (searchTerm) params.append('search', searchTerm);
    
    // Reset page to 0 when filters change
    setCurrentPage(0);
    params.append('page', '0');
    
    setSearchParams(params);
    refetch();
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedBoard("");
    setSelectedClass("");
    setSelectedSubject("");
    setSearchTerm("");
    setCurrentPage(0);
    setSearchParams({});
    refetch();
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  // Handle Enter key in search input
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={pageTitle}
        description={pageDescription}
        structuredData={pageStructuredData}
      />
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Browse Our Expert-Led Tutoring Courses</h1>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="board-select">Board</Label>
                <Select onValueChange={setSelectedBoard} value={selectedBoard}>
                  <SelectTrigger id="board-select">
                    <SelectValue placeholder="Select Board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Boards</SelectItem>
                    {boards.map((board) => (
                      <SelectItem key={board} value={board.toLowerCase()}>
                        {board}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class-select">Class</Label>
                <Select onValueChange={setSelectedClass} value={selectedClass}>
                  <SelectTrigger id="class-select">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Classes</SelectItem>
                    {classes.map((classNum) => (
                      <SelectItem key={classNum} value={classNum}>
                        Class {classNum}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject-select">Subject</Label>
                <Select onValueChange={setSelectedSubject} value={selectedSubject}>
                  <SelectTrigger id="subject-select">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject.toLowerCase()}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-input">Search</Label>
                <div className="relative">
                  <Input
                    id="search-input"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="pr-10"
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => searchTerm && (setSearchTerm(''), applyFilters())}
                  >
                    {searchTerm ? <X size={16} /> : <Search size={16} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-2">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Course List */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {isLoading 
                ? "Loading courses..." 
                : courses.length > 0 
                ? `Found ${courses.length} courses` 
                : "No courses found"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : courses.length > 0 ? (
                courses.map((course: Course) => (
                  <Card 
                    key={course._id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/courses/${course._id}`)}
                  >
                    <CardHeader>
                      {course.courseThumbnail && (
                        <img
                          src={course.courseThumbnail}
                          alt={course.subject}
                          className="w-full h-48 object-cover rounded-t-lg mb-4"
                        />
                      )}
                      <CardTitle className="text-xl">{course.subject}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><span className="font-medium">Board:</span> {course.board}</p>
                        <p><span className="font-medium">Class:</span> {course.className}</p>
                        <p><span className="font-medium">Sessions:</span> {course.weeklySessions} per week</p>
                        <p className="text-primary font-semibold">
                          {course.costPerSessions} {course.currency} per session
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">No courses matching your criteria were found.</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Pagination */}
          {!isLoading && courses.length > 0 && totalPages > 1 && (
            <Pagination className="my-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
                    className={currentPage === 0 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink 
                      isActive={currentPage === idx}
                      onClick={() => handlePageChange(idx)}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages - 1 && handlePageChange(currentPage + 1)}
                    className={currentPage >= totalPages - 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
