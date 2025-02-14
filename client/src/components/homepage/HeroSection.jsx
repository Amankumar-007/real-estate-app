import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-[80vh]"
    >
      <div className="container mx-auto px-4 py-5 md:py-15 relative">
        {/* Background Shapes */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 w-64 h-64 bg-[#7FE1D5] rounded-full filter blur-3xl opacity-20 -z-10"
        ></motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#7FE1D5] rounded-full filter blur-3xl opacity-10 -z-10"
        ></motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#7FE1D5]/10 rounded-full">
              <p className="text-[#00B5A3] text-sm font-medium">
                WE MAKE YOUR HOME BETTER!
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              LUXURIOUS HOME
              <span className="block text-[#00B5A3]">FOR SALE</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-xl">
              Discover your dream home in our exclusive collection of luxury properties.
              Each home is carefully selected to meet the highest standards of comfort and elegance.
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

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="space-y-1"
              >
                <p className="text-sm text-gray-500">START FROM</p>
                <p className="text-2xl font-bold text-[#00B5A3]">$150,000</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#7FE1D5] rounded-blob filter blur-lg opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075"
                alt="Luxury Home"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroSection;
