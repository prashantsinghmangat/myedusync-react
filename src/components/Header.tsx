import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { User, LogOut, PenTool } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Success",
      description: "You have been logged out",
    });
    navigate("/login");
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
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
              <Link to="/blog" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
                Blog
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
                About Us
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

          {/* Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-4 shrink-0">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
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
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} py-4 border-t absolute left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg`}
        >
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
      </div>
    </header>
  );
};
