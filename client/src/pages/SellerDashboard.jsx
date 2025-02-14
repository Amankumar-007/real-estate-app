import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import propertiesData from "../components/seller/properties.json"; 

const SellerDashboard = () => {
  const { user } = useContext(AuthContext); 
  const [properties, setProperties] = useState([]);

  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    beds: "",
    baths: "",
    image: "",
  });

  // ✅ Load properties from localStorage or JSON for sellers only
  useEffect(() => {
    if (user && user.role === "seller") {
      const storedProperties = JSON.parse(localStorage.getItem("sellerProperties")) || {};
      const userProperties = storedProperties[user.email] || propertiesData;
      setProperties(userProperties);
    }
  }, [user]);

  // ✅ Save properties to localStorage for sellers
  useEffect(() => {
    if (user && user.role === "seller") {
      const storedProperties = JSON.parse(localStorage.getItem("sellerProperties")) || {};
      storedProperties[user.email] = properties;
      localStorage.setItem("sellerProperties", JSON.stringify(storedProperties));
    }
  }, [properties, user]);

  // ✅ Add a new property (Only for sellers)
  const addProperty = (e) => {
    e.preventDefault();
    if (!user || user.role !== "seller") {
      alert("Only sellers can add properties.");
      return;
    }

    const newPropertyWithId = { ...newProperty, id: Date.now(), owner: user.email };
    setProperties([...properties, newPropertyWithId]);

    setNewProperty({
      title: "",
      description: "",
      location: "",
      price: "",
      beds: "",
      baths: "",
      image: "",
    });
  };

  // ✅ Delete a property (Only for sellers)
  const deleteProperty = (id) => {
    if (!user || user.role !== "seller") {
      alert("Only sellers can delete properties.");
      return;
    }

    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      {/* Show "Add Property" form only for sellers */}
      {user && user.role === "seller" && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add a New Property</h2>
          <form onSubmit={addProperty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              className="border p-3 rounded-lg"
              value={newProperty.title}
              onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="border p-3 rounded-lg"
              value={newProperty.location}
              onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Price"
              className="border p-3 rounded-lg"
              value={newProperty.price}
              onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Beds"
              className="border p-3 rounded-lg"
              value={newProperty.beds}
              onChange={(e) => setNewProperty({ ...newProperty, beds: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Baths"
              className="border p-3 rounded-lg"
              value={newProperty.baths}
              onChange={(e) => setNewProperty({ ...newProperty, baths: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border p-3 rounded-lg"
              value={newProperty.image}
              onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })}
              required
            />
            <button className="bg-blue-600 text-white p-3 rounded-lg col-span-1 md:col-span-2">
              Add Property
            </button>
          </form>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Your Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <p>No properties listed yet.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg mb-3" />
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-gray-500">{property.location}</p>
              <p className="font-bold">${property.price}</p>
              
              {/* Show "Remove Property" button only for sellers */}
              {user && user.role === "seller" && (
                <button
                  onClick={() => deleteProperty(property.id)}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Remove Property
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
