import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/home.jsx";
import PricingPage from "./pages/pricing.jsx";
import SignInForm from "./pages/signin.jsx";
import PaymentForm from "./components/payement.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </Router>
  </StrictMode>
);