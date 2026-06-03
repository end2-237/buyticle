import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../nav";
import Footer from "../footer";

const services = [
  {
    num: "01",
    name: "Développement & Intégration",
    desc: "Applications web et mobiles sur mesure, intégrées dans l'écosystème Buyticle pour accélérer votre croissance.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    num: "02",
    name: "Maintenance & Hébergement",
    desc: "Solutions cloud fiables et hautement disponibles. Vos services restent en ligne 24h/24.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
  },
  {
    num: "03",
    name: "Cybersécurité",
    desc: "Protection avancée des données utilisateurs et transactions. Anti-fraude et chiffrement de bout en bout.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    num: "04",
    name: "Consulting & Stratégie",
    desc: "Accompagnement stratégique complet pour digitiser votre activité et maximiser votre présence en ligne.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    num: "05",
    name: "Commerce & Logistique",
    desc: "Gestion de la chaîne d'approvisionnement, distribution et suivi de produits pour les marchands.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    num: "06",
    name: "Support & Assistance",
    desc: "Aide rapide et disponible 7j/7. Une équipe dédiée pour répondre à toutes vos questions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#080808] text-white min-h-screen">
      <div className="grain" aria-hidden="true" />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6 md:px-16 overflow-hidden">
        <div className="absolute -top-60 right-0 w-[600px] h-[600px] rounded-full bg-[#FF4500] opacity-[0.06] blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#FF4500] font-mono text-xs tracking-[0.4em] uppercase mb-8"
          >
            ✦ Buyticle Go
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(48px,9vw,130px)] font-black leading-[0.88] tracking-tighter mb-10"
          >
            L'univers tech
            <br />
            <span className="text-stroke">de Buyticle</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed"
          >
            Buyticle Go — la branche spécialisée en informatique, prestations de services et commerce général de l'écosystème Buyticle.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 px-6 md:px-16 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#0d0d0d] p-10 hover:bg-[#141414] transition-colors duration-500 group cursor-default"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[#FF4500] font-mono text-xs tracking-widest">{s.num}</span>
                  <div className="text-gray-600 group-hover:text-[#FF4500] transition-colors duration-300">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-[#FF4500] transition-colors duration-300">
                  {s.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-8 h-px w-0 bg-[#FF4500] group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">
            Travaillons ensemble
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Un projet en tête ? Notre équipe est disponible pour discuter de vos besoins et vous proposer une solution adaptée.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#FF4500] text-white px-10 py-5 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 group"
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
