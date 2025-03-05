
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface TutorFiltersProps {
  subject: string;
  setSubject: (value: string) => void;
  classLevel: string;
  setClassLevel: (value: string) => void;
  board: string;
  setBoard: (value: string) => void;
  mode: string;
  setMode: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
}

// Options for the filter dropdowns
const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const boardOptions = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE'];
const subjectOptions = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
const modeOptions = ['Online', 'Offline', 'Hybrid'];

export const TutorFilters = ({
  subject,
  setSubject,
  classLevel,
  setClassLevel,
  board,
  setBoard,
  mode,
  setMode,
  location,
  setLocation,
  applyFilters,
  resetFilters,
  isFilterOpen,
  setIsFilterOpen
}: TutorFiltersProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search by subject, board, class..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="pl-10"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button 
          variant="outline" 
          className="flex-shrink-0"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button 
          variant="orange"
          className="flex-shrink-0"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Subject</SelectItem>
                {subjectOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select value={classLevel} onValueChange={setClassLevel}>
              <SelectTrigger id="class">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Class</SelectItem>
                {classOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="board">Board</Label>
            <Select value={board} onValueChange={setBoard}>
              <SelectTrigger id="board">
                <SelectValue placeholder="Select Board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Board</SelectItem>
                {boardOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mode">Mode</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger id="mode">
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Mode</SelectItem>
                {modeOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-5 flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={resetFilters}>Reset</Button>
            <Button variant="orange" onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};
