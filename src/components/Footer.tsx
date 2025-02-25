import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#000] text-white pt-10">
      {/* Newsletter Subscription */}
      <div className="bg-[#0a40f0] py-4 px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-lg font-semibold">Subscribe to our news</p>
        <div className="flex items-center w-full md:w-auto mt-3 md:mt-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full md:w-64 rounded-l-md outline-none"
          />
          <button className="bg-white text-[#1A2C5B] px-4 py-2 rounded-r-md">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div>
          <img src="/lovable-uploads/2557202f-2fb8-4411-aded-c15cc766021d.png" alt="MyEduSync Logo" className="w-32 mb-4" />
          <p className="text-gray-300">
            Empowering students through personalized tutoring that builds confidence and fosters academic excellence.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-4">RESOURCES</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="#" className="hover:text-white">Application</Link></li>
            <li><Link to="#" className="hover:text-white">Documentation</Link></li>
            <li><Link to="#" className="hover:text-white">Systems</Link></li>
            <li><Link to="#" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Pricing */}
        <div>
          <h4 className="text-lg font-semibold mb-4">PRICING</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="#" className="hover:text-white">Overview</Link></li>
            <li><Link to="#" className="hover:text-white">Premium Plans</Link></li>
            <li><Link to="#" className="hover:text-white">Affiliate Program</Link></li>
            <li><Link to="#" className="hover:text-white">Promotions</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4">COMPANY</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="#" className="hover:text-white">About Us</Link></li>
            <li><Link to="#" className="hover:text-white">Blog</Link></li>
            <li><Link to="#" className="hover:text-white">Partnerships</Link></li>
            <li><Link to="#" className="hover:text-white">Careers</Link></li>
            <li><Link to="#" className="hover:text-white">Press</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="border-t border-gray-700 py-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-300 hover:text-white"><FaFacebookF size={20} /></a>
          <a href="#" className="text-gray-300 hover:text-white"><FaTwitter size={20} /></a>
          <a href="#" className="text-gray-300 hover:text-white"><FaInstagram size={20} /></a>
          <a href="#" className="text-gray-300 hover:text-white"><FaLinkedin size={20} /></a>
        </div>
        <p className="text-gray-400">&copy; {new Date().getFullYear()} MyEduSync. All rights reserved.</p>
      </div>
    </footer>
  );
};
