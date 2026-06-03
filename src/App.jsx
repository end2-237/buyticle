import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./nav";
import Footer from "./footer";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const services = [
  { num: "01", label: "Développement Web & Mobile", detail: "Applications sur mesure, SaaS, e-commerce, APIs." },
  { num: "02", label: "Design UI/UX", detail: "Identité visuelle, interfaces, expérience utilisateur." },
  { num: "03", label: "Infogérance & Cloud", detail: "Hébergement VPS, maintenance, monitoring 24/7." },
  { num: "04", label: "Commerce Général", detail: "Distribution, logistique, gestion de produits physiques." },
  { num: "05", label: "Prestation & Conseil", detail: "Accompagnement stratégique, intégration, formation." },
];

const projects = [
  {
    num: "001",
    name: "One Freestyle",
    url: "onefreestyle.store",
    href: "https://www.onefreestyle.store/",
    type: "E-commerce · Design",
    year: "2024",
    desc: "Boutique en ligne spécialisée dans le sport et le style de vie freestyle.",
    color: "#1a1a2e",
    accent: "#e94560",
  },
  {
    num: "002",
    name: "Obli Space",
    url: "obli.space",
    href: "https://obli.space/",
    type: "SaaS · Web App",
    year: "2024",
    desc: "Plateforme digitale innovante pour la gestion et l'organisation d'espaces.",
    color: "#0f3460",
    accent: "#533483",
  },
  {
    num: "003",
    name: "Eetra",
    url: "eetra.buyticle.com",
    href: "https://eetra.buyticle.com/",
    type: "Marketplace · Mobile",
    year: "2025",
    desc: "Marketplace Buyticle — achat et vente de produits locaux en toute simplicité.",
    color: "#1b1b2f",
    accent: "#FF4500",
  },
  {
    num: "004",
    name: "Camille",
    url: "camille.vps.buyticle.com",
    href: "http://camille.vps.buyticle.com/",
    type: "Web · Vitrine",
    year: "2025",
    desc: "Site vitrine élégant hébergé sur l'infrastructure VPS de Buyticle.",
    color: "#12172b",
    accent: "#00b4d8",
  },
];

const tape = [
  "Informatique", "Design", "Commerce", "Web Dev",
  "UI/UX", "Cloud", "Cameroun", "Agence", "Mobile",
  "Prestation", "SaaS", "Infogérance",
];

