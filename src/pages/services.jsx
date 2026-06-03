import { motion } from "framer-motion";
import Navigation from "../nav";
import Footer from "../footer";

const services = [
  { num: "01", name: "Développement Web & Mobile", desc: "Applications sur mesure, SaaS, e-commerce, APIs. Nous utilisons les dernières technologies pour construire des produits performants.", icon: "10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { num: "02", name: "Design UI/UX", desc: "Identité visuelle, interfaces, design systèmes et expérience utilisateur. Du branding à la maquette finale.", icon: "4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" },
  { num: "03", name: "Infogérance & Cloud", desc: "Hébergement VPS, maintenance serveurs, monitoring 24/7 et mises à jour de sécurité pour vos applications.", icon: "5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" },
  { num: "04", name: "Commerce Général", desc: "Distribution, logistique, gestion de produits physiques et numériques. Connexion à nos partenaires commerciaux.", icon: "20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { num: "05", name: "Prestation & Conseil", desc: "Accompagnement stratégique, audit digital, intégration de solutions et formation des équipes.", icon: "17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" },
  { num: "06", name: "Support & Assistance", desc: "Aide technique disponible 7j/7. Une équipe dédiée pour répondre à toutes vos questions et résoudre vos incidents.", icon: "18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#EDECEA] text-[#0A0A0A] min-h-screen">
      <Navigation />

      <section className="pt-40 pb-24 px-6 md:px-14 border-b border-[#0A0A0A]/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-8"
          >
            ✦ Buyticle Go
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(52px,10vw,140px)] font-black leading-[0.88] tracking-[-0.03em]"
            >
              L'univers tech<br />
              <span style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}>de Buyticle</span>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="text-[#0A0A0A]/50 text-base max-w-lg leading-relaxed mt-10"
          >
            Buyticle Go — la branche spécialisée en informatique, design et commerce général de l'écosystème Buyticle.
          </motion.p>
        </div>
      </section>

      <section className="py-0 bg-[#E8E5E1]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 divide-y divide-[#0A0A0A]/10">
          {services.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07 }} viewport={{ once: true }}
              className="group grid md:grid-cols-12 gap-6 py-8 hover:bg-[#0A0A0A]/[0.03] -mx-6 px-6 md:-mx-14 md:px-14 transition-colors duration-200 cursor-default"
            >
              <div className="md:col-span-1">
                <span className="text-[#0A0A0A]/25 font-mono text-[10px]">{s.num}</span>
              </div>
              <div className="md:col-span-1 hidden md:flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0A0A0A]/20 group-hover:text-[#FF4500] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={`M${s.icon}`} />
                </svg>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-bold text-base md:text-xl tracking-tight group-hover:text-[#FF4500] transition-colors duration-300">
                  {s.name}
                </h3>
              </div>
              <div className="md:col-span-5 flex items-center">
                <p className="text-[#0A0A0A]/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                <span className="text-[#0A0A0A]/15 group-hover:text-[#FF4500] group-hover:translate-x-1 transition-all duration-300">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-36 px-6 md:px-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.03em] leading-none mb-6">
            Travaillons ensemble
          </h2>
          <p className="text-[#0A0A0A]/50 mb-10 text-sm leading-relaxed max-w-md mx-auto">
            Un projet en tête ? Notre équipe est disponible pour discuter de vos besoins.
          </p>
          <a href="/contact"
            className="inline-flex items-center gap-3 bg-[#0A0A0A] text-[#EDECEA] px-10 py-4 rounded-full font-semibold text-sm hover:bg-[#FF4500] transition-colors duration-300 group"
          >
            Nous contacter
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
