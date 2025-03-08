import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINTS } from '@/config/api';
import { Note } from "@/types/notes";
import { apiGet } from "@/utils/apiInterceptor";
import { NoteCardSkeleton } from "@/components/notes/NoteCardSkeleton";

export const LatestNotes = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['latestNotes'],
    queryFn: async () => {
      try {
        // Build URL with query parameters
        const queryParams = new URLSearchParams();
        queryParams.append('page', '0');
        queryParams.append('limit', '10');
        
        const url = `${API_ENDPOINTS.notes.list}?${queryParams.toString()}`;
        console.log("Fetching latest notes from:", url);
        
        const response = await apiGet(url, {
          requiresAuth: true,
        });

        const responseData = await response.json();
        
        // Check if the API returned a success response
        if (!responseData || !responseData.isSuccess) {
          console.error("API returned unsuccessful response:", responseData);
          throw new Error(responseData?.error || "Failed to load notes");
        }
        
        return responseData.data || [];
      } catch (error) {
        console.error("Error fetching notes:", error);
        throw error; // Let react-query handle the error
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  // Safely handle the notes data
  const notes = Array.isArray(data) ? data : [];

  const handleNoteClick = (noteId: string) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/20 text-secondary dark:text-secondary rounded-full text-sm font-medium mb-4">
            Latest Resources
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Study Notes</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access quality study materials prepared by our expert tutors to enhance your learning experience.
          </p>
        </div>
        
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">We're having trouble loading the latest notes right now.</p>
            <Button variant="outline" onClick={() => navigate('/notes')}>View All Notes</Button>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.length > 0 ? (
              notes.map((note: Note) => (
                <Card
                  key={note._id}
                  className="hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                  onClick={() => handleNoteClick(note._id)}
                >
                  <CardHeader>
                    {note.featuredImage && (
                      <img
                        src={note.featuredImage}
                        alt={note.title}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                      />
                    )}
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{note.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground dark:text-gray-400">By {note.author}</p>
                      <div className="flex flex-wrap gap-2">
                        {note.tags?.slice(0, 5).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-primary/20 text-primary dark:text-primary px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2">
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Subject:</span> {note.notesSubject}</p>
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Class:</span> {note.notesClass}</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Created: {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No notes available at the moment.</p>
              </div>
            )}
          </div>
        )}

        {!isLoading && error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                onClick={() => navigate('/notes')}
              >
                <CardHeader>
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-lg mb-4">
                    <span className="text-gray-400">Note preview</span>
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {index === 1 ? "Study Guide" : index === 2 ? "Exam Preparation" : "Key Concepts"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground dark:text-gray-400">By Expert Tutors</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-primary/20 text-primary dark:text-primary px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-700 dark:text-gray-300">Explore our comprehensive notes collection</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        View details
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/notes')}
            className="border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white"
          >
            View All Notes
          </Button>
        </div>
      </div>
    </section>
  );
};
