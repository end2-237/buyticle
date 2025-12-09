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
import OnboardingPage from "./pages/onbording/onboarding.jsx";
import AdsPage from "./pages/dashboard/vendeurs/buyticleads.jsx";
import OfferPage from "./pages/dashboard/vendeurs/offer/offer_page.jsx";
import DashboardPage from "./pages/dashboard/vendeurs/home.jsx";
import ParametresPage from "./pages/dashboard/vendeurs/Parametres.jsx";
import "leaflet/dist/leaflet.css";
import SoldePage from "./pages/dashboard/vendeurs/solde.jsx";
import { ShopProvider } from "./contexts/shopContext.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PaymentSuccess from "./components/payementSucess.jsx";
import GoToSubscription from "./components/GotToSubscription.jsx";
import PayementEncours from "./components/payement_encours.jsx";
import PrivacyPolicyPage from "./components/privacyPolicy.jsx";
import ServicesPage from "./pages/services.jsx";
import VerifyFacture from "./pages/verifyInvoice.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/subscription" element={<GoToSubscription />} />
          <Route path="/payment-encours" element={<PayementEncours />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/verify-invoice" element={<VerifyFacture />} />

          {/* Routes prive pour les vendeurs */}

          <Route
            path="/dashboard/vendeur"
            element={
              <PrivateRoute>
                <Accueil />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard/vendeur/home" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/dashboard/vendeur/produits" element={<PrivateRoute><Produits /></PrivateRoute>} />
          <Route
            path="/dashboard/vendeur/parametres"
            element={<PrivateRoute><ParametresPage /></PrivateRoute>}
          />
          <Route path="/dashboard/vendeur/solde" element={<PrivateRoute><SoldePage /></PrivateRoute>} />
          <Route
            path="/dashboard/vendeur/produits/ajouter"
            element={<PrivateRoute><AddProductPage /></PrivateRoute>}
          />
          <Route
            path="/dashboard/vendeur/produits/modifier"
            element={<PrivateRoute><ModifPage /></PrivateRoute>}
          />
          <Route path="/dashboard/vendeur/espacepub" element={<PrivateRoute><AdsPage /></PrivateRoute>} />
          <Route
            path="/dashboard/vendeur/espacepub/offres"
            element={<PrivateRoute><OfferPage /></PrivateRoute>}
          />
          <Route
            path="/dashboard/vendeur/statistiques"
            element={<PrivateRoute><StatsPage /></PrivateRoute>}
          />
          <Route path="/dashboard/vendeur/commandes" element={<PrivateRoute><Commandes /></PrivateRoute>} />
          <Route
            path="/dashboard/vendeur/abonnement"
            element={<PrivateRoute><Abonnement /></PrivateRoute>}
          />
          <Route
            path="/dashboard/vendeur/parametres"
            element={<PrivateRoute><Parametres /></PrivateRoute>}
          />
        </Routes>
      </Router>
    </ShopProvider>
  </StrictMode>
);
