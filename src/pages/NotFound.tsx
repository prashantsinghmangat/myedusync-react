
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <SEO 
        title="Page Not Found - MyEduSync" 
        description="The page you're looking for doesn't exist or has been moved."
      />
      <Header />
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-8 overflow-hidden relative bg-gray-50 dark:bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-yellow-300 opacity-70"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-sm bg-blue-300 opacity-50 rotate-12"></div>
          <div className="absolute top-1/3 right-20 w-6 h-6 rounded-full bg-orange-300 opacity-70"></div>
          <div className="absolute bottom-1/4 right-1/3 w-10 h-10 rounded-full bg-primary opacity-20"></div>
          <div className="absolute bottom-10 left-20 w-16 h-16 rounded-sm bg-yellow-400 opacity-20 -rotate-12"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="md:w-1/2 text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white">
              Whoops,<br />
              that Page<br />
              is Gone.
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              The link you clicked may be broken or the page may have been removed. 
              You can try the search box again or get back to the home page.
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-md mt-8">
              <Input
                type="text"
                placeholder="Search"
                className="pr-10 shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-gray-500" />
              </button>
            </form>
            
            <div className="pt-4">
              <Button 
                variant="orange" 
                onClick={() => navigate("/")}
                className="font-medium"
              >
                Back to Home
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-blue-400 rounded-lg p-2 w-full max-w-md mx-auto aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/9d1f1ff6-2cab-4258-a88f-d513b191ad71.png" 
                  alt="Person looking through binoculars" 
                  className="w-full h-full object-contain z-10 relative"
                />
                <div className="absolute bottom-0 left-0 right-0 -z-0">
                  <div className="h-20 w-16 bg-yellow-400 absolute -left-6 -bottom-4 rounded-tl-xl"></div>
                  <div className="h-20 w-16 bg-yellow-400 absolute -right-6 -bottom-4 rounded-tr-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
