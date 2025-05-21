const InnovationScorecard = ({ data }) => {
    return (
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-foundation-purple text-center mb-6">
          Innovation Scorecard
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-foundation-purple text-white">
              <tr>
                <th className="px-4 py-3 text-left">Project</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Impact</th>
                <th className="px-4 py-3 text-left">ROI</th>
                <th className="px-4 py-3 text-left">Sustainability</th>
              </tr>
            </thead>
            <tbody>
              {data.map((project, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{project.title}</td>
                  <td className="px-4 py-3">{project.category}</td>
                  <td className="px-4 py-3">{project.status}</td>
                  <td className="px-4 py-3">{project.impact}</td>
                  <td className="px-4 py-3">{project.roi}</td>
                  <td className="px-4 py-3">{project.sustainability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  };
  
  export default InnovationScorecard;