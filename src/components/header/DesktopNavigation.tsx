
import { Link } from "react-router-dom";
import { BookOpen, PenTool, Search } from "lucide-react";

interface DesktopNavigationProps {
  isLoggedIn: boolean;
  isTeacher: boolean;
}

export const DesktopNavigation = ({ isLoggedIn, isTeacher }: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex items-center justify-center flex-1 px-4">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <Link to="/" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
          Home
        </Link>
        <Link to="/notes" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
          Notes
        </Link>
        <Link to="/courses" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
          Courses
        </Link>
        <Link to="/tutor-finder" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium flex items-center gap-1">
          <Search className="h-4 w-4" />
          Find Tutors
        </Link>
        <Link to="/blog" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
          Blog
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
          About Us
        </Link>
        <Link to="/become-tutor" className="text-[#f57e2c] hover:text-[#e06a1b] transition-colors text-sm font-medium flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          Become a Tutor
        </Link>
        {isLoggedIn && isTeacher && (
          <Link 
            to="/whiteboard" 
            className="text-accent hover:text-accent-hover transition-colors text-sm font-medium flex items-center gap-1"
          >
            <PenTool className="h-4 w-4" />
            Whiteboard
          </Link>
        )}
      </div>
    </nav>
  );
};
