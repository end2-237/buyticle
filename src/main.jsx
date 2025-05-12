import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/home.jsx";
import PricingPage from "./pages/pricing.jsx";
import SignInForm from "./pages/signin.jsx";
import PaymentForm from "./components/payement.jsx";
import ContactForm from "./pages/contact.jsx";
import NotFoundPage from "./pages/othersPages/notfound.jsx";
import Accueil from "./pages/dashboard/vendeurs/Accueil.jsx";
import Produits from "./pages/dashboard/vendeurs/Produits.jsx";
import Commandes from "./pages/dashboard/vendeurs/Commandes.jsx";
import Abonnement from "./pages/dashboard/vendeurs/Abonnement.jsx";
import Parametres from "./pages/dashboard/vendeurs/Parametres.jsx";
import Layout from "./components/Layout.jsx";
import AddProductPage from "./pages/dashboard/vendeurs/add/add.jsx";
import ModifPage from "./pages/dashboard/vendeurs/add/modifierPage.jsx";
import StatsPage from "./pages/dashboard/vendeurs/stats/statsPage.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/notfound" element={<NotFoundPage />} />

        <Route path="/dashboard/vendeur" element={<Accueil />} />
        <Route path="/dashboard/vendeur/home" element={<Layout />} />
      <Route path="/dashboard/vendeur/produits" element={<Produits />} />
      <Route path="/dashboard/vendeur/produits/ajouter" element={<AddProductPage />} />
      <Route path="/dashboard/vendeur/produits/modifier" element={<ModifPage />} />
      <Route path="/dashboard/vendeur/statistiques" element={<StatsPage />} />
      <Route path="/dashboard/vendeur/commandes" element={<Commandes />} />
      <Route path="/dashboard/vendeur/abonnement" element={<Abonnement />} />
      <Route path="/dashboard/vendeur/parametres" element={<Parametres />} />
      </Routes>
    </Router>
  </StrictMode>
);