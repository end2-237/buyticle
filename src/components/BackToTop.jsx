import { useState, useEffect } from "react";
import { gsap } from "gsap";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    gsap.to(window, { scrollTo: 0, duration: 1.2, ease: "power3.inOut" });
    // fallback si ScrollToPlugin pas chargé
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Retour en haut"
      className={`fixed bottom-6 left-6 z-50 w-11 h-11 bg-[#0A0A0A] text-white rounded-lg flex items-center justify-center transition-all duration-400 hover:bg-[#FF4500] ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
