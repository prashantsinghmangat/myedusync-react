
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Note } from "@/types/notes";
import { ChevronLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { API_ENDPOINTS } from "@/config/api";
import { apiGet } from "@/utils/apiInterceptor";
import { NoteDetailSkeleton } from "@/components/notes/NoteDetailSkeleton";
import { RecentNotesSkeleton } from "@/components/notes/RecentNotesSkeleton";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [noteLoading, setNoteLoading] = useState(true);
  const [recentNotesLoading, setRecentNotesLoading] = useState(true);
  const [note, setNote] = useState<Note | null>(null);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);

  // Fetch note details using API
  useEffect(() => {
    if (!id) return;
    
    setNoteLoading(true);
    
    apiGet(`${API_ENDPOINTS.notes.detail(id)}`, {
      requiresAuth: true
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess && data.data) {
          setNote(data.data);
        } else {
          console.error("Error fetching note details:", data);
        }
        setNoteLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching note details:", error);
        setNoteLoading(false);
      });
  }, [id]);

  // Fetch recent notes
  useEffect(() => {
    setRecentNotesLoading(true);
    
    apiGet(`${API_ENDPOINTS.notes.list}?page=0&limit=5`, {
      requiresAuth: true
    })
      .then((res) => res.json())
      .then((data) => {
        setRecentNotes(data.data || []);
        setRecentNotesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recent notes:", error);
        setRecentNotesLoading(false);
      });
  }, []);

  // Combined loading state for any initial render logic
  useEffect(() => {
    setLoading(noteLoading || recentNotesLoading);
  }, [noteLoading, recentNotesLoading]);

  if (!id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex justify-center items-center pt-20">
          <p className="text-center text-gray-500">No note ID provided.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={note?.title || "Note Details"} 
        description={`Educational notes on ${note?.notesSubject || "various subjects"}`}
      />
      <Header />
      <main className="flex-grow pt-20"> {/* Added pt-20 to prevent hiding under header */}
        <div className="container mx-auto px-4 lg:flex gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 w-full mx-auto">
            {/* Breadcrumb and Back Button */}
            <div className="flex items-center gap-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/notes")}
                className="hover:bg-gray-200 rounded-full p-2"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </Button>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => navigate("/notes")}
                >
                  Notes
                </span>{" "}
                / {noteLoading ? "Loading..." : note?.title}
              </p>
            </div>

            {noteLoading ? (
              <NoteDetailSkeleton />
            ) : note ? (
              <Card className="p-6">
                <CardHeader>
                  <div className="text-center">
                    <CardTitle className="text-4xl font-bold mb-2">{note.title}</CardTitle>
                    <p className="text-gray-500 text-sm">By {note.author}</p>
                  </div>
                </CardHeader>

                {note.featuredImage && (
                  <div className="flex justify-center my-6">
                    <img
                      src={note.featuredImage}
                      alt={note.title}
                      className="w-full max-h-[500px] object-cover rounded-lg shadow"
                    />
                  </div>
                )}

                <CardContent>
                  <div className="space-y-6">
                    {/* Note Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Details</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <p><span className="font-medium">Board:</span> {note.notesBoard}</p>
                        <p><span className="font-medium">Class:</span> {note.notesClass}</p>
                        <p><span className="font-medium">Subject:</span> {note.notesSubject}</p>
                        <p><span className="font-medium">Chapter:</span> {note.chapter}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Note Content */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Content</h3>
                      <div
                        className="prose prose-lg max-w-none break-words"
                        dangerouslySetInnerHTML={{ __html: note.body || "" }}
                      />
                    </div>

                    <Separator />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {note.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-blue-200 transition"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Metadata */}
                    <div className="text-sm text-gray-500">
                      <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                      <p>Last updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-center text-gray-500">No note data found for ID: {id}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 w-full mt-8 lg:mt-0">
            {/* Recent Notes Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Recent Notes</h3>
              {recentNotesLoading ? (
                <RecentNotesSkeleton count={5} />
              ) : recentNotes.length > 0 ? (
                <div className="space-y-4">
                  {recentNotes.map((recentNote) => (
                    <Card
                      key={recentNote._id}
                      className="cursor-pointer hover:shadow-lg transition"
                      onClick={() => navigate(`/notes/${recentNote._id}`)}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        {recentNote.featuredImage && (
                          <img
                            src={recentNote.featuredImage}
                            alt={recentNote.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-medium">{recentNote.title}</p>
                          <p className="text-gray-500 text-sm">{recentNote.notesSubject}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent notes available.</p>
              )}
            </div>

            {/* Categories Section */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <p className="text-gray-700">📘 Class 10 Notes</p>
                <p className="text-gray-700">📗 Class 12 Notes</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NoteDetail;
