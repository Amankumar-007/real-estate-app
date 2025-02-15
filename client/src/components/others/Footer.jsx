import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className=" text-gray-700 py-10 text-center"
    >
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="flex space-x-6 text-sky-600 text-2xl mb-4">
          <a href="" className="hover:text-sky-800 transition"><FaFacebook /></a>
          <a href="#" className="hover:text-sky-800 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-sky-800 transition"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/amankumarweb/" className="hover:text-sky-800 transition"><FaLinkedin /></a>
          <a href="#" className="hover:text-sky-800 transition"><FaYoutube /></a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
        <p className="text-sm mt-1">Built by Aman and Team</p>
        <p className="text-sm">Under 9Pages & Learn2Earn Labs</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
