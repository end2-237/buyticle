import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/buylogo2.png"
import { FaAndroid } from "react-icons/fa";

export default function Navigation() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-20 flex justify-between items-center p-6 bg-transparent">
      <div className="text-xl font-bold flex items-center gap-1"><img src={logo} alt="logo" className="" style={{width:"auto", height:"80px"}}/></div>

      {/* Menu desktop */}
      <div className="hidden md:flex space-x-8 items-center">
        <a href="/" className="text-gray-700 hover:text-black transition">
          Accueil
        </a>
        <a href="/notfound" className="text-gray-700 hover:text-black transition">
          Découvrir
        </a>
        <a href="/onboarding" className="text-gray-700 hover:text-black transition">
          Vendre
        </a>
        <a href="/contact" className="text-gray-700 hover:text-black transition">
          Contactez-nous
        </a>
        <a href="https://play.google.com/apps/internaltest/4701420296100637084" className="flex gap-1 items-center rounded-full bg-gradient-to-r from-orange-900 to-blue-400  text-white px-6 py-2 hover:opacity-90 transition">
        <FaAndroid/>
          Télécharger l'application
        </a>
        <button
          onClick={() => navigate("/signin")}
          className="rounded-full border border-gray-400 text-gray-800 px-6 py-2 hover:bg-gray-100 transition"
        >
          Dashboard
        </button>
      </div>

      {/* Burger menu mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-800 focus:outline-none"
        >
          {/* Icône burger */}
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="absolute top-20 right-6 bg-white/80 backdrop-blur-md border border-gray-300 rounded-2xl p-6 flex flex-col space-y-4 items-start md:hidden">
          <a href="/" className="text-gray-700 hover:text-black transition" onClick={() => setMenuOpen(false)}>
            Accueil
          </a>
          <a href="/notfound" className="text-gray-700 hover:text-black transition" onClick={() => setMenuOpen(false)}>
            Découvrir
          </a>
          <a href="/onboarding" className="text-gray-700 hover:text-black transition" onClick={() => setMenuOpen(false)}>
            Vendre
          </a>
          <a href="/contact" className="text-gray-700 hover:text-black transition" onClick={() => setMenuOpen(false)}>
            Contactez-nous
          </a>
          <button className="flex gap-1 items-center rounded-full bg-gradient-to-r from-orange-900 to-blue-400 text-white px-6 py-2 w-full hover:opacity-90 transition">
            <FaAndroid/>
            Télécharger l'application
          </button>
          <button
            onClick={() => {
              navigate("/signin");
              setMenuOpen(false);
            }}
            className="rounded-full border border-gray-400 text-gray-800 px-6 py-2 w-full hover:bg-gray-100 transition"
          >
            Dashboard
          </button>
        </div>
      )}
    </nav>
  );
}
