import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BuyMark, Btn } from "./ui";
import { Icon } from "./icons";
import { useAuth } from "./AuthContext";
import NotifBell from "./NotifBell";
import logo from "../assets/buylogo2.png";

/* ─── Public program nav — transparent over the video hero, solid on scroll ─── */
export function ProgramNav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || open; // dark text mode (light background)
  const links = [
    { label: "Le programme", href: "#programme" },
    { label: "Les apps", href: "#apps" },
    { label: "Récompenses", href: "#recompenses" },
    { label: "Communauté", to: "/testers/tests" },
  ];
  const linkCls = dark ? "text-[#0A0A0A]/60 hover:text-[#0A0A0A]" : "text-white/70 hover:text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${dark ? "bg-[#EDECEA]/85 backdrop-blur-xl border-b border-[#0A0A0A]/8" : "bg-transparent"}`}>
      {!dark && <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/testers" className="flex items-center gap-3 group">
          <img src={logo} alt="Buyticle" className={`h-8 w-auto transition ${dark ? "" : "brightness-0 invert"} group-hover:opacity-75`} />
          <span className={`hidden sm:block text-xs font-mono tracking-[0.2em] uppercase transition-colors ${dark ? "text-[#0A0A0A]/50" : "text-white/60"}`}>
            Agence digitale · Douala
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className={`text-sm transition ${linkCls}`}>{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} className={`text-sm transition ${linkCls}`}>{l.label}</a>
            )
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <Btn to="/testers/dashboard" variant={dark ? "primary" : "orange"} className="!px-5 !py-2.5">Mon espace</Btn>
          ) : (
            <>
              <Link to="/testers/login" className={`hidden sm:inline text-sm font-medium transition ${dark ? "text-[#0A0A0A]/70 hover:text-[#0A0A0A]" : "text-white/80 hover:text-white"}`}>Se connecter</Link>
              <Btn to="/testers/register" variant={dark ? "primary" : "orange"} className="!px-5 !py-2.5">Devenir testeur</Btn>
            </>
          )}
          <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5" aria-label="Menu">
            <span className={`block h-0.5 w-5 transition ${dark ? "bg-[#0A0A0A]" : "bg-white"} ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-5 transition ${dark ? "bg-[#0A0A0A]" : "bg-white"} ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 transition ${dark ? "bg-[#0A0A0A]" : "bg-white"} ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#0A0A0A]/8 px-5 py-4 space-y-3 bg-[#EDECEA]">
          {links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block text-sm text-[#0A0A0A]/70">{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-[#0A0A0A]/70">{l.label}</a>
            )
          )}
        </div>
      )}
    </header>
  );
}

/* ─── Authenticated app shell (Skillway-style top bar, light) ─── */
export function DashboardShell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Accueil", to: "/testers/dashboard" },
    { label: "Tests", to: "/testers/tests" },
    { label: "Récompenses", to: "/testers/dashboard#recompenses" },
  ];
  if (user?.role === "admin") links.push({ label: "Admin", to: "/testers/admin" });

  const name = user?.profile?.fullName || user?.email?.split("@")[0] || "Testeur";
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const doLogout = () => { logout(); navigate("/testers"); };

  return (
    <div className="font-jakarta min-h-screen bg-[#EDECEA] text-[#0A0A0A]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#0A0A0A]/8">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-[68px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <BuyMark to="/testers/dashboard" />
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <NavLink key={l.label} to={l.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition ${isActive ? "bg-[#0A0A0A] text-white" : "text-[#0A0A0A]/55 hover:text-[#0A0A0A] hover:bg-[#0A0A0A]/[0.04]"}`}
                >{l.label}</NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="hidden sm:grid place-items-center w-10 h-10 rounded-full text-[#0A0A0A]/60 hover:bg-[#0A0A0A]/[0.05] transition" aria-label="Recherche">
              <Icon name="search" size={18} />
            </button>
            <NotifBell uid={user?.id} />
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-[#0A0A0A]/[0.05] transition">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-[#FF4500] text-white text-xs font-bold">{initials}</span>
                <span className="hidden md:block text-left leading-tight">
                  <span className="block text-[13px] font-semibold">{name}</span>
                  <span className="block text-[11px] text-[#0A0A0A]/40 capitalize">{user?.role === "admin" ? "Administrateur" : "Testeur"}</span>
                </span>
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#0A0A0A]/8 p-2 z-20">
                    <Link to="/testers/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-[#0A0A0A]/[0.04]"><Icon name="users" size={15} /> Mon profil</Link>
                    <Link to="/testers/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-[#0A0A0A]/[0.04]"><Icon name="layout-dashboard" size={15} /> Tableau de bord</Link>
                    <Link to="/testers/tests" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-[#0A0A0A]/[0.04]"><Icon name="message-square" size={15} /> Tests communautaires</Link>
                    <button onClick={doLogout} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"><Icon name="logout" size={15} /> Se déconnecter</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-8">{children}</main>
    </div>
  );
}
