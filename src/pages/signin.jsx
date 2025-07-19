import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/buylogo.png";
import bg from "../assets/bgmosaic.jpg";
import { FaHome } from "react-icons/fa";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    setError("");
    setIsLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard/vendeur/home");
    } catch (err) {
      console.error(err);
      setError("Connexion avec Google échouée. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard/vendeur/home");
    } catch (err) {
      setError("Adresse e-mail ou mot de passe incorrect.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel (form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <button
            onClick={() => navigate("/")}
            className="btn p-4 mb-10 rounded-lg bg-gray-100 border px-6"
          >
            <FaHome></FaHome> Home
          </button>
          <img src={logo} alt="Logo" className="h-12 mb-8" />

          <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Bienvenue sur votre espace vendeur
          </h2>
          <p className="text-sm text-gray-500 mb-6">
          Connectez-vous pour accéder à votre tableau de bord.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your mail address"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Se souvenir de moi
              </label>
              <a href="#" className="text-purple-600 hover:underline">
              Mot de passe oublié ?
              </a>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition"
            >
              {isLoading ? "Chargement..." : "Connexion"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6 text-sm text-gray-400">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2">Ou connectez-vous avec</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={signInWithGoogle}
            disabled={isLoading}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Connexion avec Google
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
          Vous n’avez pas encore de compte ?{" "}
            <a href="/onboarding" className="text-purple-600 hover:underline">
            Créez-en un ici
            </a>
          </p>
        </motion.div>
      </div>

      {/* Right panel (illustration) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-800 to-indigo-900 items-center justify-center relative">
        <img
          src={bg}
          alt="Background Illustration"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black opacity-20" />
      </div>
    </div>
  );
}
