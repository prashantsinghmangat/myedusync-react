
import { useState } from "react";
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

const Notes = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<Board>("SelectBoard");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', selectedBoard, selectedClass, selectedSubject],
    queryFn: async () => {
      // Use isomorphic fetch that works in both browser and server environments
      const url = selectedBoard === "SelectBoard" || !selectedClass || !selectedSubject
        ? 'https://api.myedusync.com/getNotesLists?page=0&limit=10'
        : `https://www.myedusync.com/api/getNotesLists?page=0&limit=10&board=${selectedBoard}&class=${selectedClass}&subject=${selectedSubject}`;

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const responseData = await response.json();
      return responseData.data || [];
    },
    // Add SSR options
    initialData: [],
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

  const handleNoteClick = (note: Note) => {
    console.log("note data send: ", note);
    navigate(`/notes/${note._id}`, { state: { note } }); // Pass note in state
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Study Notes</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Board Selection */}
            <div className="space-y-2">
              <Label htmlFor="board-select">Board</Label>
              <Select onValueChange={handleBoardChange} value={selectedBoard}>
                <SelectTrigger className="w-full" id="board-select">
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="UPBoard">UP Board</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Class Selection */}
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

            {/* Subject Selection */}
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

          {/* Latest Notes Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Latest Study Notes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {notes.map((note) => (
                  <Card
                    key={note._id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleNoteClick(note)} // Pass the note to navigation
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
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
