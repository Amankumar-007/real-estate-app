import React from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const properties = [
  {
    id: 1,
    name: 'Pukar',
    price: 2000,
    description: 'pukar has one rooms with everything',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80'
  },
  {
    id: 2,
    name: 'bjn',
    price: 10000,
    description: 'gvcgvvbv',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    name: 'qwas',
    price: 1000,
    description: 'qwawe',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80'
  },
  {
    id: 4,
    name: 'felix',
    price: 2000,
    description: "felix's property",
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
];

const TrendingProperties = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = properties.length - 1;
    if (newIndex >= properties.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-500 text-xl font-semibold mb-2"
        >
          Best Choices
        </motion.h3>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-navy-800"
        >
          Popular Residencies
        </motion.h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 z-10 w-full px-4">
          <button
            onClick={() => paginate(-1)}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <IoIosArrowBack size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>

        <div className="flex gap-6 justify-center">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              custom={index}
              variants={slideVariants}
              initial="enter"
              animate={index === currentIndex ? "center" : "exit"}
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-orange-500 font-semibold">${property.price}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-navy-800 mb-2">{property.name}</h3>
                <p className="text-gray-600">{property.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProperties;