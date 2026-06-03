import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../nav";
import Footer from "../footer";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="bg-[#EDECEA] text-[#0A0A0A] min-h-screen">
      <Navigation />

      <section className="pt-40 pb-20 px-6 md:px-14 border-b border-[#0A0A0A]/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-8"
          >
            ✦ Parlons-nous
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(52px,10vw,140px)] font-black leading-[0.88] tracking-[-0.03em]"
            >
              Contactez<br />
              <span style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}>nous</span>
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-14 pb-36">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed mb-16 max-w-sm">
              Une question, un projet ou envie d'en savoir plus ? Notre équipe vous répond rapidement.
            </p>
            <div className="space-y-10 divide-y divide-[#0A0A0A]/10">
              {[
                { label: "Support technique", value: "support@buyticle.com", href: "mailto:support@buyticle.com" },
                { label: "Support commercial", value: "contact@buyticle.com", href: "mailto:contact@buyticle.com" },
                { label: "Localisation", value: "Cameroun 🇨🇲", href: null },
              ].map((c, i) => (
                <div key={i} className="pt-8 first:pt-0">
                  <p className="text-[#0A0A0A]/30 text-[10px] font-mono tracking-widest uppercase mb-2">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-[#0A0A0A] text-sm font-medium hover:text-[#FF4500] transition-colors underline-offset-4 hover:underline">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-[#0A0A0A] text-sm font-medium">{c.value}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="bg-[#E2DED9] border border-[#0A0A0A]/10 rounded-3xl p-10"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 rounded-full bg-[#0A0A0A]/5 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-2">Message envoyé !</h3>
                <p className="text-[#0A0A0A]/50 text-sm">Notre équipe vous répond dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "Nom", placeholder: "Jean Dupont", type: "text" },
                    { name: "email", label: "Email", placeholder: "vous@email.com", type: "email" },
                  ].map((f) => (
                    <div key={f.name} className="flex flex-col gap-2">
                      <label className="text-[#0A0A0A]/40 text-[10px] font-mono tracking-widest uppercase">{f.label}</label>
                      <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange} required
                        placeholder={f.placeholder}
                        className="bg-[#EDECEA] border border-[#0A0A0A]/15 text-[#0A0A0A] px-4 py-3 rounded-xl text-sm outline-none focus:border-[#0A0A0A] transition-colors placeholder-[#0A0A0A]/25"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0A0A0A]/40 text-[10px] font-mono tracking-widest uppercase">Sujet</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} required
                    className="bg-[#EDECEA] border border-[#0A0A0A]/15 text-[#0A0A0A] px-4 py-3 rounded-xl text-sm outline-none focus:border-[#0A0A0A] transition-colors"
                  >
                    <option value="" disabled>Choisissez un sujet</option>
                    <option value="general">Question générale</option>
                    <option value="support">Support technique</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="presse">Presse / Média</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0A0A0A]/40 text-[10px] font-mono tracking-widest uppercase">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required
                    placeholder="Décrivez votre demande..." rows={5}
                    className="bg-[#EDECEA] border border-[#0A0A0A]/15 text-[#0A0A0A] px-4 py-3 rounded-xl text-sm outline-none focus:border-[#0A0A0A] transition-colors resize-none placeholder-[#0A0A0A]/25"
                  />
                </div>
                <button type="submit"
                  className="mt-2 bg-[#0A0A0A] text-[#EDECEA] px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#FF4500] transition-colors duration-300 flex items-center justify-center gap-3 group"
                >
                  Envoyer
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
