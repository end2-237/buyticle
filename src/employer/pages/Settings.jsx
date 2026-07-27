import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import { useAuth } from "../../testers/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const name = user?.profile?.fullName || user?.email?.split("@")[0] || "Employeur";

  return (
    <EmployerShell title="Paramètres">
      <div className="max-w-2xl">
        <h2 className="font-extrabold text-[20px] mb-4">Paramètres du compte</h2>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-center gap-4">
          <span className="w-14 h-14 rounded-full grid place-items-center bg-[#2C87F2] text-white text-[18px] font-bold">{name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[16px]">{name}</div>
            <div className="text-[13px] text-slate-400 truncate">{user?.email}</div>
            <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-[#2C87F2] bg-[#2C87F2]/10 rounded-full px-2 py-0.5">
              <Icon name="shield" size={11} /> {user?.role === "admin" ? "Administrateur" : "Employeur"}
            </span>
          </div>
          <button onClick={() => navigate("/testers/profile")} className="rounded-lg border border-slate-200 px-3.5 py-2 text-[13px] font-semibold text-slate-700 hover:border-[#2C87F2] hover:text-[#2C87F2]">Modifier</button>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 divide-y divide-slate-100 mt-4">
          {[
            { icon: "users", label: "Gestion des employés", to: "/employer/employees" },
            { icon: "list-checks", label: "Tableau des tâches", to: "/employer/tasks" },
            { icon: "calendar", label: "Calendrier", to: "/employer/calendar" },
            { icon: "puzzle", label: "Intégrations", to: "/employer/integrations" },
          ].map((r) => (
            <button key={r.to} onClick={() => navigate(r.to)} className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition text-left">
              <span className="w-9 h-9 rounded-lg grid place-items-center bg-slate-100 text-slate-500"><Icon name={r.icon} size={17} /></span>
              <span className="flex-1 font-medium text-[14px]">{r.label}</span>
              <Icon name="chevron-right" size={16} className="text-slate-300" />
            </button>
          ))}
        </div>

        <button onClick={() => logout().then(() => navigate("/testers/login"))}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 text-red-500 px-4 py-2.5 text-[13px] font-semibold hover:bg-red-50">
          <Icon name="logout" size={16} /> Se déconnecter
        </button>
      </div>
    </EmployerShell>
  );
}
