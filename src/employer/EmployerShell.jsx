import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "../testers/icons";
import { useAuth } from "../testers/AuthContext";
import logo from "../assets/buylogo2.png";

const MAIN = [
  { to: "/employer", icon: "layout-dashboard", label: "Dashboard", end: true },
  { to: "/employer/calendar", icon: "calendar", label: "Calendrier" },
  { to: "/employer/tasks", icon: "list-checks", label: "Tâches" },
  { to: "/employer/employees", icon: "users", label: "Employés" },
  { to: "/employer/integrations", icon: "puzzle", label: "Intégrations" },
];
const OTHERS = [
  { to: "/employer/settings", icon: "settings", label: "Paramètres" },
  { to: "/testers/admin", icon: "shield", label: "Espace testeurs" },
  { to: "/contact", icon: "help-circle", label: "Aide" },
];

function SideLink({ item }) {
  return (
    <NavLink to={item.to} end={item.end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition ${
          isActive ? "bg-[#2C87F2]/10 text-[#2C87F2]" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        }`
      }>
      <Icon name={item.icon} size={19} strokeWidth={1.9} />
      {item.label}
    </NavLink>
  );
}

export function EmployerShell({ title = "Dashboard", actions, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const name = user?.profile?.fullName || user?.email?.split("@")[0] || "Employeur";
  const inits = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="font-jakarta min-h-screen flex bg-[#F6F8FB] text-slate-800">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="px-6 py-5 flex items-center gap-2.5">
          <img src={logo} alt="Buyticle" className="w-9 h-9 rounded-xl object-cover" />
          <span className="font-extrabold text-[18px] tracking-tight">Buyticle<span className="text-[#2C87F2]">Work</span></span>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto">
          <p className="px-3.5 mt-4 mb-2 text-[11px] font-semibold tracking-wider text-slate-400">MENU PRINCIPAL</p>
          <div className="space-y-1">{MAIN.map((i) => <SideLink key={i.to} item={i} />)}</div>
          <p className="px-3.5 mt-6 mb-2 text-[11px] font-semibold tracking-wider text-slate-400">AUTRES</p>
          <div className="space-y-1">{OTHERS.map((i) => <SideLink key={i.to} item={i} />)}</div>
        </nav>

        <div className="p-3">
          <div className="rounded-2xl p-4 text-white" style={{ background: "linear-gradient(150deg,#2C87F2,#1e6fd0)" }}>
            <div className="flex items-center gap-2 font-bold text-[14px]"><Icon name="rocket" size={16} /> Plan Pro</div>
            <p className="text-white/80 text-[12px] mt-1 leading-snug">Gérez employés et tâches sans limite.</p>
            <button onClick={() => navigate("/employer/employees")} className="mt-3 w-full rounded-lg bg-white/15 hover:bg-white/25 transition py-2 text-[13px] font-semibold">Gérer l'équipe</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-5 md:px-8 gap-4">
          <h1 className="font-extrabold text-[20px] tracking-tight truncate">{title}</h1>
          <div className="flex items-center gap-3 md:gap-5">
            <button className="text-slate-400 hover:text-slate-700 transition"><Icon name="share" size={19} /></button>
            <button className="relative text-slate-400 hover:text-slate-700 transition">
              <Icon name="bell" size={19} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 md:pl-5 border-l border-slate-200">
              <span className="w-9 h-9 rounded-full grid place-items-center bg-[#2C87F2] text-white text-[12px] font-bold">{inits}</span>
              <div className="hidden sm:block leading-tight">
                <div className="text-[13px] font-bold">{name}</div>
                <div className="text-[11px] text-slate-400">{user?.email}</div>
              </div>
              <button onClick={() => logout().then(() => navigate("/testers/login"))} title="Se déconnecter" className="text-slate-400 hover:text-slate-700 transition"><Icon name="logout" size={17} /></button>
            </div>
          </div>
        </header>

        {actions}
        <main className="flex-1 min-h-0 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
