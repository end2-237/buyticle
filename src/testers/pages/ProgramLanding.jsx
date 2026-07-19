import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProgramNav } from "../TesterNav";
import { Btn, StatusBadge } from "../ui";
import { Icon, appIcon, WhatsAppIcon } from "../icons";
import { REWARDS, WHATSAPP_SUPPORT } from "../store";
import { useTests } from "../hooks";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramLanding() {
  const tests = useTests() || [];
  const active = tests.filter((t) => t.status !== "termine");
  const featured = tests.find((t) => t.id === "prog-buyticle") || tests[0] || { tasks: [], app: "", platform: "", durationDays: 0, reward: 0, status: "en_cours", description: "" };
  const root = useRef(null);
  const heroArt = useRef(null);

  useEffect(() => {
    let refreshTimer;
    const ctx = gsap.context(() => {
      // Hero intro timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 14, opacity: 0, duration: 0.5 })
        .from(".hero-line", { yPercent: 115, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.2")
        .from(".hero-sub", { y: 16, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.55, stagger: 0.08 }, "-=0.35");
      gsap.from(".hero-art", { opacity: 0, scale: 1.12, duration: 1.6, ease: "power2.out" });

      // Cinematic parallax: video drifts + slight zoom, fades as you leave the hero
      gsap.to(".hero-art", {
        yPercent: 16, scale: 1.12, ease: "none",
        scrollTrigger: { trigger: ".hero-sec", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-cue", {
        autoAlpha: 0, y: 20, ease: "none",
        scrollTrigger: { trigger: ".hero-sec", start: "top top", end: "30% top", scrub: true },
      });

      // Depth parallax on the decorative texture layers
      gsap.utils.toArray(".lp-par").forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 ? -12 : 12, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      // Cinematic reveal — rise + fade + subtle scale, plays once
      gsap.utils.toArray(".lp-reveal").forEach((el) => {
        gsap.fromTo(el, { y: 60, autoAlpha: 0, scale: 0.96 }, {
          y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      // Staggered cards (only grids that already have children at mount)
      gsap.utils.toArray(".lp-stagger").forEach((grid) => {
        if (!grid.children.length) return;
        gsap.fromTo(grid.children, { y: 50, autoAlpha: 0, scale: 0.96 }, {
          y: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: grid, start: "top 88%", once: true },
        });
      });

      // Recompute positions after the 3D canvas / images settle so
      // triggers are never stuck below an unreachable scroll position.
      ScrollTrigger.refresh();
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 600);
    }, root);
    return () => { clearTimeout(refreshTimer); ctx.revert(); };
  }, []);

  // Reveal the app cards once Firestore has delivered them
  const appsRevealed = useRef(false);
  useEffect(() => {
    if (appsRevealed.current || !tests.length) return;
    const cards = root.current?.querySelectorAll(".app-card");
    if (!cards || !cards.length) return;
    appsRevealed.current = true;
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { y: 50, autoAlpha: 0, scale: 0.96 }, {
        y: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.09,
        scrollTrigger: { trigger: "#apps", start: "top 85%", once: true },
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, [tests.length]);

  return (
    <div ref={root} className="font-jakarta relative min-h-screen bg-[#EDECEA] text-[#0A0A0A] overflow-hidden">
      {/* Decorative background — varied textures + soft colour blobs to avoid monotony */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="lp-par absolute left-0 right-0 top-[90vh] h-[640px] tp-grid tp-mask-fade opacity-70" />
        <div className="lp-par absolute -left-40 top-[110vh] w-[520px] h-[520px] rounded-full bg-[#FF4500]/10 blur-[90px]" />
        <div className="lp-par absolute left-0 right-0 top-[168vh] h-[640px] tp-dots tp-mask-fade opacity-60" />
        <div className="lp-par absolute -right-40 top-[200vh] w-[560px] h-[560px] rounded-full bg-[#7A5AF8]/10 blur-[100px]" />
        <div className="lp-par absolute left-0 right-0 top-[250vh] h-[560px] tp-diag tp-mask-fade opacity-60" />
        <div className="lp-par absolute left-0 right-0 top-[315vh] h-[560px] tp-cross tp-mask-fade opacity-50" />
      </div>
      <ProgramNav />

      {/* ── HERO (cinematic video background) ── */}
      <section className="hero-sec isolate relative overflow-hidden bg-[#0A0A0A] text-white">
        <div ref={heroArt} className="hero-art absolute inset-0 z-0">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="auto" poster="">
            <source src="/hero-testers.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Transparent grey "wall" that mutes the video for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-[#15171d]/55" />
        {/* Extra darkening at the very top so the transparent nav stays readable */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/55 to-transparent" />
        {/* Smooth fade into the light section below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-[#EDECEA]" />

        <div className="relative z-10 max-w-[920px] mx-auto px-5 pt-24 pb-24 md:pt-28 md:pb-32 text-center">
          <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-semibold text-white/85 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" /> Programme communautaire · Douala, Cameroun
          </div>
          <h1 className="font-extrabold tracking-[-0.03em] leading-[0.92] text-[clamp(36px,6.8vw,76px)]">
            <span className="block overflow-hidden"><span className="hero-line inline-block">
              <span className="text-[#FF4500]">Testez.</span>{" "}
              <span className="text-white/45">Signalez.</span>{" "}
              <span className="text-white">Gagnez.</span>
            </span></span>
            <span className="block overflow-hidden"><span className="hero-line inline-block text-white">Les apps Buyticle,</span></span>
            <span className="block overflow-hidden"><span className="hero-line inline-block text-white">avant tout le monde.</span></span>
          </h1>
          <p className="hero-sub text-white/65 text-sm md:text-base max-w-xl mx-auto mt-6 leading-relaxed">
            Rejoignez la communauté de testeurs Buyticle. Essayez nos applications en avant-première,
            remontez les bugs, proposez des idées — et cumulez des récompenses.
          </p>

          {/* CTA input-like row */}
          <div className="hero-cta mt-8 max-w-lg mx-auto">
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-white/20 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] p-2">
              <span className="pl-3 text-sm text-[#0A0A0A]/40 flex-1 text-left hidden sm:block">
                Entrez dans le programme testeurs…
              </span>
              <Btn to="/testers/register" variant="orange" className="flex-1 sm:flex-none">
                Devenir testeur <Icon name="arrow-right" size={16} />
              </Btn>
            </div>
            <div className="flex items-center justify-center gap-6 mt-5 text-[12px] text-white/55">
              <span className="inline-flex items-center gap-1"><Icon name="check" size={13} className="text-[#FF4500]" /> Gratuit</span>
              <span className="inline-flex items-center gap-1"><Icon name="check" size={13} className="text-[#FF4500]" /> Sans engagement</span>
              <span className="inline-flex items-center gap-1"><Icon name="check" size={13} className="text-[#FF4500]" /> Récompensé</span>
            </div>
          </div>

          {/* stat strip */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mt-12">
            {[
              { n: `${tests.reduce((s, t) => s + t.participants, 0)}+`, l: "Testeurs actifs" },
              { n: `${active.length}`, l: "Programmes en cours" },
              { n: `${tests.length}`, l: "Apps à tester" },
            ].map((s) => (
              <div key={s.l} className="hero-stat bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 py-3.5">
                <div className="text-2xl font-extrabold text-white">{s.n}</div>
                <div className="text-[11px] text-white/55 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <div className="hero-cue absolute left-1/2 -translate-x-1/2 bottom-6 z-10 flex flex-col items-center gap-1.5 text-white/50">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
          <span className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
            <span className="w-1 h-1.5 rounded-full bg-white/60 animate-bounce" />
          </span>
        </div>
      </section>

      {/* ── PROGRAMME EN COURS (featured, Kortix "in action" style) ── */}
      <section id="programme" className="max-w-[1120px] mx-auto px-5 py-16 md:py-24">
        <div className="lp-reveal text-center mb-12">
          <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.3em] uppercase mb-3">◆ Buyticle en test</p>
          <h2 className="text-[clamp(28px,5vw,48px)] font-extrabold tracking-[-0.02em] leading-tight">
            Le programme en cours, expliqué.
          </h2>
          <p className="text-[#0A0A0A]/50 max-w-xl mx-auto mt-4">
            Chaque programme a une app cible, une durée, des tâches précises et une récompense. Voici celui à la une.
          </p>
        </div>

        <div className="lp-stagger grid md:grid-cols-2 gap-5">
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

      {/* ── APPS À TESTER (floating rounded slab — cinematic layer) ── */}
      <section id="apps" className="relative z-10 bg-white rounded-[42px] md:rounded-[64px] mx-3 md:mx-6 -mt-4 py-16 md:py-24 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.35)]">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="lp-reveal flex items-end justify-between mb-10">
            <div>
              <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.3em] uppercase mb-3">◆ Le catalogue</p>
              <h2 className="text-[clamp(26px,4.5vw,42px)] font-extrabold tracking-[-0.02em]">Les apps à tester</h2>
            </div>
            <span className="text-[#0A0A0A]/30 text-sm font-mono hidden md:block">{tests.length} programmes</span>
          </div>
          <div className="apps-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((t) => (
              <div key={t.id} className="app-card group rounded-3xl border border-[#0A0A0A]/10 bg-white overflow-hidden hover:border-[#FF4500]/40 hover:shadow-xl transition">
                <div className="relative h-40 overflow-hidden" style={{ background: `${t.color}1a` }}>
                  {t.cover && (
                    <img src={t.cover} alt={t.app} loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 right-3"><StatusBadge status={t.status} /></div>
                  <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-2xl grid place-items-center bg-white shadow-md" style={{ color: t.color }}>
                    <Icon name={t.icon || appIcon(t.app)} size={22} />
                  </div>
                </div>
                <div className="p-6 pt-8">
                  <h3 className="font-extrabold text-lg">{t.app}</h3>
                  <p className="text-[#0A0A0A]/50 text-[13px] mt-1">{t.tag} · {t.platform}</p>
                  <p className="text-[#0A0A0A]/60 text-sm mt-3 leading-relaxed line-clamp-2">{t.description}</p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#0A0A0A]/8">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#0A0A0A]/45"><Icon name="gift" size={14} /> {t.reward} pts</span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#0A0A0A]/45"><Icon name="users" size={14} /> {t.participants}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉCOMPENSES ── */}
      <section id="recompenses" className="max-w-[1120px] mx-auto px-5 py-16 md:py-24">
        <div className="lp-reveal text-center mb-12">
          <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.3em] uppercase mb-3">◆ Vos avantages</p>
          <h2 className="text-[clamp(28px,5vw,48px)] font-extrabold tracking-[-0.02em]">Pourquoi devenir testeur ?</h2>
          <p className="text-[#0A0A0A]/50 max-w-xl mx-auto mt-4">
            Le programme récompense chaque contribution. Plus vous testez, plus vous gagnez.
          </p>
        </div>
        <div className="lp-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="lp-reveal rounded-[32px] p-10 md:p-16 text-center text-white relative overflow-hidden"
          style={{ background: "linear-gradient(140deg,#FF4500,#ff7a3d)" }}>
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10" />
          <h2 className="text-[clamp(28px,5vw,52px)] font-extrabold tracking-[-0.02em] relative">Prêt à tester le futur ?</h2>
          <p className="text-white/80 max-w-md mx-auto mt-4 relative">
            Créez votre compte testeur en 2 minutes et rejoignez la communauté Buyticle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 relative">
            <Btn to="/testers/register" className="!bg-white !text-[#0A0A0A] hover:!bg-[#0A0A0A] hover:!text-white">Devenir testeur</Btn>
            <Link to="/testers/register"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
              <WhatsAppIcon size={16} /> Rejoindre le groupe WhatsApp
            </Link>
          </div>
          <p className="text-white/60 text-xs mt-4 relative">
            Le groupe est réservé aux testeurs inscrits — l'accès vous sera donné après votre inscription.
          </p>
          <p className="text-white/60 text-xs mt-2 relative">
            Déjà membre ? <Link to="/testers/login" className="underline">Se connecter</Link>
          </p>
        </div>
      </section>

      <footer className="border-t border-[#0A0A0A]/8 py-8">
        <div className="max-w-[1120px] mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#0A0A0A]/40">
          <span>BUYTICLE · Programme Testeurs · Douala, Cameroun · Est. 2025</span>
          <div className="flex items-center gap-5">
            <a href={`https://wa.me/${WHATSAPP_SUPPORT}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[#128C4A] hover:underline">
              <WhatsAppIcon size={14} /> Service client
            </a>
            <Link to="/testers/register" className="hover:text-[#0A0A0A] transition">Rejoindre le programme</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
