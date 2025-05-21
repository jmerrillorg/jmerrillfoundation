import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-foundation-purple text-white text-sm py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {/* Left Section */}
        <div className="space-y-2 text-center sm:text-left">
          <p className="font-semibold">© 2025 J Merrill Foundation, Inc. All rights reserved.</p>
          <p>Purpose. Wisdom. Empowerment.</p>
          <p>J Merrill Foundation, Inc. is a 501(c)(3) tax-exempt organization.</p>
          <p>EIN: 86-2677344</p>
          <p>Columbus, OH | Main Line: (614) 965-6057 (Option 3)</p>
          <p>
            Email: <a href="mailto:info@jmerrill.one" className="underline hover:text-gray-100">info@jmerrill.one</a>
          </p>
        </div>

        {/* Center Section - Quick Links */}
        <div className="text-center">
          <h3 className="font-bold mb-2">Explore</h3>
          <ul className="space-y-1">
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/donate" className="hover:underline">Donate</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><a href="#" className="hover:underline">Volunteer</a></li>
          </ul>
        </div>

        {/* Right Section - Social & Newsletter */}
        <div className="text-center sm:text-right">
          <h3 className="font-bold mb-2">Connect</h3>
          <div className="flex justify-center sm:justify-end gap-4 mb-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-100"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-100"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-100"><FaLinkedinIn /></a>
          </div>
          <div>
            <p className="mb-1">Join Our Newsletter</p>
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-1 rounded text-black w-full max-w-xs mb-2"
            />
            <button className="bg-white text-foundation-purple px-4 py-1 rounded font-semibold hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
