
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/2557202f-2fb8-4411-aded-c15cc766021d.png" 
                alt="MyEduSync Logo" 
                className="w-32 mb-4" 
              />
            </div>
            <p className="text-gray-400">
              We are dedicated to providing quality education to help you advance in your career.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-primary">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-primary">Our Courses</Link></li>
              <li><Link to="/notes" className="text-gray-400 hover:text-primary">Study Notes</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary">Blog</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-secondary" />
                <span className="text-gray-400">123 Street, New York, USA</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-gray-400">+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-gray-400">info@myedusync.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-1"
              />
              <Button className="bg-accent hover:bg-accent-hover text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} MyEduSync. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
