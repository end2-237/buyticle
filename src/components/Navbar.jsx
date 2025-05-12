// src/components/Navbar.jsx
import { FiBell, FiSearch, FiChevronDown, FiSettings, FiUser, FiLogOut, FiMessageSquare, FiPlus } from 'react-icons/fi';

const Navbar = () => (
  <header className="bg-white dark:bg-gray-900 shadow px-6 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
    {/* Left section: logo & title */}
    <div className="flex items-center gap-3">
      <img src="/logo192.png" alt="Logo" className="w-8 h-8 hidden md:block" />
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block">Buyticle Admin</h1>
    </div>

    {/* Center section: search bar */}
    <div className="relative flex-1 max-w-xl mx-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Rechercher produits, commandes, clients..."
        className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 shadow-sm"
      />
    </div>

    {/* Right section: actions */}
    <div className="flex items-center gap-4">
      <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
        <FiPlus className="text-xl text-primary" />
      </button>
      <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
        <FiMessageSquare className="text-xl text-gray-700 dark:text-gray-200" />
      </button>
      <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
        <FiBell className="text-xl text-gray-700 dark:text-gray-200 animate-pulse-slow" />
        <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
      </button>
      <div className="relative group">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/32"
            alt="User Avatar"
            className="rounded-full w-8 h-8"
          />
          <span className="text-sm text-gray-800 dark:text-gray-200 font-medium hidden sm:inline">Mon Profil</span>
          <FiChevronDown className="text-gray-500 dark:text-gray-300" />
        </div>
        {/* Dropdown menu */}
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all origin-top-right z-10">
          <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiUser className="mr-2" /> Mon Compte
          </a>
          <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiSettings className="mr-2" /> Paramètres
          </a>
          <a href="/logout" className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiLogOut className="mr-2" /> Déconnexion
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
