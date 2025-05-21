import React from "react";
import aiClassImg from "../../assets/services/ai-class.jpg";

const AIClass = () => {
  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <img
        src={aiClassImg}
        alt="Basics of AI Class"
        className="rounded-lg mb-10 w-full h-64 object-cover"
      />

      <h1 className="text-4xl font-bold text-foundation-purple mb-4">
        Basics of AI Class
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Learn the fundamentals of Artificial Intelligence in a virtual, hands-on environment using ChatGPT and real-life use cases. As a community, we are often behind in technology due to fear. This course is designed to overcome those fears with practical, everyday applications of AI that already live in our pockets.
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What You’ll Learn</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Understanding what AI is and how it works</li>
          <li>Using ChatGPT and other tools for personal and professional growth</li>
          <li>Creating smart prompts that get meaningful responses</li>
          <li>Exploring ethics and privacy in the age of AI</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Course Details</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>🕒 4 virtual sessions (60 minutes each)</li>
          <li>💻 Hosted on Microsoft Teams</li>
          <li>📼 Recordings available for missed sessions</li>
          <li>📄 Includes downloadable PDFs + AI prompt packs</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Registration & Pricing</h2>
        <p className="text-gray-700 mb-4">
          We offer flexible pricing to ensure everyone can access this opportunity:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Standard</strong>: $50 (Includes full class access, PDFs, and recordings)</li>
          <li><strong>Sponsor a Seat</strong>: $75 (Covers your seat + a scholarship for another)</li>
          <li><strong>Scholarship</strong>: $0 (Available upon request or invitation)</li>
        </ul>
      </div>

      <div className="text-center mt-10">
        <a
          href="#"
          className="inline-block bg-foundation-purple text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-foundation-purple/90 transition"
        >
          Register Interest
        </a>
      </div>
    </section>
  );
};

export default AIClass;