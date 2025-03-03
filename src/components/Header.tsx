
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./header/Logo";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { UserMenu } from "./header/UserMenu";
import { AuthButtons } from "./header/AuthButtons";
import { MobileMenuToggle } from "./header/MobileMenuToggle";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setIsTeacher(userData.role === "Teacher");
    } else {
      setIsLoggedIn(false);
      setIsTeacher(false);
    }

    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setIsTeacher(userData.role === "Teacher");
      } else {
        setIsLoggedIn(false);
        setIsTeacher(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <DesktopNavigation isLoggedIn={isLoggedIn} isTeacher={isTeacher} />

          {/* Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? <UserMenu /> : <AuthButtons />}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <MobileMenuToggle 
              isMobileMenuOpen={isMobileMenuOpen} 
              toggleMobileMenu={toggleMobileMenu} 
            />
          </div>
        </div>

        <MobileNavigation
          isLoggedIn={isLoggedIn}
          isTeacher={isTeacher}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>
    </header>
  );
};
