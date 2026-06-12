import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./nav";
import Footer from "./footer";
import BackToTop from "./components/BackToTop";
import FloatingBar from "./components/FloatingBar";
import logo from "./assets/buylogo2.png";

gsap.registerPlugin(ScrollTrigger);

/* ─── Screenshot via thum.io ─── */
const thumb = (url) =>
  `https://image.thum.io/get/width/1200/crop/900/noanimate/${url}`;

const projects = [
  {
    num: "001",
    name: "One Freestyle",
    url: "onefreestyle.store",
    href: "https://www.onefreestyle.store/",
    type: "E-commerce · Design",
    year: "2024",
    desc: "Boutique en ligne spécialisée dans le sport et le lifestyle freestyle.",
  },
  {
    num: "002",
    name: "Obli Space",
    url: "obli.space",
    href: "https://obli.space/",
    type: "SaaS · Web App",
    year: "2024",
    desc: "Plateforme digitale innovante pour la gestion et l'organisation d'espaces.",
  },
  {
    num: "003",
    name: "Eetra",
    url: "eetra.buyticle.com",
    href: "https://eetra.buyticle.com/",
    type: "Marketplace · Mobile",
    year: "2025",
    desc: "Marketplace Buyticle — achat et vente de produits locaux en toute simplicité.",
  },
  {
    num: "004",
    name: "Camille",
    url: "camille.vps.buyticle.com",
    href: "https://camille.vps.buyticle.com/",
    type: "Web · Vitrine",
    year: "2025",
    desc: "Site vitrine élégant hébergé sur l'infrastructure VPS de Buyticle.",
  },
];

const services = [
  { num: "01", label: "Développement Web & Mobile", detail: "Applications sur mesure, SaaS, e-commerce, APIs." },
  { num: "02", label: "Design UI/UX", detail: "Identité visuelle, interfaces, expérience utilisateur." },
  { num: "03", label: "Infogérance & Cloud", detail: "Hébergement VPS, maintenance, monitoring 24/7." },
  { num: "04", label: "Commerce Général", detail: "Distribution, logistique, gestion de produits physiques." },
  { num: "05", label: "Prestation & Conseil", detail: "Accompagnement stratégique, intégration, formation." },
];

const tape = [
  "Informatique", "Design", "Commerce", "Web Dev", "UI/UX",
  "Cloud", "Cameroun", "Agence", "Mobile", "SaaS", "Infogérance", "Prestation",
];

/* ─── Agency-style project card (awwwards directory) ─── */
function AgencyCard({ p }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="proj-card group block bg-[#1C1C1C] rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-400"
    >
      {/* Top row: logo + screenshot */}
      <div className="flex items-start gap-4 p-5 pb-0">
        {/* Logo circle */}
        <div className="w-12 h-12 rounded-full bg-[#FF4500] flex items-center justify-center flex-shrink-0 text-white font-black text-sm">
          {p.name.charAt(0)}
        </div>
        {/* Screenshot thumbnail */}
        <div className="flex-1 rounded-xl overflow-hidden bg-[#2a2a2a]" style={{ aspectRatio: "16/10" }}>
          <img
            src={thumb(p.href)}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-cover object-top"
            onError={(e) => { e.currentTarget.parentElement.style.background = "#2a2a2a"; e.currentTarget.style.display = "none"; }}
          />
        </div>
      </div>

      {/* Dots (carousel indicator style) */}
      <div className="flex items-center gap-1.5 px-5 pt-4">
        <span className="w-2 h-2 rounded-full bg-white/70" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
      </div>

      {/* Info */}
      <div className="px-5 pt-3 pb-5">
        <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-1">Cameroun</p>
        <div className="flex items-end justify-between gap-4 mb-2">
          <h3 className="text-white text-2xl font-black tracking-tight leading-none group-hover:text-[#FF4500] transition-colors duration-300">
            {p.name}
          </h3>
          <div className="border border-white/20 rounded-lg px-3 py-1.5 text-center flex-shrink-0">
            <p className="text-white/40 text-[9px] font-mono uppercase tracking-wider leading-none">Type</p>
            <p className="text-white text-sm font-bold leading-tight mt-0.5">{p.year}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-white/35 text-xs font-mono">{p.url}</span>
          <span className="text-white/35 text-xs font-mono">{p.type.split(" · ")[0]}</span>
        </div>
      </div>
    </a>
  );
}

