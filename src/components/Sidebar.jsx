import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiShoppingCart,
  FiBox,
  FiTag,
  FiCreditCard,
  FiSettings,
  FiSun,
  FiBarChart2,
  FiMoon,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [dropdownStates, setDropdownStates] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDropdown = (name) => {
    setDropdownStates((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleParentClick = (item) => {
    if (!open) {
      setOpen(true);
      setDropdownStates((prev) => ({ ...prev, [item.name]: true }));
    } else {
      toggleDropdown(item.name);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard/vendeur/home" },
    {
      name: "Marketplace",
      icon: <FiBox />,
      children: [
        {
          name: "Produits",
          children: [
            { name: "Liste de produits", path: "/dashboard/vendeur/produits" },
            {
              name: "Ajouter un produit",
              path: "/dashboard/vendeur/produits/ajouter",
            },
          ],
        },
      ],
    },
    {
      name: "Orders",
      icon: <FiShoppingCart />,
      children: [{ name: "Tracking", path: "/dashboard/vendeur/commandes" }],
    },
    {
      name: "Buyticle Pub",
      icon: <FiTag />,
      path: "/dashboard/vendeur/espacepub",
      children: [
        { name: "Créer un CTA", path: "/dashboard/vendeur/espacepub" },
        {
          name: "Créer une offre spéciale",
          path: "/dashboard/vendeur/espacepub/offres",
        },
      ],
    },
    {
      name: "Statistiques",
      icon: <FiBarChart2 />,
      path: "/dashboard/vendeur/statistiques",
    },
    { name: "Solde", icon: <FiCreditCard />, path: "/notfound" },
    { name: "Settings", icon: <FiSettings />, path: "/dashboard/vendeur/parametres" },
  ];

  const renderLinks = (items, level = 0) => {
    return items.map((item, index) => {
      const isActive = item.path && location.pathname === item.path;
      const isDropdownActive =
        item.children &&
        item.children.some((child) =>
          child.path
            ? location.pathname.startsWith(child.path)
            : child.children?.some((gchild) =>
                location.pathname.startsWith(gchild.path)
              )
        );

      const isOpen = dropdownStates[item.name];

      const baseTextColor = "text-gray-400";
      const activeTextColor = "text-green-500 font-semibold";
      const hoverTextColor = "hover:text-green-400";
      const focusRing = "focus:ring-2 focus:ring-green-400";

      const textColor =
        isActive || isDropdownActive ? activeTextColor : baseTextColor;

      const textSize = level === 0 ? "text-base" : "text-sm";
      // Réduction indentation ici :
      const iconIndent = level > 0 ? "ml-2" : "";
      const verticalLine = level > 0 ? "border-l-2 border-gray-700 pl-2 ml-2" : "";

      if (item.children) {
        return (
          <div key={index} className="space-y-1">
            <button
              onClick={() => handleParentClick(item)}
              className={`flex items-center w-full gap-3 py-2 px-4 rounded-md transition-colors duration-300 ease-in-out ${textColor} ${hoverTextColor} ${textSize} ${focusRing} focus:outline-none`}
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls={`${item.name}-submenu`}
              type="button"
            >
              <span className={`flex items-center gap-3 ${verticalLine}`}>
                {level === 0 && (
                  <span className="text-lg text-green-500">{item.icon}</span>
                )}
                {open && <span className={`${iconIndent}`}>{item.name}</span>}
              </span>
              {open && (
                <span className="ml-auto text-green-400">
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              )}
            </button>
            {isOpen && open && (
              <div
                id={`${item.name}-submenu`}
                className="ml-4 border-l border-gray-700 pl-4"
              >
                {renderLinks(item.children, level + 1)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 py-2 px-4 rounded-md transition-colors duration-300 ease-in-out ${textColor} ${hoverTextColor} ${textSize} ${focusRing} focus:outline-none`}
          >
            <span className={`flex items-center gap-3 ${verticalLine}`}>
              {level === 0 && (
                <span className="text-lg text-green-500">{item.icon}</span>
              )}
              {open && <span className={`${iconIndent}`}>{item.name}</span>}
            </span>
          </Link>
        );
      }
    });
  };

  return (
    <aside
      className={`h-screen transition-all duration-500 ease-in-out select-none ${
        open ? "w-64" : "w-20"
      } bg-gray-800 flex flex-col shadow-lg`}
      aria-label="Sidebar Navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        {open && (
          <span className="text-2xl font-extrabold text-green-500 tracking-wide">
            Buyticle
          </span>
        )}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="btn-circle p-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 transition-colors duration-300 rounded-full text-green-500 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
          type="button"
        >
          {open ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-6 space-y-1">
        {renderLinks(menuItems)}

        {/* Dark Mode Toggle */}
        <div className="mt-6 px-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 py-2 px-4 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="button"
          >
            {darkMode ? (
              <FiSun className="text-yellow-400" />
            ) : (
              <FiMoon className="text-green-400" />
            )}
            {open && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-700">
        <div
          className={`flex items-center ${
            open ? "justify-between" : "justify-center"
          }`}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="rounded-full w-9 h-9 border-2 border-gray-700"
            draggable={false}
          />
          {open && (
            <div className="flex flex-col ml-3">
              <p className="text-sm font-semibold text-gray-300 select-none">
                Ton Nom
              </p>
              <button
                className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 focus:outline-none"
                type="button"
              >
                <FiLogOut className="inline-block" /> Se déconnecter
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
