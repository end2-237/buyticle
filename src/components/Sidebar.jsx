// Sidebar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiShoppingCart,
  FiUsers,
  FiBox,
  FiTag,
  FiCreditCard,
  FiSettings,
  FiSun,
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

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard/vendeur" },
    {
      name: "Marketplace",
      icon: <FiBox />,
      children: [
        {
          name: "Produits",
          children: [
            { name: "Liste de produits", path: "/dashboard/vendeur/produits" },
            { name: "Ajouter un produit", path: "/dashboard/vendeur/produits/ajouter" },
          ],
        },
        {
          name: "Statistiques",
          path: "/dashboard/vendeur/statistiques" 
        },
      ],
    },
    {
      name: "Orders",
      icon: <FiShoppingCart />,
      children: [{ name: "Tracking", path: "/dashboard/vendeur/commandes" }],
    },
    { name: "Customers", icon: <FiUsers />, path: "/dashboard/vendeur/clients" },
    { name: "Discounts", icon: <FiTag />, path: "/dashboard/vendeur/promos" },
    { name: "Ledger", icon: <FiCreditCard />, path: "/dashboard/vendeur/ledger" },
    { name: "Taxes", icon: <FiCreditCard />, path: "/dashboard/vendeur/taxes" },
    { name: "Settings", icon: <FiSettings />, path: "/dashboard/vendeur/parametres" },
  ];

 // Modifications majeures à renderLinks
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
    const textColor = isActive || isDropdownActive ? "text-primary font-medium" : "text-gray-600";
    const hoverStyle = "hover:text-primary";
    const textSize = level === 0 ? "text-base" : "text-sm";
    const iconIndent = level > 0 ? "ml-1.5" : "";
    const verticalLine = level > 0 ? "border-l-2 border-gray-300 pl-3 ml-1" : "";

    if (item.children) {
      return (
        <div key={index} className="space-y-1">
          <button
            onClick={() => toggleDropdown(item.name)}
            className={`flex items-center w-full gap-3 py-2 px-3 rounded transition-all ${textColor} ${hoverStyle} ${textSize}`}
          >
            <span className={`flex items-center gap-3 ${verticalLine}`}>
              {level === 0 && <span className="text-lg">{item.icon}</span>}
              {open && <span className={`${iconIndent}`}>{item.name}</span>}
            </span>
            {open && (isOpen ? <FiChevronUp /> : <FiChevronDown />)}
          </button>
          {isOpen && open && (
            <div className="ml-2">{renderLinks(item.children, level + 1)}</div>
          )}
        </div>
      );
    } else {
      return (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center gap-3 py-2 px-3 rounded transition-all ${textColor} ${hoverStyle} ${textSize}`}
        >
          <span className={`flex items-center gap-3 ${verticalLine}`}>
            {level === 0 && <span className="text-lg">{item.icon}</span>}
            {open && <span className={`${iconIndent}`}>{item.name}</span>}
          </span>
        </Link>
      );
    }
  });
};

  return (
    <aside
      className={`h-screen transition-all duration-300 ${
        open ? "w-64" : "w-20"
      } bg-base-200 dark:bg-gray-900 flex flex-col shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-base-300 dark:border-gray-700">
        {open && (
          <span className="text-xl font-bold text-primary tracking-wide">
            Buyticle
          </span>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-sm btn-circle bg-base-100 dark:bg-gray-800 border border-base-300 dark:border-gray-700 hover:bg-base-300 dark:hover:bg-gray-700"
        >
          {open ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {renderLinks(menuItems)}

        {/* Dark Mode Toggle */}
        <div className="mt-6 px-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 py-2 px-3 rounded-md text-gray-500 hover:text-primary transition-colors"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
            {open && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-base-300 dark:border-gray-700">
        <div className={`flex ${open ? "justify-between" : "justify-center"} items-center`}>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="rounded-full w-8 h-8"
          />
          {open && (
            <div className="flex flex-col ml-3">
              <p className="text-sm font-semibold text-base-content dark:text-gray-200">
                Ton Nom
              </p>
              <button className="text-xs text-red-500 hover:underline flex items-center gap-1">
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
