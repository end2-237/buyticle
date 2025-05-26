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
  FiStar,
} from "react-icons/fi";

const Sidebar = ({ open, setOpen }) => {
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
    { name: "Solde", icon: <FiCreditCard />, path: "/dashboard/vendeur/solde" },
    {
      name: "Settings",
      icon: <FiSettings />,
      path: "/dashboard/vendeur/parametres",
    },
  ];

  const renderLinks = (items, level = 0) =>
    items.map((item, index) => {
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
      const textColor = isActive || isDropdownActive
        ? "text-green-500 font-semibold"
        : "text-gray-400";

      const size = level === 0 ? "text-base" : "text-sm";
      const padding = level > 0 ? "pl-6" : "";

      return item.children ? (
        <div key={index} className="space-y-1">
          <button
            onClick={() => handleParentClick(item)}
            className={`flex items-center gap-3 py-2 px-4 rounded-md w-full ${textColor} hover:text-green-400 transition-colors duration-200 ${size}`}
          >
            {level === 0 && <span className="text-lg">{item.icon}</span>}
            {open && <span className={`${padding}`}>{item.name}</span>}
            {open && (
              <span className="ml-auto">
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            )}
          </button>
          {isOpen && open && (
            <div className="ml-4 border-l border-gray-700 pl-4">
              {renderLinks(item.children, level + 1)}
            </div>
          )}
        </div>
      ) : (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center gap-3 py-2 px-4 rounded-md transition-colors duration-200 ${textColor} hover:text-green-400 ${size}`}
        >
          {level === 0 && <span className="text-lg">{item.icon}</span>}
          {open && <span className={`${padding}`}>{item.name}</span>}
        </Link>
      );
    });

  return (
    <aside
  className={`fixed md:static z-40 inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
    ${open ? "w-64" : "w-16"} bg-gray-800 dark:bg-gray-900 flex flex-col shadow-lg
    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {open && (
          <span className="text-xl font-bold text-green-500 tracking-wide">
            Buyticle
          </span>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
          aria-label={open ? "Réduire" : "Déployer"}
        >
          {open ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {renderLinks(menuItems)}

        <div className="mt-6 px-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 py-2 px-4 w-full bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md transition"
          >
            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-green-400" />}
            {open && <span>{darkMode ? "Mode clair" : "Mode sombre"}</span>}
          </button>
        </div>
      </nav>

      {/* Upgrade CTA */}
      <div className="px-4 py-3 border-t border-gray-700">
        <button
          className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm bg-gradient-to-r from-green-500 to-lime-400 text-white rounded-lg shadow-md hover:opacity-90 transition"
        >
          <FiStar className="text-white" />
          {open && <span>Passer au plan supérieur</span>}
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <img
            src="https://i.pravatar.cc/40"
            className="rounded-full w-9 h-9 border border-gray-600"
            alt="avatar"
          />
          {open && (
            <div className="ml-3 flex flex-col">
              <span className="text-sm font-medium text-white">Ton Nom</span>
              <button className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                <FiLogOut /> Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
