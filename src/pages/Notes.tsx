
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
import { Button } from "@/components/ui/button";
import { Board, DataStructure, Note } from "@/types/notes";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS } from "@/config/api";
import { apiGet } from "@/utils/apiInterceptor";
import { SEO } from "@/components/SEO";
import { NoteCardSkeleton } from "@/components/notes/NoteCardSkeleton";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { X } from "lucide-react";

const Notes = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<Board>("SelectBoard");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', selectedBoard, selectedClass, selectedSubject, currentPage],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('page', currentPage.toString());
        queryParams.append('limit', itemsPerPage.toString());
        
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

        const response = await apiGet(url, { requiresAuth: true });
        const responseData = await response.json();
        
        // Calculate total pages
        if (responseData.pagination) {
          setTotalPages(Math.ceil(responseData.pagination.total / itemsPerPage));
        }

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
    setCurrentPage(0);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(Number(value));
    setSelectedSubject(null);
    setCurrentPage(0);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setCurrentPage(0);
  };

  const handleNoteClick = (noteId: string) => {
    navigate(`/notes/${noteId}`);
  };

  const clearFilters = () => {
    setSelectedBoard("SelectBoard");
    setSelectedClass(null);
    setSelectedSubject(null);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Check if any filters are active
  const isFiltersActive = selectedBoard !== "SelectBoard" || selectedClass !== null || selectedSubject !== null;

  // Generate pagination items
  const paginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    // Calculate range of pages to display
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }
    
    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
          className={currentPage === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );
    
    // First page
    if (startPage > 0) {
      items.push(
        <PaginationItem key={0}>
          <PaginationLink onClick={() => handlePageChange(0)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Ellipsis if needed
      if (startPage > 1) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Last page
    if (endPage < totalPages - 1) {
      // Ellipsis if needed
      if (endPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={totalPages - 1}>
          <PaginationLink onClick={() => handlePageChange(totalPages - 1)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          onClick={() => currentPage < totalPages - 1 && handlePageChange(currentPage + 1)}
          className={currentPage >= totalPages - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );
    
    return items;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Study Notes" 
        description="Browse educational notes from various subjects and boards"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Educational Study Notes",
          "description": "Browse comprehensive study notes for various boards, classes, and subjects",
          "url": "https://myedusync.com/notes",
          "isPartOf": {
            "@type": "WebSite",
            "name": "MyEduSync",
            "url": "https://myedusync.com"
          }
        }}
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
                value={selectedClass?.toString() || "no-class"}
                disabled={!selectedBoard || selectedBoard === "SelectBoard"}
              >
                <SelectTrigger className="w-full" id="class-select">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-class">All Classes</SelectItem>
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
                value={selectedSubject || "no-subject"}
                disabled={!selectedClass}
              >
                <SelectTrigger className="w-full" id="subject-select">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-subject">All Subjects</SelectItem>
                  {selectedClass && data[selectedBoard].subjects[selectedClass].map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {isFiltersActive && (
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          )}

          <section className="py-12">
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

              {/* Pagination */}
              {notes.length > 0 && totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      {paginationItems()}
                    </PaginationContent>
                  </Pagination>
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
