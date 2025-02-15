import { motion } from "framer-motion";
import AdminDashboard from "../../pages/AdminDashboard";
import SearchFilter from "../../pages/Search";
import SellerDashboard from "../../pages/SellerDashboard";
import UserDashboard from "../../pages/UserDashboard";
import Footer from "../others/Footer";
import SubscribeSection from "../others/SubscribeSection";
import TrendingProperties from "../others/TrendingProperties";
import Value from "../others/Value";
import PropertyList from "../seller/PropertyList";

import Header from "./Header";
import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext"; // Import Theme Context
import Animated from "../others/animated";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Get theme state

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      {/* Header */}
      <Header />
      {/* <Animated/> */}

      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <HeroSection />
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <TrendingProperties />
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <Value />
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <SubscribeSection />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
