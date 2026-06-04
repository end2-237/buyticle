import { useState, useEffect } from "react";
import logo from "../assets/buylogo2.png";

const tabs = [
  { label: "Projets", href: "/#projets" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "À propos", href: "/#apropos" },
];

export default function FloatingBar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    // Appear after hero scrolled past
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 bg-[#1C1C1C] rounded-2xl px-2 py-2 shadow-2xl shadow-black/40">

        {/* Logo pill */}
        <a href="/" className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-colors duration-200 flex-shrink-0">
          <img src={logo} alt="B." className="h-6 w-auto" />
        </a>

        {/* Separator */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Tabs */}
        {tabs.map((t) => (
          <a
            key={t.label}
            href={t.href}
            onClick={() => setActive(t.label)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              active === t.label
                ? "bg-white/10 text-white"
                : "text-white/45 hover:text-white hover:bg-white/[0.07]"
            }`}
          >
            {t.label}
          </a>
        ))}

        {/* Separator */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* CTA button — yellow like awwwards "Visit Site" */}
        <a
          href="https://play.google.com/apps/internaltest/4701420296100637084"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FFE234] text-[#0A0A0A] text-sm font-bold px-5 py-2 rounded-xl hover:bg-white transition-colors duration-200 whitespace-nowrap flex-shrink-0"
        >
          ↓ App
        </a>
      </div>
    </div>
  );
}
