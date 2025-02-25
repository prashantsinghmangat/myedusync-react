
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setIsTeacher(userData.role === "teacher");
    } else {
      setIsLoggedIn(false);
      setIsTeacher(false);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setIsTeacher(userData.role === "teacher");
      } else {
        setIsLoggedIn(false);
        setIsTeacher(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/2557202f-2fb8-4411-aded-c15cc766021d.png" 
              alt="MyEduSync Logo" 
              className="h-8"
            />
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
              Home
            </Link>
            <Link to="/notes" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
              Notes
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
              Courses
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
              About Us
            </Link>
            {isTeacher && (
              <Link to="/add-notes" className="text-accent hover:text-accent-hover transition-colors text-sm font-medium">
                Add Notes
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="h-5 w-5 text-gray-600" />
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-accent hover:bg-accent-hover text-sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} py-4 border-t`}>
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-600 hover:text-accent transition-colors px-4 py-2">
              Home
            </Link>
            <Link to="/notes" className="text-gray-600 hover:text-accent transition-colors px-4 py-2">
              Notes
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-accent transition-colors px-4 py-2">
              Courses
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-accent transition-colors px-4 py-2">
              Blog
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-accent transition-colors px-4 py-2">
              About Us
            </Link>
            {isTeacher && (
              <Link to="/add-notes" className="text-accent hover:text-accent-hover transition-colors px-4 py-2">
                Add Notes
              </Link>
            )}
            {isLoggedIn ? (
              <Link to="/profile" className="text-gray-600 hover:text-accent transition-colors px-4 py-2">
                Profile
              </Link>
            ) : (
              <div className="space-y-2 px-4">
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
      </div>
    </header>
  );
};
