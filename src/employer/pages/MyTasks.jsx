import { useEffect, useState } from "react";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import { useAuth } from "../../testers/AuthContext";
import TaskDetail from "../TaskDetail";
import * as store from "../store";

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const fmtDate = (s) => { if (!s) return "—"; const [y, m, d] = s.split("-"); return `${+d} ${MONTHS[+m - 1]} ${y}`; };
const FILTERS = [{ key: "active", label: "À faire" }, { key: "done", label: "Terminées" }, { key: "all", label: "Toutes" }];

export default function MyTasks() {
  const { user } = useAuth();
  const [me, setMe] = useState(undefined); // undefined=loading, null=not linked
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState("active");

  useEffect(() => { store.employeeForEmail(user.email).then(setMe); }, [user.email]);
  useEffect(() => store.subscribeEmployees(setEmployees), []);
  useEffect(() => store.subscribeTasks(setTasks), []);

  const actor = { id: user.id, name: user.profile?.fullName || user.email.split("@")[0] };
  const mine = me ? tasks.filter((t) => t.assigneeIds?.includes(me.id)) : [];
  const shown = mine.filter((t) => filter === "all" ? true : filter === "done" ? t.status === "done" : t.status !== "done")
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  const stat = (s) => mine.filter((t) => t.status === s).length;

  return (
    <EmployerShell title="Mes tâches">
      {me === undefined ? (
        <div className="grid place-items-center py-20"><div className="w-8 h-8 rounded-full border-2 border-[#2C87F2] border-t-transparent animate-spin" /></div>
      ) : me === null ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center max-w-lg mx-auto">
          <span className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 mb-3"><Icon name="alert-triangle" size={26} /></span>
          <p className="font-bold text-slate-700">Votre compte n'est pas encore lié à un employé</p>
          <p className="text-[13px] text-slate-400 mt-1">Demandez à votre administrateur d'ajouter un employé avec l'adresse <b>{user.email}</b> dans « Employés ». Vos tâches apparaîtront ensuite ici.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="w-12 h-12 rounded-full grid place-items-center text-white text-[15px] font-bold" style={{ background: me.color || store.colorFor(me.id) }}>{store.initials(me.name)}</span>
            <div className="flex-1">
              <h2 className="font-bold text-[16px] tracking-tight leading-tight">{me.name}</h2>
              <p className="text-[13px] text-slate-400">{me.poste || "Employé"} · {me.department}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5 max-w-lg">
            {[{ l: "À faire", v: stat("todo"), c: "#64748B" }, { l: "En cours", v: stat("in_progress"), c: "#2C87F2" }, { l: "Terminées", v: stat("done"), c: "#22C55E" }].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white border border-slate-200 p-4">
                <div className="text-[22px] font-bold tracking-tight" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[12px] text-slate-400 font-medium">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1 w-fit mb-4">
            {FILTERS.map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key)} className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition ${filter === f.key ? "bg-white shadow text-slate-800" : "text-slate-500"}`}>{f.label}</button>
            ))}
          </div>

          {shown.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center">
              <p className="text-[14px] text-slate-400">Aucune tâche dans cette catégorie.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {shown.map((t) => {
                const k = store.kindOf(t.kind);
                const st = store.TASK_STATUS.find((s) => s.key === t.status);
                return (
                  <button key={t.id} onClick={() => setOpenId(t.id)} className="text-left rounded-2xl bg-white border border-slate-200 p-4 hover:shadow-md hover:border-[#2C87F2]/40 transition">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${k.color}18`, color: k.color }}><Icon name={k.icon} size={12} /> {k.label}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${st.color}18`, color: st.color }}>{st.label}</span>
                    </div>
                    <h3 className="font-bold text-[15px] mt-2.5">{t.title}</h3>
                    <p className="text-[12px] text-slate-400 mt-1 line-clamp-2">{t.description || "Aucune description."}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-3"><Icon name="calendar" size={12} /> {fmtDate(t.date)} · {store.fmtTime(t.start)}</div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] mb-1"><span className="text-slate-400">Avancement</span><span className="font-bold">{t.progress || 0}%</span></div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${t.progress || 0}%`, background: k.color }} /></div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {openId && <TaskDetail taskId={openId} onClose={() => setOpenId(null)} employees={employees} actor={actor} canManage={user.role === "admin"} />}
    </EmployerShell>
  );
}
