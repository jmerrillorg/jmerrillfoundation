// J Merrill One – Unified App Routing (Updated with /labs + /labs/thank-you)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Services from "./pages/Services";
import AIClass from "./pages/services/ai-class";
import DigitalLegacy from "./pages/services/digital-legacy";
import YouthTechFellowship from "./pages/services/youth-tech-fellowship";
import VirtualBookClub from "./pages/services/virtual-book-club";
import LittleFreeLibrary from "./pages/services/little-free-library";
import Register from "./pages/Register";
import Volunteer from "./pages/Volunteer";
import Labs from "./pages/Labs";
import LabsThankYou from "./pages/Labs/ThankYou"; // ← NEW: Thank-you route

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/ai-class" element={<AIClass />} />
            <Route path="/services/digital-legacy" element={<DigitalLegacy />} />
            <Route path="/services/youth-tech-fellowship" element={<YouthTechFellowship />} />
            <Route path="/services/virtual-book-club" element={<VirtualBookClub />} />
            <Route path="/services/little-free-library" element={<LittleFreeLibrary />} />
            <Route path="/register" element={<Register />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/labs/thank-you" element={<LabsThankYou />} /> {/* ← NEW */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;