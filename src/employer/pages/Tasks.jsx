import { useEffect, useState } from "react";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import * as store from "../store";

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const fmtDate = (s) => { if (!s) return "—"; const [y, m, d] = s.split("-"); return `${+d} ${MONTHS[+m - 1]} ${y}`; };

function Assignees({ ids, employees }) {
  if (!ids?.length) return <span className="text-[11px] text-slate-300">Non assignée</span>;
  return (
    <div className="flex -space-x-2">
      {ids.slice(0, 4).map((id) => {
        const e = employees.find((x) => x.id === id);
        return <span key={id} title={e?.name} className="w-6 h-6 rounded-full grid place-items-center text-white text-[9px] font-bold ring-2 ring-white" style={{ background: e?.color || store.colorFor(id) }}>{store.initials(e?.name || "?")}</span>;
      })}
      {ids.length > 4 && <span className="w-6 h-6 rounded-full grid place-items-center bg-slate-200 text-slate-500 text-[9px] font-bold ring-2 ring-white">+{ids.length - 4}</span>}
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  useEffect(() => store.subscribeTasks(setTasks), []);
  useEffect(() => store.subscribeEmployees(setEmployees), []);

  const next = { todo: "in_progress", in_progress: "done", done: "todo" };

  return (
    <EmployerShell title="Tâches">
      <div className="mb-4">
        <h2 className="font-extrabold text-[20px]">Tableau des tâches</h2>
        <p className="text-[13px] text-slate-400">Suivez et attribuez les tâches de votre équipe</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {store.TASK_STATUS.map((col) => {
          const items = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="rounded-2xl bg-white border border-slate-200 p-3.5">
              <div className="flex items-center justify-between px-1.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
                  <span className="font-bold text-[14px]">{col.label}</span>
                </div>
                <span className="text-[12px] font-semibold text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">{items.length}</span>
              </div>
              <div className="space-y-2.5 min-h-[60px]">
                {items.length === 0 && <p className="text-[12px] text-slate-300 text-center py-6">Aucune tâche</p>}
                {items.map((t) => (
                  <div key={t.id} className="rounded-xl border border-slate-200 p-3 hover:shadow-sm transition">
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-md grid place-items-center shrink-0 mt-0.5" style={{ background: `${t.color}22`, color: t.color }}><Icon name={store.MARKS.find((m) => m.key === t.mark)?.icon || "briefcase"} size={13} /></span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13px] leading-tight">{t.title}</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                          <Icon name="calendar" size={11} /> {fmtDate(t.date)} · {store.fmtTime(t.start)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Assignees ids={t.assigneeIds} employees={employees} />
                      <button onClick={() => store.setTaskStatus(t.id, next[t.status])}
                        className="text-[11px] font-semibold text-[#2C87F2] hover:underline inline-flex items-center gap-1">
                        {col.key === "done" ? "Rouvrir" : "Avancer"} <Icon name="arrow-right" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </EmployerShell>
  );
}
