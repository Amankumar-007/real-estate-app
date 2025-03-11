import { FaSearch, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Input from "../others/Input";


const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const getDashboardRoute = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/admin";
    if (user.role === "seller") return "/sellerDashboard";
    return "/dashboard";
  };

  return (
    <header className="shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-gray-400">Home </span>
            <span className="text-fuchsia-500">Vista</span>
          </h1>
        </Link>
        <Input/>

        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <ul className="hidden sm:flex gap-4 items-center">
          <Link to="/contact">
            <li className="text-gray-400 hover:text-white transition">contact</li>
          </Link>
          <Link to="/about">
            <li className="text-gray-400 hover:text-white transition">About</li>
          </Link>

          {/* Show notification bell only for sellers */}
          {user && user.role === "seller" && (
            <button
              onClick={() => navigate("/notifications")}
              className="relative text-gray-400 hover:text-white transition"
            >
              <FaBell size={22} />
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>
          )}

          {user ? (
            <>
              <Link to={getDashboardRoute()}>
                <button className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-lg px-6 py-3 rounded-xl border border-slate-500 text-white font-medium">
                  {user.role === "admin"
                    ? "Admin Dashboard"
                    : user.role === "seller"
                    ? "Seller Dashboard"
                    : "User Dashboard"}
                </button>
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all shadow-md">
                Login
              </button>
            </Link>
          )}
        </ul>

        <button onClick={toggleTheme} className="text-yellow-600 hover:text-gray-400 transition">
          {theme === "light" ? <MdDarkMode size={28} /> : <MdLightMode size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center gap-4 py-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <li className="text-gray-600 hover:text-white transition">Home</li>
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              <li className="text-gray-600 hover:text-white transition">About</li>
            </Link>
            {user && user.role === "seller" && (
              <li
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/notifications");
                }}
                className="text-gray-600 hover:text-white transition flex items-center gap-2"
              >
                <FaBell size={18} /> Notifications
              </li>
            )}
            {user ? (
              <>
                <Link to={getDashboardRoute()} onClick={() => setMenuOpen(false)}>
                  <li className="text-gray-600 hover:text-white transition">
                    {user.role === "admin"
                      ? "Admin Dashboard"
                      : user.role === "seller"
                      ? "Seller Dashboard"
                      : "User Dashboard"}
                  </li>
                </Link>
                <li
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-white transition"
                >
                  Logout
                </li>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <li className="text-gray-600 hover:text-white transition">Login</li>
              </Link>
            )}
            <li
              onClick={() => {
                setMenuOpen(false);
                toggleTheme();
              }}
              className="text-gray-600 hover:text-white transition"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;