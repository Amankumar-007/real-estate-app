import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";


const API_URL = "http://localhost:5000";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;
            
            // Store user data and token in context
            login(user, token);
            
            // Redirect based on role
            if (user.role === 'admin') {
                navigate("/");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed!");
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/90 backdrop-blur-lg p-8 shadow-2xl rounded-xl w-96 border border-gray-200"
            >
                <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-center text-gray-800"
                >
                    Login
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-500 text-center mt-2"
                >
                    Welcome back! Please enter your details.
                </motion.p>

                {error && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-red-500 text-sm text-center mt-3"
                    >
                        {error}
                    </motion.p>
                )}

                <form onSubmit={handleLogin} className="space-y-5 mt-5">
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                        required
                    />
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                        required
                    />

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all font-semibold shadow-md"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </form>

                <p className="text-center text-sm mt-5 text-gray-500">
                    Don't have an account? <a href="/register" className="text-blue-500 font-semibold hover:underline">Sign up</a>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;