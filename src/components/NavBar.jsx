import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-foundation-purple text-white shadow sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2 z-50">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Center: Brand Name (Desktop only) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl font-bold hidden sm:block">
          J Merrill Foundation, Inc.
        </div>

        {/* Right: Nav Links (Desktop) */}
        <ul className="hidden md:flex space-x-6 text-sm font-semibold">
          <li><Link to="/about" className="hover:text-gray-200">About</Link></li>
          <li><Link to="/services" className="hover:text-gray-200">Services</Link></li>
          <li><Link to="/labs" className="hover:text-gray-200">Labs</Link></li> {/* NEW */}
          <li><Link to="/donate" className="hover:text-gray-200">Donate</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-xl z-50" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-foundation-purple text-white md:hidden flex flex-col items-center py-6 space-y-4 shadow-md">
            <Link to="/about" onClick={toggleMenu}>About</Link>
            <Link to="/services" onClick={toggleMenu}>Services</Link>
            <Link to="/labs" onClick={toggleMenu}>Labs</Link> {/* NEW */}
            <Link to="/donate" onClick={toggleMenu}>Donate</Link>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;