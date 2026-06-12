import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "./assets/buylogo2.png";

/* ─── Mega dropdown data ─── */
const megaCategories = [
  {
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    label: "Réalisations",
  },
  {
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    label: "Services",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    label: "À propos",
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    label: "Contact",
  },
];

const megaLinks = [
  { label: "One Freestyle", count: "E-commerce", href: "https://www.onefreestyle.store/", badge: null },
  { label: "Obli Space",    count: "SaaS",       href: "https://obli.space/",             badge: null },
  { label: "Eetra",         count: "Marketplace", href: "https://eetra.buyticle.com/",    badge: "New" },
  { label: "Camille",       count: "Vitrine",     href: "https://camille.vps.buyticle.com/", badge: null },
  { label: "Développement", count: null,           href: "/services",                      badge: null },
  { label: "Design UI/UX",  count: null,           href: "/services",                      badge: null },
  { label: "Cloud & VPS",   count: null,           href: "/services",                      badge: "New" },
  { label: "Nous contacter",count: null,           href: "/contact",                       badge: null },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const navRef    = useRef(null);
  const phraseRef = useRef(null);
  const brandRef  = useRef(null);
  const dropRef   = useRef(null);

  useEffect(() => {
    gsap.from(navRef.current, { opacity: 0, y: -12, duration: 0.8, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const is = window.scrollY > 80;
      if (is !== scrolled) setScrolled(is);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  // Close explore on outside click
  useEffect(() => {
    if (!exploreOpen) return;
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setExploreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [exploreOpen]);

  // Phrase ↔ BUYTICLE animation
  useEffect(() => {
    if (!phraseRef.current || !brandRef.current) return;
    if (scrolled) {
      gsap.to(phraseRef.current, { y: -16, opacity: 0, duration: 0.35, ease: "power2.in" });
      gsap.fromTo(brandRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1 });
    } else {
      gsap.to(brandRef.current, { y: 16, opacity: 0, duration: 0.35, ease: "power2.in" });
      gsap.fromTo(phraseRef.current, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1 });
    }
  }, [scrolled]);

  const links = [
    { label: "Projets",  href: "/#projets" },
    { label: "Services", href: "/services", badge: null },
    { label: "Eetra",    href: "https://eetra.buyticle.com/", badge: "New", external: true },
    { label: "Contact",  href: "/contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || exploreOpen
            ? "bg-[#EDECEA]/95 backdrop-blur-xl border-b border-[#0A0A0A]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-5 flex items-center justify-between">

          {/* Logo + animated label */}
          <a href="/" className="flex items-center gap-3 group z-10 flex-shrink-0">
            <img src={logo} alt="Buyticle" className={`h-9 w-auto flex-shrink-0 group-hover:opacity-75 transition-opacity duration-200 ${scrolled || exploreOpen ? "" : "brightness-0 invert"}`} />
            <div className="relative overflow-hidden h-6 hidden md:block" style={{ minWidth: "185px" }}>
              <span ref={phraseRef} className={`absolute inset-0 flex items-center text-xs font-mono tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 ${scrolled || exploreOpen ? "text-[#0A0A0A]/40" : "text-white/70"}`}>
                Agence digitale · Douala
              </span>
              <span ref={brandRef} className={`absolute inset-0 flex items-center font-black text-base tracking-tight whitespace-nowrap opacity-0 transition-colors duration-300 ${scrolled || exploreOpen ? "text-[#0A0A0A]" : "text-white"}`} style={{ transform: "translateY(16px)" }}>
                BUYTICLE
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div ref={dropRef} className="hidden md:flex items-center gap-1 relative">

            {/* Explorer dropdown trigger */}
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                exploreOpen
                  ? "bg-[#0A0A0A] text-[#EDECEA]"
                  : scrolled
                    ? "text-[#0A0A0A]/50 hover:text-[#0A0A0A] hover:bg-[#0A0A0A]/[0.06]"
                    : "text-white/80 hover:text-white hover:bg-white/[0.12]"
              }`}
            >
              Explorer
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${exploreOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Plain links */}
            {links.map((l) => (
              <a key={l.label} href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  scrolled || exploreOpen
                    ? "text-[#0A0A0A]/50 hover:text-[#0A0A0A] hover:bg-[#0A0A0A]/[0.06]"
                    : "text-white/80 hover:text-white hover:bg-white/[0.12]"
                }`}
              >
                {l.label}
                {l.badge && (
                  <span className="bg-[#FF4500] text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase leading-none">
                    {l.badge}
                  </span>
                )}
              </a>
            ))}

            {/* Mega dropdown */}
            <div className={`absolute top-full left-0 mt-3 w-[580px] bg-[#F5F2EF] border border-[#0A0A0A]/10 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden transition-all duration-300 origin-top ${
              exploreOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}>
              <div className="grid grid-cols-[200px_1fr]">

                {/* Left sidebar — categories */}
                <div className="bg-[#EDECEA] p-3 space-y-1">
                  {megaCategories.map((c, i) => (
                    <button key={i} onMouseEnter={() => setActiveCategory(i)} onClick={() => setActiveCategory(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-150 ${
                        activeCategory === i ? "bg-white shadow-sm text-[#0A0A0A] font-semibold" : "text-[#0A0A0A]/50 hover:bg-white/60 hover:text-[#0A0A0A]"
                      }`}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                      </svg>
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* Right content — links with counts */}
                <div className="p-4 space-y-1">
                  {megaLinks.map((l, i) => (
                    <a key={i} href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => setExploreOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#0A0A0A]/[0.04] transition-colors duration-150 group"
                    >
                      <span className="text-sm text-[#0A0A0A]/70 group-hover:text-[#0A0A0A] font-medium transition-colors flex items-center gap-2">
                        {l.label}
                        {l.badge && (
                          <span className="bg-[#FF4500] text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase leading-none">
                            {l.badge}
                          </span>
                        )}
                      </span>
                      {l.count && (
                        <span className="text-[#0A0A0A]/30 text-xs font-mono">{l.count}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: App CTA + burger */}
          <div className="flex items-center gap-3">
            <a href="https://play.google.com/apps/internaltest/4701420296100637084" target="_blank" rel="noopener noreferrer"
              className={`hidden md:flex items-center gap-2 text-xs font-mono px-5 py-2.5 rounded-full transition-all duration-300 ${
                scrolled || exploreOpen
                  ? "border border-[#0A0A0A]/20 text-[#0A0A0A]/60 hover:bg-[#0A0A0A] hover:text-[#EDECEA] hover:border-[#0A0A0A]"
                  : "border border-white/40 text-white/80 hover:bg-white hover:text-[#FF4500]"
              }`}
            >
              ↓ App Android
            </a>

            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 z-[60]" aria-label="Menu"
            >
              <span className={`block h-px transition-all duration-300 ${scrolled || menuOpen ? "bg-[#0A0A0A]" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-[7px] w-6" : "w-6"}`} />
              <span className={`block h-px transition-all duration-300 ${scrolled || menuOpen ? "bg-[#0A0A0A]" : "bg-white"} ${menuOpen ? "opacity-0 w-4" : "w-4"}`} />
              <span className={`block h-px transition-all duration-300 ${scrolled || menuOpen ? "bg-[#0A0A0A]" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-[7px] w-6" : "w-6"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div className={`fixed inset-0 z-40 bg-[#EDECEA] flex flex-col justify-center px-8 transition-all duration-500 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="space-y-6 mt-16">
          <button onClick={() => { setMenuOpen(false); }} className="block text-[clamp(36px,8vw,64px)] font-black tracking-tight text-[#0A0A0A]/70 hover:text-[#FF4500] transition-colors duration-200 leading-none">
            Explorer
          </button>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-[clamp(36px,8vw,64px)] font-black tracking-tight text-[#0A0A0A]/70 hover:text-[#FF4500] transition-colors duration-200 leading-none"
            >
              {l.label}
              {l.badge && (
                <span className="bg-[#FF4500] text-white text-xs font-bold px-2 py-1 rounded tracking-wider uppercase leading-none self-center">
                  {l.badge}
                </span>
              )}
            </a>
          ))}
        </div>
        <div className="absolute bottom-12 left-8 text-[#0A0A0A]/25 text-[10px] font-mono tracking-widest uppercase">
          Douala · Cameroun 🇨🇲 · Est. 2025
        </div>
      </div>
    </>
  );
}
