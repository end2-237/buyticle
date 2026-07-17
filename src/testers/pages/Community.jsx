import { useState, useEffect } from "react";
import { DashboardShell } from "../TesterNav";
import { useAuth } from "../AuthContext";
import { VerdictBadge, StatusBadge, Stars, Btn, inputCls, timeAgo } from "../ui";
import { Icon, appIcon } from "../icons";
import * as store from "../store";

const VERDICTS = [
  { key: "valide", label: "Tout fonctionne", hint: "Validé, aucun problème", icon: "check-circle" },
  { key: "bug", label: "Bug trouvé", hint: "Un problème à corriger", icon: "bug" },
  { key: "suggestion", label: "Suggestion", hint: "Une idée d'amélioration", icon: "lightbulb" },
];
const STATUS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "ouvert", label: "Ouverts" },
  { key: "revu", label: "Revus" },
  { key: "resolu", label: "Résolus" },
];

export default function Community() {
  const { user } = useAuth();
  const [, force] = useState(0);
  useEffect(() => store.subscribe(() => force((n) => n + 1)), []);

  const tests = store.getTests();
  const [selId, setSelId] = useState(() => (tests.find((t) => t.status === "en_cours") || tests[0])?.id);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ verdict: "bug", rating: 4, title: "", body: "" });
  const [msg, setMsg] = useState("");

  const sel = store.getTest(selId);
  const reviews = store.getReviewsForTest(selId);
  const shown = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) { setMsg("Ajoutez un titre et une description."); return; }
    store.submitReview({ testId: selId, ...form });
    setForm({ verdict: "bug", rating: 4, title: "", body: "" });
    setMsg("Merci ! Votre retour a été publié et vos points crédités.");
    setTimeout(() => setMsg(""), 3500);
  };

  const canModerate = user.role === "admin";

  return (
    <DashboardShell>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Tests communautaires</h1>
        <p className="text-[#0A0A0A]/50 text-sm mt-1">Choisissez un test, partagez votre résultat et consultez les retours de la communauté — comme un espace de revue collaboratif.</p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left — test list */}
        <aside className="col-span-12 lg:col-span-4 rounded-3xl bg-white border border-[#0A0A0A]/8 p-4 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between px-2 py-2">
            <span className="font-extrabold">Programmes</span>
            <span className="text-[11px] text-[#0A0A0A]/40">{tests.length}</span>
          </div>
          <div className="space-y-1.5">
            {tests.map((t) => {
              const count = store.getReviewsForTest(t.id).length;
              const on = t.id === selId;
              return (
                <button key={t.id} onClick={() => setSelId(t.id)}
                  className={`w-full text-left rounded-2xl p-3 flex items-center gap-3 transition ${on ? "bg-[#FF4500]/[0.08] ring-1 ring-[#FF4500]/30" : "hover:bg-[#0A0A0A]/[0.03]"}`}>
                  <span className="w-9 h-9 rounded-xl grid place-items-center shrink-0" style={{ background: `${t.color}1a`, color: t.color }}><Icon name={t.icon || appIcon(t.app)} size={18} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[14px] truncate">{t.app}</div>
                    <div className="text-[11px] text-[#0A0A0A]/40 truncate">{t.tag}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <StatusBadge status={t.status} />
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#0A0A0A]/40"><Icon name="message-square" size={11} /> {count}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right — detail + form + thread */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* Test header */}
          {sel && (
            <div className="rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl grid place-items-center" style={{ background: `${sel.color}1a`, color: sel.color }}><Icon name={sel.icon || appIcon(sel.app)} size={24} /></span>
                  <div>
                    <h2 className="font-extrabold text-xl leading-tight">{sel.title}</h2>
                    <p className="text-[12px] text-[#0A0A0A]/45 mt-0.5">{sel.version} · {sel.platform} · {sel.durationDays} jours</p>
                  </div>
                </div>
                <StatusBadge status={sel.status} />
              </div>
              <p className="text-sm text-[#0A0A0A]/60 mt-4 leading-relaxed">{sel.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {sel.tasks.map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-[12px] bg-[#EDECEA] rounded-full px-3 py-1.5 text-[#0A0A0A]/60"><Icon name="check" size={12} className="text-[#FF4500]" /> {t}</span>
                ))}
              </div>
              {sel.link && (
                <a href={sel.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#FF4500] font-semibold text-sm mt-5 hover:gap-2.5 transition-all">
                  Ouvrir l'application <Icon name="external-link" size={15} />
                </a>
              )}
            </div>
          )}

          {/* Submit form (like opening a PR) */}
          <form onSubmit={submit} className="rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
            <h3 className="font-extrabold text-lg mb-4">Soumettre mon retour</h3>
            {msg && <div className="mb-4 rounded-xl bg-[#FF4500]/8 border border-[#FF4500]/25 text-[#FF4500] text-sm px-4 py-2.5">{msg}</div>}
            <div className="grid sm:grid-cols-3 gap-2 mb-4">
              {VERDICTS.map((v) => (
                <button key={v.key} type="button" onClick={() => setForm({ ...form, verdict: v.key })}
                  className={`rounded-2xl border p-3 text-left transition ${form.verdict === v.key ? "border-[#FF4500] bg-[#FF4500]/[0.06]" : "border-[#0A0A0A]/10 hover:border-[#0A0A0A]/25"}`}>
                  <Icon name={v.icon} size={18} className={form.verdict === v.key ? "text-[#FF4500]" : "text-[#0A0A0A]/40"} />
                  <div className="font-semibold text-[13px] mt-2">{v.label}</div>
                  <div className="text-[11px] text-[#0A0A0A]/45 mt-0.5">{v.hint}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[13px] font-semibold">Note :</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
                    className={`text-2xl leading-none ${n <= form.rating ? "text-[#FF4500]" : "text-[#0A0A0A]/15"}`}>★</button>
                ))}
              </div>
            </div>
            <input className={`${inputCls} mb-3`} placeholder="Titre (ex. Crash au paiement Mobile Money)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea className={`${inputCls} min-h-[110px] resize-y`} placeholder="Décrivez précisément : étapes pour reproduire, appareil, ce que vous attendiez…" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            <div className="flex justify-end mt-4">
              <Btn as="button" type="submit" variant="orange">Publier mon retour <Icon name="arrow-right" size={16} /></Btn>
            </div>
          </form>

          {/* Thread */}
          <div className="rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h3 className="font-extrabold text-lg">Retours de la communauté <span className="text-[#0A0A0A]/30 font-medium">({reviews.length})</span></h3>
              <div className="flex items-center gap-1 bg-[#0A0A0A]/[0.04] rounded-full p-1">
                {STATUS_FILTERS.map((s) => (
                  <button key={s.key} onClick={() => setFilter(s.key)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition ${filter === s.key ? "bg-white shadow text-[#0A0A0A]" : "text-[#0A0A0A]/45 hover:text-[#0A0A0A]"}`}>{s.label}</button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {shown.length === 0 && <p className="text-sm text-[#0A0A0A]/40 py-6 text-center">Aucun retour pour ce filtre. Soyez le premier à contribuer !</p>}
              {shown.map((r) => {
                const own = r.userId === user.id;
                const initials = r.userName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
                return (
                  <div key={r.id} className="rounded-2xl border border-[#0A0A0A]/8 p-4">
                    <div className="flex items-start gap-3">
                      <span className="w-9 h-9 rounded-full grid place-items-center text-white text-[11px] font-bold shrink-0" style={{ background: own ? "#FF4500" : "#0A0A0A" }}>{initials}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-[14px]">{own ? "Vous" : r.userName}</span>
                          <VerdictBadge verdict={r.verdict} />
                          <Stars value={r.rating} />
                          <span className="text-[11px] text-[#0A0A0A]/35">· {timeAgo(r.createdAt)}</span>
                        </div>
                        <div className="font-bold text-[15px] mt-2">{r.title}</div>
                        <p className="text-[13px] text-[#0A0A0A]/65 mt-1 leading-relaxed whitespace-pre-wrap">{r.body}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${r.status === "resolu" ? "bg-emerald-500/12 text-emerald-600" : r.status === "revu" ? "bg-blue-500/12 text-blue-600" : "bg-[#0A0A0A]/6 text-[#0A0A0A]/50"}`}>
                            {r.status === "resolu" ? "Résolu" : r.status === "revu" ? "Revu par l'équipe" : "Ouvert"}
                          </span>
                          {canModerate && r.status !== "resolu" && (
                            <button onClick={() => store.setReviewStatus(r.id, r.status === "ouvert" ? "revu" : "resolu")}
                              className="text-[11px] text-[#FF4500] font-semibold hover:underline">
                              Marquer {r.status === "ouvert" ? "revu" : "résolu"}
                            </button>
                          )}
                          {own && (
                            <button onClick={() => store.deleteReview(r.id)} className="text-[11px] text-red-500 font-semibold hover:underline">Supprimer</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
