import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import pilotProjects from "../data/pilots.json";
import { FaLightbulb } from "react-icons/fa";
import LabsFeedbackForm from "../components/LabsFeedbackForm";

const Labs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(pilotProjects.map((p) => p.category))];

  const filteredProjects = pilotProjects.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <section className="px-6 py-20">
      {/* Intro */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-foundation-purple mb-4">
          Welcome to the Lab
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Explore our pilot projects that blend mission, technology, and innovation.
          Each one is a step forward in our vision of nonprofit transformation.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedCategory === cat
                ? "bg-foundation-purple text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pilot Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(({ title, description, category }) => {
          const slug = title.toLowerCase().replace(/\s+/g, "-");
          return (
            <motion.div
              key={title}
              className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-foundation-purple transition hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <Link to={`/labs/${slug}`} className="block group">
                <div className="flex items-center gap-3 mb-2">
                  <FaLightbulb className="text-foundation-purple text-xl" />
                  <h3 className="text-xl font-bold text-foundation-purple group-hover:underline">
                    {title}
                  </h3>
                </div>
              </Link>
              <p className="text-gray-600">{description}</p>
              <span className="text-xs mt-2 inline-block text-gray-500">{category}</span>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <p className="text-gray-700 text-lg mb-4">
          Want to partner, sponsor, or propose a pilot idea?
        </p>
        <Link
          to="/contact"
          className="inline-block bg-foundation-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-foundation-purple/90 transition"
        >
          Contact Our Innovation Team
        </Link>
      </div>

      {/* Feedback Form */}
      <LabsFeedbackForm />
    </section>
  );
};

export default Labs;