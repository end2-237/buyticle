import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import * as store from "../store";

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const fmtDate = (s) => { if (!s) return "—"; const [y, m, d] = s.split("-"); return `${+d} ${MONTHS[+m - 1]}`; };

function Stat({ icon, label, value, sub, color }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5">
      <div className="flex items-center justify-between">
        <span className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${color}18`, color }}><Icon name={icon} size={20} /></span>
      </div>
      <div className="text-[24px] font-bold tracking-tight leading-none mt-4">{value}</div>
      <div className="text-[13px] font-semibold text-slate-600 mt-1">{label}</div>
      {sub && <div className="text-[12px] text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function EmpDashboard() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => store.subscribeEmployees(setEmployees), []);
  useEffect(() => store.subscribeTasks(setTasks), []);

  const done = tasks.filter((t) => t.status === "done").length;
  const inProg = tasks.filter((t) => t.status === "in_progress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const rate = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const todayStr = store.ymd(new Date());
  const todayTasks = tasks.filter((t) => t.date === todayStr).sort((a, b) => store.minutesOf(a.start) - store.minutesOf(b.start));

  // charge par employé
  const load = employees.map((e) => ({ e, n: tasks.filter((t) => t.assigneeIds?.includes(e.id) && t.status !== "done").length }))
    .sort((a, b) => b.n - a.n).slice(0, 6);
  const maxLoad = Math.max(1, ...load.map((l) => l.n));

  return (
    <EmployerShell title="Dashboard">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="font-bold text-[18px] tracking-tight">Bonjour 👋</h2>
          <p className="text-[13px] text-slate-400">Voici l'activité de votre équipe aujourd'hui.</p>
        </div>
        <button onClick={() => navigate("/employer/calendar")} className="inline-flex items-center gap-2 rounded-lg bg-[#2C87F2] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0]">
          <Icon name="plus" size={16} /> Nouvelle tâche
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon="users" label="Employés" value={employees.length} sub="dans l'équipe" color="#2C87F2" />
        <Stat icon="list-checks" label="Tâches actives" value={todo + inProg} sub={`${inProg} en cours`} color="#F97316" />
        <Stat icon="check-circle" label="Terminées" value={done} sub="cumulé" color="#22C55E" />
        <Stat icon="trending-up" label="Taux d'achèvement" value={`${rate}%`} sub="global" color="#A855F7" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        {/* Planning du jour */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[14px] tracking-tight">Planning du jour</h3>
            <button onClick={() => navigate("/employer/calendar")} className="text-[12px] font-semibold text-[#2C87F2] hover:underline">Voir le calendrier</button>
          </div>
          {todayTasks.length === 0 ? (
            <p className="text-[13px] text-slate-400 py-8 text-center">Aucune tâche planifiée aujourd'hui.</p>
          ) : (
            <div className="space-y-2.5">
              {todayTasks.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <span className="w-1.5 h-9 rounded-full" style={{ background: t.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[14px] truncate">{t.title}</div>
                    <div className="text-[12px] text-slate-400">{store.fmtTime(t.start)} - {store.fmtTime(t.end)}</div>
                  </div>
                  <div className="flex -space-x-2">
                    {(t.assigneeIds || []).slice(0, 3).map((id) => {
                      const e = employees.find((x) => x.id === id);
                      return <span key={id} className="w-6 h-6 rounded-full grid place-items-center text-white text-[9px] font-bold ring-2 ring-white" style={{ background: e?.color || store.colorFor(id) }}>{store.initials(e?.name || "?")}</span>;
                    })}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${store.TASK_STATUS.find((s) => s.key === t.status)?.color}18`, color: store.TASK_STATUS.find((s) => s.key === t.status)?.color }}>
                    {store.TASK_STATUS.find((s) => s.key === t.status)?.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Charge de travail */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <h3 className="font-bold text-[16px] mb-4">Charge de l'équipe</h3>
          {load.length === 0 ? (
            <p className="text-[13px] text-slate-400 py-8 text-center">Ajoutez des employés pour voir leur charge.</p>
          ) : (
            <div className="space-y-3.5">
              {load.map(({ e, n }) => (
                <div key={e.id}>
                  <div className="flex items-center justify-between text-[13px] mb-1">
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 rounded-full grid place-items-center text-white text-[9px] font-bold shrink-0" style={{ background: e.color || store.colorFor(e.id) }}>{store.initials(e.name)}</span>
                      <span className="truncate font-medium">{e.name.split(" ")[0]}</span>
                    </span>
                    <span className="font-bold">{n}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(n / maxLoad) * 100}%`, background: e.color || "#2C87F2" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </EmployerShell>
  );
}
