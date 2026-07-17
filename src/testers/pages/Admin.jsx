import { useState } from "react";
import { DashboardShell } from "../TesterNav";
import { VerdictBadge, StatusBadge, Btn, inputCls, Select, Field, timeAgo } from "../ui";
import { Icon, appIcon } from "../icons";
import * as store from "../store";
import { useTests, useReviews, useTesters } from "../hooks";

const TABS = [
  { key: "overview", label: "Aperçu" },
  { key: "testers", label: "Testeurs" },
  { key: "reviews", label: "Retours" },
  { key: "programs", label: "Programmes" },
];

const empty = {
  id: "", app: "", title: "", tag: "", platform: "Web", version: "v1.0.0",
  color: "#FF4500", icon: "smartphone", status: "en_cours", startDate: "", endDate: "",
  durationDays: 30, participants: 0, reward: 200, link: "", description: "", tasks: [],
};
const ICON_CHOICES = ["shopping-bag", "shopping-cart", "layers", "leaf", "shirt", "smartphone", "rocket", "target"];

export default function Admin() {
  const [tab, setTab] = useState("overview");
  const [editing, setEditing] = useState(null); // program being edited/created

  const testers = (useTesters() || []).filter((t) => t.role !== "admin");
  const reviews = useReviews() || [];
  const tests = useTests() || [];
  const appOf = (id) => tests.find((t) => t.id === id)?.app || "—";
  const bugsOpen = reviews.filter((r) => r.verdict === "bug" && r.status === "ouvert").length;

  return (
    <DashboardShell>
      <div className="mb-5 flex justify-end">
        <div className="flex items-center gap-1 bg-[#0A0A0A]/[0.04] rounded-full p-1">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => { setTab(t.key); setEditing(null); }}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition ${tab === t.key ? "bg-white shadow text-[#0A0A0A]" : "text-[#0A0A0A]/45 hover:text-[#0A0A0A]"}`}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: "Testeurs inscrits", v: testers.length, i: "users" },
              { l: "Retours reçus", v: reviews.length, i: "message-square" },
              { l: "Bugs ouverts", v: bugsOpen, i: "bug", accent: true },
              { l: "Programmes actifs", v: tests.filter((t) => t.status === "en_cours").length, i: "rocket" },
            ].map((s) => (
              <div key={s.l} className={`rounded-3xl p-5 border ${s.accent ? "bg-[#FF4500]/[0.07] border-[#FF4500]/25" : "bg-white border-[#0A0A0A]/8"}`}>
                <span className={`grid place-items-center w-10 h-10 rounded-xl ${s.accent ? "bg-[#FF4500]/12 text-[#FF4500]" : "bg-[#0A0A0A]/[0.05] text-[#0A0A0A]/60"}`}><Icon name={s.i} size={20} /></span>
                <div className="text-[32px] font-extrabold mt-3 leading-none">{s.v}</div>
                <div className="text-[12px] text-[#0A0A0A]/45 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-white border border-[#0A0A0A]/8 p-6 mt-4">
            <h3 className="font-extrabold text-lg mb-4">Derniers retours</h3>
            <div className="space-y-2">
              {reviews.slice(0, 6).map((r) => (
                <div key={r.id} className="flex items-center gap-3 py-2 border-b border-[#0A0A0A]/6 last:border-0">
                  <VerdictBadge verdict={r.verdict} />
                  <span className="font-semibold text-sm truncate flex-1">{r.title}</span>
                  <span className="text-[12px] text-[#0A0A0A]/45 hidden sm:block">{appOf(r.testId)}</span>
                  <span className="text-[11px] text-[#0A0A0A]/35">{timeAgo(r.createdAt)}</span>
                </div>
              ))}
              {reviews.length === 0 && <p className="text-sm text-[#0A0A0A]/40">Aucun retour pour l'instant.</p>}
            </div>
          </div>
        </>
      )}

      {/* TESTERS */}
      {tab === "testers" && (
        <div className="rounded-3xl bg-white border border-[#0A0A0A]/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-[#0A0A0A]/40 text-[12px] border-b border-[#0A0A0A]/8">
                  <th className="px-5 py-3 font-semibold">Testeur</th>
                  <th className="px-5 py-3 font-semibold">Contact</th>
                  <th className="px-5 py-3 font-semibold">Localisation</th>
                  <th className="px-5 py-3 font-semibold">Profil</th>
                  <th className="px-5 py-3 font-semibold">Points</th>
                  <th className="px-5 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {testers.map((t) => (
                  <tr key={t.id} className="border-b border-[#0A0A0A]/6 last:border-0 hover:bg-[#0A0A0A]/[0.02]">
                    <td className="px-5 py-3">
                      <div className="font-semibold">{t.profile?.fullName || "—"}</div>
                      <div className="text-[12px] text-[#0A0A0A]/45">{t.email}</div>
                    </td>
                    <td className="px-5 py-3 text-[13px]">
                      <div>{t.phone || "—"}</div>
                      <div className="text-[#25D366] text-[12px]">wa: {t.whatsapp || "—"}</div>
                    </td>
                    <td className="px-5 py-3 text-[13px]">{t.profile?.city ? `${t.profile.city}, ${t.profile.country}` : "—"}</td>
                    <td className="px-5 py-3 text-[13px]">
                      <div>{t.profile?.profession || "—"}</div>
                      <div className="text-[12px] text-[#0A0A0A]/45">{t.profile?.sector || ""}</div>
                    </td>
                    <td className="px-5 py-3 font-bold text-[#FF4500]">{t.points || 0}</td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => { if (confirm("Supprimer ce testeur ?")) store.deleteTester(t.id); }}
                        className="text-[12px] text-red-500 font-semibold hover:underline">Supprimer</button>
                    </td>
                  </tr>
                ))}
                {testers.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-[#0A0A0A]/40 text-sm">Aucun testeur inscrit pour l'instant.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      {tab === "reviews" && (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white border border-[#0A0A0A]/8 p-4 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <VerdictBadge verdict={r.verdict} />
                  <span className="text-[12px] font-semibold text-[#0A0A0A]/60">{appOf(r.testId)}</span>
                  <span className="text-[11px] text-[#0A0A0A]/35">par {r.userName} · {timeAgo(r.createdAt)}</span>
                </div>
                <div className="font-bold text-[15px] mt-2">{r.title}</div>
                <p className="text-[13px] text-[#0A0A0A]/60 mt-1">{r.body}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <Select value={r.status} onChange={(e) => store.setReviewStatus(r.id, e.target.value)} className="!py-1.5 !text-[12px] !w-auto">
                  <option value="ouvert">Ouvert</option>
                  <option value="revu">Revu</option>
                  <option value="resolu">Résolu</option>
                </Select>
                <button onClick={() => { if (confirm("Supprimer ce retour ?")) store.deleteReview(r.id); }} className="text-[11px] text-red-500 font-semibold hover:underline">Supprimer</button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-sm text-[#0A0A0A]/40 py-10 text-center">Aucun retour.</p>}
        </div>
      )}

      {/* PROGRAMS */}
      {tab === "programs" && (
        editing ? (
          <ProgramEditor value={editing} onCancel={() => setEditing(null)} onSave={async (p) => { await store.saveTest(p); setEditing(null); }} />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Btn as="button" variant="orange" onClick={() => setEditing({ ...empty })}><Icon name="plus" size={16} /> Nouveau programme</Btn>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tests.map((t) => (
                <div key={t.id} className="rounded-2xl bg-white border border-[#0A0A0A]/8 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${t.color}1a`, color: t.color }}><Icon name={t.icon || appIcon(t.app)} size={20} /></span>
                      <div>
                        <div className="font-bold">{t.app}</div>
                        <div className="text-[12px] text-[#0A0A0A]/45">{t.tag}</div>
                      </div>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-[12px] text-[#0A0A0A]/50">
                    <span className="inline-flex items-center gap-1"><Icon name="clock" size={13} /> {t.durationDays} j</span>
                    <span className="inline-flex items-center gap-1"><Icon name="gift" size={13} /> {t.reward} pts</span>
                    <span className="inline-flex items-center gap-1"><Icon name="users" size={13} /> {t.participants}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => setEditing({ ...t, tasks: [...(t.tasks || [])] })} className="text-[12px] font-semibold text-[#0A0A0A] bg-[#0A0A0A]/[0.05] rounded-full px-4 py-1.5 hover:bg-[#0A0A0A]/10">Modifier</button>
                    <button onClick={() => { if (confirm("Supprimer ce programme ?")) store.deleteTest(t.id); }} className="text-[12px] font-semibold text-red-500 hover:underline px-2">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      )}
    </DashboardShell>
  );
}

