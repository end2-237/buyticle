import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ContactForm from "./pages/contact.jsx";
import ServicesPage from "./pages/services.jsx";
import NotFoundPage from "./pages/othersPages/notfound.jsx";
import { AuthProvider, Protected } from "./testers/AuthContext.jsx";

/* Tester program — lazy so three.js/tester bundle stays out of the main site */
const ProgramLanding = lazy(() => import("./testers/pages/ProgramLanding.jsx"));
const Register = lazy(() => import("./testers/pages/Register.jsx"));
const Onboarding = lazy(() => import("./testers/pages/Onboarding.jsx"));
const Success = lazy(() => import("./testers/pages/Success.jsx"));
const Login = lazy(() => import("./testers/pages/Login.jsx"));
const Dashboard = lazy(() => import("./testers/pages/Dashboard.jsx"));
const Community = lazy(() => import("./testers/pages/Community.jsx"));
const Admin = lazy(() => import("./testers/pages/Admin.jsx"));

function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#EDECEA]">
      <div className="w-10 h-10 rounded-full border-2 border-[#FF4500] border-t-transparent animate-spin" />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/services" element={<ServicesPage />} />

            {/* ── Programme Testeurs ── */}
            <Route path="/testers" element={<ProgramLanding />} />
            <Route path="/testers/register" element={<Register />} />
            <Route path="/testers/login" element={<Login />} />
            <Route path="/testers/onboarding" element={<Protected requireOnboarded={false}><Onboarding /></Protected>} />
            <Route path="/testers/success" element={<Protected><Success /></Protected>} />
            <Route path="/testers/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/testers/tests" element={<Protected><Community /></Protected>} />
            <Route path="/testers/admin" element={<Protected admin><Admin /></Protected>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  </StrictMode>
);
