import { useEffect, useRef, useState } from "react";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import { timeAgo } from "../../testers/ui";
import { useAuth } from "../../testers/AuthContext";
import * as store from "../store";

const TAGS = ["général", "produit", "dev", "design", "devops", "marketing", "support"];
const typeOf = (k) => store.RESOURCE_TYPES.find((t) => t.key === k) || store.RESOURCE_TYPES[0];
const fmtSize = (b) => !b ? "" : b > 1e6 ? `${(b / 1e6).toFixed(1)} Mo` : `${Math.round(b / 1e3)} Ko`;

export default function Resources() {
  const { user } = useAuth();
  const isAdmin = user.role === "admin";
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: "", url: "", type: "link", description: "", tag: "général" });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("all");
  const fileRef = useRef();

  useEffect(() => store.subscribeResources(setList), []);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      let url = form.url, fileName = "", type = form.type;
      if (file) {
        const up = await store.uploadResourceFile(file, user.id);
        url = up.url; fileName = up.name; type = "file";
      }
      if (!url) { setErr("Ajoutez un lien ou un fichier."); setBusy(false); return; }
      await store.addResource({ user, ...form, url, type, fileName });
      setForm({ title: "", url: "", type: "link", description: "", tag: "général" }); setFile(null); setShow(false);
    } catch (e2) { setErr(e2?.message || "Échec du partage (vérifiez les règles Storage)."); }
    setBusy(false);
  };

  const shown = filter === "all" ? list : list.filter((r) => r.tag === filter);

  return (
    <EmployerShell title="Ressources">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div><h2 className="font-bold text-[16px] tracking-tight">Ressources partagées</h2><p className="text-[13px] text-slate-400">Documents, liens, dépôts et maquettes de l'équipe.</p></div>
        <button onClick={() => setShow((s) => !s)} className="inline-flex items-center gap-2 rounded-lg bg-[#2C87F2] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1e6fd0]"><Icon name="share" size={16} /> Partager</button>
      </div>

      {show && (
        <form onSubmit={submit} className="rounded-2xl bg-white border border-slate-200 p-4 mb-4 space-y-3">
          {err && <div className="text-[12px] text-red-500">{err}</div>}
          <div className="grid sm:grid-cols-2 gap-2">
            <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Titre de la ressource" className="rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] font-semibold focus:border-[#2C87F2] outline-none" />
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none">
              {store.RESOURCE_TYPES.filter((t) => t.key !== "file").map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </div>
          <input value={form.url} onChange={(e) => set("url", e.target.value)} placeholder="Lien (https://…) — ou joignez un fichier ci-dessous" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] focus:border-[#2C87F2] outline-none" />
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Description (optionnel)" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] min-h-[60px] resize-y focus:border-[#2C87F2] outline-none" />
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-semibold text-slate-600 hover:border-[#2C87F2]"><Icon name="upload" size={14} /> {file ? file.name : "Joindre un fichier"}</button>
              <input ref={fileRef} type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <select value={form.tag} onChange={(e) => set("tag", e.target.value)} className="rounded-lg border border-slate-200 px-2.5 py-2 text-[12px] focus:border-[#2C87F2] outline-none">
                {TAGS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <button type="submit" disabled={busy || !form.title.trim()} className="rounded-lg bg-[#2C87F2] px-5 py-2 text-[13px] font-semibold text-white disabled:opacity-40">{busy ? "Partage…" : "Partager"}</button>
          </div>
        </form>
      )}

      <div className="flex items-center gap-1.5 flex-wrap mb-4">
        <button onClick={() => setFilter("all")} className={`text-[12px] font-semibold px-3 py-1.5 rounded-full transition ${filter === "all" ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-500"}`}>Toutes</button>
        {TAGS.map((t) => <button key={t} onClick={() => setFilter(t)} className={`text-[12px] font-medium px-3 py-1.5 rounded-full transition ${filter === t ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-500"}`}>{t}</button>)}
      </div>

      {shown.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
          <span className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-[#2C87F2]/10 text-[#2C87F2] mb-3"><Icon name="share" size={26} /></span>
          <p className="font-semibold text-slate-600">Aucune ressource</p>
          <p className="text-[13px] text-slate-400 mt-1">Partagez le premier document ou lien avec l'équipe.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {shown.map((r) => {
            const ty = typeOf(r.type);
            const own = r.ownerId === user.id;
            return (
              <div key={r.id} className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${ty.color}18`, color: ty.color }}><Icon name={ty.icon} size={20} /></span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{r.tag}</span>
                    {(own || isAdmin) && <button onClick={() => { if (confirm("Supprimer ?")) store.deleteResource(r.id); }} className="w-7 h-7 grid place-items-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50"><Icon name="trash2" size={14} /></button>}
                  </div>
                </div>
                <h3 className="font-semibold text-[14px] tracking-tight mt-2.5">{r.title}</h3>
                {r.description && <p className="text-[12px] text-slate-400 mt-1 line-clamp-2">{r.description}</p>}
                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5"><span className="w-5 h-5 rounded-full grid place-items-center text-white text-[8px] font-bold" style={{ background: store.colorFor(r.ownerId) }}>{store.initials(r.ownerName)}</span>{r.ownerName} · {r.createdAt?.toDate ? timeAgo(r.createdAt.toDate()) : ""}</div>
                <a href={r.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-700 hover:border-[#2C87F2] hover:text-[#2C87F2] transition">
                  <Icon name={ty.icon} size={14} /> {r.type === "file" ? `Télécharger${r.fileName ? "" : ""}` : "Ouvrir"} <Icon name="arrow-right" size={13} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </EmployerShell>
  );
}
