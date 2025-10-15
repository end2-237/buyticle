import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLaptopCode,
  FaServer,
  FaHandshake,
  FaHeadset,
  FaTruck,
  FaShieldAlt,
  FaStore,
} from "react-icons/fa";
import Navigation from "../nav";
import Footer from "../footer";
import ThreeScene from "../components/ThreeSceene";

export default function BuyticleGoPage() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { icon: <FaLaptopCode />, name: "Développement & Intégration", desc: "Apps web et mobiles sur mesure." },
    { icon: <FaServer />, name: "Maintenance & Hébergement", desc: "Solutions cloud fiables et stables." },
    { icon: <FaShieldAlt />, name: "Cybersécurité", desc: "Protection avancée des données." },
    { icon: <FaHandshake />, name: "Consulting & Services", desc: "Accompagnement stratégique complet." },
    { icon: <FaTruck />, name: "Commerce & Logistique", desc: "Distribution et gestion de produits." },
    { icon: <FaStore />, name: "Solutions commerciales", desc: "Connexion à nos partenaires fiables." },
    { icon: <FaHeadset />, name: "Support & Assistance", desc: "Aide rapide et disponible 7j/7." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-200 overflow-hidden">
      
      {/* Navigation */}
      <Navigation />

      {/* --- Section principale : contenu à gauche, modèles 3D à droite --- */}
      <div className="flex flex-col md:flex-row flex-1 px-6 md:px-16 py-12 gap-8">
        
        {/* Contenu principal à gauche */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            L’univers technologique et commercial de Buyticle
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg md:text-xl max-w-3xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <strong>Buyticle Go</strong> — la branche spécialisée en informatique,
            prestations de services et commerce général de l’écosystème Buyticle.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 flex items-center gap-2 w-fit rounded-full bg-gradient-to-r from-orange-600 to-blue-500 text-white font-semibold px-6 py-3 shadow-lg hover:opacity-95 transition-all duration-300"
          >
            Explorer nos services
          </motion.button>

          {/* Icônes de services */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex flex-col items-center"
              >
                <AnimatePresence>
                  {selectedService === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: -20 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full mb-3 w-max bg-gray-900 text-white text-xs rounded-md px-3 py-1 shadow-md"
                    >
                      <strong>{service.name}</strong>
                      <div className="text-gray-300">{service.desc}</div>
                      <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  onClick={() =>
                    setSelectedService(selectedService === index ? null : index)
                  }
                  className={`text-3xl cursor-pointer p-4 rounded-full transition-all duration-300 ${
                    selectedService === index
                      ? "bg-blue-500 text-white"
                      : "bg-white shadow-md hover:bg-blue-100 text-blue-600"
                  }`}
                >
                  {service.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modèles 3D à droite */}
        <div className="flex-1 grid grid-cols-2 gap-1 md:gap-2 p-2">
          {[
            "/model/logitech_mx_master_3s.glb",
            "/model/security_camera.glb",
            "/model/Fox.glb",
            "/model/cyber_dragon_chair.glb",
          ].map((path, index) => (
            <div
              key={index}
              className="w-full h-48 md:h-64 bg-white border border-gray-200 shadow-sm overflow-hidden flex justify-center items-center rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <ThreeScene path={path} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
