import { useEffect, useMemo, useState } from "react";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import { useAuth } from "../../testers/AuthContext";
import TaskDetail from "../TaskDetail";
import * as store from "../store";

const DAY_START = 8;   // 8:00
const DAY_END = 19;    // 19:00
const HOUR_PX = 68;
const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS_FR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function useEmployees() {
  const [list, setList] = useState([]);
  useEffect(() => store.subscribeEmployees(setList), []);
  return list;
}
function useTasks() {
  const [list, setList] = useState([]);
  useEffect(() => store.subscribeTasks(setList), []);
  return list;
}
function useTeams() {
  const [list, setList] = useState([]);
  useEffect(() => store.subscribeTeams(setList), []);
  return list;
}

const hourLabel = (h) => `${((h + 11) % 12) + 1} ${h >= 12 ? "PM" : "AM"}`;

/* Sunday-first week */
function weekOf(d) {
  const x = new Date(d); x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - x.getDay());
  return Array.from({ length: 7 }, (_, i) => { const c = new Date(x); c.setDate(x.getDate() + i); return c; });
}

function Avatars({ ids, employees }) {
  const shown = ids.slice(0, 3);
  const extra = ids.length - shown.length;
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {shown.map((id) => {
          const e = employees.find((x) => x.id === id);
          return (
            <span key={id} className="w-6 h-6 rounded-full grid place-items-center text-white text-[9px] font-bold ring-2 ring-white"
              style={{ background: e?.color || store.colorFor(id) }}>{store.initials(e?.name || "?")}</span>
          );
        })}
      </div>
      {ids.length > 3 && <span className="ml-1.5 text-[11px] font-semibold text-slate-400">{extra + 3}+</span>}
    </div>
  );
}

function TaskCard({ t, employees, onClick }) {
  const s = store.minutesOf(t.start), e = store.minutesOf(t.end);
  const top = ((s - DAY_START * 60) / 60) * HOUR_PX;
  const height = Math.max(46, ((e - s) / 60) * HOUR_PX - 6);
  const col = t.color || "#2C87F2";
  const done = t.status === "done";
  return (
    <button onClick={onClick} style={{ top, height, borderColor: `${col}55`, background: `${col}0f` }}
      className="absolute left-1 right-1 rounded-xl border px-2.5 py-2 text-left overflow-hidden hover:shadow-md transition group">
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-md grid place-items-center shrink-0" style={{ background: `${col}22`, color: col }}><Icon name={store.MARKS.find((m) => m.key === t.mark)?.icon || "briefcase"} size={12} /></span>
        <span className={`text-[12px] font-bold leading-tight truncate ${done ? "line-through text-slate-400" : ""}`} style={{ color: done ? undefined : col }}>{t.title}</span>
      </div>
      <div className="text-[10px] text-slate-400 mt-1">{store.fmtTime(t.start)} - {store.fmtTime(t.end)}</div>
      {t.assigneeIds?.length > 0 && height > 70 && <div className="mt-2"><Avatars ids={t.assigneeIds} employees={employees} /></div>}
    </button>
  );
}

const EMPTY = { title: "", kind: "standard", mark: "audience", color: store.TASK_COLORS[0], opacity: 100, date: "", start: "08:00", end: "09:00", assigneeIds: [], teamId: "", finalizeBy: "anyone", description: "" };

