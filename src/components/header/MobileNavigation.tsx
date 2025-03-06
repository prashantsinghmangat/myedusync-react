
import { Link, useNavigate } from "react-router-dom";
import { PenTool, BookOpen, LogOut, LayoutDashboard, User, MessageCircle, Search } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface MobileNavigationProps {
  isLoggedIn: boolean;
  isTeacher: boolean;
  isMobileMenuOpen: boolean;
}

export const MobileNavigation = ({ 
  isLoggedIn, 
  isTeacher, 
  isMobileMenuOpen 
}: MobileNavigationProps) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const checkUserRole = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setUserRole(userData.role?.toLowerCase() || "");
      }
    };
    
    // Check on initial load
    checkUserRole();
    
    // Set up event listener for storage changes
    window.addEventListener("storage", checkUserRole);
    
    return () => {
      window.removeEventListener("storage", checkUserRole);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("You have been logged out");
    navigate("/login");
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("loginStatusChange"));
  };

  const getDashboardPath = () => {
    return userRole === "teacher" ? "/teacher/dashboard" : "/student/dashboard";
  };

  const getProfilePath = () => {
    return userRole === "teacher" ? "/teacher/profile" : "/student/profile";
  };

  if (!isMobileMenuOpen) {
    return null;
  }

  return (
    <div className="md:hidden block py-4 border-t absolute left-0 right-0 bg-white/95 dark:bg-gray-800 backdrop-blur-md shadow-lg z-50">
      <nav className="flex flex-col space-y-2 px-4">
        <Link to="/" className="text-gray-600 hover:text-accent transition-colors py-2">
          Home
        </Link>
        <Link to="/notes" className="text-gray-600 hover:text-accent transition-colors py-2">
          Notes
        </Link>
        <Link to="/courses" className="text-gray-600 hover:text-accent transition-colors py-2">
          Courses
        </Link>
        <Link to="/tutor-finder" className="text-gray-600 hover:text-accent transition-colors py-2 flex items-center gap-2">
          <Search className="h-4 w-4" />
          Find Tutors
        </Link>
        <Link to="/blog" className="text-gray-600 hover:text-accent transition-colors py-2">
          Blog
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-accent transition-colors py-2">
          About Us
        </Link>
        <Link to="/become-tutor" className="text-[#f57e2c] hover:text-[#e06a1b] transition-colors py-2 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Become a Tutor
        </Link>
        {isLoggedIn && isTeacher && (
          <Link 
            to="/whiteboard" 
            className="text-accent hover:text-accent-hover transition-colors py-2 flex items-center gap-2"
          >
            <PenTool className="h-4 w-4" />
            Whiteboard
          </Link>
        )}
        {isLoggedIn ? (
          <>
            <Link to={getDashboardPath()} className="text-gray-600 hover:text-accent transition-colors py-2 flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to={getProfilePath()} className="text-gray-600 hover:text-accent transition-colors py-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-accent transition-colors py-2 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </Link>
            <button
              onClick={handleLogout}
              className="text-left text-red-600 hover:text-red-700 transition-colors py-2 flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </>
        ) : (
          <div className="space-y-2 pt-2">
            <Link to="/login" className="block">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
            <Link to="/register" className="block">
              <Button variant="orange" className="w-full">
                Register
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
