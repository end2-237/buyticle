import { Link } from "react-router-dom";
import { ProgramNav } from "../TesterNav";
import { Btn, StatusBadge } from "../ui";
import { Icon, appIcon, WhatsAppIcon } from "../icons";
import Program3D from "../Program3D";
import { getTests, REWARDS, WHATSAPP_GROUP } from "../store";

export default function ProgramLanding() {
  const tests = getTests();
  const active = tests.filter((t) => t.status !== "termine");
  const featured = tests.find((t) => t.id === "prog-buyticle") || tests[0];

  return (
    <div className="font-jakarta min-h-screen bg-[#EDECEA] text-[#0A0A0A]">
      <ProgramNav />

      {/* ── HERO (Kortix-style + faint 3D object) ── */}
      <section className="relative overflow-hidden">
        <Program3D className="absolute inset-0 -z-0" opacity={0.35} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#EDECEA]/40 to-[#EDECEA]" />
        <div className="relative z-10 max-w-[900px] mx-auto px-5 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#0A0A0A]/10 rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#0A0A0A]/70 shadow-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" /> Programme communautaire · Douala, Cameroun
          </div>
          <h1 className="font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(40px,8vw,84px)]">
            <span className="text-[#FF4500]">Testez.</span>{" "}
            <span className="text-[#0A0A0A]/40">Signalez.</span>{" "}
            <span className="text-[#0A0A0A]">Gagnez.</span>
            <br />
            Les apps Buyticle,<br className="hidden md:block" /> avant tout le monde.
          </h1>
          <p className="text-[#0A0A0A]/55 text-base md:text-lg max-w-xl mx-auto mt-7 leading-relaxed">
            Rejoignez la communauté de testeurs Buyticle. Essayez nos applications en avant-première,
            remontez les bugs, proposez des idées — et cumulez des récompenses.
          </p>

          {/* CTA input-like row (Kortix) */}
          <div className="mt-10 max-w-lg mx-auto">
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-[#0A0A0A]/10 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.3)] p-2">
              <span className="pl-3 text-sm text-[#0A0A0A]/40 flex-1 text-left hidden sm:block">
                Entrez dans le programme testeurs…
              </span>
              <Btn to="/testers/register" variant="orange" className="flex-1 sm:flex-none">
                Devenir testeur →
              </Btn>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-[12px] text-[#0A0A0A]/45">
              <span className="inline-flex items-center gap-1"><Icon name="check" size={13} className="text-[#FF4500]" /> Gratuit</span>
              <span className="inline-flex items-center gap-1"><Icon name="check" size={13} className="text-[#FF4500]" /> Sans engagement</span>
              <span className="inline-flex items-center gap-1"><Icon name="check" size={13} className="text-[#FF4500]" /> Récompensé</span>
            </div>
          </div>

          {/* stat strip */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mt-14">
            {[
              { n: `${tests.reduce((s, t) => s + t.participants, 0)}+`, l: "Testeurs actifs" },
              { n: `${active.length}`, l: "Programmes en cours" },
              { n: `${tests.length}`, l: "Apps à tester" },
            ].map((s) => (
              <div key={s.l} className="bg-white/70 rounded-2xl border border-[#0A0A0A]/8 py-4">
                <div className="text-2xl font-extrabold text-[#0A0A0A]">{s.n}</div>
                <div className="text-[11px] text-[#0A0A0A]/45 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME EN COURS (featured, Kortix "in action" style) ── */}
      <section id="programme" className="max-w-[1120px] mx-auto px-5 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.3em] uppercase mb-3">◆ Buyticle en test</p>
          <h2 className="text-[clamp(28px,5vw,48px)] font-extrabold tracking-[-0.02em] leading-tight">
            Le programme en cours, expliqué.
          </h2>
          <p className="text-[#0A0A0A]/50 max-w-xl mx-auto mt-4">
            Chaque programme a une app cible, une durée, des tâches précises et une récompense. Voici celui à la une.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Featured dark card */}
          <div className="relative rounded-3xl overflow-hidden p-8 text-white min-h-[380px] flex flex-col justify-between"
            style={{ background: "linear-gradient(150deg,#141414,#2a1206)" }}>
            <div className="absolute -right-8 -top-8 opacity-[0.08] select-none"><Icon name={featured.icon || appIcon(featured.app)} size={200} strokeWidth={1} /></div>
            <div className="relative">
              <StatusBadge status={featured.status} />
              <h3 className="text-3xl font-extrabold mt-5 leading-tight">{featured.title}</h3>
              <p className="text-white/60 mt-3 text-sm leading-relaxed max-w-sm">{featured.description}</p>
            </div>
            <div className="relative grid grid-cols-3 gap-3 mt-6">
              {[
                { l: "Durée", v: `${featured.durationDays} j` },
                { l: "Plateforme", v: featured.platform },
                { l: "Récompense", v: `${featured.reward} pts` },
              ].map((x) => (
                <div key={x.l} className="bg-white/8 rounded-xl px-3 py-3">
                  <div className="text-[10px] text-white/40 uppercase tracking-wide">{x.l}</div>
                  <div className="font-bold text-sm mt-0.5">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — how it works + tasks */}
          <div className="grid gap-5">
            <div className="rounded-3xl border border-[#0A0A0A]/10 bg-white p-7">
              <h4 className="font-extrabold text-lg mb-4">Comment ça marche</h4>
              <ol className="space-y-3">
                {["Inscrivez-vous et complétez votre profil testeur",
                  "Choisissez un programme actif et installez l'app",
                  "Réalisez les tâches et remontez vos retours",
                  "Gagnez des points et débloquez des récompenses"].map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#0A0A0A]/70">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#FF4500]/12 text-[#FF4500] text-xs font-bold grid place-items-center">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-[#0A0A0A]/10 bg-white p-7">
              <h4 className="font-extrabold text-lg mb-4">Tâches du programme à la une</h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                {featured.tasks.map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#0A0A0A]/70">
                    <Icon name="check" size={15} className="text-[#FF4500] shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPS À TESTER ── */}
      <section id="apps" className="bg-white border-y border-[#0A0A0A]/8 py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.3em] uppercase mb-3">◆ Le catalogue</p>
              <h2 className="text-[clamp(26px,4.5vw,42px)] font-extrabold tracking-[-0.02em]">Les apps à tester</h2>
            </div>
            <span className="text-[#0A0A0A]/30 text-sm font-mono hidden md:block">{tests.length} programmes</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((t) => (
              <div key={t.id} className="group rounded-3xl border border-[#0A0A0A]/10 bg-[#EDECEA] p-6 hover:border-[#FF4500]/40 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center" style={{ background: `${t.color}1a`, color: t.color }}><Icon name={t.icon || appIcon(t.app)} size={24} /></div>
                  <StatusBadge status={t.status} />
                </div>
                <h3 className="font-extrabold text-lg mt-5">{t.app}</h3>
                <p className="text-[#0A0A0A]/50 text-[13px] mt-1">{t.tag} · {t.platform}</p>
                <p className="text-[#0A0A0A]/60 text-sm mt-3 leading-relaxed line-clamp-2">{t.description}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#0A0A0A]/8">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#0A0A0A]/45"><Icon name="gift" size={14} /> {t.reward} pts</span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#0A0A0A]/45"><Icon name="users" size={14} /> {t.participants}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉCOMPENSES ── */}
      <section id="recompenses" className="max-w-[1120px] mx-auto px-5 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.3em] uppercase mb-3">◆ Vos avantages</p>
          <h2 className="text-[clamp(28px,5vw,48px)] font-extrabold tracking-[-0.02em]">Pourquoi devenir testeur ?</h2>
          <p className="text-[#0A0A0A]/50 max-w-xl mx-auto mt-4">
            Le programme récompense chaque contribution. Plus vous testez, plus vous gagnez.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REWARDS.map((r) => (
            <div key={r.title} className="rounded-3xl border border-[#0A0A0A]/10 bg-white p-7 hover:-translate-y-1 transition">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#FF4500]/10 text-[#FF4500]"><Icon name={r.icon} size={24} /></span>
              <h3 className="font-extrabold text-lg mt-4">{r.title}</h3>
              <p className="text-[#0A0A0A]/55 text-sm mt-2 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-[1120px] mx-auto px-5 pb-24">
        <div className="rounded-[32px] p-10 md:p-16 text-center text-white relative overflow-hidden"
          style={{ background: "linear-gradient(140deg,#FF4500,#ff7a3d)" }}>
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10" />
          <h2 className="text-[clamp(28px,5vw,52px)] font-extrabold tracking-[-0.02em] relative">Prêt à tester le futur ?</h2>
          <p className="text-white/80 max-w-md mx-auto mt-4 relative">
            Créez votre compte testeur en 2 minutes et rejoignez la communauté Buyticle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 relative">
            <Btn to="/testers/register" className="!bg-white !text-[#0A0A0A] hover:!bg-[#0A0A0A] hover:!text-white">Devenir testeur</Btn>
            <a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
              <WhatsAppIcon size={16} /> Rejoindre le WhatsApp
            </a>
          </div>
          <p className="text-white/60 text-xs mt-6 relative">
            Déjà membre ? <Link to="/testers/login" className="underline">Se connecter</Link>
          </p>
        </div>
      </section>

      <footer className="border-t border-[#0A0A0A]/8 py-8 text-center text-[#0A0A0A]/40 text-xs">
        BUYTICLE · Programme Testeurs · Douala, Cameroun · Est. 2025
      </footer>
    </div>
  );
}
