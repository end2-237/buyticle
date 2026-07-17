import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardShell } from "../TesterNav";
import { useAuth } from "../AuthContext";
import { Icon, appIcon } from "../icons";
import { getTests, getUserStats, getReviewsByUser, REWARDS } from "../store";

function StatTile({ label, value, delta, accent }) {
  return (
    <div className={`rounded-3xl p-5 border ${accent ? "bg-[#FF4500]/[0.07] border-[#FF4500]/25" : "bg-white border-[#0A0A0A]/8"}`}>
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#0A0A0A]/50 font-medium leading-tight">{label}</span>
        <span className="grid place-items-center w-7 h-7 rounded-full bg-[#0A0A0A]/[0.05] text-[#0A0A0A]/50">
          <Icon name="arrow-up-right" size={14} strokeWidth={2} />
        </span>
      </div>
      <div className="text-[34px] font-extrabold leading-none mt-6">{value}</div>
      {delta && <div className="text-[11px] text-[#0A0A0A]/40 mt-2">{delta}</div>}
    </div>
  );
}

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const BARS = [30, 55, 40, 70, 45, 25, 15, 35, 60, 92, 68, 80];
const ACTIVE_MONTH = 9;

function ProgressChart() {
  return (
    <div className="rounded-3xl bg-white border border-[#0A0A0A]/8 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Ma progression</h3>
        <span className="grid place-items-center w-9 h-9 rounded-full bg-[#0A0A0A]/[0.04] text-[#0A0A0A]/60"><Icon name="calendar" size={16} /></span>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col justify-between text-[10px] text-[#0A0A0A]/30 py-1 h-[180px]">
          {[5, 4, 3, 2, 1, 0].map((n) => <span key={n}>{n}</span>)}
        </div>
        <div className="flex-1 relative">
          <div className="flex items-end gap-2 h-[180px]">
            {BARS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                {i === ACTIVE_MONTH && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-[#0A0A0A] text-white text-[10px] rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                    <div className="font-bold">Octobre</div>
                    <div className="text-white/60">Moy. 4h 20m / sem</div>
                  </div>
                )}
                <div className={`w-full rounded-t-md transition-all ${i === ACTIVE_MONTH ? "bg-[#FF4500]" : "bg-[#0A0A0A]/10 group-hover:bg-[#0A0A0A]/20"}`} style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {MONTHS.map((m, i) => <span key={i} className={`flex-1 text-center text-[10px] ${i === ACTIVE_MONTH ? "text-[#FF4500] font-bold" : "text-[#0A0A0A]/30"}`}>{m}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

const WEEK = [["L", 24], ["M", 25], ["M", 26], ["J", 27], ["V", 28], ["S", 29], ["D", 30]];
const SCHED = [
  { icon: "pen", title: "Test Buyticle — Paiement", tag: "Obligatoire", time: "11:30", dur: "15 min", color: "#FF4500" },
  { icon: "clock", title: "Retour Eetra — Annonces", tag: "Recommandé", time: "10:30", dur: "20 min", color: "#F2A900" },
  { icon: "check", title: "One Freestyle — Checkout", tag: "Terminé", time: "09:00", dur: "17 min", color: "#25C26E" },
];

function Schedule() {
  const active = 3;
  return (
    <div className="rounded-3xl bg-white border border-[#0A0A0A]/8 p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-lg">Mon planning</h3>
        <span className="grid place-items-center w-9 h-9 rounded-full bg-[#0A0A0A]/[0.04] text-[#0A0A0A]/60"><Icon name="calendar" size={16} /></span>
      </div>
      <div className="flex justify-between mb-6">
        {WEEK.map(([d, n], i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] text-[#0A0A0A]/35">{d}</span>
            <span className={`grid place-items-center w-8 h-8 rounded-full text-[13px] font-semibold ${i === active ? "bg-[#FF4500] text-white" : "text-[#0A0A0A]/60"}`}>{n}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {SCHED.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl shrink-0" style={{ background: `${s.color}1a`, color: s.color }}><Icon name={s.icon} size={16} /></span>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold truncate">{s.title}</div>
              <div className="text-[11px] text-[#0A0A0A]/40">{s.tag}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[12px] font-semibold">{s.time}</div>
              <div className="text-[10px] text-[#0A0A0A]/40">{s.dur}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { key: "all", label: "Tous" },
  { key: "en_cours", label: "En cours" },
  { key: "a_venir", label: "Recommandés" },
  { key: "termine", label: "Terminés" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState("en_cours");
  const tests = getTests();
  const stats = getUserStats(user.id);
  const mine = getReviewsByUser(user.id);

  const progressOf = (t) => Math.min(95, 25 + (t.participants % 70));
  const filtered = tab === "all" ? tests : tests.filter((t) => t.status === tab);
  const newest = tests.find((t) => t.status === "en_cours") || tests[0];

  return (
    <DashboardShell>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4">
          <StatTile label="Tests complétés" value={stats.validated} delta={`+${stats.validated} ce mois`} />
          <StatTile label="Score moyen" value={`${stats.avgScore}%`} delta="qualité des retours" />
          <StatTile label="Programmes actifs" value={stats.activePrograms} delta="à rejoindre" />
          <StatTile label="Points gagnés" value={stats.points} delta="récompenses cumulées" accent />
        </div>
        <div className="col-span-12 md:col-span-5"><ProgressChart /></div>
        <div className="col-span-12 md:col-span-3"><Schedule /></div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4" id="recompenses">
        <div className="col-span-12 lg:col-span-8 rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <h3 className="font-bold text-lg">Mes tests</h3>
            <div className="flex items-center gap-1.5 bg-[#0A0A0A]/[0.04] rounded-full p-1">
              {TABS.map((t) => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition ${tab === t.key ? "bg-white shadow text-[#0A0A0A]" : "text-[#0A0A0A]/45 hover:text-[#0A0A0A]"}`}>{t.label}</button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.length === 0 && <p className="text-sm text-[#0A0A0A]/40 py-8">Aucun test dans cette catégorie.</p>}
            {filtered.map((t) => {
              const pr = progressOf(t);
              const reviewed = mine.filter((r) => r.testId === t.id).length;
              return (
                <Link to="/testers/tests" key={t.id} className="rounded-2xl border border-[#0A0A0A]/8 p-5 hover:border-[#FF4500]/40 hover:shadow-md transition block">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0A0A0A]/50 bg-[#0A0A0A]/[0.04] rounded-full px-2.5 py-1"><Icon name="calendar" size={12} /> {t.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: `${t.color}1a`, color: t.color }}><Icon name={t.icon || appIcon(t.app)} size={18} /></span>
                    <h4 className="font-bold text-[15px]">{t.app}</h4>
                  </div>
                  <p className="text-[13px] text-[#0A0A0A]/55 mt-2 line-clamp-2">{t.description}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-[#0A0A0A]/45">Progression {reviewed > 0 && `· ${reviewed} retour(s)`}</span>
                      <span className="font-bold">{pr}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#0A0A0A]/8 overflow-hidden">
                      <div className="h-full rounded-full bg-[#FF4500]" style={{ width: `${pr}%` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 rounded-3xl p-7 flex flex-col" style={{ background: "linear-gradient(160deg,#FF4500,#ff8a4d)" }}>
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-[12px] font-semibold">Nouveau test</span>
            <span className="bg-white text-[#FF4500] text-[11px] font-bold px-3 py-1 rounded-full">Prioritaire</span>
          </div>
          <span className="w-14 h-14 rounded-2xl grid place-items-center bg-white/15 text-white mt-6"><Icon name={newest.icon || appIcon(newest.app)} size={28} /></span>
          <h3 className="text-white text-2xl font-extrabold mt-4 leading-tight">{newest.title}</h3>
          <p className="text-white/75 text-sm mt-2 leading-relaxed line-clamp-3">{newest.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-[12px] font-medium px-3 py-1.5 rounded-full"><Icon name="clock" size={13} /> {newest.durationDays} j</span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-[12px] font-medium px-3 py-1.5 rounded-full"><Icon name="gift" size={13} /> {newest.reward} pts</span>
          </div>
          <Link to="/testers/tests" className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0A0A0A] text-white py-3.5 text-sm font-bold hover:bg-black/80 transition">
            Voir le test <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-4 rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
        <h3 className="font-bold text-lg mb-4">Vos avantages testeur</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {REWARDS.map((r) => (
            <div key={r.title} className="flex gap-3 rounded-2xl bg-[#EDECEA] p-4">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-white text-[#FF4500] shrink-0"><Icon name={r.icon} size={20} /></span>
              <div>
                <div className="font-bold text-sm">{r.title}</div>
                <div className="text-[12px] text-[#0A0A0A]/50 mt-0.5">{r.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
