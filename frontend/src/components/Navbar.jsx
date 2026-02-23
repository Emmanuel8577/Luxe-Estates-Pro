import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaHeart } from "react-icons/fa";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCount = () => {
      const savedFavs = JSON.parse(localStorage.getItem("local_favs")) || [];
      setFavCount(savedFavs.length);
    };

    // Initial load
    updateCount();

    // Listen for updates from other components
    window.addEventListener('storage', updateCount);
    window.addEventListener('favUpdated', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('favUpdated', updateCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Branding */}
        <Link to="/" className="text-2xl font-black text-gray-900 tracking-tighter">
          LUXE<span className="text-blue-600">ESTATES</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-semibold text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          <Link to="/gallery" className="hover:text-blue-600 transition">Gallery</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Admin Link */}
        {user && user.role === "admin" && (
          <Link to="/admin" className="text-red-500 font-bold hover:text-red-700">ADMIN PANEL</Link>
        )}

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-5">
              {/* FAV ICON NEXT TO NAME */}
              <Link to="/favorites" className="relative p-2 text-gray-400 hover:text-red-500 transition">
                <FaHeart size={22} />
                {favCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {favCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-blue-600 text-xl" />
                  <span className="text-sm text-gray-700 font-bold">
                    Hi, {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs uppercase tracking-widest font-black text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 font-bold hover:text-blue-600 transition">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-gray-900 transition shadow-lg">Join Now</Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/favorites" className="relative text-gray-400">
            <FaHeart size={20} />
            {favCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">{favCount}</span>}
          </Link>
          <button onClick={toggleMenu} className="text-2xl text-gray-800 focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute w-full bg-white border-b shadow-xl transition-all duration-300 ease-in-out ${isOpen ? "top-[73px] opacity-100" : "top-[-500px] opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col p-6 space-y-4 font-bold text-gray-700">
          <Link to="/" onClick={toggleMenu} className="hover:text-blue-600 py-2">Home</Link>
          <Link to="/gallery" onClick={toggleMenu} className="hover:text-blue-600 py-2">Gallery</Link>
          {user ? (
            <button onClick={handleLogout} className="w-full bg-red-50 text-red-600 p-4 rounded-2xl font-bold">Logout</button>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="text-center p-4 bg-blue-600 text-white rounded-2xl">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;