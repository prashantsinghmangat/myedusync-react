
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";
import { apiGet } from "@/utils/apiInterceptor";
import { useLoading } from "@/providers/LoadingProvider";

const FindTutor = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get('subject') || '';
  const classLevel = queryParams.get('class') || '';
  const board = queryParams.get('board') || '';
  
  const { setIsLoading } = useLoading();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      setIsLoading(true);
      
      try {
        const url = `https://api.myedusync.com/find-tutor?page=0&limit=10&board=${board}&class=${classLevel}&subject=${subject}`;
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

    if (subject && classLevel && board) {
      fetchTutors();
    }
  }, [subject, classLevel, board, setIsLoading]);

  const tutorImages = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  ];

  // Function to get a random tutor image
  const getRandomTutorImage = (index) => {
    return tutorImages[index % tutorImages.length];
  };

  return (
    <>
      <SEO 
        title={`${subject} Tutors for ${classLevel} - MyEduSync`} 
        description={`Find the best ${subject} tutors for ${classLevel} ${board} board on MyEduSync.`}
      />
      <Header />
      <main className="flex-grow py-20 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {subject} Tutors for {classLevel} ({board.toUpperCase()})
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Found {tutors.length} tutors based on your criteria
            </p>
          </div>

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
          ) : tutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor, index) => (
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
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{tutor.subject}</span>
                      <span className="text-primary">{tutor.costPerSessions} {tutor.currency}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
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
                        <span className="font-medium">{tutor.language}</span>
                      </div>
                      
                      {tutor.aboutThisCourse && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">About this course:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{tutor.aboutThisCourse}</p>
                        </div>
                      )}
                      
                      <button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white py-2 rounded">
                        Contact Tutor
                      </button>
                    </div>
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

export default FindTutor;