function ProgramEditor({ value, onCancel, onSave }) {
  const [p, setP] = useState(value);
  const set = (k, v) => setP((s) => ({ ...s, [k]: v }));

  return (
    <div className="rounded-3xl bg-white border border-[#0A0A0A]/8 p-6 max-w-2xl">
      <h3 className="font-extrabold text-lg mb-5">{value.id ? "Modifier le programme" : "Nouveau programme"}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nom de l'app"><input className={inputCls} value={p.app} onChange={(e) => set("app", e.target.value)} /></Field>
        <Field label="Catégorie"><input className={inputCls} value={p.tag} onChange={(e) => set("tag", e.target.value)} /></Field>
        <Field label="Titre du programme" className="sm:col-span-2"><input className={inputCls} value={p.title} onChange={(e) => set("title", e.target.value)} /></Field>
        <Field label="Plateforme"><input className={inputCls} value={p.platform} onChange={(e) => set("platform", e.target.value)} /></Field>
        <Field label="Version"><input className={inputCls} value={p.version} onChange={(e) => set("version", e.target.value)} /></Field>
        <Field label="Statut">
          <Select value={p.status} onChange={(e) => set("status", e.target.value)}>
            <option value="en_cours">En cours</option><option value="a_venir">À venir</option><option value="termine">Terminé</option>
          </Select>
        </Field>
        <Field label="Icône">
          <div className="flex flex-wrap gap-2">
            {ICON_CHOICES.map((ic) => (
              <button key={ic} type="button" onClick={() => set("icon", ic)}
                className={`grid place-items-center w-10 h-10 rounded-xl border transition ${p.icon === ic ? "border-[#FF4500] bg-[#FF4500]/8 text-[#FF4500]" : "border-[#0A0A0A]/12 text-[#0A0A0A]/50 hover:border-[#0A0A0A]/30"}`}>
                <Icon name={ic} size={18} />
              </button>
            ))}
          </div>
        </Field>
        <Field label="Date de début"><input type="date" className={inputCls} value={p.startDate} onChange={(e) => set("startDate", e.target.value)} /></Field>
        <Field label="Date de fin"><input type="date" className={inputCls} value={p.endDate} onChange={(e) => set("endDate", e.target.value)} /></Field>
        <Field label="Durée (jours)"><input type="number" className={inputCls} value={p.durationDays} onChange={(e) => set("durationDays", Number(e.target.value))} /></Field>
        <Field label="Récompense (points)"><input type="number" className={inputCls} value={p.reward} onChange={(e) => set("reward", Number(e.target.value))} /></Field>
        <Field label="Lien de l'app" className="sm:col-span-2"><input className={inputCls} value={p.link} onChange={(e) => set("link", e.target.value)} /></Field>
        <Field label="Description" className="sm:col-span-2"><textarea className={`${inputCls} min-h-[90px]`} value={p.description} onChange={(e) => set("description", e.target.value)} /></Field>
        <Field label="Tâches (une par ligne)" className="sm:col-span-2">
          <textarea className={`${inputCls} min-h-[90px]`} value={(p.tasks || []).join("\n")} onChange={(e) => set("tasks", e.target.value.split("\n").filter(Boolean))} />
        </Field>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onCancel} className="text-sm font-semibold text-[#0A0A0A]/50 hover:text-[#0A0A0A] px-4">Annuler</button>
        <Btn as="button" variant="orange" onClick={() => onSave(p)}>Enregistrer</Btn>
      </div>
    </div>
  );
}
