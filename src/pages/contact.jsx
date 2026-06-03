import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../nav";
import Footer from "../footer";

const contactInfo = [
  {
    label: "Support technique",
    value: "support@buyticle.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: "Support commercial",
    value: "contact@buyticle.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Localisation",
    value: "Cameroun 🇨🇲",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#080808] text-white min-h-screen">
      <div className="grain" aria-hidden="true" />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#FF4500] opacity-[0.06] blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#FF4500] font-mono text-xs tracking-[0.4em] uppercase mb-8"
          >
            ✦ Parlons-nous
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(48px,9vw,120px)] font-black leading-[0.88] tracking-tighter"
          >
            Contactez
            <br />
            <span className="text-stroke">nous</span>
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-16 pb-40">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          {/* Left info */}
          <div>
            <p className="text-gray-400 text-base leading-relaxed mb-16 max-w-sm">
              Une question, un partenariat, ou simplement envie d'en savoir plus sur Buyticle ? Notre équipe vous répond rapidement.
            </p>

            <div className="space-y-8">
              {contactInfo.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-mono tracking-wider uppercase mb-1">{c.label}</p>
                    <p className="text-white text-sm font-medium">{c.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#0d0d0d] border border-white/[0.06] rounded-3xl p-10"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#FF4500]/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-[#FF4500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Message envoyé !</h3>
                <p className="text-gray-500 text-sm">Notre équipe vous répondra dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-600 text-xs font-mono tracking-wider uppercase">Nom</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jean Dupont"
                      className="bg-white/[0.04] border border-white/10 text-white px-4 py-3 rounded-xl text-sm outline-none focus:border-[#FF4500] transition-colors placeholder-gray-700"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-600 text-xs font-mono tracking-wider uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="vous@email.com"
                      className="bg-white/[0.04] border border-white/10 text-white px-4 py-3 rounded-xl text-sm outline-none focus:border-[#FF4500] transition-colors placeholder-gray-700"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 text-xs font-mono tracking-wider uppercase">Sujet</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/[0.04] border border-white/10 text-white px-4 py-3 rounded-xl text-sm outline-none focus:border-[#FF4500] transition-colors"
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Choisissez un sujet</option>
                    <option value="general" className="bg-[#1a1a1a]">Question générale</option>
                    <option value="support" className="bg-[#1a1a1a]">Support technique</option>
                    <option value="partenariat" className="bg-[#1a1a1a]">Partenariat</option>
                    <option value="presse" className="bg-[#1a1a1a]">Presse / Média</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 text-xs font-mono tracking-wider uppercase">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Décrivez votre demande..."
                    rows={5}
                    className="bg-white/[0.04] border border-white/10 text-white px-4 py-3 rounded-xl text-sm outline-none focus:border-[#FF4500] transition-colors placeholder-gray-700 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 bg-[#FF4500] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Envoyer le message
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
