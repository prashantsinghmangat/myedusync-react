
import { Button } from '@/components/ui/button';
import { Menu, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="bg-gray-50 border-b">
        <div className="max-w-[1400px] mx-auto px-6 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>info@devskill.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+1 234 567 890</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Facebook className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
              <Twitter className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
              <Instagram className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
              <Linkedin className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <nav className="max-w-[1400px] mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            DEV<span className="text-orange-500">SKILL</span>
            <span className="text-orange-500">.</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-orange-500 font-medium">Home</a>
          <a href="#" className="text-gray-600 hover:text-orange-500">Our Courses</a>
          <a href="#" className="text-gray-600 hover:text-orange-500">Pages</a>
          <a href="#" className="text-gray-600 hover:text-orange-500">Members</a>
          <a href="#" className="text-gray-600 hover:text-orange-500">Blog</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-orange-500 font-medium">Log In</button>
          <Button className="bg-black text-white hover:bg-gray-800">Join Us</Button>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};
