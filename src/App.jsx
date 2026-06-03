import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./nav";
import Footer from "./footer";
import { subscribeToNewsletter } from "./services/NewsletterService";

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  "Marketplace", "Mobile", "Cameroun", "Achat", "Vente",
  "Livraison", "Sécurisé", "Mode", "Tech", "Beauté", "Électronique",
];

const features = [
  {
    num: "01",
    title: "Catalogue étendu",
    desc: "Explorez des milliers de produits à prix imbattables directement depuis votre mobile.",
  },
  {
    num: "02",
    title: "Paiement sécurisé",
    desc: "Mobile Money, carte bancaire — payez en toute sécurité avec notre partenaire PayUnit.",
  },
  {
    num: "03",
    title: "Communauté active",
    desc: "Rejoignez une communauté dynamique d'acheteurs et vendeurs passionnés au Cameroun.",
  },
];

const steps = [
  {
    step: "01",
    title: "Trouvez votre article",
    desc: "Parcourez notre catalogue de milliers de produits ou utilisez la recherche pour trouver exactement ce dont vous avez besoin.",
  },
  {
    step: "02",
    title: "Réservez votre achat",
    desc: "Passez votre commande en quelques secondes de manière totalement sécurisée via Mobile Money ou carte bancaire.",
  },
  {
    step: "03",
    title: "Recevez votre produit",
    desc: "Le vendeur prépare votre commande et vous la livre directement. Suivi en temps réel disponible.",
  },
];

const stats = [
  { number: "10K+", label: "Utilisateurs" },
  { number: "500+", label: "Vendeurs actifs" },
  { number: "50K+", label: "Produits listés" },
  { number: "99%", label: "Satisfaction" },
];

const faqs = [
  {
    q: "Quels modes de paiement sont acceptés ?",
    a: "Nous acceptons Mobile Money (MTN, Orange) ainsi que carte bancaire via notre partenaire PayUnit pour une sécurité maximale.",
  },
  {
    q: "Quand vais-je recevoir ma commande ?",
    a: "Les commandes locales sont généralement livrées entre 24h et 72h selon le vendeur et votre localisation.",
  },
  {
    q: "Que faire si le produit reçu ne correspond pas ?",
    a: "Ouvrez un litige dans les 48h après réception. Notre équipe vous assistera pour un échange ou remboursement.",
  },
  {
    q: "Buyticle est-il disponible partout au Cameroun ?",
    a: "Nous opérons actuellement dans les principales villes et étendons notre couverture progressivement.",
  },
];

