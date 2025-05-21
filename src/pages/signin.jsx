import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GridShape from "../components/gridShape";
import logo from "../assets/logobuy.png"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adapte le chemin si nécessaire


export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
  
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Connexion réussie !");
      setIsLoading(false);
      navigate("/dashboard/vendeur/home");
    } catch (err) {
      console.error("Erreur de connexion :", err.message);
      setError(true);
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen w-full">
      {/* Partie gauche - Formulaire */}
      <motion.div
        className="flex flex-col justify-center w-full md:w-1/2 p-8 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-md w-full mx-auto"
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <a href="/" className="text-sm text-blue-500  mb-4 inline-block">
            &larr; Retour
          </a>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h2>
          <p className="text-gray-600 mb-6">
            Entrez votre adresse e-mail et votre mot de passe pour vous
            connecter.
          </p>

          {/* Boutons sociaux */}
          <div className="flex space-x-4 mb-6">
            <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Se connecter avec Google
            </button>
            <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center hover:bg-gray-100">
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 4.4 2.9 8.1 7 9.5V15h-2v-3h2v-2.5c0-2 1.5-3.5 3.5-3.5 1 0 2 .2 2 .2v2h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.5l-.4 3H14v6.5c4.1-1.4 7-5.1 7-9.5z" />
              </svg>
              Se connecter avec X
            </button>
          </div>

          {/* Séparateur */}
          <div className="flex items-center justify-between mb-6">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-400">Ou</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Adresse e-mail</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="exemple@domaine.com"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mb-4 relative">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered"
                required
              />
              <div
                className="absolute inset-y-0 right-4 top-10 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.858-3.155m1.71-1.71A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.953 9.953 0 01-2.063 3.368M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M3 3l18 18" />
                  </svg>
                )}
              </div>
            </div>

            {/* Se souvenir + mot de passe oublié */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Rester connecté
                </span>
              </label>

              <a href="#" className="text-sm text-blue-500 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
              ) : (
                "Se connecter"
              )}
            </motion.button>
          </form>

          {/* Lien inscription */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Vous n'avez pas de compte ?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Inscrivez-vous
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Partie droite - Illustration */}
      <motion.div
        className="hidden md:flex flex-col items-center justify-center w-1/2 bg-green-900 text-white p-10 relative overflow-hidden"

        
      >
        {/* Ajout de l'image en fond */}
        {/* <div
          className="absolute inset-0 bg-center bg-cover opacity-20"
          style={{ backgroundImage: "url('src/assets/image1.webp')" }}
        /> */}
        <GridShape/>

        {/* Contenu au-dessus du fond */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6">
            <img
              src={logo}
              alt="Logo"
              className="h-12"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">Bienvenue</h3>
          <p className="text-center text-gray-300">
            Gérez votre tableau de bord facilement avec notre interface
            intuitive.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
