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
const Profile = lazy(() => import("./testers/pages/Profile.jsx"));

/* Portail Employeur — gestion des employés + tâches */
const EmployerHome = lazy(() => import("./employer/EmployerHome.jsx"));
const EmpCalendar = lazy(() => import("./employer/pages/Calendar.jsx"));
const EmpTasks = lazy(() => import("./employer/pages/Tasks.jsx"));
const EmpEmployees = lazy(() => import("./employer/pages/Employees.jsx"));
const EmpMyTasks = lazy(() => import("./employer/pages/MyTasks.jsx"));
const EmpBrainstorm = lazy(() => import("./employer/pages/Brainstorm.jsx"));
const EmpTeams = lazy(() => import("./employer/pages/Teams.jsx"));
const EmpResources = lazy(() => import("./employer/pages/Resources.jsx"));
const EmpIntegrations = lazy(() => import("./employer/pages/Integrations.jsx"));
const EmpSettings = lazy(() => import("./employer/pages/Settings.jsx"));

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
            <Route path="/testers/profile" element={<Protected requireOnboarded={false}><Profile /></Protected>} />
            <Route path="/testers/tests" element={<Protected><Community /></Protected>} />
            <Route path="/testers/admin" element={<Protected admin><Admin /></Protected>} />

            {/* ── Portail Employeur ── */}
            <Route path="/employer" element={<Protected requireOnboarded={false}><EmployerHome /></Protected>} />
            <Route path="/employer/my" element={<Protected requireOnboarded={false}><EmpMyTasks /></Protected>} />
            <Route path="/employer/calendar" element={<Protected requireOnboarded={false}><EmpCalendar /></Protected>} />
            <Route path="/employer/brainstorm" element={<Protected requireOnboarded={false}><EmpBrainstorm /></Protected>} />
            <Route path="/employer/resources" element={<Protected requireOnboarded={false}><EmpResources /></Protected>} />
            <Route path="/employer/tasks" element={<Protected admin><EmpTasks /></Protected>} />
            <Route path="/employer/employees" element={<Protected admin><EmpEmployees /></Protected>} />
            <Route path="/employer/teams" element={<Protected admin><EmpTeams /></Protected>} />
            <Route path="/employer/integrations" element={<Protected requireOnboarded={false}><EmpIntegrations /></Protected>} />
            <Route path="/employer/settings" element={<Protected requireOnboarded={false}><EmpSettings /></Protected>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  </StrictMode>
);
