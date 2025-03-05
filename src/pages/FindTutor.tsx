import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLoading } from "@/providers/LoadingProvider";
import { toast } from "sonner";
import { apiGet } from "@/utils/apiInterceptor";
import { TutorFilters } from "@/components/tutor-finder/TutorFilters";
import { TutorGrid, Tutor } from "@/components/tutor-finder/TutorGrid";

const FindTutor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsLoading } = useLoading();
  
  // Filter states - initialize with "all-X" values instead of empty strings
  const [subject, setSubject] = useState(searchParams.get('subject') || 'all-subjects');
  const [classLevel, setClassLevel] = useState(searchParams.get('class') || 'all-classes');
  const [board, setBoard] = useState(searchParams.get('board') || 'all-boards');
  const [mode, setMode] = useState(searchParams.get('mode') || 'all-modes');
  const [location, setLocation] = useState(searchParams.get('location') || 'all-locations');
  
  // Results state
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      setIsLoading(true);
      
      try {
        // Build URL with any existing filter params, but convert "all-X" to empty string for API
        const params = new URLSearchParams();
        if (subject && subject !== 'all-subjects') params.append('subject', subject);
        if (classLevel && classLevel !== 'all-classes') params.append('class', classLevel);
        if (board && board !== 'all-boards') params.append('board', board);
        if (mode && mode !== 'all-modes') params.append('mode', mode);
        if (location && location !== 'all-locations') params.append('location', location);
        
        // Use the new API endpoint
        const url = `https://api.myedusync.com/getTutorList?${params.toString()}`;
        const response = await apiGet(url);
        const responseData = await response.json();
        
        if (responseData && responseData.isSuccess && Array.isArray(responseData.data)) {
          setTutors(responseData.data);
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
    if (subject && subject !== 'all-subjects') params.append('subject', subject);
    if (classLevel && classLevel !== 'all-classes') params.append('class', classLevel);
    if (board && board !== 'all-boards') params.append('board', board);
    if (mode && mode !== 'all-modes') params.append('mode', mode);
    if (location && location !== 'all-locations') params.append('location', location);
    
    setSearchParams(params);
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSubject('all-subjects');
    setClassLevel('all-classes');
    setBoard('all-boards');
    setMode('all-modes');
    setLocation('all-locations');
    setSearchParams({});
  };

  return (
    <>
      <SEO 
        title={subject && subject !== 'all-subjects' ? `${subject} Tutors - MyEduSync` : "Find Tutors - MyEduSync"} 
        description="Find the best tutors for your educational needs on MyEduSync."
      />
      <Header />
      <main className="flex-grow py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {subject && subject !== 'all-subjects' ? `${subject} Tutors` : "Find Your Perfect Tutor"}
              {classLevel && classLevel !== 'all-classes' && ` for ${classLevel}`}
              {board && board !== 'all-boards' && ` (${board.toUpperCase()})`}
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