
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NoteDetail = () => {
  const { id } = useParams();

  const { data: note, isLoading } = useQuery({
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
      const foundNote = responseData.data.find((note: any) => note._id === id);
      
      if (!foundNote) {
        throw new Error('Note not found');
      }
      
      return foundNote;
    },
  });

  if (isLoading) {
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
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="font-medium">Board:</span> {note.notesBoard}</p>
                    <p><span className="font-medium">Class:</span> {note.notesClass}</p>
                    <p><span className="font-medium">Subject:</span> {note.notesSubject}</p>
                    <p><span className="font-medium">Chapter:</span> {note.chapter}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {note.tags?.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-500">
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
