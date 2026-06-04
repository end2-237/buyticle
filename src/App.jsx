import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./nav";
import Footer from "./footer";
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
      <section className="relative pt-36 pb-0 px-6 md:px-14 text-center overflow-hidden">

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
        <div ref={heroBadgeRef} className="flex items-center justify-center gap-2 mt-6 mb-12">
          <span className="text-[#0A0A0A]/40 text-sm font-mono tracking-wide">Informatique</span>
          <span className="text-[#0A0A0A]/20">·</span>
          <span className="text-[#0A0A0A]/40 text-sm font-mono tracking-wide">Design</span>
          <span className="text-[#0A0A0A]/20">·</span>
          <span className="text-[#0A0A0A]/40 text-sm font-mono tracking-wide">Commerce</span>
          <span className="text-[#0A0A0A]/20">·</span>
          <span className="text-[#0A0A0A]/40 text-sm font-mono tracking-wide">Douala 🇨🇲</span>
        </div>

        {/* Featured image — full width, fills bottom of hero */}
        <div
          ref={heroImgRef}
          className="relative w-full overflow-hidden rounded-t-2xl"
          style={{ maxHeight: "75vh" }}
        >
          <img
            src="/hero-brand.jpg"
            alt="Buyticle Brand"
            className="w-full h-full object-cover"
            style={{ minHeight: "400px", maxHeight: "75vh" }}
            onError={(e) => {
              // Fallback gradient if image not yet added
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.style.background =
                "linear-gradient(135deg, #FF4500 0%, #FF6B35 40%, #FF8C5A 100%)";
              e.currentTarget.parentElement.style.minHeight = "400px";
              e.currentTarget.parentElement.innerHTML += `
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;">
                  <p style="font-family:monospace;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.7">
                    Ajoutez public/hero-brand.jpg
                  </p>
                </div>`;
            }}
          />
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
          STATS
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-14 border-b border-[#0A0A0A]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-up">
            {[
              { n: "04", label: "Produits lancés" },
              { n: "3+", label: "Années d'expérience" },
              { n: "50+", label: "Clients accompagnés" },
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
    </div>
  );
}
