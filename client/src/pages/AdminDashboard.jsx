import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHome } from "react-icons/fa";

const API_URL = "http://localhost:5000";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("users"); // Default tab

    // Redirect if not admin
    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            fetchUsers();
            fetchProperties();
        }
    }, [user, navigate]);

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch Properties
    const fetchProperties = async () => {
        try {
            const response = await fetch(`${API_URL}/properties`);
            const data = await response.json();
            setProperties(data.filter(property => !property.deleted)); // Exclude deleted properties
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    // Toggle Block User
    const toggleBlockUser = async (id) => {
        try {
            const response = await fetch(`${API_URL}/admin/users/block/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const updatedUser = await response.json();
            setUsers(users.map(user => (user._id === id ? { ...user, status: updatedUser.status } : user)));
        } catch (error) {
            console.error("Error toggling user block status:", error);
        }
    };

    // Remove User
    const removeUser = async (id) => {
        try {
            await fetch(`${API_URL}/admin/users/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    // Toggle Block Property
    const toggleBlockProperty = async (id) => {
        try {
            const response = await fetch(`${API_URL}/properties/block/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await response.json();
            setProperties(data.properties.filter(property => !property.deleted)); // Exclude deleted properties
        } catch (error) {
            console.error("Error blocking/unblocking property:", error);
        }
    };

    // Soft Delete Property
    const softDeleteProperty = async (id) => {
        try {
            const response = await fetch(`${API_URL}/properties/delete/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await response.json();
            setProperties(data.properties.filter(property => !property.deleted)); // Exclude deleted properties
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg p-6 fixed h-full">
                <h2 className="text-xl font-bold text-purple-600">{user?.name}</h2>
                <p className="text-gray-500 text-sm">Admin</p>

                <nav className="space-y-2 mt-4">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center p-3 text-gray-600 hover:bg-purple-50 rounded-lg w-full ${
                            activeTab === "users" ? "bg-purple-50" : ""
                        }`}
                    >
                        <FaUsers className="mr-3 text-purple-600" />
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab("properties")}
                        className={`flex items-center p-3 text-gray-600 hover:bg-purple-50 rounded-lg w-full ${
                            activeTab === "properties" ? "bg-purple-50" : ""
                        }`}
                    >
                        <FaHome className="mr-3 text-purple-600" />
                        Properties
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8 flex-1">
                {/* Users Section */}
                {activeTab === "users" && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
                        {users.length === 0 ? <p>No users available.</p> : users.map(user => (
                            <div key={user._id} className="p-4 shadow-md flex justify-between items-center bg-white rounded-lg mt-2">
                                <div>
                                    <p className="text-lg font-semibold">{user.name}</p>
                                    <p className="text-gray-600">{user.email} - {user.status || "Active"}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleBlockUser(user._id)}
                                        className={`px-3 py-1 rounded shadow-md ${
                                            user.status === "Blocked" ? "bg-green-500 text-white hover:bg-green-400" : "bg-yellow-500 text-white hover:bg-yellow-400"
                                        }`}
                                    >
                                        {user.status === "Blocked" ? "Unblock" : "Block"}
                                    </button>
                                    <button
                                        onClick={() => removeUser(user._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Properties Section */}
                {activeTab === "properties" && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Manage Properties</h2>
                        {properties.length === 0 ? <p>No properties available.</p> : properties.map(property => (
                            <div key={property.id} className="p-4 shadow-md flex justify-between items-center bg-white rounded-lg mt-2">
                                <div>
                                    <p className="text-lg font-semibold">{property.title}</p>
                                    <p className="text-gray-600">{property.location}</p>
                                    <p className={`text-sm font-bold ${property.blocked ? "text-red-600" : "text-green-600"}`}>
                                        {property.blocked ? "Blocked" : "Active"}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleBlockProperty(property.id)}
                                        className={`px-3 py-1 rounded shadow-md ${
                                            property.blocked ? "bg-green-500 text-white hover:bg-green-400" : "bg-yellow-500 text-white hover:bg-yellow-400"
                                        }`}
                                    >
                                        {property.blocked ? "Unblock" : "Block"}
                                    </button>
                                    <button
                                        onClick={() => softDeleteProperty(property.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
