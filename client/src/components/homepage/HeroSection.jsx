import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HeroSection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-[80vh]"
    >
      <div className="container mx-auto px-4 py-5 md:py-15 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              LUXURIOUS HOME
              <span className="block text-[#00B5A3]">FOR SALE</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-xl">
              Discover your dream home in our exclusive collection of luxury properties.
            </p>
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/search")}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                SEE MORE
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">START FROM</p>
                <p className="text-2xl font-bold text-[#00B5A3]">$150,000</p>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="mt-6 w-full max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties by location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#00B5A3]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00B5A3] text-white px-6 py-2 rounded-full hover:bg-[#008f82]"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075"
              alt="Luxury Home"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroSection;
