
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

const Notes = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<Board>("SelectBoard");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', selectedBoard, selectedClass, selectedSubject],
    queryFn: async () => {
      if (selectedBoard === "SelectBoard" || !selectedClass || !selectedSubject) {
        return [];
      }
      const response = await fetch(
        `https://www.myedusync.com/api/getNotesLists?page=0&limit=10&board=${selectedBoard}&class=${selectedClass}&subject=${selectedSubject}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      return response.json();
    },
    enabled: selectedBoard !== "SelectBoard" && !!selectedClass && !!selectedSubject,
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
            <Select onValueChange={handleBoardChange} value={selectedBoard}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CBSE">CBSE</SelectItem>
                <SelectItem value="ICSE">ICSE</SelectItem>
                <SelectItem value="UPBoard">UP Board</SelectItem>
              </SelectContent>
            </Select>

            {/* Class Selection */}
            {selectedBoard !== "SelectBoard" && (
              <Select
                onValueChange={handleClassChange}
                value={selectedClass?.toString() || ""}
              >
                <SelectTrigger className="w-full">
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
            )}

            {/* Subject Selection */}
            {selectedClass && (
              <Select
                onValueChange={handleSubjectChange}
                value={selectedSubject || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {data[selectedBoard].subjects[selectedClass].map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Notes List */}
          {selectedSubject && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <p className="col-span-full text-center text-gray-500">Loading notes...</p>
              ) : notes.length > 0 ? (
                notes.map((note: Note) => (
                  <Card
                    key={note.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleNoteClick(note.id)}
                  >
                    <CardHeader>
                      <CardTitle>{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{note.description}</p>
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
