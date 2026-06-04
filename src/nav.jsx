import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "./assets/buylogo2.png";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    gsap.from(navRef.current, { opacity: 0, y: -12, duration: 0.8, ease: "power3.out" });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Projets", href: "/#projets" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-[#EDECEA]/90 backdrop-blur-xl border-b border-[#0A0A0A]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center group z-10">
            <img src={logo} alt="Buyticle" className="h-10 w-auto group-hover:opacity-80 transition-opacity duration-200" />
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                className="text-[#0A0A0A]/50 hover:text-[#0A0A0A] text-sm font-medium tracking-wide transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#0A0A0A] hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://play.google.com/apps/internaltest/4701420296100637084"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 border border-[#0A0A0A]/20 text-[#0A0A0A]/60 text-xs font-mono px-5 py-2.5 rounded-full hover:bg-[#0A0A0A] hover:text-[#EDECEA] hover:border-[#0A0A0A] transition-all duration-300"
            >
              ↓ App Android
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 z-[60]"
              aria-label="Menu"
            >
              <span className={`block h-px bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px] w-6" : "w-6"}`} />
              <span className={`block h-px bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "opacity-0 w-4" : "w-4"}`} />
              <span className={`block h-px bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px] w-6" : "w-6"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-[#EDECEA] flex flex-col justify-center px-8 transition-all duration-500 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="space-y-8 mt-16">
          {links.map((l, i) => (
            <a key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-[clamp(40px,9vw,72px)] font-black tracking-tight text-[#0A0A0A]/70 hover:text-[#FF4500] transition-colors duration-200 leading-none"
            >
              {l.label}
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