export default function App() {
  const heroTagRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Awwwards-style hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(heroTagRef.current, { opacity: 0, y: 10, duration: 0.5 })
        .from(heroTitleRef.current, { y: "105%", duration: 1.1 }, "-=0.2")
        .from(heroBadgeRef.current, { opacity: 0, y: 12, duration: 0.6 }, "-=0.5")
        .from(heroImgRef.current, { opacity: 0, y: 30, duration: 0.9, ease: "power3.out" }, "-=0.3");

      // Hero image → fullscreen pin + zoom
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-zoom",
          start: "top top",
          end: "+=140%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      })
        .to(".zoom-wrap", { width: "100vw", height: "100vh", borderRadius: 0 })
        .to(".zoom-img", { scale: 1 }, "<")
        .to(".zoom-overlay", { opacity: 1 }, "<0.25")
        .to(".zoom-text", { opacity: 1, y: 0, ease: "power2.out" }, "<0.3");

      // Manifesto: word-by-word reveal (teal section)
      gsap.to(".m-word", {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 75%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Giant outline word drifts horizontally
      gsap.to(".drift-word", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: ".immersion", start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // Immersion cards rise
      gsap.from(".imm-card", {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".imm-card", start: "top 85%" },
      });

      // Project cards
      gsap.from(".proj-card", {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-section", start: "top 78%" },
      });

      // Services
      gsap.from(".svc-row", {
        opacity: 0, x: -30, stagger: 0.09, duration: 0.6,
        scrollTrigger: { trigger: ".svc-section", start: "top 78%" },
      });

      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 40, duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#EDECEA] text-[#0A0A0A] overflow-x-hidden selection:bg-[#0A0A0A] selection:text-[#EDECEA]">
      <Navigation />

      {/* ══════════════════════════════════════
          HERO — awwwards style (centered)
      ══════════════════════════════════════ */}
      <section className="relative pt-32 pb-0 px-6 md:px-14 text-center overflow-hidden">

        {/* Tag line — like "Site of the Day | Jun 3, 2026 | Score 7.23 of 10" */}
        <div ref={heroTagRef} className="flex items-center justify-center gap-3 mb-8">
          <span className="text-[#0A0A0A]/40 text-sm">Agence Digitale</span>
          <span className="border border-[#0A0A0A]/20 text-[#0A0A0A] text-sm px-3 py-0.5 rounded font-medium">
            Douala
          </span>
          <span className="text-[#0A0A0A]/40 text-sm">Est. 2025</span>
        </div>

        {/* Massive centered title */}
        <div className="overflow-hidden">
          <h1
            ref={heroTitleRef}
            className="text-[clamp(80px,16vw,240px)] font-black tracking-[-0.04em] leading-[0.85]"
          >
            BUYTICLE
          </h1>
        </div>

        {/* Tagline badge */}
        <div ref={heroBadgeRef} className="flex items-center justify-center gap-2 mt-4 mb-4">
          <span className="text-[#0A0A0A]/40 text-sm font-mono tracking-wide">Informatique</span>
          <span className="text-[#0A0A0A]/20">·</span>
          <span className="text-[#0A0A0A]/40 text-sm font-mono tracking-wide">Design</span>
          <span className="text-[#0A0A0A]/20">·</span>
          <span className="text-[#0A0A0A]/40 text-sm font-mono tracking-wide">Commerce</span>
          <span className="text-[#0A0A0A]/20">·</span>
          <span className="text-[#0A0A0A]/40 text-sm font-mono tracking-wide">Douala 🇨🇲</span>
        </div>

      </section>

      {/* ══════════════════════════════════════
          HERO ZOOM — image expands to fullscreen on scroll
      ══════════════════════════════════════ */}
      <section className="hero-zoom relative h-screen overflow-hidden flex items-center justify-center">
        <div
          ref={heroImgRef}
          className="zoom-wrap relative overflow-hidden rounded-2xl"
          style={{ width: "86vw", height: "64vh" }}
        >
          <img
            src="/hero-brand.jpg"
            alt="Buyticle Brand"
            className="zoom-img w-full h-full object-cover"
            style={{ transform: "scale(1.15)" }}
          />
          {/* Darkening overlay revealed while expanding */}
          <div className="zoom-overlay absolute inset-0 bg-[#0A0A0A]/45 opacity-0" />

          {/* Text inside the image */}
          <div className="zoom-text absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0" style={{ transform: "translateY(40px)" }}>
            <p className="text-white/60 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6">
              ✦ Depuis Douala, pour le monde
            </p>
            <h2 className="text-white text-[clamp(36px,7vw,110px)] font-black tracking-[-0.03em] leading-[0.92]">
              On construit le<br />
              <span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>digital africain</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base max-w-md mt-8 leading-relaxed">
              Des produits pensés, designés et développés au Cameroun — utilisés chaque jour par des milliers de personnes.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          IMMERSION — complementary teal tone
      ══════════════════════════════════════ */}
      <section className="immersion relative bg-[#0E3331] text-[#EDECEA] overflow-hidden">
        {/* Giant parallax outline word */}
        <div className="pointer-events-none select-none absolute top-10 left-0 whitespace-nowrap">
          <span
            className="drift-word inline-block text-[clamp(90px,18vw,280px)] font-black tracking-[-0.04em] leading-none opacity-[0.07]"
            style={{ WebkitTextStroke: "2px #EDECEA", color: "transparent" }}
          >
            CRÉATIVITÉ · TECHNOLOGIE · CRÉATIVITÉ · TECHNOLOGIE
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-40 relative z-10">
          <p className="text-[#7FD1C0]/70 font-mono text-[10px] tracking-[0.4em] uppercase mb-12">✦ Manifesto</p>

          {/* Word-by-word scroll reveal */}
          <p className="manifesto text-[clamp(26px,4.2vw,64px)] font-black leading-[1.12] tracking-tight max-w-5xl">
            {"Chaque pixel, chaque ligne de code, chaque produit que nous livrons porte une ambition : prouver que l'excellence digitale se fabrique aussi ici."
              .split(" ")
              .map((w, i) => (
                <span key={i} className="m-word inline-block mr-[0.28em] opacity-20">{w}</span>
              ))}
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-28">
            {[
              { t: "Vision", d: "Faire du Cameroun un hub de produits digitaux reconnus à l'international." },
              { t: "Méthode", d: "Design d'abord, itérations rapides, obsession du détail et de la performance." },
              { t: "Impact", d: "Des outils concrets qui servent les commerçants, créateurs et entreprises locales." },
            ].map((b, i) => (
              <div key={i} className="imm-card border-t border-[#EDECEA]/15 pt-6">
                <p className="text-[#7FD1C0] font-mono text-[10px] tracking-[0.35em] uppercase mb-4">0{i + 1} — {b.t}</p>
                <p className="text-[#EDECEA]/55 text-sm leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════ */}
      <div className="border-y border-[#0A0A0A]/10 py-4 overflow-hidden bg-[#E8E5E1]">
        <div className="marquee-track">
          {[...tape, ...tape].map((t, i) => (
            <span key={i} className="flex-shrink-0 text-[#0A0A0A]/30 text-[11px] font-mono tracking-[0.35em] uppercase">
              {t}&nbsp;&nbsp;<span className="text-[#0A0A0A]/20">✦</span>&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          STATEMENT
      ══════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-14 border-b border-[#0A0A0A]/10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <span className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase">À propos</span>
          </div>
          <div className="md:col-span-10 reveal-up">
            <p className="text-[clamp(20px,3vw,46px)] font-black leading-[1.15] tracking-tight">
              Buyticle est une agence camerounaise spécialisée dans le développement de produits digitaux, la prestation de services informatiques et le commerce général.{" "}
              <span className="text-[#0A0A0A]/25">
                Nous construisons des outils qui simplifient la vie des entreprises et des particuliers.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROJETS — awwwards directory style
      ══════════════════════════════════════ */}
      <section id="projets" className="proj-section py-24 px-6 md:px-14 bg-[#141414]">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <div className="flex items-end justify-between mb-10 reveal-up">
            <div>
              <p className="text-white/30 font-mono text-[10px] tracking-[0.4em] uppercase mb-4">Réalisations</p>
              <h2 className="text-[clamp(40px,7vw,96px)] font-black tracking-[-0.03em] leading-none text-white">
                PROJETS
              </h2>
            </div>
            <span className="text-white/15 font-mono text-sm hidden md:block">
              {projects.length.toString().padStart(2, "0")} projets
            </span>
          </div>

          {/* Cards grid — awwwards directory layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <AgencyCard key={i} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section className="svc-section py-28 px-6 md:px-14 bg-[#E8E5E1] border-y border-[#0A0A0A]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-16 reveal-up">
            <div className="md:col-span-2 pt-1">
              <span className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase">Services</span>
            </div>
            <div className="md:col-span-7">
              <h2 className="text-[clamp(36px,5.5vw,80px)] font-black tracking-[-0.03em] leading-none">
                Ce qu'on fait
              </h2>
            </div>
          </div>

          <div className="divide-y divide-[#0A0A0A]/10">
            {services.map((s, i) => (
              <div key={i}
                className="svc-row group grid md:grid-cols-12 gap-6 py-7 hover:bg-[#0A0A0A]/[0.03] -mx-4 px-4 rounded-xl transition-colors duration-200 cursor-default"
              >
                <div className="md:col-span-1">
                  <span className="text-[#0A0A0A]/25 font-mono text-[10px]">{s.num}</span>
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-bold text-base md:text-lg tracking-tight group-hover:text-[#FF4500] transition-colors duration-300">
                    {s.label}
                  </h3>
                </div>
                <div className="md:col-span-4 flex items-center">
                  <p className="text-[#0A0A0A]/40 text-sm">{s.detail}</p>
                </div>
                <div className="md:col-span-1 flex items-center justify-end">
                  <span className="text-[#0A0A0A]/15 group-hover:text-[#FF4500] group-hover:translate-x-1 transition-all duration-300 text-sm">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CLIENTS
      ══════════════════════════════════════ */}
      <section id="apropos" className="py-28 px-6 md:px-14 border-b border-[#0A0A0A]/10 bg-[#EDECEA]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-16 reveal-up">
            <div className="md:col-span-2 pt-1">
              <span className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase">Clients</span>
            </div>
            <div className="md:col-span-7">
              <h2 className="text-[clamp(36px,5.5vw,80px)] font-black tracking-[-0.03em] leading-none">
                Ils nous font<br />
                <span style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}>confiance</span>
              </h2>
            </div>
          </div>

          {/* Client logos grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#0A0A0A]/10 border border-[#0A0A0A]/10 rounded-2xl overflow-hidden reveal-up">
            {[
              { name: "One Freestyle", sector: "E-commerce · Sport",    init: "OF", color: "#FF4500", href: "https://www.onefreestyle.store/" },
              { name: "Obli Space",    sector: "SaaS · Productivité",   init: "OS", color: "#0A0A0A", href: "https://obli.space/" },
              { name: "Eetra",         sector: "Marketplace · Local",   init: "EE", color: "#FF6B35", href: "https://eetra.buyticle.com/" },
              { name: "Camille",       sector: "Vitrine · Beauté",      init: "CA", color: "#8B7355", href: "https://camille.vps.buyticle.com/" },
              { name: "No Limit CM",   sector: "Web · Communication",   init: "NL", color: "#1A1A2E", href: "https://nolimitcm.com/" },
              { name: "Chimicam",      sector: "Industrie · Savon Pakeh", init: "CH", color: "#2E7D32", href: null },
              { name: "LFD Services",  sector: "Services · BTP",        init: "LF", color: "#1565C0", href: "https://lfdservices.com/" },
              { name: "Votre projet",  sector: "Bientôt ici",           init: "+",  color: "#FF4500", href: "/contact" },
            ].map((c, i) => {
              const Wrapper = c.href ? "a" : "div";
              const wrapperProps = c.href
                ? { href: c.href, target: c.href.startsWith("http") ? "_blank" : undefined, rel: c.href.startsWith("http") ? "noopener noreferrer" : undefined }
                : {};
              return (
                <Wrapper key={i} {...wrapperProps}
                  className="group bg-[#EDECEA] p-6 md:p-8 flex flex-col gap-4 hover:bg-[#F5F2EF] transition-colors duration-200"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.init}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm tracking-tight text-[#0A0A0A] group-hover:text-[#FF4500] transition-colors duration-200">{c.name}</p>
                    <p className="text-[#0A0A0A]/35 text-[10px] font-mono mt-1">{c.sector}</p>
                  </div>
                  {c.href && (
                    <span className="text-[#0A0A0A]/20 group-hover:text-[#FF4500] text-[10px] font-mono tracking-wider uppercase transition-colors duration-200">
                      {c.name === "Votre projet" ? "Nous rejoindre →" : "Voir →"}
                    </span>
                  )}
                </Wrapper>
              );
            })}
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 reveal-up">
            {[
              { n: "04",   label: "Produits lancés" },
              { n: "2025", label: "Année de création" },
              { n: "50+",  label: "Clients accompagnés" },
              { n: "100%", label: "Made in Cameroun" },
            ].map((s, i) => (
              <div key={i} className="group">
                <div className="text-[clamp(48px,6vw,88px)] font-black tracking-[-0.04em] leading-none mb-2 group-hover:text-[#FF4500] transition-colors duration-400">
                  {s.n}
                </div>
                <div className="text-[#0A0A0A]/35 text-xs font-mono tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RENDEZ-VOUS (WhatsApp)
      ══════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-14 border-b border-[#0A0A0A]/10 bg-[#141414]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <div className="reveal-up">
              <p className="text-white/30 font-mono text-[10px] tracking-[0.4em] uppercase mb-6">✦ Rendez-vous</p>
              <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.03em] leading-[0.9] text-white mb-6">
                Parlons de<br />
                <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)", color: "transparent" }}>votre projet</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-md">
                Réservez un créneau directement via WhatsApp — réponse garantie en moins de 24h.
                Consultation gratuite pour tout nouveau projet.
              </p>

              {/* Info pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                {["Consultation gratuite", "Réponse &lt; 24h", "Douala · Cameroun"].map((tag, i) => (
                  <span key={i} className="border border-white/15 text-white/40 text-[10px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full"
                    dangerouslySetInnerHTML={{ __html: tag }}
                  />
                ))}
              </div>
            </div>

            {/* Right: CTA card */}
            <div className="reveal-up">
              <div className="bg-[#1C1C1C] rounded-2xl p-8 border border-white/[0.06]">
                {/* WhatsApp block */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    {/* WhatsApp icon */}
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-1">WhatsApp direct</p>
                    <p className="text-white font-bold text-lg tracking-tight">+237 696 995 879</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-4 mb-8 border-t border-white/[0.06] pt-6">
                  {[
                    { step: "01", text: "Décrivez brièvement votre projet" },
                    { step: "02", text: "On fixe un créneau selon vos disponibilités" },
                    { step: "03", text: "Consultation gratuite de 30 min" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="text-[#FF4500] font-mono text-[10px] mt-0.5 flex-shrink-0">{item.step}</span>
                      <p className="text-white/50 text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/237696995879?text=Bonjour%20Buyticle%2C%20je%20souhaite%20prendre%20rendez-vous%20pour%20discuter%20d%27un%20projet."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm px-6 py-4 rounded-xl transition-colors duration-200 group"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Prendre rendez-vous
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </a>
                  <a href="/contact"
                    className="flex items-center justify-center gap-2 border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium px-6 py-3.5 rounded-xl transition-all duration-200"
                  >
                    Formulaire de contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="py-36 px-6 md:px-14 overflow-hidden">
        <div className="max-w-[1400px] mx-auto reveal-up">
          <p className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-8">
            Travaillons ensemble
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <h2 className="text-[clamp(52px,10vw,150px)] font-black tracking-[-0.03em] leading-[0.88]">
              Démarrons<br />
              <span style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}>
                un projet
              </span>
            </h2>
            <div className="flex flex-col gap-5 md:pb-4">
              <a href="mailto:contact@buyticle.com"
                className="text-[#0A0A0A]/50 hover:text-[#0A0A0A] text-sm font-mono underline-offset-4 hover:underline transition-colors"
              >
                contact@buyticle.com
              </a>
              <a href="mailto:support@buyticle.com"
                className="text-[#0A0A0A]/50 hover:text-[#0A0A0A] text-sm font-mono underline-offset-4 hover:underline transition-colors"
              >
                support@buyticle.com
              </a>
              <a href="/contact"
                className="group mt-3 inline-flex items-center gap-3 bg-[#0A0A0A] text-[#EDECEA] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#FF4500] transition-colors duration-300 w-fit"
              >
                Envoyer un message
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
      <FloatingBar />
    </div>
  );
}
