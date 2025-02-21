
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    // Listen for storage changes
    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            MyEduSync
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
            <Link to="/about" className="text-gray-600 hover:text-accent transition-colors">
              About Us
            </Link>
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
                <Button className="bg-accent hover:bg-accent-hover">
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