export default function App() {
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroTagRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(heroTagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(heroTitleRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3")
      .fromTo(heroSubRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .fromTo(heroCtaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

    // Features
    gsap.fromTo(".feature-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: ".features-section", start: "top 75%" },
      }
    );

    // Steps
    gsap.fromTo(".how-step",
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.2,
        scrollTrigger: { trigger: ".steps-section", start: "top 75%" },
      }
    );

    // Stats
    gsap.fromTo(".stat-item",
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: ".stats-section", start: "top 80%" },
      }
    );

    // Section headers
    gsap.utils.toArray(".section-head").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleSubscribe = async () => {
    if (!email.trim()) return;
    const result = await subscribeToNewsletter(email);
    setStatus(result.success ? "success" : "error");
    if (result.success) setEmail("");
  };

  return (
    <div className="bg-[#080808] text-white overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      <Navigation />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-24 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-[#FF4500] opacity-[0.07] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#FF4500] opacity-[0.04] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p
            ref={heroTagRef}
            className="text-[#FF4500] font-mono text-xs tracking-[0.4em] uppercase mb-10 opacity-0"
          >
            ✦ La marketplace mobile du Cameroun
          </p>

          <h1
            ref={heroTitleRef}
            className="text-[clamp(56px,11vw,160px)] font-black leading-[0.88] tracking-tighter mb-12 opacity-0"
          >
            BUY
            <br />
            <span className="text-stroke">TICLE</span>
          </h1>

          <div
            ref={heroSubRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 opacity-0"
          >
            <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
              Achetez et vendez vos produits favoris en toute simplicité. Buyticle connecte acheteurs et vendeurs dans une expérience mobile unique.
            </p>

            <div ref={heroCtaRef} className="flex flex-wrap gap-4 opacity-0">
              <a
                href="https://play.google.com/apps/internaltest/4701420296100637084"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#FF4500] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                Télécharger l'app
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a
                href="#features"
                className="flex items-center gap-3 border border-white/20 text-white/70 px-8 py-4 rounded-full font-semibold text-sm hover:border-white hover:text-white transition-all duration-300"
              >
                Découvrir
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-700">
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Scroll</span>
          <div className="w-px h-14 bg-gradient-to-b from-gray-700 to-transparent" />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="border-y border-white/10 bg-[#0d0d0d] py-5 overflow-hidden">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-gray-600 text-xs font-mono tracking-[0.35em] uppercase flex-shrink-0">
              {item}&nbsp;&nbsp;<span className="text-[#FF4500]">✦</span>&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <section id="features" className="features-section py-40 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 section-head">
            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
              Conçu pour
              <br />
              <span className="text-[#FF4500]">l'essentiel</span>
            </h2>
            <p className="text-gray-600 max-w-xs text-sm md:text-right leading-relaxed">
              Une plateforme pensée pour simplifier le commerce mobile au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card bg-[#080808] p-10 hover:bg-[#111111] transition-colors duration-500 group cursor-default"
              >
                <span className="text-[#FF4500] font-mono text-xs tracking-widest">{f.num}</span>
                <h3 className="text-xl font-bold mt-8 mb-4 group-hover:text-[#FF4500] transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-10 h-px w-0 bg-[#FF4500] group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="steps-section py-40 px-6 md:px-16 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 section-head">
            <p className="text-[#FF4500] font-mono text-xs tracking-[0.4em] uppercase mb-6">Processus</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
              Comment ça marche
            </h2>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {steps.map((s, i) => (
              <div
                key={i}
                className="how-step flex flex-col md:flex-row md:items-center gap-8 py-12 group cursor-default"
              >
                <span className="text-[80px] md:text-[100px] font-black text-white/[0.05] group-hover:text-[#FF4500] transition-colors duration-500 leading-none select-none min-w-[160px]">
                  {s.step}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg">{s.desc}</p>
                </div>
                <span className="text-white/20 text-2xl group-hover:text-[#FF4500] group-hover:translate-x-3 transition-all duration-400 hidden md:block">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats-section py-32 px-6 md:px-16 bg-[#FF4500]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <div key={i} className="stat-item text-center">
                <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">
                  {s.number}
                </div>
                <div className="text-white/60 text-xs font-mono tracking-[0.3em] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-40 px-6 md:px-16 bg-[#080808]">
        <div className="max-w-3xl mx-auto text-center section-head">
          <p className="text-[#FF4500] font-mono text-xs tracking-[0.4em] uppercase mb-6">Newsletter</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none">
            Restez informé
          </h2>
          <p className="text-gray-500 mb-14 text-base leading-relaxed max-w-md mx-auto">
            Recevez les dernières nouveautés, offres exclusives et actualités de Buyticle directement dans votre boîte mail.
          </p>

          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="votre@email.com"
              className="flex-1 bg-white/[0.04] border border-white/15 text-white px-6 py-4 rounded-l-full text-sm outline-none focus:border-[#FF4500] transition-colors placeholder-gray-700"
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#FF4500] text-white px-8 py-4 rounded-r-full font-semibold text-sm hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
            >
              S'abonner
            </button>
          </div>

          {status === "success" && (
            <p className="mt-5 text-green-400 text-sm font-mono">✓ Merci pour votre inscription !</p>
          )}
          {status === "error" && (
            <p className="mt-5 text-red-400 text-sm font-mono">✗ Une erreur est survenue. Réessayez.</p>
          )}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-40 px-6 md:px-16 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 section-head">
            <p className="text-[#FF4500] font-mono text-xs tracking-[0.4em] uppercase mb-6">FAQ</p>
            <h2 className="text-5xl font-black tracking-tighter leading-none">
              Questions fréquentes
            </h2>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {faqs.map((faq, i) => (
              <div key={i} className="py-7">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left gap-6 group"
                >
                  <span className="font-medium text-base group-hover:text-[#FF4500] transition-colors duration-300">
                    {faq.q}
                  </span>
                  <span
                    className={`text-[#FF4500] text-xl font-light flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openFaq === i ? "max-h-40 mt-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-32 px-6 md:px-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 rounded-3xl p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[#FF4500] font-mono text-xs tracking-[0.4em] uppercase mb-6">Application mobile</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                Téléchargez l'app
                <br />
                <span className="text-stroke">Buyticle</span>
              </h2>
              <p className="text-gray-500 text-sm mb-12 max-w-md mx-auto leading-relaxed">
                Disponible dès maintenant sur Android. Rejoignez des milliers d'utilisateurs qui font leurs achats différemment.
              </p>
              <a
                href="https://play.google.com/apps/internaltest/4701420296100637084"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#FF4500] text-white px-10 py-5 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.18 23.76c.33.18.7.22 1.06.12l12.26-7.07-2.54-2.54-10.78 9.49zM20.7 9.46L17.94 7.9 15.1 10.7l2.85 2.85 2.77-1.58c.79-.45.79-1.57-.02-2.01zM.83.7C.55 1.02.4 1.5.4 2.08v19.84c0 .58.16 1.06.43 1.38l.07.07L11.34 12.5v-.26L.9.63l-.07.07zM12.53 13.7L9.5 10.67l-8.62 9.56 11.65-6.53z" />
                </svg>
                Google Play
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
