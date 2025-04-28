import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./index.css";
import Navigation from "./nav";
import Footer from "./footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-base-100 text-base-content overflow-hidden">
      {/* Background grille discrète */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>

      {/* Navbar */}
      <Navigation />

      {/* Section Hero */}
      <section className="relative z-10 flex flex-col justify-center items-center text-center px-6 pt-40 pb-32">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex items-center bg-base-200 backdrop-blur-md px-5 py-2 rounded-full mb-6 space-x-3 shadow-md"
        >
          <div className="flex -space-x-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-8 h-8 rounded-full ring-2 ring-base-100"
            />
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-8 h-8 rounded-full ring-2 ring-base-100"
            />
            <img
              src="https://randomuser.me/api/portraits/men/54.jpg"
              className="w-8 h-8 rounded-full ring-2 ring-base-100"
            />
          </div>
          <span className="text-sm text-gray-600">
            Fait confiance par 35 000+ utilisateurs
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Buyticle - Votre Marketplace Mobile
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-gray-500 max-w-2xl mb-8"
        >
          Achetez et vendez vos produits favoris en toute simplicité. Buyticle
          connecte les acheteurs et vendeurs dans une expérience mobile unique.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <button className="btn btn-primary rounded-full px-8 py-3">
            Télécharger l'application
          </button>
          <button className="btn btn-outline rounded-full px-8 py-3">
            En savoir plus
          </button>
        </motion.div>
      </section>

      {/* Section Découverte */}
      {/* Section Découverte */}
      <section className="relative z-10 py-40 px-6 bg-gradient-to-br from-indigo-500 to-blue-600 text-white overflow-hidden">
        {/* Forme oblique */}
        <div className="absolute inset-0 bg-white opacity-5 transform -skew-y-6"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Découvrez toutes les fonctionnalités de Buyticle
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-blue-100 max-w-2xl mx-auto mb-16"
          >
            Naviguez parmi des milliers d'articles, suivez vos vendeurs
            préférés, profitez de promotions exclusives et bien plus encore !
          </motion.p>

          {/* Cartes fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-white/10 rounded-3xl p-8 backdrop-blur-md shadow-lg"
            >
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2">Catalogue étendu</h3>
              <p className="text-blue-100 text-sm">
                Explorez des milliers de produits à prix imbattables directement
                depuis votre mobile.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white/10 rounded-3xl p-8 backdrop-blur-md shadow-lg"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">
                Promotions exclusives
              </h3>
              <p className="text-blue-100 text-sm">
                Accédez à des offres flash et des réductions exclusives pour nos
                utilisateurs fidèles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="bg-white/10 rounded-3xl p-8 backdrop-blur-md shadow-lg"
            >
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Communauté active</h3>
              <p className="text-blue-100 text-sm">
                Rejoignez une communauté dynamique d'acheteurs et vendeurs
                passionnés.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Section Comment ça marche */}
      <section className="py-24 px-6 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Comment ça <span className="text-primary">Marche</span>
        </motion.h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-16">
          Découvrez en quelques étapes comment utiliser Buyticle pour faire vos
          meilleures affaires.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Étape 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-yellow-400 bg-yellow-100 mb-6">
              🔎
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Trouvez votre article
            </h3>
            <p className="text-gray-500 text-sm">
              Parcourez nos milliers de produits pour dénicher exactement ce que
              vous cherchez.
            </p>
          </motion.div>

          {/* Étape 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-green-400 bg-green-100 mb-6">
              🛒
            </div>
            <h3 className="text-xl font-semibold mb-2">Réservez votre achat</h3>
            <p className="text-gray-500 text-sm">
              Passez votre commande rapidement et de manière totalement
              sécurisée.
            </p>
          </motion.div>

          {/* Étape 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-orange-400 bg-orange-100 mb-6">
              🎁
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Recevez votre produit
            </h3>
            <p className="text-gray-500 text-sm">
              Recevez votre commande rapidement et commencez à en profiter !
            </p>
          </motion.div>
        </div>
      </section>
      {/* Section Équipe */}
      <section className="py-24 px-6 bg-gray-50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Notre <span className="text-indigo-500">Équipe</span>
        </motion.h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-16">
          Une équipe passionnée au service de votre expérience d'achat.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Membre 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <img
              src="/team1.jpg"
              alt="Alice"
              className="w-32 h-32 rounded-full object-cover mb-6 shadow-lg"
            />
            <h3 className="text-xl font-semibold mb-1">Alice Dupont</h3>
            <p className="text-gray-400 text-sm">CEO & Fondatrice</p>
          </motion.div>

          {/* Membre 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <img
              src="/team2.jpg"
              alt="Bruno"
              className="w-32 h-32 rounded-full object-cover mb-6 shadow-lg"
            />
            <h3 className="text-xl font-semibold mb-1">Bruno Martin</h3>
            <p className="text-gray-400 text-sm">CTO & Co-fondateur</p>
          </motion.div>

          {/* Membre 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <img
              src="/team3.jpg"
              alt="Claire"
              className="w-32 h-32 rounded-full object-cover mb-6 shadow-lg"
            />
            <h3 className="text-xl font-semibold mb-1">Claire Moreau</h3>
            <p className="text-gray-400 text-sm">Responsable Marketing</p>
          </motion.div>
        </div>
      </section>

      {/* Section Vendeur */}
      <section className="relative z-10 py-40 px-6 bg-base-100 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Devenez vendeur sur Buyticle
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-500 max-w-2xl mx-auto mb-10"
        >
          Rejoignez des milliers de vendeurs et développez votre activité grâce
          à Buyticle. Choisissez la formule qui vous correspond et commencez à
          vendre dès aujourd'hui !
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button className="btn btn-primary rounded-full px-8 py-3">
            S'inscrire comme vendeur
          </button>
          <button className="btn btn-outline rounded-full px-8 py-3">
            Voir les abonnements
          </button>
        </motion.div>
      </section>

      

      {/* Footer */}
      <Footer />
    </div>
  );
}
