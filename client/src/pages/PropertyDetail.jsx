import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaSave } from "react-icons/fa";
import properties from "../components/seller/properties.json"; 
import { AuthContext } from "../context/AuthContext"; 

const PropertyDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState(null);
    const [message, setMessage] = useState("");
    const [saved, setSaved] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Ensure correct ID comparison (convert both to string)
        if (!id) return; // Ensure `id` exists before searching
        const selectedProperty = properties.find((item) => item.id && item.id.toString() === id.toString());
                if (selectedProperty) {
            setProperty(selectedProperty);
        } else {
            setProperty(null); // Handle not found case
        }
    }, [id]);

    if (!property) {
        return <p className="text-center text-xl text-red-500 mt-10">Property not found.</p>;
    }

    // ✅ Save message to localStorage (Only for Users)
    const handleSendMessage = () => {
        if (!user || user.role !== "user") {
            alert("Only users can send messages.");
            return;
        }
    
        if (!message.trim()) {
            alert("Please enter a message.");
            return;
        }
    
        // Get property owner (seller)
        const propertyOwner = "full@me.com";
    
        // Save message in `propertyMessages`
        const storedMessages = JSON.parse(localStorage.getItem("propertyMessages")) || {};
        if (!storedMessages[id]) storedMessages[id] = [];
        storedMessages[id].push({
            text: message,
            timestamp: new Date().toISOString(),
            userEmail: user.email
        });
        localStorage.setItem("propertyMessages", JSON.stringify(storedMessages));
    
        // Save message as a notification for the seller
        const storedNotifications = JSON.parse(localStorage.getItem("sellerNotifications")) || {};
        if (!storedNotifications[propertyOwner]) storedNotifications[propertyOwner] = [];
    
        storedNotifications[propertyOwner].push({
            title: "New Message from User",
            message: `You received a message about "${property.title}".`,
            propertyId: id,
            timestamp: new Date().toISOString(),
            userEmail: user.email,
            read: false
        });
    
        localStorage.setItem("sellerNotifications", JSON.stringify(storedNotifications));
    
        alert(`Message sent to the owner: "${message}"`);
        setMessage(""); // Clear input
    };
    

    // ✅ Save property to favorites (Only for Users)
    const handleSaveProperty = () => {
        if (!user || user.role !== "user") {
            alert("Only users can save properties.");
            return;
        }
    
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!storedFavorites.includes(id)) {
            storedFavorites.push(id);
            localStorage.setItem("favorites", JSON.stringify(storedFavorites));
            setSaved(true);
            alert("Property saved!");
        }
    };

    // ✅ Like property (Only for Users)
    const handleLikeProperty = () => {
        if (!user || user.role !== "user") {
            alert("Only users can like properties.");
            return;
        }

        const storedLiked = JSON.parse(localStorage.getItem("likedProperties")) || [];
        if (!storedLiked.includes(id)) {
            storedLiked.push(id);
            localStorage.setItem("likedProperties", JSON.stringify(storedLiked));
            setLiked(true);
        } else {
            const newLiked = storedLiked.filter((propId) => propId !== id.toString());
            localStorage.setItem("likedProperties", JSON.stringify(newLiked));
            setLiked(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Property Image */}
            <img 
                src={property.image || "https://via.placeholder.com/600"} 
                alt={property.title || "No Image Available"} 
                className="w-full h-96 object-cover rounded-lg shadow-md" 
            />
            
            {/* Property Details */}
            <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
            <div className="flex items-center text-gray-600 mt-2">
                <MdLocationOn className="h-5 w-5 text-red-500 mr-1" />
                <span>{property.location}</span>
            </div>
            <p className="text-lg text-gray-700 mt-3">{property.description}</p>
            <p className="text-2xl font-bold text-blue-600 mt-4">{property.price}</p>

            {/* Only Users Can Like & Save */}
            {user && user.role === "user" && (
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleLikeProperty}
                        className={`flex items-center gap-2 ${liked ? "text-red-500" : "text-gray-400"} hover:text-red-500 transition`}
                    >
                        <FaHeart size={20} />
                        {liked ? "Liked" : "Like"}
                    </button>
                    <button
                        onClick={handleSaveProperty}
                        className={`flex items-center gap-2 ${saved ? "text-green-500" : "text-gray-400"} hover:text-green-500 transition`}
                    >
                        <FaSave size={20} />
                        {saved ? "Saved" : "Save"}
                    </button>
                </div>
            )}

            {/* Only Users Can Send Messages */}
            {user && user.role === "user" && (
                <div className="mt-6">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Send a message to the owner..."
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        rows="3"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-2 hover:bg-blue-500 transition"
                    >
                        Send Message
                    </button>
                </div>
            )}

            {/* Show a message for Sellers/Admins */}
            {user && user.role !== "user" && (
                <p className="text-gray-500 mt-4 italic">Sellers & Admins cannot send messages, like, or save properties.</p>
            )}
        </div>
    );
};

export default PropertyDetail;
