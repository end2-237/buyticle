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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const links = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "nav-glass bg-[#080808]/80 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Buyticle" className="h-10 w-auto" />
          <span className="text-white font-black text-xl tracking-tight group-hover:text-[#FF4500] transition-colors">
            BUYTICLE
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="hover-underline text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://play.google.com/apps/internaltest/4701420296100637084"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#FF4500] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Télécharger
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="nav-glass bg-[#080808]/95 border-t border-white/10 px-6 py-8 flex flex-col gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white text-lg font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://play.google.com/apps/internaltest/4701420296100637084"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#FF4500] text-white font-semibold px-6 py-3 rounded-full mt-2"
          >
            Télécharger l'app
          </a>
        </div>
      </div>
    </nav>
  );
}
