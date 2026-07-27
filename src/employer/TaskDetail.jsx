import { useEffect, useState } from "react";
import { Icon } from "../testers/icons";
import { timeAgo } from "../testers/ui";
import * as store from "./store";

const TABS_BASE = [
  { key: "details", label: "Détails", icon: "briefcase" },
  { key: "progress", label: "Progression", icon: "list-checks" },
  { key: "comments", label: "Discussion", icon: "message-square" },
];

function Assignee({ id, employees, size = 24 }) {
  const e = employees.find((x) => x.id === id);
  return <span className="rounded-full grid place-items-center text-white text-[9px] font-bold ring-2 ring-white" style={{ width: size, height: size, background: e?.color || store.colorFor(id) }}>{store.initials(e?.name || "?")}</span>;
}

/* ── Onglet Actions type-Git ── */
function GitActions({ task, actor }) {
  const [branch, setBranch] = useState({ name: "", base: "main", project: task.project || "" });
  const [pr, setPr] = useState({ title: "", url: "" });
  const [runName, setRunName] = useState("");
  const kind = task.kind;

  if (kind === "branch") {
    return (
      <div>
        {task.branch ? (
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-[#8B5CF6] font-bold text-[14px]"><Icon name="git-branch" size={17} /> {task.branch.name}</div>
            <div className="text-[12px] text-slate-400 mt-1">basée sur <code className="bg-slate-100 px-1.5 py-0.5 rounded">{task.branch.base}</code>{task.branch.project && <> · projet <b>{task.branch.project}</b></>}</div>
            <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-semibold text-green-600 bg-green-500/10 rounded-full px-2 py-0.5"><Icon name="git-commit" size={11} /> Branche active</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            <p className="text-[13px] text-slate-500">Créez la branche de travail pour cette tâche.</p>
            <input value={branch.project} onChange={(e) => setBranch({ ...branch, project: e.target.value })} placeholder="Projet (ex. buyticle)" className={inp} />
            <div className="grid grid-cols-2 gap-2">
              <input value={branch.name} onChange={(e) => setBranch({ ...branch, name: e.target.value })} placeholder="feat/ma-branche" className={inp} />
              <input value={branch.base} onChange={(e) => setBranch({ ...branch, base: e.target.value })} placeholder="main" className={inp} />
            </div>
            <button disabled={!branch.name.trim()} onClick={() => store.createBranch(task, actor, branch)} className={btnPrimary}><Icon name="git-branch" size={15} /> Créer la branche</button>
          </div>
        )}
      </div>
    );
  }

  if (kind === "pr") {
    return (
      <div>
        {task.pr ? (
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-green-600 font-bold text-[14px]"><Icon name="git-pull-request" size={17} /> {task.pr.title}</div>
            {task.pr.url && <a href={task.pr.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[12px] text-[#2C87F2] mt-1 hover:underline"><Icon name="link" size={12} /> {task.pr.url}</a>}
            <div className="flex items-center gap-1.5 mt-3">
              {Object.entries(store.PR_STATES).map(([k, v]) => (
                <button key={k} onClick={() => store.setPRStatus(task, actor, k)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition ${task.pr.status === k ? "text-white" : "text-slate-500 border-slate-200 hover:border-slate-300"}`}
                  style={task.pr.status === k ? { background: v.color, borderColor: v.color } : {}}>{v.label}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            <p className="text-[13px] text-slate-500">Ouvrez un espace de revue de code (Pull Request).</p>
            <input value={pr.title} onChange={(e) => setPr({ ...pr, title: e.target.value })} placeholder="Titre de la PR" className={inp} />
            <input value={pr.url} onChange={(e) => setPr({ ...pr, url: e.target.value })} placeholder="Lien GitHub (optionnel)" className={inp} />
            <button disabled={!pr.title.trim()} onClick={() => store.openPR(task, actor, pr)} className={btnPrimary}><Icon name="git-pull-request" size={15} /> Ouvrir la PR</button>
          </div>
        )}
      </div>
    );
  }

  if (kind === "pipeline") {
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <input value={runName} onChange={(e) => setRunName(e.target.value)} placeholder="Nom du pipeline (ex. build & deploy)" className={inp} />
          <button onClick={() => { store.addPipelineRun(task, actor, { name: runName || "Pipeline" }); setRunName(""); }} className={`${btnPrimary} !w-auto whitespace-nowrap`}><Icon name="git-action" size={15} /> Lancer</button>
        </div>
        <div className="space-y-2">
          {(task.runs || []).length === 0 && <p className="text-[13px] text-slate-400">Aucune exécution. Lancez un pipeline.</p>}
          {(task.runs || []).map((r, i) => {
            const st = store.RUN_STATES[r.status] || store.RUN_STATES.running;
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                <Icon name="git-action" size={16} className="text-slate-400" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px] truncate">{r.name}</div>
                  <div className="text-[11px] text-slate-400">{timeAgo(new Date(r.at))}</div>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${st.color}18`, color: st.color }}>{st.label}</span>
                {r.status === "running" && (
                  <div className="flex gap-1">
                    <button onClick={() => store.setRunStatus(task, actor, i, "success")} className="text-[11px] font-semibold text-green-600 hover:underline">Succès</button>
                    <button onClick={() => store.setRunStatus(task, actor, i, "failed")} className="text-[11px] font-semibold text-red-500 hover:underline">Échec</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}

const inp = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none";
const btnPrimary = "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2C87F2] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1e6fd0] disabled:opacity-40";

export default function TaskDetail({ taskId, onClose, employees, actor, canManage }) {
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [tab, setTab] = useState("details");
  const [text, setText] = useState("");
  const [newItem, setNewItem] = useState("");

  useEffect(() => taskId ? store.subscribeTask(taskId, setTask) : undefined, [taskId]);
  useEffect(() => taskId ? store.subscribeTaskComments(taskId, setComments) : undefined, [taskId]);
  if (!taskId) return null;

  const k = task ? store.kindOf(task.kind) : null;
  const st = task ? store.TASK_STATUS.find((s) => s.key === task.status) : null;
  const tabs = [...TABS_BASE];
  if (task && task.kind !== "standard") tabs.splice(2, 0, { key: "actions", label: "Actions", icon: k.icon });

  const send = async (e) => { e.preventDefault(); if (!text.trim()) return; await store.addTaskComment(taskId, { userId: actor.id, userName: actor.name, body: text }); setText(""); };
  const toggleItem = (i) => store.setChecklist(taskId, task.checklist.map((c, idx) => idx === i ? { ...c, done: !c.done } : c));
  const addItem = () => { if (!newItem.trim()) return; store.setChecklist(taskId, [...(task.checklist || []), { text: newItem.trim(), done: false }]); setNewItem(""); };
  const removeItem = (i) => store.setChecklist(taskId, task.checklist.filter((_, idx) => idx !== i));

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/30 z-40" onClick={onClose} />
      <div className="fixed z-50 top-0 right-0 h-full w-[min(94vw,540px)] bg-white shadow-2xl flex flex-col animate-[slideIn_.2s_ease]">
        <style>{`@keyframes slideIn{from{transform:translateX(30px);opacity:.6}to{transform:none;opacity:1}}`}</style>
        {!task ? (
          <div className="flex-1 grid place-items-center"><div className="w-8 h-8 rounded-full border-2 border-[#2C87F2] border-t-transparent animate-spin" /></div>
        ) : (
          <>
            {/* Header */}
            <div className="p-5 border-b border-slate-200">
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${k.color}18`, color: k.color }}><Icon name={k.icon} size={20} /></span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${k.color}18`, color: k.color }}>{k.label}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${st.color}18`, color: st.color }}>{st.label}</span>
                  </div>
                  <h2 className="font-bold text-[15px] tracking-tight leading-tight mt-1.5">{task.title}</h2>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><Icon name="x" size={18} /></button>
              </div>
              {/* Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[12px] mb-1"><span className="text-slate-400 font-medium">Avancement</span><span className="font-bold">{task.progress || 0}%</span></div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${task.progress || 0}%`, background: k.color }} /></div>
              </div>
              {/* Tabs */}
              <div className="flex items-center gap-1 mt-4">
                {tabs.map((t) => (
                  <button key={t.key} onClick={() => setTab(t.key)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition ${tab === t.key ? "bg-[#2C87F2]/10 text-[#2C87F2]" : "text-slate-500 hover:bg-slate-100"}`}>
                    <Icon name={t.icon} size={13} /> {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5">
              {tab === "details" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Description</div>
                    <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-wrap">{task.description || "Aucune description."}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Info icon="calendar" label="Date" value={task.date || "—"} />
                    <Info icon="clock" label="Horaire" value={`${store.fmtTime(task.start)} - ${store.fmtTime(task.end)}`} />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Assignés</div>
                    {task.assigneeIds?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {task.assigneeIds.map((id) => {
                          const e = employees.find((x) => x.id === id);
                          return <span key={id} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 pl-1 pr-2.5 py-1 text-[12px] font-medium"><Assignee id={id} employees={employees} size={20} /> {e?.name || "Employé"}</span>;
                        })}
                      </div>
                    ) : <p className="text-[13px] text-slate-400">Non assignée.</p>}
                  </div>
                  {canManage && (
                    <div className="flex items-center gap-1.5 pt-2">
                      <span className="text-[12px] text-slate-400 mr-1">Statut :</span>
                      {store.TASK_STATUS.map((s) => (
                        <button key={s.key} onClick={() => store.setTaskStatus(taskId, s.key)} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition ${task.status === s.key ? "text-white" : "text-slate-500 border-slate-200"}`} style={task.status === s.key ? { background: s.color, borderColor: s.color } : {}}>{s.label}</button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "progress" && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[12px] mb-2"><span className="font-semibold text-slate-500">Progression manuelle</span><span className="font-bold">{task.progress || 0}%</span></div>
                    <input type="range" min="0" max="100" step="5" value={task.progress || 0} onChange={(e) => store.setProgress(taskId, +e.target.value)} className="w-full accent-[#2C87F2]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Checklist</div>
                    <div className="space-y-1.5">
                      {(task.checklist || []).map((c, i) => (
                        <div key={i} className="flex items-center gap-2.5 group">
                          <button onClick={() => toggleItem(i)} className={`w-5 h-5 rounded-md border grid place-items-center shrink-0 transition ${c.done ? "bg-[#22C55E] border-[#22C55E] text-white" : "border-slate-300 hover:border-[#2C87F2]"}`}>{c.done && <Icon name="check" size={13} />}</button>
                          <span className={`flex-1 text-[13px] ${c.done ? "line-through text-slate-400" : "text-slate-600"}`}>{c.text}</span>
                          <button onClick={() => removeItem(i)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Icon name="x" size={14} /></button>
                        </div>
                      ))}
                      {(task.checklist || []).length === 0 && <p className="text-[13px] text-slate-400">Aucune sous-tâche.</p>}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <input value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()} placeholder="Ajouter une sous-tâche…" className={inp} />
                      <button onClick={addItem} className="grid place-items-center w-10 h-10 rounded-lg bg-[#2C87F2] text-white shrink-0 hover:bg-[#1e6fd0]"><Icon name="plus" size={16} /></button>
                    </div>
                  </div>
                </div>
              )}

              {tab === "actions" && <GitActions task={task} actor={actor} />}

              {tab === "comments" && (
                <div className="space-y-3">
                  {comments.length === 0 && <p className="text-[13px] text-slate-400 text-center py-6">Aucun message. Lancez la discussion.</p>}
                  {comments.map((c) => c.type === "activity" ? (
                    <div key={c.id} className="flex items-center gap-2 text-[12px] text-slate-400 pl-1">
                      <Icon name="git-commit" size={13} /> <span><b className="text-slate-500">{c.userName}</b> {c.body}</span>
                      <span className="text-slate-300">· {timeAgo(c.createdAt)}</span>
                    </div>
                  ) : (
                    <div key={c.id} className="flex items-start gap-2.5">
                      <span className="w-7 h-7 rounded-full grid place-items-center text-white text-[10px] font-bold shrink-0" style={{ background: c.userId === actor.id ? "#2C87F2" : "#0A0A0A" }}>{store.initials(c.userName)}</span>
                      <div className="flex-1 min-w-0 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
                        <div className="flex items-center gap-2"><span className="font-semibold text-[13px]">{c.userId === actor.id ? "Vous" : c.userName}</span><span className="text-[10px] text-slate-400">· {timeAgo(c.createdAt)}</span></div>
                        <p className="text-[13px] text-slate-600 mt-0.5 whitespace-pre-wrap break-words">{c.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200">
              {tab === "comments" ? (
                <form onSubmit={send} className="flex items-center gap-2">
                  <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Écrire un message…" className={inp} />
                  <button type="submit" disabled={!text.trim()} className="grid place-items-center w-10 h-10 rounded-lg bg-[#2C87F2] text-white shrink-0 disabled:opacity-40"><Icon name="send" size={16} /></button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  {task.status !== "done" ? (
                    <button onClick={() => store.finalizeTask(task, actor)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#22C55E] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1ba550]"><Icon name="check-circle" size={16} /> Finaliser la tâche</button>
                  ) : (
                    <span className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E] px-4 py-2.5 text-[13px] font-semibold"><Icon name="check-circle" size={16} /> Tâche terminée</span>
                  )}
                  {canManage && <button onClick={() => { if (confirm("Supprimer cette tâche ?")) { store.deleteTask(taskId); onClose(); } }} className="grid place-items-center w-11 h-11 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200"><Icon name="trash2" size={16} /></button>}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide"><Icon name={icon} size={12} /> {label}</div>
      <div className="text-[14px] font-semibold mt-1">{value}</div>
    </div>
  );
}
