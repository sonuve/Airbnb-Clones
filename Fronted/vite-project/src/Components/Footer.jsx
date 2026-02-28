import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#f7f7f7] border-t border-gray-300 mt-10 ">
      
      {/* Top Section */}
{/* Top Section */}
<div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Column 1 */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">Safety information</li>
            <li className="hover:underline cursor-pointer">Cancellation options</li>
            <li className="hover:underline cursor-pointer">Our COVID-19 Response</li>
            <li className="hover:underline cursor-pointer">Report a concern</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-4">Hosting</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:underline cursor-pointer">Airbnb your home</li>
            <li className="hover:underline cursor-pointer">AirCover for Hosts</li>
            <li className="hover:underline cursor-pointer">Hosting resources</li>
            <li className="hover:underline cursor-pointer">Community forum</li>
            <li className="hover:underline cursor-pointer">Hosting responsibly</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-4">Airbnb</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:underline cursor-pointer">Newsroom</li>
            <li className="hover:underline cursor-pointer">New features</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Investors</li>
            <li className="hover:underline cursor-pointer">Gift cards</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:underline cursor-pointer">Diversity & Belonging</li>
            <li className="hover:underline cursor-pointer">Accessibility</li>
            <li className="hover:underline cursor-pointer">Airbnb Associates</li>
            <li className="hover:underline cursor-pointer">Frontline Stays</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">

          {/* Left */}
          <div className="flex flex-wrap gap-3 items-center">
            <span>© 2025 Airbnb, Inc.</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="hover:underline cursor-pointer">🌐 English (IN)</span>
            <span className="hover:underline cursor-pointer">₹ INR</span>
            <FaFacebookF className="cursor-pointer hover:text-black" />
            <FaTwitter className="cursor-pointer hover:text-black" />
            <FaInstagram className="cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
