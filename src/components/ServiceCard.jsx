import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceCard = ({
  title,
  description,
  link,
  tags,
  category,
  status,
  volunteerCall,
  registration,
  image,
  dim
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div
        className={`flex flex-col justify-between h-full min-h-[340px] p-6 rounded-lg shadow-md border ${
          dim
            ? "bg-gray-100 text-gray-500 border-gray-300"
            : "bg-white border-gray-200"
        }`}
      >
        <div>
          {/* Image Placeholder or Real Image */}
          <img
            src={image || "https://via.placeholder.com/600x300?text=Service+Image"}
            alt={title}
            className="w-full h-40 object-cover rounded-md mb-4"
          />

          <h3
            className={`text-xl font-semibold mb-2 ${
              dim ? "text-gray-500" : "text-foundation-purple"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm mb-4">{description}</p>

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
        </div>

        {/* Actions */}
        {dim ? (
          <span className="text-xs italic text-gray-400">Program Concluded</span>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 italic">{category}</span>
            <div className="flex gap-2">
              {volunteerCall && (
                <Link
                  to="/contact"
                  className="text-xs bg-foundation-purple/20 text-foundation-purple px-3 py-1 rounded-full hover:bg-foundation-purple/30"
                >
                  Volunteer
                </Link>
              )}
              {registration && (
                <a
                  href="#"
                  className="text-xs bg-foundation-purple text-white px-3 py-1 rounded-full hover:bg-foundation-purple/90"
                >
                  Register Interest
                </a>
              )}
              {!registration && !volunteerCall && link && (
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

export default ServiceCard;
