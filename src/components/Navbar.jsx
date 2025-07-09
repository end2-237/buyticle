import { useState, useRef, useEffect } from "react";
import logo from "../assets/buylogo.png";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  FiBell,
  FiSearch,
  FiChevronDown,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMessageSquare,
  FiPlus,
} from "react-icons/fi";
import { useShop } from "../contexts/shopContext";
const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const  {userData} = useShop();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  

  return (
    <header className="bg-white dark:bg-gray-900 shadow px-4 md:px-6 py-3 flex flex-wrap md:flex-nowrap justify-between items-center border-b border-gray-200 dark:border-gray-700">
      {/* Logo + Title */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <img src={logo} alt="Logo" className="w-8 h-8 hidden md:block" />
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block">
          BuyticleSeller
        </h1>
      </div>

      {/* Search - full width on small, fixed max width on md+ */}
      <div className="relative flex-1 max-w-full md:max-w-xl mx-0 md:mx-4 mt-3 md:mt-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher produits, commandes, clients..."
          className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 shadow-sm"
        />
      </div>

      {/* Actions + Profile */}
      <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-0 flex-shrink-0">
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
          <FiPlus className="text-xl text-primary" />
        </button>
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
          <FiMessageSquare className="text-xl text-gray-700 dark:text-gray-200" />
        </button>
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
          <FiBell className="text-xl text-gray-700 dark:text-gray-200 animate-pulse-slow" />
          <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-controls="profile-menu"
          >
            <img
              src={userData.ProfilePicture}
              alt="User Avatar"
              className="rounded-full w-8 h-8"
            />
            <span className="text-sm text-gray-800 dark:text-gray-200 font-medium hidden sm:inline">
              Mon Profil
            </span>
            <FiChevronDown
              className={`text-gray-500 dark:text-gray-300 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown menu */}
          <div
            id="profile-menu"
            className={`origin-top-right absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 transform ${
              dropdownOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <a
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiUser className="mr-2" /> Mon Compte
            </a>
            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiSettings className="mr-2" /> Paramètres
            </a>
            <button
  onClick={handleLogout}
  className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
>
  <FiLogOut className="mr-2" /> Déconnexion
</button>

          </div>
        </div>
      </div>
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Ouvrir le menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
};

export default Navbar;