function ScheduleModal({ open, onClose, employees, teams = [], initial, editingId }) {
  const [f, setF] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (open) setF({ ...EMPTY, ...initial }); }, [open, initial]);
  if (!open) return null;
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (id) => setF((p) => ({ ...p, assigneeIds: p.assigneeIds.includes(id) ? p.assigneeIds.filter((x) => x !== id) : [...p.assigneeIds, id] }));

  const save = async () => {
    if (!f.title.trim() || !f.date) return;
    setBusy(true);
    try {
      if (editingId) await store.updateTask(editingId, f);
      else await store.addTask(f);
      onClose();
    } catch { /* ignore */ }
    setBusy(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 z-40" onClick={onClose} />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,420px)] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-5">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl grid place-items-center bg-[#2C87F2]/10 text-[#2C87F2] shrink-0"><Icon name="calendar" size={20} /></span>
          <div className="flex-1">
            <h3 className="font-bold text-[14px] tracking-tight leading-tight">{editingId ? "Modifier la tâche" : "Créer une tâche"}</h3>
            <p className="text-[12px] text-slate-400">Remplissez les champs pour {editingId ? "mettre à jour" : "planifier"} une tâche</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><Icon name="x" size={18} /></button>
        </div>

        <div className="mt-4 space-y-3.5">
          <div>
            <label className="text-[12px] font-semibold text-slate-500">Nature de la tâche</label>
            <div className="grid grid-cols-2 gap-1.5 mt-1.5">
              {store.TASK_KINDS.map((kd) => (
                <button key={kd.key} type="button" onClick={() => set("kind", kd.key)}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition ${f.kind === kd.key ? "border-[#2C87F2] bg-[#2C87F2]/[0.06]" : "border-slate-200 hover:border-slate-300"}`}>
                  <span className="w-6 h-6 rounded-md grid place-items-center shrink-0" style={{ background: `${kd.color}18`, color: kd.color }}><Icon name={kd.icon} size={13} /></span>
                  <span className="text-[12px] font-semibold truncate">{kd.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-slate-500">Marqueur</label>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 relative">
                <select value={f.mark} onChange={(e) => set("mark", e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 pl-9 pr-8 py-2.5 text-[13px] font-medium focus:border-[#2C87F2] outline-none">
                  {store.MARKS.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
                </select>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name={store.MARKS.find((m) => m.key === f.mark)?.icon || "users"} size={15} /></span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icon name="chevron-down" size={14} /></span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-2">
                <span className="w-5 h-5 rounded" style={{ background: f.color }} />
                <span className="text-[12px] text-slate-500 font-medium">{f.opacity}%</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {store.TASK_COLORS.map((c) => (
                <button key={c} onClick={() => set("color", c)} className={`w-5 h-5 rounded-full transition ${f.color === c ? "ring-2 ring-offset-2 ring-slate-300" : ""}`} style={{ background: c }} />
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-slate-500">Titre de la tâche</label>
            <input value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Ex. Maquette application marketplace"
              className="w-full mt-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none" />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-slate-500">Date &amp; Heure</label>
            <div className="relative mt-1.5">
              <input type="date" value={f.date} onChange={(e) => set("date", e.target.value)}
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icon name="calendar" size={15} /></span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["start", "end"].map((k) => (
                <div key={k} className="relative">
                  <input type="time" value={f[k]} onChange={(e) => set(k, e.target.value)}
                    className="w-full rounded-lg border border-slate-200 pl-9 pr-2 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none" />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icon name="clock" size={15} /></span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-slate-500">Assigner à</label>
            {employees.length === 0 ? (
              <p className="text-[12px] text-slate-400 mt-1.5">Aucun employé. Ajoutez-en dans « Employés ».</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 mt-1.5 max-h-24 overflow-y-auto">
                {employees.map((e) => {
                  const on = f.assigneeIds.includes(e.id);
                  return (
                    <button key={e.id} onClick={() => toggle(e.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full pl-1 pr-2.5 py-1 text-[12px] font-medium border transition ${on ? "border-[#2C87F2] bg-[#2C87F2]/10 text-[#2C87F2]" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                      <span className="w-5 h-5 rounded-full grid place-items-center text-white text-[9px] font-bold" style={{ background: e.color || store.colorFor(e.id) }}>{store.initials(e.name)}</span>
                      {e.name.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {teams.length > 0 && (
            <div>
              <label className="text-[12px] font-semibold text-slate-500">Ou assigner à une équipe (tâche collective)</label>
              <select value={f.teamId} onChange={(e) => {
                const tid = e.target.value; const team = teams.find((t) => t.id === tid);
                set("teamId", tid);
                if (team) set("assigneeIds", [...new Set([...(f.assigneeIds || []), ...(team.memberIds || [])])]);
              }} className="w-full mt-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none">
                <option value="">— Aucune équipe —</option>
                {teams.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.memberIds?.length || 0})</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="text-[12px] font-semibold text-slate-500">Qui peut déclarer la tâche terminée ?</label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              {[{ k: "anyone", l: "L'assigné aussi", d: "L'employé peut finaliser" }, { k: "admin", l: "Admin seulement", d: "Validation par vous" }].map((o) => (
                <button key={o.k} type="button" onClick={() => set("finalizeBy", o.k)} className={`rounded-lg border px-3 py-2 text-left transition ${f.finalizeBy === o.k ? "border-[#2C87F2] bg-[#2C87F2]/[0.06]" : "border-slate-200"}`}>
                  <div className="text-[12px] font-semibold">{o.l}</div>
                  <div className="text-[10px] text-slate-400">{o.d}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          {editingId ? (
            <button onClick={() => { store.deleteTask(editingId); onClose(); }} className="text-[13px] font-semibold text-red-500 hover:underline">Supprimer</button>
          ) : <span />}
          <div className="flex gap-2">
            <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">Annuler</button>
            <button onClick={save} disabled={busy || !f.title.trim() || !f.date}
              className="rounded-lg bg-[#2C87F2] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0] disabled:opacity-40">{editingId ? "Enregistrer" : "Continuer"}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Calendar() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const employees = useEmployees();
  const teams = useTeams();
  const allTasks = useTasks();
  const [me, setMe] = useState(null);
  const [anchor, setAnchor] = useState(() => new Date());
  const [modal, setModal] = useState(null); // {initial} | null (création)
  const [openId, setOpenId] = useState(null); // détail tâche
  const [q, setQ] = useState("");

  useEffect(() => { if (!isAdmin) store.employeeForEmail(user.email).then(setMe); }, [isAdmin, user.email]);
  const actor = { id: user.id, name: user.profile?.fullName || user.email.split("@")[0] };
  // Admin voit tout ; employé voit ses tâches
  const tasks = isAdmin ? allTasks : (me ? allTasks.filter((t) => t.assigneeIds?.includes(me.id)) : []);

  const week = useMemo(() => weekOf(anchor), [anchor]);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const hours = Array.from({ length: DAY_END - DAY_START }, (_, i) => DAY_START + i);
  const rangeLabel = `${week[0].getDate()} ${MONTHS_FR[week[0].getMonth()].slice(0, 4)}. - ${week[6].getDate()} ${MONTHS_FR[week[6].getMonth()].slice(0, 4)}. ${week[6].getFullYear()}`;
  const monthLabel = `${MONTHS_FR[anchor.getMonth()][0].toUpperCase()}${MONTHS_FR[anchor.getMonth()].slice(1)} ${anchor.getFullYear()}`;

  const filtered = q.trim() ? tasks.filter((t) => t.title.toLowerCase().includes(q.toLowerCase())) : tasks;
  const tasksFor = (d) => filtered.filter((t) => t.date === store.ymd(d));

  const shift = (n) => { const c = new Date(anchor); c.setDate(c.getDate() + n * 7); setAnchor(c); };
  const openCreate = (date) => setModal({ initial: { date: store.ymd(date || new Date()) }, editingId: null });

  // Current-time indicator
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const nowTop = ((nowMin - DAY_START * 60) / 60) * HOUR_PX;
  const nowInRange = now.getHours() >= DAY_START && now.getHours() < DAY_END;

  const actions = (
    <div className="bg-white border-b border-slate-200 px-5 md:px-8">
      <div className="flex items-center gap-6 h-11 text-[14px] font-semibold">
        <span className="text-[#2C87F2] border-b-2 border-[#2C87F2] h-11 flex items-center">Hebdomadaire</span>
        <button onClick={() => shift(4)} className="text-slate-400 hover:text-slate-700 h-11">Mensuel</button>
      </div>
    </div>
  );

  return (
    <EmployerShell title="Mon Calendrier" actions={actions}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => shift(-1)} className="w-9 h-9 grid place-items-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500"><Icon name="chevron-left" size={16} /></button>
          <button onClick={() => shift(1)} className="w-9 h-9 grid place-items-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500"><Icon name="chevron-right" size={16} /></button>
          <div>
            <div className="flex items-center gap-2 font-bold text-[16px] tracking-tight">{monthLabel} <Icon name="edit" size={15} className="text-slate-300" /></div>
            <div className="text-[12px] text-slate-400">{rangeLabel}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…"
              className="w-44 rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-[13px] focus:border-[#2C87F2] outline-none" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" size={15} /></span>
          </div>
          {isAdmin && <button onClick={() => openCreate()} className="inline-flex items-center gap-2 rounded-lg bg-[#2C87F2] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0]">
            <Icon name="plus" size={16} /> Créer une tâche</button>}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        {/* Header row */}
        <div className="grid" style={{ gridTemplateColumns: `64px repeat(7, 1fr)` }}>
          <div className="border-b border-r border-slate-200 py-3 text-center text-[11px] font-semibold text-slate-400">GMT</div>
          {week.map((d, i) => {
            const isToday = d.getTime() === today.getTime();
            return (
              <div key={i} className={`border-b border-slate-200 ${i < 6 ? "border-r" : ""} py-2.5 text-center ${isToday ? "text-[#2C87F2]" : "text-slate-500"}`}>
                <div className="text-[12px] font-medium">{DAYS_FR[d.getDay()]}</div>
                <div className={`text-[16px] font-bold mt-0.5 ${isToday ? "" : "text-slate-800"}`}>
                  <span className={isToday ? "inline-grid place-items-center w-7 h-7 rounded-full bg-[#2C87F2] text-white mx-auto" : ""}>{d.getDate()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="grid overflow-x-auto" style={{ gridTemplateColumns: `64px repeat(7, minmax(120px, 1fr))` }}>
          {/* Hour labels */}
          <div className="relative border-r border-slate-200">
            {hours.map((h) => (
              <div key={h} className="text-right pr-2 text-[11px] text-slate-400 -mt-2" style={{ height: HOUR_PX }}>{hourLabel(h)}</div>
            ))}
          </div>
          {/* Day columns */}
          {week.map((d, i) => {
            const isToday = d.getTime() === today.getTime();
            return (
              <div key={i} className={`relative ${i < 6 ? "border-r" : ""} border-slate-200`} style={{ height: hours.length * HOUR_PX }}
                onDoubleClick={() => openCreate(d)}>
                {hours.map((h) => <div key={h} className="border-b border-slate-100" style={{ height: HOUR_PX }} />)}
                {isToday && nowInRange && (
                  <div className="absolute left-0 right-0 flex items-center z-20 pointer-events-none" style={{ top: nowTop }}>
                    <span className="w-2 h-2 rounded-full bg-[#2C87F2] -ml-1" />
                    <span className="flex-1 h-[2px] bg-[#2C87F2]" />
                  </div>
                )}
                {tasksFor(d).map((t) => (
                  <TaskCard key={t.id} t={t} employees={employees} onClick={() => setOpenId(t.id)} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {isAdmin && <ScheduleModal open={!!modal} onClose={() => setModal(null)} employees={employees} teams={teams}
        initial={modal?.initial || {}} editingId={modal?.editingId} />}
      {openId && <TaskDetail taskId={openId} onClose={() => setOpenId(null)} employees={employees} actor={actor} canManage={isAdmin} />}
    </EmployerShell>
  );
}
