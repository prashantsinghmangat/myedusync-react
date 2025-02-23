
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
      const url = selectedBoard === "SelectBoard" || !selectedClass || !selectedSubject
        ? 'https://api.myedusync.com/getNotesLists?page=0&limit=10&board=CBSE&class=10&subject=Science'
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

          {/* Notes List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p className="col-span-full text-center text-gray-500">Loading notes...</p>
            ) : notes.length > 0 ? (
              notes.map((note: Note) => (
                <Card
                  key={note._id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleNoteClick(note._id)}
                >
                  <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">By {note.author}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {note.tags?.map((tag, index) => (
                        <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Created: {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No notes found for the selected criteria.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
