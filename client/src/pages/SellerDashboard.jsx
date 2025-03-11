import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const SellerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: "",
    image: "",
    location: "",
    description: "",
    price: "",
    beds: "",
    baths: "",
    size: "",
    pricePerSqft: "",
    rating: "",
    time: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isAddProperty, setIsAddProperty] = useState(true); // Control tab navigation (Add Property / All Properties)
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  // Fetch properties from backend
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/properties", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [token]);

  // Handle adding a new property
  const handleAddProperty = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/properties/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProperties([...properties, data.property]); // Add the new property to the state
        setNewProperty({
          title: "",
          image: "",
          location: "",
          description: "",
          price: "",
          beds: "",
          baths: "",
          size: "",
          pricePerSqft: "",
          rating: "",
          time: "",
        });
      })
      .catch((err) => {
        alert("Failed to add property");
        console.error(err);
      });
  };

  // Handle block/unblock property
  const handleBlockUnblock = (propertyId) => {
    fetch(`http://localhost:5000/properties/block/${propertyId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Property status updated");
        setProperties(data.properties);
      })
      .catch((err) => console.error(err));
  };

  // Handle soft delete property
 // Handle delete (soft delete)
const handleDelete = (propertyId) => {
  fetch(`http://localhost:5000/properties/delete/${propertyId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);  // Show success message
        setProperties(properties.filter((property) => property.id !== propertyId));
      } else {
        alert("Failed to delete property");
      }
    })
    .catch((err) => {
      console.error("Error deleting property:", err);
      alert("An error occurred while deleting the property");
    });
};


  // Handle edit property
  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowEditModal(true);
  };

  const submitEdit = () => {
    fetch(`http://localhost:5000/properties/edit/${editingProperty.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProperties(properties.map((p) => (p.id === editingProperty.id ? editingProperty : p)));
        setShowEditModal(false); // Close the modal
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Seller Dashboard</h2>

      {/* Side Navigation */}
      <div className="flex space-x-6">
        <div className="flex flex-col bg-gray-100 p-4 w-1/4">
          <button
            className="py-2 px-4 bg-blue-500 text-white mb-4"
            onClick={() => setIsAddProperty(true)} // Show Add Property form
          >
            Add Property
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white"
            onClick={() => setIsAddProperty(false)} // Show All Properties list
          >
            All Properties
          </button>
        </div>

        {/* Main Content */}
        <div className="w-3/4">
          {isAddProperty ? (
            <form onSubmit={handleAddProperty} className="space-y-4 bg-white p-4 shadow rounded-lg mb-8">
            <input
              type="text"
              placeholder="Title"
              value={newProperty.title}
              onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newProperty.location}
              onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={newProperty.price}
              onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newProperty.description}
              onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Beds"
              value={newProperty.beds}
              onChange={(e) => setNewProperty({ ...newProperty, beds: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Baths"
              value={newProperty.baths}
              onChange={(e) => setNewProperty({ ...newProperty, baths: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Size (in sqft)"
              value={newProperty.size}
              onChange={(e) => setNewProperty({ ...newProperty, size: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Price per Sqft"
              value={newProperty.pricePerSqft}
              onChange={(e) => setNewProperty({ ...newProperty, pricePerSqft: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Rating"
              value={newProperty.rating}
              onChange={(e) => setNewProperty({ ...newProperty, rating: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Time (e.g., 'Recently added')"
              value={newProperty.time}
              onChange={(e) => setNewProperty({ ...newProperty, time: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProperty.image}
              onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Property
            </button>
          </form>
          
          ) : (
            <div>
              <h3 className="text-2xl font-semibold mb-6">My Properties</h3>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h4 className="text-xl font-bold mb-2">{property.title}</h4>
                        <p className="text-gray-600 mb-2">{property.location}</p>
                        <div className="flex gap-4 mb-2">
                          <span className="flex items-center">🛏️ {property.beds}</span>
                          <span className="flex items-center">🚿 {property.baths}</span>
                          <span className="flex items-center">📏 {property.size} sqft</span>
                        </div>
                        <p className="text-lg font-bold text-blue-600 mb-2">${property.price}</p>
                        <p className="text-gray-700 mb-4">{property.description}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(property)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleBlockUnblock(property.id)}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                          >
                            {property.isBlocked ? "Unblock" : "Block"}
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Property</h3>
            <input
              type="text"
              placeholder="Title"
              value={editingProperty?.title || ""}
              onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Location"
              value={editingProperty?.location || ""}
              onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Price"
              value={editingProperty?.price || ""}
              onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={submitEdit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
