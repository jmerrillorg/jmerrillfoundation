import { useParams } from "react-router-dom";
import pilotProjects from "../data/pilots.json";

const LabDetail = () => {
  const { slug } = useParams();
  const project = pilotProjects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!project) {
    return <p className="p-10 text-center text-red-600">Project not found.</p>;
  }

  return (
    <section className="px-6 py-20 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-foundation-purple mb-4">{project.title}</h1>
      <p className="text-gray-700">{project.description}</p>
      {/* Add visuals, partners, and timeline if needed */}
    </section>
  );
};

export default LabDetail;