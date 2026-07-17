import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { inputCls } from "../ui";
import { Icon } from "../icons";
import AuthSlider from "../AuthSlider";
import { authError, loginWithGoogle } from "../store";
import logo from "../../assets/buylogo2.png";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const [f, setF] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await login(f);
      // Protected route guard sends non-onboarded users to onboarding.
      navigate(loc.state?.from || "/testers/dashboard");
    } catch (e2) { setErr(authError(e2)); setBusy(false); }
  };

  const doGoogle = async () => {
    setErr(""); setInfo("");
    try {
      await loginWithGoogle();
      navigate(loc.state?.from || "/testers/dashboard");
    } catch (e2) { setErr(authError(e2)); }
  };
  const appleSoon = () => setInfo("Connexion Apple bientôt disponible — utilisez Google ou votre email.");

  return (
    <div className="font-jakarta min-h-screen bg-white flex p-3 md:p-4">
      {/* Left — form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-10 lg:px-20 py-5">
        <div className="w-full max-w-sm mx-auto">
          <img src={logo} alt="Buyticle" className="h-11 w-auto mx-auto" />
          <h1 className="text-[26px] font-extrabold text-center mt-4 text-[#0A0A0A]">Bon retour !</h1>
          <p className="text-center text-[#0A0A0A]/45 text-[13px] mt-1">Connectez-vous pour reprendre là où vous vous êtes arrêté.</p>

          {/* Social */}
          <div className="mt-5 space-y-2.5">
            <button onClick={doGoogle} className="w-full flex items-center justify-center gap-3 border border-[#0A0A0A]/12 rounded-xl py-2.5 text-sm font-medium hover:bg-[#0A0A0A]/[0.03] transition">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.3C41.4 36 44 30.5 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
              Continuer avec Google
            </button>
            <button onClick={appleSoon} className="w-full flex items-center justify-center gap-3 border border-[#0A0A0A]/12 rounded-xl py-2.5 text-sm font-medium hover:bg-[#0A0A0A]/[0.03] transition">
              <svg width="16" height="18" viewBox="0 0 24 24" fill="#0A0A0A"><path d="M17.05 12.04c-.03-2.5 2.05-3.7 2.14-3.76-1.17-1.71-2.99-1.95-3.64-1.97-1.55-.16-3.02.91-3.8.91-.79 0-1.99-.89-3.27-.86-1.68.02-3.24.98-4.1 2.48-1.75 3.04-.45 7.54 1.25 10.01.83 1.21 1.82 2.57 3.12 2.52 1.25-.05 1.72-.81 3.23-.81 1.51 0 1.93.81 3.25.78 1.34-.02 2.19-1.23 3.01-2.45.95-1.4 1.34-2.76 1.36-2.83-.03-.01-2.61-1-2.64-3.97zM14.53 4.5c.69-.83 1.15-1.99 1.02-3.14-.99.04-2.19.66-2.9 1.49-.64.73-1.2 1.9-1.05 3.02 1.1.09 2.24-.56 2.93-1.37z"/></svg>
              Continuer avec Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <span className="flex-1 h-px bg-[#0A0A0A]/10" />
            <span className="text-[11px] text-[#0A0A0A]/35 font-semibold">OU</span>
            <span className="flex-1 h-px bg-[#0A0A0A]/10" />
          </div>

          {err && <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5">{err}</div>}
          {info && <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-2.5">{info}</div>}

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="block text-[13px] font-bold text-[#0A0A0A] mb-1.5">Adresse email</label>
              <input className={inputCls} type="email" placeholder="Exemple@gmail.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-bold text-[#0A0A0A]">Mot de passe</label>
                <button type="button" className="text-[13px] text-[#0A0A0A]/50 hover:text-[#FF4500]">Mot de passe oublié ?</button>
              </div>
              <div className="relative">
                <input className={inputCls} type={show ? "text" : "password"} placeholder="Entrez votre mot de passe" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete="current-password" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0A0A]/40 hover:text-[#0A0A0A]/70" aria-label="Afficher le mot de passe"><Icon name={show ? "eye-off" : "eye"} size={18} /></button>
              </div>
            </div>
            <button type="submit" disabled={busy} className="w-full rounded-xl bg-[#0A0A0A] text-white py-3 text-sm font-bold hover:bg-[#FF4500] transition disabled:opacity-50">{busy ? "Connexion…" : "Se connecter"}</button>
          </form>

          <p className="text-center text-sm text-[#0A0A0A]/50 mt-4">
            Pas encore de compte ? <Link to="/testers/register" className="font-bold text-[#0A0A0A] underline underline-offset-2">S'inscrire</Link>
          </p>

          <p className="text-center text-[11px] text-[#0A0A0A]/35 mt-5 leading-relaxed">
            En continuant, vous acceptez nos <a href="#" className="underline">Conditions d'utilisation</a><br />
            et reconnaissez notre <a href="#" className="underline">Politique de confidentialité</a>.
          </p>
        </div>
      </div>

      {/* Right — image slider */}
      <AuthSlider />
    </div>
  );
}