/* ─────────────────────────────────────────
   BROWSER MOCKUP PREVIEW
───────────────────────────────────────── */
function SitePreview({ href, color, accent }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ background: color, aspectRatio: "16/10" }}
    >
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-4 py-3"
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span
          className="ml-3 flex-1 text-[10px] font-mono text-white/40 bg-white/5 rounded px-3 py-1 truncate"
        >
          {href.replace("http://", "").replace("https://", "")}
        </span>
      </div>

      {/* Iframe scaled */}
      {!failed && (
        <div
          className="absolute inset-0 top-10"
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              width: "250%",
              height: "250%",
              transformOrigin: "top left",
              transform: "scale(0.4)",
              pointerEvents: "none",
            }}
          >
            <iframe
              src={href}
              title={href}
              loading="lazy"
              style={{ width: "100%", height: "100%", border: "none" }}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}

      {/* Placeholder if iframe blocked */}
      {(!loaded || failed) && (
        <div
          className="absolute inset-0 top-10 flex flex-col items-center justify-center gap-4"
          style={{ opacity: loaded ? 0 : 1, transition: "opacity 0.5s" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
            style={{ background: accent + "20", color: accent }}
          >
            ✦
          </div>
          <span className="text-white/30 text-xs font-mono">
            {href.replace("http://", "").replace("https://", "")}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function App() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance — staggered lines
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(line1Ref.current, { y: "110%", duration: 1.1 })
        .from(line2Ref.current, { y: "110%", duration: 1.1 }, "-=0.75")
        .from(subRef.current, { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");

      // Services list
      gsap.from(".svc-row", {
        opacity: 0, x: -50, stagger: 0.12, duration: 0.7,
        scrollTrigger: { trigger: ".svc-section", start: "top 75%" },
      });

      // Project cards
      gsap.from(".proj-card", {
        opacity: 0, y: 80, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-section", start: "top 70%" },
      });

      // Section labels
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 50, duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-[#0A0A0A] text-[#F0EDE8] overflow-x-hidden selection:bg-[#FF4500] selection:text-white">
      {/* Grain */}
      <div className="grain" aria-hidden="true" />

      <Navigation />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-14 pb-20 pt-36 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,69,0,0.08) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          {/* Tag */}
          <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.45em] uppercase mb-10">
            Agence digitale · Cameroun ✦ est. 2023
          </p>

          {/* Headline — clipped lines for reveal animation */}
          <div className="overflow-hidden leading-none">
            <h1 ref={line1Ref}
              className="text-[clamp(70px,13vw,200px)] font-black tracking-[-0.03em] leading-none"
            >
              BUYTICLE
            </h1>
          </div>
          <div className="overflow-hidden leading-none">
            <h2 ref={line2Ref}
              className="text-[clamp(24px,4.5vw,72px)] font-black tracking-[-0.02em] leading-none text-[#F0EDE8]/20 mt-2"
            >
              Tech · Design · Commerce
            </h2>
          </div>

          {/* Sub + CTA row */}
          <div ref={subRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 mt-14"
          >
            <p className="text-[#F0EDE8]/50 text-sm md:text-base max-w-sm leading-relaxed">
              Nous concevons des expériences numériques, développons des plateformes et accompagnons les entreprises dans leur transformation digitale.
            </p>
            <div ref={ctaRef} className="flex gap-4 flex-wrap">
              <a href="#projets"
                className="group flex items-center gap-3 bg-[#FF4500] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#F0EDE8] hover:text-black transition-all duration-400"
              >
                Voir nos projets
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="/contact"
                className="flex items-center gap-3 border border-white/15 text-[#F0EDE8]/60 px-8 py-4 rounded-full text-sm font-semibold hover:border-white/40 hover:text-white transition-all duration-300"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-10 right-14 hidden md:flex flex-col items-center gap-3 text-[#F0EDE8]/20">
          <span className="text-[9px] tracking-[0.4em] uppercase font-mono rotate-90 mb-8">Scroll</span>
          <div className="w-px h-20 bg-gradient-to-b from-[#F0EDE8]/20 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════ */}
      <div className="border-y border-white/[0.07] bg-[#0f0f0f] py-4 overflow-hidden">
        <div className="marquee-track">
          {[...tape, ...tape].map((t, i) => (
            <span key={i} className="flex-shrink-0 text-[#F0EDE8]/25 text-[11px] font-mono tracking-[0.35em] uppercase">
              {t}&nbsp;&nbsp;<span className="text-[#FF4500]">✦</span>&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          STATEMENT
      ══════════════════════════════════════ */}
      <section className="py-36 px-6 md:px-14 border-b border-white/[0.07]">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-2 flex items-start pt-2">
            <span className="text-[#FF4500] font-mono text-[10px] tracking-[0.4em] uppercase">À propos</span>
          </div>
          <div className="md:col-span-10 reveal-up">
            <p className="text-[clamp(22px,3.5vw,52px)] font-black leading-[1.1] tracking-tight text-[#F0EDE8]/90">
              Buyticle est une agence camerounaise spécialisée dans le développement de produits digitaux, la prestation de services informatiques et le commerce général.{" "}
              <span className="text-[#F0EDE8]/25">
                Nous construisons des outils qui simplifient la vie des entreprises et des particuliers.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROJETS / WORKS
      ══════════════════════════════════════ */}
      <section id="projets" className="proj-section py-32 px-6 md:px-14">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-20 reveal-up">
            <div>
              <p className="text-[#FF4500] font-mono text-[10px] tracking-[0.4em] uppercase mb-4">Nos réalisations</p>
              <h2 className="text-[clamp(40px,7vw,96px)] font-black tracking-[-0.03em] leading-none">
                Projets
              </h2>
            </div>
            <span className="text-[#F0EDE8]/20 font-mono text-sm hidden md:block">
              {projects.length.toString().padStart(2, "0")} projets
            </span>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-card group block relative rounded-3xl overflow-hidden border border-white/[0.07] hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ background: p.color }}
              >
                {/* Site preview */}
                <div className="p-5 pb-0">
                  <SitePreview href={p.href} color={p.color} accent={p.accent} />
                </div>

                {/* Info bar */}
                <div className="p-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[#F0EDE8]/30 font-mono text-[10px]">{p.num}</span>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                        style={{ borderColor: p.accent + "40", color: p.accent }}
                      >
                        {p.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-[#F0EDE8] group-hover:text-white transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[#F0EDE8]/40 text-xs mt-1 font-mono">{p.url}</p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#FF4500] group-hover:border-[#FF4500] transition-all duration-300"
                    style={{ borderColor: "rgba(240,237,232,0.2)", color: "rgba(240,237,232,0.5)" }}
                  >
                    ↗
                  </div>
                </div>

                {/* Hover desc */}
                <div className="px-6 pb-6 overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-500">
                  <p className="text-[#F0EDE8]/50 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section className="svc-section py-32 px-6 md:px-14 bg-[#0d0d0d] border-y border-white/[0.07]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 mb-16 reveal-up">
            <div className="md:col-span-2 pt-1">
              <p className="text-[#FF4500] font-mono text-[10px] tracking-[0.4em] uppercase">Services</p>
            </div>
            <div className="md:col-span-6">
              <h2 className="text-[clamp(36px,5.5vw,80px)] font-black tracking-[-0.03em] leading-none">
                Ce qu'on fait
              </h2>
            </div>
          </div>

          <div className="divide-y divide-white/[0.07]">
            {services.map((s, i) => (
              <div key={i}
                className="svc-row group grid md:grid-cols-12 gap-6 py-7 cursor-default hover:bg-white/[0.02] transition-colors duration-300 -mx-6 px-6 rounded-xl"
              >
                <div className="md:col-span-1">
                  <span className="text-[#FF4500] font-mono text-[10px] tracking-widest">{s.num}</span>
                </div>
                <div className="md:col-span-6">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight group-hover:text-[#FF4500] transition-colors duration-300">
                    {s.label}
                  </h3>
                </div>
                <div className="md:col-span-4 flex items-center">
                  <p className="text-[#F0EDE8]/35 text-sm">{s.detail}</p>
                </div>
                <div className="md:col-span-1 flex items-center justify-end">
                  <span className="text-[#F0EDE8]/15 group-hover:text-[#FF4500] group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-14 border-b border-white/[0.07]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-up">
            {[
              { n: "04", label: "Produits lancés" },
              { n: "3+", label: "Années d'expérience" },
              { n: "50+", label: "Clients accompagnés" },
              { n: "100%", label: "Made in Cameroun" },
            ].map((s, i) => (
              <div key={i} className="group">
                <div className="text-[clamp(48px,7vw,96px)] font-black tracking-[-0.04em] text-[#F0EDE8] leading-none mb-2 group-hover:text-[#FF4500] transition-colors duration-400">
                  {s.n}
                </div>
                <div className="text-[#F0EDE8]/30 text-xs font-mono tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════ */}
      <section className="py-40 px-6 md:px-14 overflow-hidden">
        <div className="max-w-[1400px] mx-auto reveal-up">
          <p className="text-[#FF4500] font-mono text-[10px] tracking-[0.4em] uppercase mb-8">
            Travaillons ensemble
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h2 className="text-[clamp(48px,9vw,140px)] font-black tracking-[-0.03em] leading-none">
              Démarrons
              <br />
              <span style={{ WebkitTextStroke: "1.5px rgba(240,237,232,0.3)", color: "transparent" }}>
                un projet
              </span>
            </h2>
            <div className="flex flex-col gap-5 md:pb-4">
              <a href="mailto:contact@buyticle.com"
                className="hover-underline text-[#F0EDE8]/50 hover:text-white text-sm font-mono transition-colors"
              >
                contact@buyticle.com
              </a>
              <a href="mailto:support@buyticle.com"
                className="hover-underline text-[#F0EDE8]/50 hover:text-white text-sm font-mono transition-colors"
              >
                support@buyticle.com
              </a>
              <a href="/contact"
                className="group mt-2 inline-flex items-center gap-3 bg-[#FF4500] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#F0EDE8] hover:text-black transition-all duration-400 w-fit"
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
