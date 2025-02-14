import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';

const stats = [
  { icon: FiHome, value: '10K+', label: 'Properties Sold' },
  { icon: FiUsers, value: '15K+', label: 'Happy Customers' },
  { icon: FiAward, value: '20+', label: 'Years Experience' },
  { icon: FiTrendingUp, value: '99%', label: 'Client Satisfaction' }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-4">
            Your Trusted Real Estate Partner
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            With over two decades of experience, we've helped thousands of families 
            find their perfect home and achieve their real estate dreams.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-navy-800 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-navy-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
  Created under <strong>9Pages</strong> and <strong>Learn2Earn Lab</strong>. Built by <strong>Aman and Team</strong> to provide the best real estate experience.
</p>
<p className="text-gray-600">
  Our dedicated professionals work tirelessly to ensure every client finds their dream property seamlessly and efficiently.
</p>

          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80" 
              alt="Modern office building"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-navy-800 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Integrity',
                description: 'We believe in conducting business with the highest standards of professional ethics and transparency.'
              },
              {
                title: 'Excellence',
                description: 'We strive for excellence in every aspect of our service, ensuring the best possible outcomes for our clients.'
              },
              {
                title: 'Innovation',
                description: 'We embrace the latest technologies and methodologies to provide cutting-edge real estate solutions.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-navy-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;