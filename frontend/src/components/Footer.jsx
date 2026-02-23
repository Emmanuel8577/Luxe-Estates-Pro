import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* Column 1: Brand & Bio */}
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
            LUXE<span className="text-blue-500">ESTATES</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Leading the luxury real estate market with over a decade of experience. 
            We connect elite clients with the world's most prestigious properties.
          </p>
          <div className="flex space-x-5 text-xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-500 transition"><FaLinkedin /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg uppercase tracking-wider text-sm">Navigation</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Our Firm</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition">Exclusive Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg uppercase tracking-wider text-sm">Get In Touch</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-blue-500" />
              <span>123 Luxury Lane, Beverly Hills<br />California, USA</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-500" />
              <span>+1 (800) LUXE-ESTATE</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500" />
              <span>concierge@luxeestates.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg uppercase tracking-wider text-sm">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe to receive first access to new listings.</p>
          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-gray-800 border border-gray-700 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Luxe Estates International. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;