
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

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
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/2557202f-2fb8-4411-aded-c15cc766021d.png" 
              alt="MyEduSync Logo" 
              className="h-8"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/notes" className="text-gray-600 hover:text-accent transition-colors">
              Notes
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-accent transition-colors">
              Courses
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-accent transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-accent transition-colors">
              About Us
            </Link>
            {isTeacher && (
              <Link to="/add-notes" className="text-accent hover:text-accent-hover transition-colors">
                Add Notes
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <Button variant="outline">Profile</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="hidden md:inline-flex">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-accent hover:bg-accent-hover">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
