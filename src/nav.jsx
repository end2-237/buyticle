import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "./assets/buylogo2.png";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });

    gsap.from(navRef.current, {
      opacity: 0, y: -16, duration: 0.9, ease: "power3.out", delay: 0.1,
    });

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/[0.07]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-5 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group z-10">
            <img src={logo} alt="Buyticle" className="h-8 w-auto" />
            <span className="text-[#F0EDE8] font-black text-base tracking-tight group-hover:text-[#FF4500] transition-colors duration-300">
              BUYTICLE
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                className="hover-underline text-[#F0EDE8]/50 hover:text-[#F0EDE8] text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + burger */}
          <div className="flex items-center gap-4">
            <a
              href="https://play.google.com/apps/internaltest/4701420296100637084"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 border border-white/15 text-[#F0EDE8]/60 text-xs font-mono px-5 py-2.5 rounded-full hover:border-[#FF4500] hover:text-[#FF4500] transition-all duration-300"
            >
              ↓ App Android
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
              aria-label="Menu"
            >
              <span className={`block h-px bg-[#F0EDE8] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px] w-6" : "w-6"}`} />
              <span className={`block h-px bg-[#F0EDE8] transition-all duration-300 ${menuOpen ? "opacity-0 w-4" : "w-4"}`} />
              <span className={`block h-px bg-[#F0EDE8] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px] w-6" : "w-6"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center px-8 transition-all duration-500 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="space-y-8 mt-16">
          {links.map((l, i) => (
            <a key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-[clamp(36px,8vw,64px)] font-black tracking-tight text-[#F0EDE8]/80 hover:text-[#FF4500] transition-colors duration-200 leading-none"
              style={{ transitionDelay: menuOpen ? `${i * 0.05}s` : "0s" }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="absolute bottom-12 left-8 text-[#F0EDE8]/20 text-xs font-mono tracking-widest">
          BUYTICLE · Cameroun 🇨🇲
        </div>
      </div>
    </>
  );
}
