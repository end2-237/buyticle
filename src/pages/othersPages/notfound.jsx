export default function NotFoundPage() {
  return (
    <div className="bg-[#080808] text-white min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[clamp(200px,40vw,400px)] font-black text-white/[0.02] leading-none tracking-tighter">
          404
        </span>
      </div>

      <div className="relative z-10 text-center">
        <p className="text-[#FF4500] font-mono text-xs tracking-[0.4em] uppercase mb-8">
          ✦ Page introuvable
        </p>
        <h1 className="text-[clamp(48px,8vw,100px)] font-black tracking-tighter leading-none mb-8">
          Oops.
        </h1>
        <p className="text-gray-500 text-base mb-12 max-w-sm mx-auto leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-3 bg-[#FF4500] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white hover:text-black transition-all duration-300 group"
        >
          Retour à l'accueil
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>

      <p className="absolute bottom-8 text-gray-700 text-xs font-mono">
        © {new Date().getFullYear()} Buyticle
      </p>
    </div>
  );
}
