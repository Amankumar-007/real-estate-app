import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa"; // Import message icon
import propertiesData from "../components/seller/properties.json";

const API_URL = "http://localhost:5000";

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [properties, setProperties] = useState(propertiesData);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            fetchUsers();
        }
    }, [user, navigate]);

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Open chat
    const openChat = async (user) => {
        setSelectedUser(user);
        setIsChatOpen(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/messages/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Send message
    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ receiverId: selectedUser._id, message })
            });

            const newMessage = await res.json();
            setMessages([...messages, newMessage]);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Block a user
    const blockUser = async (id) => {
        try {
            const response = await fetch(`${API_URL}/admin/users/block/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const updatedUser = await response.json();
            setUsers(users.map(user => user._id === id ? { ...user, status: updatedUser.status } : user));
        } catch (error) {
            console.error("Error blocking user:", error);
        }
    };

    // Remove a user
    const removeUser = async (id) => {
        try {
            await fetch(`${API_URL}/admin/users/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Properties Management */}
            <h2 className="text-2xl font-semibold mt-4">Manage Properties</h2>
            <div className="mt-4">
                {properties.length === 0 ? <p>No properties available.</p> :
                    properties.map(property => (
                        <div key={property.id} className="p-4 shadow-md flex justify-between items-center bg-white rounded-lg mt-2">
                            <div>
                                <p className="text-lg font-semibold">{property.title}</p>
                                <p className="text-gray-600">{property.location}</p>
                            </div>
                            <button 
                                onClick={() => setProperties(properties.filter(p => p.id !== property.id))} 
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                }
            </div>

            {/* User Management */}
            <h2 className="text-2xl font-semibold mt-8">Manage Users</h2>
            <div className="mt-4">
                {users.length === 0 ? <p>No users available.</p> :
                    users.map(user => (
                        <div key={user._id} className="p-4 shadow-md flex justify-between items-center bg-white rounded-lg mt-2">
                            <div>
                                <p className="text-lg font-semibold">{user.name}</p>
                                <p className="text-gray-600">{user.email} - {user.status || "Active"}</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => blockUser(user._id)} 
                                    className={`px-3 py-1 rounded shadow-md ${
                                        user.status === "Blocked" 
                                            ? "bg-gray-500 text-white" 
                                            : "bg-yellow-500 text-white hover:bg-yellow-400"
                                    }`}
                                    disabled={user.status === "Blocked"}
                                >
                                    {user.status === "Blocked" ? "Blocked" : "Block"}
                                </button>
                                <button 
                                    onClick={() => removeUser(user._id)} 
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                                >
                                    Remove
                                </button>
                                {/* Message Icon */}
                                <button 
                                    onClick={() => openChat(user)} 
                                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                >
                                    <FaEnvelope size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Chat Popup */}
            {isChatOpen && selectedUser && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-bold">Chat with {selectedUser.name}</h3>

                        <div className="h-40 overflow-auto p-2 border bg-gray-100 rounded">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`p-2 my-1 rounded-lg ${
                                        msg.senderId === selectedUser._id ? "bg-gray-200 text-left" : "bg-blue-500 text-white text-right"
                                    }`}
                                >
                                    {msg.message}
                                </div>
                            ))}
                        </div>

                        <div className="flex mt-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 p-2 border rounded-l-lg"
                                placeholder="Type a message..."
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>

                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="mt-2 bg-red-500 text-white w-full p-2 rounded-lg"
                        >
                            Close Chat
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
