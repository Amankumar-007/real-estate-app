import { FaSearch, FaBell } from "react-icons/fa"; // Import FaBell
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Get user state from context
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-gray-400">Aman's</span>
            <span className="text-fuchsia-500">-Estate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg- p-3 rounded-lg flex items-center">
          <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#4070f4] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
            <div className="flex items-center justify-center fill-white">
              <button type="submit" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22}>
                  <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                </svg>
              </button>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
            />
          </div>
        </form>

        {/* Navigation Links */}
        <ul className="flex gap-4 items-center">
  <Link to="/">
    <li className="hidden sm:inline text-gray-400 hover:text-white transition">Home</li>
  </Link>
  <Link to="/about">
    <li className="hidden sm:inline text-gray-400 hover:text-white transition">About</li>
  </Link>

  {/* Notification Icon (Redirects Based on Role) */}
  {user && (
    <button
      onClick={() => navigate(user.role === "admin" ? "/admin/notifications" : "/notifications")}
      className="relative text-gray-400 hover:text-white transition"
    >
      <FaBell size={22} />
      {/* Example Notification Badge (Optional) */}
      <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
        3 {/* Replace with actual notification count */}
      </span>
    </button>
  )}

  {/* Show different dashboard links based on user role */}
  {user ? (
    <>
      <Link to={
        user.role === "admin"
          ? "/admin"
          : user.role === "seller"
          ? "/sellerDashboard"
          : "/dashboard"
      }>
        <button className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
          <div className="relative overflow-hidden">
            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              {user.role === "admin"
                ? "Admin Dashboard"
                : user.role === "seller"
                ? "Seller Dashboard"
                : "User Dashboard"}
            </p>
            <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              {user.role === "admin"
                ? "Admin Dashboard"
                : user.role === "seller"
                ? "Seller Dashboard"
                : "User Dashboard"}
            </p>
          </div>
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


        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="text-yellow-600 hover:text-gray-400 transition">
          {theme === "light" ? <MdDarkMode size={28} /> : <MdLightMode size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
