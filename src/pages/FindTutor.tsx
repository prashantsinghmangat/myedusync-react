
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLoading } from "@/providers/LoadingProvider";
import { toast } from "sonner";
import { apiGet } from "@/utils/apiInterceptor";
import { Course } from "@/types/courses";
import { TutorFilters } from "@/components/tutor-finder/TutorFilters";
import { TutorGrid } from "@/components/tutor-finder/TutorGrid";

const FindTutor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsLoading } = useLoading();
  
  // Filter states
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [classLevel, setClassLevel] = useState(searchParams.get('class') || '');
  const [board, setBoard] = useState(searchParams.get('board') || '');
  const [mode, setMode] = useState(searchParams.get('mode') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  
  // Results state
  const [tutors, setTutors] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      setIsLoading(true);
      
      try {
        // Build URL with any existing filter params
        const params = new URLSearchParams();
        if (subject) params.append('subject', subject);
        if (classLevel) params.append('class', classLevel);
        if (board) params.append('board', board);
        if (mode) params.append('mode', mode);
        if (location) params.append('location', location);
        
        const url = `https://api.myedusync.com/find-tutor?${params.toString()}&page=0&limit=10`;
        const response = await apiGet(url);
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          setTutors(data);
        } else {
          setTutors([]);
          toast.error("Failed to load tutors");
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
        toast.error("Error loading tutors. Please try again.");
        setTutors([]);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [subject, classLevel, board, mode, location, setIsLoading]);

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

  return (
    <>
      <SEO 
        title={subject ? `${subject} Tutors - MyEduSync` : "Find Tutors - MyEduSync"} 
        description="Find the best tutors for your educational needs on MyEduSync."
      />
      <Header />
      <main className="flex-grow py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {subject ? `${subject} Tutors` : "Find Your Perfect Tutor"}
              {classLevel && ` for ${classLevel}`}
              {board && ` (${board.toUpperCase()})`}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">
              Browse through our qualified tutors or use filters to narrow down your search
            </p>

            {/* Filters Component */}
            <TutorFilters 
              subject={subject}
              setSubject={setSubject}
              classLevel={classLevel}
              setClassLevel={setClassLevel}
              board={board}
              setBoard={setBoard}
              mode={mode}
              setMode={setMode}
              location={location}
              setLocation={setLocation}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Found {tutors.length} tutors matching your criteria
              </p>
            </div>

            {/* Tutor Grid Component */}
            <TutorGrid tutors={tutors} loading={loading} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FindTutor;
