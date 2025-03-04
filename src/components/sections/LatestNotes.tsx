
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINTS } from '@/config/api';
import { Note } from "@/types/notes";
import { useEffect } from "react";
// import { useLoading } from "@/providers/LoadingProvider";
import { apiGet } from "@/utils/apiInterceptor";

export const LatestNotes = () => {
  const navigate = useNavigate();
  // const { setIsLoading } = useLoading();

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['latestNotes'],
    queryFn: async () => {
      const response = await apiGet(API_ENDPOINTS.notes.list + '?page=0&limit=10', {
        requiresAuth: true,
      });

      const data = await response.json();
      return data?.data || [];
    },
  });

  // Show global loader during API calls
  // useEffect(() => {
  //   setIsLoading(isLoading);
  // }, [isLoading, setIsLoading]);

  const handleNoteClick = (note: Note) => {
    console.log("note data send: ", note);
    navigate(`/notes/${note._id}`, { state: { note } }); // Pass note in state
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <Card
              key={note._id}
              className="hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
              onClick={() => handleNoteClick(note)}
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
          ))}
        </div>
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
