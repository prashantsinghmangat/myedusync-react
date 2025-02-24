
import { useParams, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Note } from "@/types/notes";

const NoteDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const noteFromNav = location.state?.note as Note;

  const { data: fetchedNote, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: async () => {
      const response = await fetch(`https://api.myedusync.com/getNotesLists?page=0&limit=10&board=CBSE&class=10&subject=Science`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch note details');
      }
      
      const responseData = await response.json();
      const foundNote = responseData.data.find((note: Note) => note._id === id);
      
      if (!foundNote) {
        throw new Error('Note not found');
      }
      
      return foundNote;
    },
    enabled: !noteFromNav, // Only fetch if we don't have the note from navigation
  });

  const note = noteFromNav || fetchedNote;

  if (isLoading && !noteFromNav) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500">Loading note details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500">Note not found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl mb-4">{note.title}</CardTitle>
                  <p className="text-muted-foreground">By {note.author}</p>
                </div>
                {note.featuredImage && (
                  <img 
                    src={note.featuredImage}
                    alt={note.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="font-medium">Board:</span> {note.notesBoard}</p>
                    <p><span className="font-medium">Class:</span> {note.notesClass}</p>
                    <p><span className="font-medium">Subject:</span> {note.notesSubject}</p>
                    <p><span className="font-medium">Chapter:</span> {note.chapter}</p>
                  </div>
                </div>
                
                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Content</h3>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: note.body }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex flex-wrap gap-2">
                  {note.tags?.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-gray-500">
                  <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                  <p>Last updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NoteDetail;
