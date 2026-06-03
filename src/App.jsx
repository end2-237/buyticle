import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./nav";
import Footer from "./footer";

gsap.registerPlugin(ScrollTrigger);

/* ─── Screenshot via thum.io (free, no auth) ─── */
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

/* ─── Project card ─── */
function ProjectCard({ p, index }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="proj-card group relative block overflow-hidden rounded-2xl bg-[#D8D5D0]"
      style={{ aspectRatio: "4/3" }}
    >
      {/* Screenshot */}
      <img
        src={thumb(p.href)}
        alt={p.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400" />

      {/* Top badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-mono px-2.5 py-1 rounded-full">
          {p.type}
        </span>
      </div>

      {/* Visit icon on hover */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        <span className="text-sm">↗</span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-white/50 text-[10px] font-mono mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {p.url}
            </p>
            <h3 className="text-white text-xl font-black tracking-tight leading-none">
              {p.name}
            </h3>
          </div>
          <span className="text-white/40 font-mono text-[10px] flex-shrink-0">{p.year}</span>
        </div>
        <p className="text-white/60 text-xs mt-2 max-h-0 group-hover:max-h-12 overflow-hidden transition-all duration-500 leading-relaxed">
          {p.desc}
        </p>
      </div>
    </a>
  );
}

export default function App() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const tagRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(tagRef.current, { opacity: 0, y: 10, duration: 0.5 })
        .from(line1Ref.current, { y: "110%", duration: 1 }, "-=0.2")
        .from(line2Ref.current, { y: "110%", duration: 1 }, "-=0.8")
        .from(subRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.5");

      gsap.from(".proj-card", {
        opacity: 0, y: 60, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-section", start: "top 75%" },
      });

      gsap.from(".svc-row", {
        opacity: 0, x: -40, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: ".svc-section", start: "top 78%" },
      });

      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 40, duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-[#EDECEA] text-[#0A0A0A] overflow-x-hidden selection:bg-[#0A0A0A] selection:text-[#EDECEA]">

      <Navigation />

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 pt-28 pb-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full">

          <p ref={tagRef} className="text-[#0A0A0A]/40 font-mono text-[11px] tracking-[0.4em] uppercase mb-8">
            Agence digitale · Cameroun · est. 2023
          </p>

          <div className="overflow-hidden leading-none">
            <h1 ref={line1Ref}
              className="text-[clamp(72px,13vw,200px)] font-black tracking-[-0.03em] leading-[0.88]"
            >
              BUYTICLE
            </h1>
          </div>
          <div className="overflow-hidden leading-none">
            <p ref={line2Ref}
              className="text-[clamp(18px,3.5vw,56px)] font-black tracking-[-0.02em] text-[#0A0A0A]/25 mt-3 leading-none"
            >
              Tech · Design · Commerce
            </p>
          </div>

          <div ref={subRef} className="flex flex-col md:flex-row md:items-end justify-between gap-10 mt-16">
            <p className="text-[#0A0A0A]/50 text-sm md:text-base max-w-sm leading-relaxed">
              Nous concevons des expériences numériques, développons des plateformes et accompagnons les entreprises dans leur transformation digitale.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#projets"
                className="group flex items-center gap-3 bg-[#0A0A0A] text-[#EDECEA] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#FF4500] transition-colors duration-300"
              >
                Voir nos projets
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="/contact"
                className="flex items-center gap-3 border border-[#0A0A0A]/20 text-[#0A0A0A]/60 px-8 py-3.5 rounded-full text-sm font-semibold hover:border-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-all duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 right-14 hidden md:flex flex-col items-center gap-2 text-[#0A0A0A]/25">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#0A0A0A]/25 to-transparent" />
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div className="border-y border-[#0A0A0A]/10 py-4 overflow-hidden bg-[#E8E5E1]">
        <div className="marquee-track">
          {[...tape, ...tape].map((t, i) => (
            <span key={i} className="flex-shrink-0 text-[#0A0A0A]/30 text-[11px] font-mono tracking-[0.35em] uppercase">
              {t}&nbsp;&nbsp;<span className="text-[#0A0A0A]/20">✦</span>&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ STATEMENT ══════════ */}
      <section className="py-28 px-6 md:px-14 border-b border-[#0A0A0A]/10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <span className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase">À propos</span>
          </div>
          <div className="md:col-span-10 reveal-up">
            <p className="text-[clamp(20px,3vw,46px)] font-black leading-[1.15] tracking-tight">
              Buyticle est une agence camerounaise spécialisée dans le développement de produits digitaux, la prestation de services informatiques et le commerce général.{" "}
              <span className="text-[#0A0A0A]/30">
                Nous construisons des outils qui simplifient la vie des entreprises et des particuliers.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ PROJETS ══════════ */}
      <section id="projets" className="proj-section py-24 px-6 md:px-14">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-6 reveal-up">
            <p className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-4">Réalisations</p>
            <h2 className="text-[clamp(48px,8vw,120px)] font-black tracking-[-0.03em] leading-none">
              PROJETS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
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
              <div key={i} className="svc-row group grid md:grid-cols-12 gap-6 py-6 hover:bg-[#0A0A0A]/[0.03] -mx-4 px-4 rounded-xl transition-colors duration-200 cursor-default">
                <div className="md:col-span-1">
                  <span className="text-[#0A0A0A]/30 font-mono text-[10px]">{s.num}</span>
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

      {/* ══════════ STATS ══════════ */}
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
                <div className="text-[#0A0A0A]/40 text-xs font-mono tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
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
