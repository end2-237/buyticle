import { useEffect, useState } from "react";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import * as store from "../store";

const EMPTY = { name: "", memberIds: [], color: store.TASK_COLORS[0], lead: "" };

function TeamModal({ open, onClose, employees, initial, editingId }) {
  const [f, setF] = useState(EMPTY);
  useEffect(() => { if (open) setF({ ...EMPTY, ...initial }); }, [open, initial]);
  if (!open) return null;
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (id) => setF((p) => ({ ...p, memberIds: p.memberIds.includes(id) ? p.memberIds.filter((x) => x !== id) : [...p.memberIds, id] }));
  const save = async () => {
    if (!f.name.trim()) return;
    if (editingId) await store.updateTeam(editingId, f); else await store.addTeam(f);
    onClose();
  };
  const inp = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none";
  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 z-40" onClick={onClose} />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,440px)] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-5">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl grid place-items-center bg-[#2C87F2]/10 text-[#2C87F2] shrink-0"><Icon name="users" size={20} /></span>
          <div className="flex-1"><h3 className="font-bold text-[14px] tracking-tight">{editingId ? "Modifier l'équipe" : "Créer une équipe"}</h3><p className="text-[12px] text-slate-400">Regroupez des employés pour les tâches collectives</p></div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><Icon name="x" size={18} /></button>
        </div>
        <div className="mt-4 space-y-3">
          <div><label className="text-[12px] font-semibold text-slate-500">Nom de l'équipe</label><input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex. Équipe Produit" className={`${inp} mt-1`} /></div>
          <div>
            <label className="text-[12px] font-semibold text-slate-500">Couleur</label>
            <div className="flex items-center gap-1.5 mt-1">{store.TASK_COLORS.map((c) => <button key={c} onClick={() => set("color", c)} className={`w-6 h-6 rounded-full transition ${f.color === c ? "ring-2 ring-offset-2 ring-slate-300" : ""}`} style={{ background: c }} />)}</div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-slate-500">Membres</label>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {employees.map((e) => {
                const on = f.memberIds.includes(e.id);
                return <button key={e.id} onClick={() => toggle(e.id)} className={`inline-flex items-center gap-1.5 rounded-full pl-1 pr-2.5 py-1 text-[12px] font-medium border transition ${on ? "border-[#2C87F2] bg-[#2C87F2]/10 text-[#2C87F2]" : "border-slate-200 text-slate-500"}`}>
                  <span className="w-5 h-5 rounded-full grid place-items-center text-white text-[9px] font-bold" style={{ background: e.color || store.colorFor(e.id) }}>{store.initials(e.name)}</span>{e.name.split(" ")[0]}
                </button>;
              })}
              {employees.length === 0 && <span className="text-[12px] text-slate-400">Ajoutez d'abord des employés.</span>}
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-slate-500">Chef d'équipe (optionnel)</label>
            <select value={f.lead} onChange={(e) => set("lead", e.target.value)} className={`${inp} mt-1`}>
              <option value="">—</option>
              {employees.filter((e) => f.memberIds.includes(e.id)).map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">Annuler</button>
          <button onClick={save} disabled={!f.name.trim()} className="rounded-lg bg-[#2C87F2] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0] disabled:opacity-40">{editingId ? "Enregistrer" : "Créer"}</button>
        </div>
      </div>
    </>
  );
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(null);
  useEffect(() => store.subscribeTeams(setTeams), []);
  useEffect(() => store.subscribeEmployees(setEmployees), []);
  useEffect(() => store.subscribeTasks(setTasks), []);
  const teamTasks = (id) => tasks.filter((t) => t.teamId === id).length;

  return (
    <EmployerShell title="Équipes">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div><h2 className="font-bold text-[16px] tracking-tight">Équipes</h2><p className="text-[13px] text-slate-400">{teams.length} équipe(s) · tâches collectives</p></div>
        <button onClick={() => setModal({ initial: {}, editingId: null })} className="inline-flex items-center gap-2 rounded-lg bg-[#2C87F2] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0]"><Icon name="plus" size={16} /> Créer une équipe</button>
      </div>

      {teams.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
          <span className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-3"><Icon name="users" size={26} /></span>
          <p className="font-semibold text-slate-600">Aucune équipe</p>
          <p className="text-[13px] text-slate-400 mt-1">Créez une équipe pour attribuer des tâches collectives.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((t) => (
            <div key={t.id} className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl grid place-items-center text-white" style={{ background: t.color }}><Icon name="users" size={20} /></span>
                <div className="flex gap-1">
                  <button onClick={() => setModal({ initial: t, editingId: t.id })} className="w-8 h-8 grid place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><Icon name="edit" size={15} /></button>
                  <button onClick={() => { if (confirm(`Supprimer ${t.name} ?`)) store.deleteTeam(t.id); }} className="w-8 h-8 grid place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Icon name="trash2" size={15} /></button>
                </div>
              </div>
              <h3 className="font-bold text-[15px] mt-3">{t.name}</h3>
              <p className="text-[12px] text-slate-400">{t.memberIds?.length || 0} membre(s) · {teamTasks(t.id)} tâche(s)</p>
              <div className="flex -space-x-2 mt-3">
                {(t.memberIds || []).slice(0, 6).map((id) => {
                  const e = employees.find((x) => x.id === id);
                  return <span key={id} title={e?.name} className="w-7 h-7 rounded-full grid place-items-center text-white text-[9px] font-bold ring-2 ring-white" style={{ background: e?.color || store.colorFor(id) }}>{store.initials(e?.name || "?")}</span>;
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      <TeamModal open={!!modal} onClose={() => setModal(null)} employees={employees} initial={modal?.initial || {}} editingId={modal?.editingId} />
    </EmployerShell>
  );
}
