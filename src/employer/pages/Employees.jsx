import { useEffect, useState } from "react";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import * as store from "../store";

const EMPTY = { name: "", email: "", poste: "", department: store.DEPARTMENTS[0], phone: "", color: store.TASK_COLORS[0] };

function EmployeeModal({ open, onClose, initial, editingId }) {
  const [f, setF] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (open) setF({ ...EMPTY, ...initial }); }, [open, initial]);
  if (!open) return null;
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const save = async () => {
    if (!f.name.trim()) return;
    setBusy(true);
    try {
      if (editingId) await store.updateEmployee(editingId, f);
      else await store.addEmployee(f);
      onClose();
    } catch { /* ignore */ }
    setBusy(false);
  };
  const field = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none";

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 z-40" onClick={onClose} />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,440px)] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-5">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl grid place-items-center bg-[#2C87F2]/10 text-[#2C87F2] shrink-0"><Icon name="user-plus" size={20} /></span>
          <div className="flex-1">
            <h3 className="font-bold text-[14px] tracking-tight leading-tight">{editingId ? "Modifier l'employé" : "Ajouter un employé"}</h3>
            <p className="text-[12px] text-slate-400">Renseignez les informations de l'employé</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><Icon name="x" size={18} /></button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-[12px] font-semibold text-slate-500">Nom complet</label>
            <input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex. Jean Kamga" className={`${field} mt-1.5`} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[12px] font-semibold text-slate-500">Poste</label>
              <input value={f.poste} onChange={(e) => set("poste", e.target.value)} placeholder="Développeur" className={`${field} mt-1.5`} />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-slate-500">Département</label>
              <select value={f.department} onChange={(e) => set("department", e.target.value)} className={`${field} mt-1.5`}>
                {store.DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[12px] font-semibold text-slate-500">Email</label>
              <input value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="jean@buyticle.com" className={`${field} mt-1.5`} />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-slate-500">Téléphone</label>
              <input value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="6XX XXX XXX" className={`${field} mt-1.5`} />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-slate-500">Couleur</label>
            <div className="flex items-center gap-1.5 mt-1.5">
              {store.TASK_COLORS.map((c) => (
                <button key={c} onClick={() => set("color", c)} className={`w-6 h-6 rounded-full transition ${f.color === c ? "ring-2 ring-offset-2 ring-slate-300" : ""}`} style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">Annuler</button>
          <button onClick={save} disabled={busy || !f.name.trim()} className="rounded-lg bg-[#2C87F2] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0] disabled:opacity-40">{editingId ? "Enregistrer" : "Ajouter"}</button>
        </div>
      </div>
    </>
  );
}

export default function Employees() {
  const [list, setList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(null);
  const [q, setQ] = useState("");
  useEffect(() => store.subscribeEmployees(setList), []);
  useEffect(() => store.subscribeTasks(setTasks), []);

  const taskCount = (id) => tasks.filter((t) => t.assigneeIds?.includes(id)).length;
  const openTasks = (id) => tasks.filter((t) => t.assigneeIds?.includes(id) && t.status !== "done").length;
  const shown = q.trim() ? list.filter((e) => (e.name + e.poste + e.department).toLowerCase().includes(q.toLowerCase())) : list;

  return (
    <EmployerShell title="Employés">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div>
          <h2 className="font-bold text-[16px] tracking-tight">Gestion des employés</h2>
          <p className="text-[13px] text-slate-400">{list.length} employé{list.length > 1 ? "s" : ""} · {tasks.length} tâches au total</p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className="w-44 rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-[13px] focus:border-[#2C87F2] outline-none" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" size={15} /></span>
          </div>
          <button onClick={() => setModal({ initial: {}, editingId: null })} className="inline-flex items-center gap-2 rounded-lg bg-[#2C87F2] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0]">
            <Icon name="user-plus" size={16} /> Ajouter
          </button>
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
          <span className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-3"><Icon name="users" size={26} /></span>
          <p className="font-semibold text-slate-600">Aucun employé pour le moment</p>
          <p className="text-[13px] text-slate-400 mt-1">Ajoutez votre premier employé pour commencer à attribuer des tâches.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            <div className="col-span-4">Employé</div>
            <div className="col-span-3">Département</div>
            <div className="col-span-2">Tâches</div>
            <div className="col-span-2">Contact</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          <div className="divide-y divide-slate-100">
            {shown.map((e) => (
              <div key={e.id} className="grid grid-cols-12 gap-3 px-5 py-3.5 items-center hover:bg-slate-50/60 transition">
                <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full grid place-items-center text-white text-[13px] font-bold shrink-0" style={{ background: e.color || store.colorFor(e.id) }}>{store.initials(e.name)}</span>
                  <div className="min-w-0">
                    <div className="font-semibold text-[14px] truncate">{e.name}</div>
                    <div className="text-[12px] text-slate-400 truncate">{e.poste || "—"}</div>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-600">{e.department}</span>
                </div>
                <div className="col-span-6 md:col-span-2 text-[13px]">
                  <span className="font-bold">{taskCount(e.id)}</span>
                  <span className="text-slate-400"> · {openTasks(e.id)} en cours</span>
                </div>
                <div className="col-span-8 md:col-span-2 text-[12px] text-slate-500 truncate">{e.phone || e.email || "—"}</div>
                <div className="col-span-4 md:col-span-1 flex items-center justify-end gap-1.5">
                  <button onClick={() => setModal({ initial: e, editingId: e.id })} className="w-8 h-8 grid place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Icon name="edit" size={15} /></button>
                  <button onClick={() => { if (confirm(`Supprimer ${e.name} ?`)) store.deleteEmployee(e.id); }} className="w-8 h-8 grid place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Icon name="trash2" size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <EmployeeModal open={!!modal} onClose={() => setModal(null)} initial={modal?.initial || {}} editingId={modal?.editingId} />
    </EmployerShell>
  );
}
