
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface TutorFiltersProps {
  subject: string;
  setSubject: (subject: string) => void;
  classLevel: string;
  setClassLevel: (classLevel: string) => void;
  board: string;
  setBoard: (board: string) => void;
  mode: string;
  setMode: (mode: string) => void;
  location: string;
  setLocation: (location: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

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
  // Available filter options
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Geography", "History"];
  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const boards = ["CBSE", "ICSE", "IB", "State Board"];
  const modes = ["Online", "Offline", "Hybrid"];
  const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "India"];

  return (
    <div className="mb-8">
      {/* Desktop Filters */}
      <div className="hidden md:block bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subject</label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Class</label>
            <Select value={classLevel} onValueChange={setClassLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Classes</SelectItem>
                {classes.map((c) => (
                  <SelectItem key={c} value={c}>Class {c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Board</label>
            <Select value={board} onValueChange={setBoard}>
              <SelectTrigger>
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Boards</SelectItem>
                {boards.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Mode</label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Modes</SelectItem>
                {modes.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" onClick={resetFilters}>
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="orange" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
      
      {/* Mobile Filters */}
      <div className="md:hidden">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Tutors</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Class</label>
                <Select value={classLevel} onValueChange={setClassLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Classes</SelectItem>
                    {classes.map((c) => (
                      <SelectItem key={c} value={c}>Class {c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Board</label>
                <Select value={board} onValueChange={setBoard}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Boards</SelectItem>
                    {boards.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Mode</label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Modes</SelectItem>
                    {modes.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="orange" onClick={() => { applyFilters(); }}>
                Apply Filters
              </Button>
              <Button variant="outline" onClick={() => { resetFilters(); }}>
                Reset Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Active filters display */}
      {(subject || classLevel || board || mode || location) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {subject && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Subject: {subject}
              <button onClick={() => setSubject('')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {classLevel && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Class: {classLevel}
              <button onClick={() => setClassLevel('')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {board && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Board: {board}
              <button onClick={() => setBoard('')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {mode && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Mode: {mode}
              <button onClick={() => setMode('')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {location && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Location: {location}
              <button onClick={() => setLocation('')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
