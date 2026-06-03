export default function NotFoundPage() {
  return (
    <div className="bg-[#EDECEA] text-[#0A0A0A] min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[clamp(180px,38vw,380px)] font-black text-[#0A0A0A]/[0.04] leading-none tracking-tighter">
          404
        </span>
      </div>
      <div className="relative z-10 text-center">
        <p className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-8">Page introuvable</p>
        <h1 className="text-[clamp(48px,8vw,100px)] font-black tracking-[-0.03em] leading-none mb-8">Oops.</h1>
        <p className="text-[#0A0A0A]/50 text-sm mb-12 max-w-xs mx-auto leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <a href="/"
          className="inline-flex items-center gap-3 bg-[#0A0A0A] text-[#EDECEA] px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#FF4500] transition-colors duration-300 group"
        >
          Retour à l'accueil
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>
      <p className="absolute bottom-8 text-[#0A0A0A]/20 text-[11px] font-mono">
        © {new Date().getFullYear()} Buyticle
      </p>
    </div>
  );
}
