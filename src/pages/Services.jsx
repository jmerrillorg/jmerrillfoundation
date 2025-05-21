import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import servicesData from "../data/services";
import { Link } from "react-router-dom";
import aiClassImg from "../assets/services/ai-class.jpg";
import digitalLegacyImg from "../assets/services/digital-legacy.jpg";
import bookClubImg from "../assets/services/virtual-book-club.jpg";
import littleFreeLibraryImg from "../assets/services/little-free-library.jpg";
import youthTechImg from "../assets/services/youth-tech-fellowship.jpg";

const imageMap = {
  "/services/ai-class": aiClassImg,
  "/services/digital-legacy": digitalLegacyImg,
  "/services/virtual-book-club": bookClubImg,
  "/services/little-free-library": littleFreeLibraryImg,
  "/services/youth-tech-fellowship": youthTechImg,
};

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (status) =>
    servicesData.filter((s) => {
      const matchStatus = s.status === status;
      const matchSearch =
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchStatus && matchSearch;
    });

  const sectionStyle = "mb-16";
  const headerStyle = "text-2xl font-bold text-gray-800 mb-6";

  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-foundation-purple mb-12 text-center">
        Our Services
      </h1>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by title, topic, or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foundation-purple"
        />
      </div>

      {/* CURRENT SERVICES */}
      {filtered("active").length > 0 && (
        <div className={sectionStyle}>
          <h2 className={headerStyle}>Current Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered("active").map((service, index) => (
              <ServiceCard key={index} {...service} image={imageMap[service.link]} />
            ))}
          </div>
        </div>
      )}

      {/* UPCOMING SERVICES */}
      {filtered("upcoming").length > 0 && (
        <div className={sectionStyle}>
          <h2 className={headerStyle}>Upcoming Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered("upcoming").map((service, index) => (
              <ServiceCard key={index} {...service} image={imageMap[service.link]} />
            ))}
          </div>
        </div>
      )}

      {/* FORMER SERVICES */}
      {filtered("former").length > 0 && (
        <div>
          <h2 className={headerStyle}>Former Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered("former").map((service, index) => (
              <ServiceCard key={index} {...service} image={imageMap[service.link]} dim />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

const ServiceCard = ({
  title,
  description,
  link,
  tags,
  category,
  dim,
  image
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`p-6 rounded-lg shadow-md border overflow-hidden flex flex-col justify-between h-full ${
          dim
            ? "bg-gray-100 text-gray-500 border-gray-300"
            : "bg-white border-gray-200"
        }`}
      >
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover mb-4 rounded"
          />
        )}
        <div className="flex-grow">
          <h3
            className={`text-xl font-semibold mb-2 ${
              dim ? "text-gray-500" : "text-foundation-purple"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm mb-4">{description}</p>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-foundation-purple/10 text-foundation-purple text-xs px-2 py-1 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        {dim ? (
          <span className="text-xs italic text-gray-400">Program Concluded</span>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 italic">{category}</span>
            <div className="flex gap-2">
              {link && (
                <Link
                  to={link}
                  className="text-xs bg-foundation-purple text-white px-3 py-1 rounded-full hover:bg-foundation-purple/90"
                >
                  Learn More
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Services;