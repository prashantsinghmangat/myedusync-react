
import { Link, useNavigate } from "react-router-dom";
import { PenTool, BookOpen, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Success",
      description: "You have been logged out",
    });
    navigate("/login");
  };

  if (!isMobileMenuOpen) {
    return null;
  }

  return (
    <div className="md:hidden block py-4 border-t absolute left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
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
        <Link to="/blog" className="text-gray-600 hover:text-accent transition-colors py-2">
          Blog
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-accent transition-colors py-2">
          About Us
        </Link>
        <Link to="/become-tutor" className="text-blue-600 hover:text-blue-700 transition-colors py-2 flex items-center gap-2">
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
            <Link to="/profile" className="text-gray-600 hover:text-accent transition-colors py-2">
              Profile
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
              <Button className="w-full bg-accent hover:bg-accent-hover">
                Register
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
