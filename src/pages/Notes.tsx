import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Board, DataStructure, Note } from "@/types/notes";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS } from "@/config/api";
import { apiGet } from "@/utils/apiInterceptor";
import { SEO } from "@/components/SEO";
import { NoteCardSkeleton } from "@/components/notes/NoteCardSkeleton";

const Notes = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<Board>("SelectBoard");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', selectedBoard, selectedClass, selectedSubject],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.append('page', '0');
      queryParams.append('limit', '10');
      
      if (selectedBoard && selectedBoard !== "SelectBoard") {
        queryParams.append('board', selectedBoard);
      }
      
      if (selectedClass) {
        queryParams.append('class', selectedClass.toString());
      }
      
      if (selectedSubject) {
        queryParams.append('subject', selectedSubject);
      }
      
      const url = `${API_ENDPOINTS.notes.list}?${queryParams.toString()}`;
      console.log("Fetching notes from:", url); // Debugging API URL

      try {
        const response = await apiGet(url, { requiresAuth: true });
        const responseData = await response.json();

        console.log("API Response:", responseData); // Debugging response

        return responseData.data || []; // Ensure responseData.data exists
      } catch (error) {
        console.error("Error fetching notes:", error);
        return []; // Return empty array to avoid breaking UI
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const data: Record<Board, DataStructure> = {
    SelectBoard: createDataStructure(),
    CBSE: createDataStructure(),
    ICSE: createDataStructure(),
    UPBoard: createDataStructure(),
  };

  function createDataStructure(): DataStructure {
    return {
      classes: [8, 9, 10, 11, 12],
      subjects: {
        8: ["Hindi", "English", "Mathematics", "Science"],
        9: ["Hindi", "English", "Mathematics", "Science"],
        10: ["Hindi", "English", "Mathematics", "Science", "Chemistry"],
        11: ["Physics", "Chemistry", "Mathematics", "Biology", "Science"],
        12: [
          "Physics",
          "Chemistry",
          "Mathematics",
          "Biology",
          "Computer Science",
        ],
      },
    };
  }

  const handleBoardChange = (value: Board) => {
    setSelectedBoard(value);
    setSelectedClass(null);
    setSelectedSubject(null);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(Number(value));
    setSelectedSubject(null);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const handleNoteClick = (noteId: string) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Study Notes" 
        description="Browse educational notes from various subjects and boards"
      />
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Study Notes</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="board-select">Board</Label>
              <Select onValueChange={handleBoardChange} value={selectedBoard}>
                <SelectTrigger className="w-full" id="board-select">
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SelectBoard">All Boards</SelectItem>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="UPBoard">UP Board</SelectItem>
                  <SelectItem value="CentralUniversity">Central University</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class-select">Class</Label>
              <Select
                onValueChange={handleClassChange}
                value={selectedClass?.toString() || ""}
              >
                <SelectTrigger className="w-full" id="class-select">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {data[selectedBoard].classes.map((classNum) => (
                    <SelectItem key={classNum} value={classNum.toString()}>
                      Class {classNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject-select">Subject</Label>
              <Select
                onValueChange={handleSubjectChange}
                value={selectedSubject || ""}
              >
                <SelectTrigger className="w-full" id="subject-select">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {selectedClass && data[selectedBoard].subjects[selectedClass].map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Latest Study Notes</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <NoteCardSkeleton key={index} />
                  ))}
                </div>
              ) : notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {notes.map((note) => (
                    <Card
                      key={note._id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
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
                        <CardTitle className="text-xl">{note.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">By {note.author}</p>
                          <div className="flex flex-wrap gap-2">
                            {note.tags?.slice(0, 5).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="pt-2">
                            <p><span className="font-medium">Subject:</span> {note.notesSubject}</p>
                            <p><span className="font-medium">Class:</span> {note.notesClass}</p>
                            <p className="text-sm text-muted-foreground">
                              Created: {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No notes found. Please select different filters.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
