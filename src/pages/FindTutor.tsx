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
import { Button } from "@/components/ui/button";
import { Star, Filter, Grid, List, Phone } from "lucide-react";
import { generateStructuredData } from "@/utils/seo";

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // SEO titles and descriptions based on filters
  const getPageTitle = () => {
    let title = 'Find Tutors';
    if (subject && subject !== 'all-subjects') {
      title = `${subject} Tutors`;
      if (classLevel && classLevel !== 'all-classes') {
        title += ` for Class ${classLevel}`;
      }
      if (board && board !== 'all-boards') {
        title += ` (${board.toUpperCase()})`;
      }
    }
    return title;
  };
  
  const getPageDescription = () => {
    let desc = 'Find your perfect private tutor and arrange a Free Video Meeting. Then book one-to-one Online Lessons to fit your schedule.';
    if (subject && subject !== 'all-subjects') {
      desc = `Find qualified ${subject} tutors`;
      if (location && location !== 'all-locations') {
        desc += ` in ${location}`;
      }
      if (mode && mode !== 'all-modes') {
        desc += ` for ${mode.toLowerCase()} lessons`;
      }
      desc += '. Book a free consultation today!';
    }
    return desc;
  };
  
  // Structured data for this page
  const pageStructuredData = generateStructuredData('Service', {
    name: getPageTitle(),
    description: getPageDescription(),
    provider: {
      '@type': 'Organization',
      name: 'MyEduSync',
      url: 'https://myedusync.com'
    },
    serviceType: 'Tutoring Service',
    areaServed: location && location !== 'all-locations' ? location : 'India'
  });

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
          // Add dummy data for demo purposes
          const enhancedData = responseData.data.map((tutor: Tutor, index: number) => ({
            ...tutor,
            hourlyRate: `₹${500 + (index * 100)}-₹${700 + (index * 100)}`,
            rating: 4.5 + (Math.random() * 0.5),
            reviewCount: Math.floor(Math.random() * 100) + 5,
            lessonsCompleted: Math.floor(Math.random() * 1000) + 50,
            responseTime: Math.random() > 0.3 ? 'quick' : undefined
          }));
          setTutors(enhancedData);
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
        title={getPageTitle()} 
        description={getPageDescription()}
        structuredData={pageStructuredData}
      />
      <Header />
      <main className="flex-grow py-12 md:py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Private tutors that fit your schedule
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Find your perfect private tutor and arrange a Free Video Meeting. Then book one-to-one Online Lessons to fit your schedule.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" variant="orange" className="min-w-40">
                Book a tutor
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(n => (
                    <Star key={n} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Excellent 4.8 out of 5
                </span>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="grid grid-cols-1 gap-6">
            {/* Filters */}
            <div className="mb-8">
              {/* Desktop Filters */}
              <div className="hidden lg:grid grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subject</label>
                  <TutorFilters.Select 
                    value={subject}
                    onChange={(val) => setSubject(val)}
                    options={[
                      { value: 'all-subjects', label: 'All subjects' },
                      { value: 'Mathematics', label: 'Mathematics' },
                      { value: 'Physics', label: 'Physics' },
                      { value: 'Chemistry', label: 'Chemistry' },
                      // ... keep other subjects
                    ]}
                    placeholder="Select subject"
                  />
                </div>
                
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Class Level</label>
                  <TutorFilters.Select 
                    value={classLevel}
                    onChange={(val) => setClassLevel(val)}
                    options={[
                      { value: 'all-classes', label: 'All levels' },
                      // ... keep class options
                    ]}
                    placeholder="Select class"
                  />
                </div>
                
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Price</label>
                  <TutorFilters.Select 
                    value="all-prices" 
                    onChange={() => {}}
                    options={[
                      { value: 'all-prices', label: 'All prices' },
                      { value: 'under-500', label: 'Under ₹500/hr' },
                      { value: '500-1000', label: '₹500-₹1000/hr' },
                      { value: 'over-1000', label: 'Over ₹1000/hr' }
                    ]}
                    placeholder="Select price range"
                  />
                </div>
                
                <div className="col-span-3 lg:col-span-1 flex items-end">
                  <Button variant="outline" className="w-full" onClick={() => setIsFilterOpen(true)}>
                    <Filter className="h-4 w-4 mr-2" />
                    More filters
                  </Button>
                </div>
                
                <div className="col-span-3 lg:col-span-1 flex items-end justify-end gap-2">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="h-9 w-9"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="h-9 w-9"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Mobile Filter Button */}
              <div className="flex lg:hidden justify-between items-center mb-4">
                <Button variant="outline" className="flex-1 mr-2" onClick={() => setIsFilterOpen(true)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="h-9 w-9"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="h-9 w-9"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Full Filters Component */}
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Results Column */}
              <div className="lg:col-span-3">
                {/* Results Count */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Found {tutors.length} tutors matching your criteria
                  </p>
                </div>

                {/* Tutor Grid Component */}
                <TutorGrid tutors={tutors} loading={loading} view={viewMode} />
              </div>
              
              {/* Right Sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <img 
                        src="/lovable-uploads/725a0bd8-965b-40be-a3ec-7fff97808f29.png" 
                        alt="Need help finding a tutor" 
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Looking for something specific?</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Let us know what you're looking for and our tutor matching team will help you find the perfect fit.
                    </p>
                    <Button variant="orange" className="w-full mb-4">
                      Find me a tutor
                    </Button>
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Or call</p>
                      <a href="tel:+918888888888" className="flex items-center justify-center text-accent font-medium hover:underline">
                        <Phone className="h-4 w-4 mr-2" />
                        +91 8888-888-888
                      </a>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        to speak to a tutor expert
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FindTutor;