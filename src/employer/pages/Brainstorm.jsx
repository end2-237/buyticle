import { useEffect, useState } from "react";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import { timeAgo } from "../../testers/ui";
import { useAuth } from "../../testers/AuthContext";
import * as store from "../store";

const TAGS = ["général", "produit", "dev", "design", "devops", "process", "marketing"];
const SORTS = [{ key: "top", label: "Populaires" }, { key: "new", label: "Récentes" }];

function IdeaComments({ ideaId, user }) {
  const [list, setList] = useState(null);
  const [text, setText] = useState("");
  useEffect(() => store.subscribeIdeaComments(ideaId, setList), [ideaId]);
  const send = async (e) => { e.preventDefault(); if (!text.trim()) return; await store.addIdeaComment(ideaId, { user, body: text }); setText(""); };
  return (
    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2.5">
      {list?.map((c) => (
        <div key={c.id} className="flex items-start gap-2">
          <span className="w-6 h-6 rounded-full grid place-items-center text-white text-[9px] font-bold shrink-0" style={{ background: c.userId === user.id ? "#2C87F2" : "#0A0A0A" }}>{store.initials(c.userName)}</span>
          <div className="flex-1 min-w-0">
            <span className="text-[12px] font-semibold">{c.userId === user.id ? "Vous" : c.userName}</span>
            <span className="text-[10px] text-slate-400"> · {timeAgo(c.createdAt)}</span>
            <p className="text-[12.5px] text-slate-600 whitespace-pre-wrap break-words">{c.body}</p>
          </div>
        </div>
      ))}
      <form onSubmit={send} className="flex items-center gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Réagir…" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-[12.5px] focus:border-[#2C87F2] outline-none" />
        <button type="submit" disabled={!text.trim()} className="grid place-items-center w-9 h-9 rounded-lg bg-[#2C87F2] text-white shrink-0 disabled:opacity-40"><Icon name="send" size={14} /></button>
      </form>
    </div>
  );
}

export default function Brainstorm() {
  const { user } = useAuth();
  const isAdmin = user.role === "admin";
  const [ideas, setIdeas] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sort, setSort] = useState("top");
  const [tag, setTag] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", tag: "général" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => store.subscribeIdeas(setIdeas), []);
  useEffect(() => store.subscribeEmployees(setEmployees), []);

  const filtered = ideas.filter((i) => tag === "all" ? true : i.tag === tag)
    .sort((a, b) => sort === "top" ? (b.votes?.length || 0) - (a.votes?.length || 0) : 0);

  const submit = async (e) => {
    e.preventDefault();
    await store.addIdea({ user, ...form });
    setForm({ title: "", body: "", tag: "général" });
    setShowForm(false);
  };

  return (
    <EmployerShell title="Brainstorm">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div>
          <h2 className="font-bold text-[16px] tracking-tight">Brainstorm & idées</h2>
          <p className="text-[13px] text-slate-400">Proposez, votez et transformez les meilleures idées en tâches.</p>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className="inline-flex items-center gap-2 rounded-lg bg-[#2C87F2] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0]">
          <Icon name="lightbulb" size={16} /> Proposer une idée
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="rounded-2xl bg-white border border-slate-200 p-4 mb-4">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre de l'idée" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] font-semibold focus:border-[#2C87F2] outline-none" />
          <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Décrivez votre idée…" className="w-full mt-2 rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] min-h-[80px] resize-y focus:border-[#2C87F2] outline-none" />
          <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {TAGS.map((t) => (
                <button key={t} type="button" onClick={() => setForm({ ...form, tag: t })} className={`text-[12px] font-medium px-2.5 py-1 rounded-full border transition ${form.tag === t ? "border-[#2C87F2] bg-[#2C87F2]/10 text-[#2C87F2]" : "border-slate-200 text-slate-500"}`}>{t}</button>
              ))}
            </div>
            <button type="submit" disabled={!form.title.trim()} className="rounded-lg bg-[#2C87F2] px-5 py-2 text-[13px] font-semibold text-white disabled:opacity-40">Publier</button>
          </div>
        </form>
      )}

      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => setTag("all")} className={`text-[12px] font-semibold px-3 py-1.5 rounded-full transition ${tag === "all" ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-500"}`}>Toutes</button>
          {TAGS.map((t) => (
            <button key={t} onClick={() => setTag(t)} className={`text-[12px] font-medium px-3 py-1.5 rounded-full transition ${tag === t ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-500"}`}>{t}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
          {SORTS.map((s) => <button key={s.key} onClick={() => setSort(s.key)} className={`px-3 py-1 rounded-full text-[12px] font-semibold transition ${sort === s.key ? "bg-white shadow text-slate-800" : "text-slate-500"}`}>{s.label}</button>)}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
          <span className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-[#2C87F2]/10 text-[#2C87F2] mb-3"><Icon name="lightbulb" size={26} /></span>
          <p className="font-semibold text-slate-600">Aucune idée pour l'instant</p>
          <p className="text-[13px] text-slate-400 mt-1">Lancez le brainstorm — proposez la première idée !</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((i) => {
            const voted = i.votes?.includes(user.id);
            const stat = store.IDEA_STATUS.find((s) => s.key === i.status);
            const own = i.authorId === user.id;
            return (
              <div key={i.id} className="rounded-2xl bg-white border border-slate-200 p-4 flex gap-3">
                <button onClick={() => store.toggleIdeaVote(i, user.id)}
                  className={`shrink-0 w-11 rounded-xl border flex flex-col items-center justify-center py-1.5 transition ${voted ? "border-[#2C87F2] bg-[#2C87F2]/10 text-[#2C87F2]" : "border-slate-200 text-slate-400 hover:border-[#2C87F2]"}`}>
                  <Icon name="chevron-up" size={16} />
                  <span className="text-[14px] font-bold">{i.votes?.length || 0}</span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{i.tag}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${stat.color}18`, color: stat.color }}>{stat.label}</span>
                  </div>
                  <h3 className="font-semibold text-[14px] tracking-tight mt-1.5">{i.title}</h3>
                  {i.body && <p className="text-[12.5px] text-slate-500 mt-1 whitespace-pre-wrap break-words">{i.body}</p>}
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                    <span className="w-5 h-5 rounded-full grid place-items-center text-white text-[8px] font-bold" style={{ background: store.colorFor(i.authorId) }}>{store.initials(i.authorName)}</span>
                    {i.authorName}
                    <button onClick={() => setOpenId(openId === i.id ? null : i.id)} className="ml-auto inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-[#2C87F2]"><Icon name="message-square" size={12} /> Discuter</button>
                  </div>
                  {(isAdmin || own) && (
                    <div className="flex items-center gap-2 mt-2">
                      {isAdmin && i.status !== "converted" && (
                        <button onClick={() => store.convertIdeaToTask(i)} className="text-[11px] font-semibold text-[#22C55E] hover:underline inline-flex items-center gap-1"><Icon name="check-circle" size={12} /> Convertir en tâche</button>
                      )}
                      {isAdmin && i.status === "idea" && (
                        <button onClick={() => store.setIdeaStatus(i.id, "planned")} className="text-[11px] font-semibold text-[#F97316] hover:underline">Planifier</button>
                      )}
                      <button onClick={() => { if (confirm("Supprimer cette idée ?")) store.deleteIdea(i.id); }} className="text-[11px] font-semibold text-red-500 hover:underline ml-auto">Supprimer</button>
                    </div>
                  )}
                  {openId === i.id && <IdeaComments ideaId={i.id} user={user} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </EmployerShell>
  );
}
