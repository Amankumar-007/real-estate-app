import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import properties from "../components/seller/properties.json"; 
import { FaHeart, FaTrash, FaUser } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [savedProperties, setSavedProperties] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);

  useEffect(() => {
    if (user && user.role === "user") {
      // ✅ Load saved properties safely
      const storedSaved = JSON.parse(localStorage.getItem("favorites")) || [];
      const filteredSaved = properties.filter((property) => 
        property?.id && storedSaved.includes(property.id.toString())
      );
      setSavedProperties(filteredSaved);

      // ✅ Load liked properties safely
      const storedLiked = JSON.parse(localStorage.getItem("likedProperties")) || [];
      const filteredLiked = properties.filter((property) => 
        property?.id && storedLiked.includes(property.id.toString())
      );
      setLikedProperties(filteredLiked);
    }
  }, [user]);

  // ✅ Remove a property from saved list safely
  const removeSavedProperty = (id) => {
    const updatedSaved = savedProperties.filter((property) => property?.id !== id);
    setSavedProperties(updatedSaved);

    // Update localStorage
    const storedSaved = JSON.parse(localStorage.getItem("favorites")) || [];
    const newSaved = storedSaved.filter((propId) => propId !== id?.toString());
    localStorage.setItem("favorites", JSON.stringify(newSaved));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Display User Name */}
      {user && (
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
          <FaUser className="text-blue-500 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
        </div>
      )}

      {/* Saved Properties */}
      <h2 className="text-2xl font-semibold mb-4">Saved Properties</h2>
      {savedProperties.length === 0 ? (
        <p className="text-gray-500">You have no saved properties.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <div key={property?.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={property?.image} alt={property?.title} className="w-full h-40 object-cover rounded-lg mb-3" />
              <h3 className="text-lg font-semibold">{property?.title}</h3>
              <p className="text-gray-500">{property?.location}</p>
              <p className="font-bold">${property?.price}</p>

              {/* Remove from saved */}
              <button
                onClick={() => removeSavedProperty(property?.id)}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 flex items-center gap-2"
              >
                <FaTrash />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Liked Properties */}
      <h2 className="text-2xl font-semibold mb-4 mt-8">Liked Properties</h2>
      {likedProperties.length === 0 ? (
        <p className="text-gray-500">You have no liked properties.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedProperties.map((property) => (
            <div key={property?.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={property?.image} alt={property?.title} className="w-full h-40 object-cover rounded-lg mb-3" />
              <h3 className="text-lg font-semibold">{property?.title}</h3>
              <p className="text-gray-500">{property?.location}</p>
              <p className="font-bold">${property?.price}</p>
              <div className="mt-3 text-red-500 flex items-center gap-2">
                <FaHeart />
                Liked
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
