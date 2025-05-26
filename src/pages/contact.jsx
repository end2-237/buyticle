import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../nav";
import Footer from "../footer";
import GridShape from "../components/gridShape";

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8.25 4.5v5.25c0 5.25-3.563 9.75-8.25 10.5-4.688-.75-8.25-5.25-8.25-10.5V7.5L12 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-14.25 3h1.5m3 0h1.5M3.75 4.5A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75z" />
    </svg>
  );
}

function ChartBarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M9 17v-6m4 6V7m4 10v-4" />
    </svg>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    priority: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    setSubmitted(true);
  };

  return (
    <div>
    <Navigation/>
      <section className="relative z-10 py-12 px-6 bg-base-100 text-base-content">
        <GridShape/>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold mb-6"
          >
            Libérez le potentiel de votre boutique
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Améliorez vos paiements, réduisez les risques et optimisez l'expérience utilisateur sur Buyticle.
          </motion.p>

          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <ShieldCheckIcon />
              <div>
                <h4 className="font-semibold text-lg">Sécurité renforcée</h4>
                <p className="text-gray-500 text-sm">
                  Protégez votre plateforme contre la fraude avec des outils de détection avancés.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <CreditCardIcon />
              <div>
                <h4 className="font-semibold text-lg">Paiements fluides</h4>
                <p className="text-gray-500 text-sm">
                  Garantissez une expérience fluide aux acheteurs et vendeurs sur Buyticle.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <ChartBarIcon />
              <div>
                <h4 className="font-semibold text-lg">Performance accrue</h4>
                <p className="text-gray-500 text-sm">
                  Suivez et améliorez vos taux de conversion grâce à des analyses précises.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl">
          {submitted ? (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-primary">Merci pour votre message !</h3>
              <p className="text-gray-600">Notre équipe vous répondra dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-1 flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Nom de votre entreprise"
                value={formData.company}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Choisissez votre secteur
                </option>
                <option value="mode">Mode</option>
                <option value="électronique">Électronique</option>
                <option value="artisanat">Artisanat</option>
                <option value="autre">Autre</option>
              </select>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Votre priorité principale
                </option>
                <option value="fraude">Sécurité / Anti-fraude</option>
                <option value="conversion">Conversions</option>
                <option value="performance">Performance technique</option>
              </select>
              <button type="submit" className="btn btn-primary rounded-full w-full mt-4">
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
}
