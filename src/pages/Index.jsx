import heroImg from "../assets/hero.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={heroImg}
          alt="Community Impact Hero"
          className="w-full h-64 sm:h-96 object-cover rounded-b-lg shadow"
        />
      </motion.div>

      {/* Intro Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold text-foundation-purple mb-6">
          Transforming Communities Through Purpose
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Welcome to <strong>J Merrill Foundation, Inc.</strong> — a nonprofit built on faith,
          driven by innovation, and grounded in service. We amplify impact by merging heart-led missions
          with next-generation technology.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="bg-foundation-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-foundation-purple/90 transition"
          >
            Explore Our Work
          </Link>
          <Link
            to="/donate"
            className="border border-foundation-purple text-foundation-purple px-6 py-3 rounded-full font-semibold hover:bg-foundation-purple hover:text-white transition"
          >
            Support the Mission
          </Link>
        </div>
      </section>

      {/* Highlighted Theme Blocks (Purpose, Wisdom, Empowerment) */}
      <section className="py-16 bg-gray-50 px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {[
          { title: "Purpose", color: "text-foundation-purple", desc: "Every project is rooted in intentionality and aligned with our mission to uplift and equip." },
          { title: "Wisdom", color: "text-indigo-700", desc: "We integrate data, lived experience, and cultural knowledge into every solution." },
          { title: "Empowerment", color: "text-yellow-600", desc: "We build platforms and pathways for underserved voices and visionary ideas." },
        ].map(({ title, color, desc }) => (
          <div key={title} className="p-6 bg-white rounded-lg shadow">
            <h3 className={`text-2xl font-bold mb-4 ${color}`}>{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      {/* Call to Action: Innovation Lab Teaser */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-foundation-purple mb-4">
          Visit Our Innovation Lab
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          Discover how we're redefining nonprofit impact through AI pilots, blockchain transparency,
          and community storytelling.
        </p>
        <Link
          to="/labs"
          className="inline-block bg-foundation-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-foundation-purple/90 transition"
        >
          Explore /labs
        </Link>
      </section>
    </>
  );
};

export default Home;