
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Filter, X, Check, ChevronDown } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
}

// Custom Select Component for the new design
const CustomSelect = ({ value, onChange, options, placeholder }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  
  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-between w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-left text-sm">
          <span className="text-gray-900 dark:text-gray-100">{selectedLabel}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(var(--radix-popover-trigger-width))] p-0">
        <div className="max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              className={`flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                value === option.value ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="h-4 w-4 text-accent" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

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

  // Create option arrays for the custom select
  const subjectOptions = [
    { value: 'all-subjects', label: 'All Subjects' },
    ...subjects.map(s => ({ value: s, label: s }))
  ];
  
  const classOptions = [
    { value: 'all-classes', label: 'All Classes' },
    ...classes.map(c => ({ value: c, label: `Class ${c}` }))
  ];
  
  const boardOptions = [
    { value: 'all-boards', label: 'All Boards' },
    ...boards.map(b => ({ value: b, label: b }))
  ];
  
  const modeOptions = [
    { value: 'all-modes', label: 'All Modes' },
    ...modes.map(m => ({ value: m, label: m }))
  ];
  
  const locationOptions = [
    { value: 'all-locations', label: 'All Locations' },
    ...locations.map(l => ({ value: l, label: l }))
  ];

  return (
    <div className="mb-4">
      {/* Detailed Filter Sheet */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Advanced Filters</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subject</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-subjects">All Subjects</SelectItem>
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
                  <SelectItem value="all-classes">All Classes</SelectItem>
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
                  <SelectItem value="all-boards">All Boards</SelectItem>
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
                  <SelectItem value="all-modes">All Modes</SelectItem>
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
                  <SelectItem value="all-locations">All Locations</SelectItem>
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
      
      {/* Active filters display */}
      {(subject !== 'all-subjects' || classLevel !== 'all-classes' || board !== 'all-boards' || mode !== 'all-modes' || location !== 'all-locations') && (
        <div className="flex flex-wrap gap-2 mt-4">
          {subject && subject !== "all-subjects" && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Subject: {subject}
              <button onClick={() => setSubject('all-subjects')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {classLevel && classLevel !== "all-classes" && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Class: {classLevel}
              <button onClick={() => setClassLevel('all-classes')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {board && board !== "all-boards" && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Board: {board}
              <button onClick={() => setBoard('all-boards')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {mode && mode !== "all-modes" && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Mode: {mode}
              <button onClick={() => setMode('all-modes')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {location && location !== "all-locations" && (
            <div className="inline-flex items-center bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">
              Location: {location}
              <button onClick={() => setLocation('all-locations')} className="ml-1 focus:outline-none">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Export the Custom Select separately for use in other components
TutorFilters.Select = CustomSelect;
