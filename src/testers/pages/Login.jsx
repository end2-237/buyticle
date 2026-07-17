import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { inputCls } from "../ui";
import { Icon } from "../icons";
import slide1 from "../../assets/services_bg.jpg";
import slide2 from "../../assets/bgmosaic.jpg";
import slide3 from "../../assets/image1.webp";

/* Buyticle sun mark (Freshy-style radial logo, orange) */
function SunMark() {
  return (
    <svg width="52" height="52" viewBox="0 0 100 100" className="mx-auto">
      <g stroke="#FF4500" strokeWidth="6" strokeLinecap="round">
        {Array.from({ length: 13 }).map((_, i) => {
          const a = (Math.PI * (i / 12)) - Math.PI;
          const r1 = i % 2 === 0 ? 26 : 30, r2 = i % 2 === 0 ? 44 : 40;
          return <line key={i} x1={50 + Math.cos(a) * r1} y1={70 + Math.sin(a) * r1}
            x2={50 + Math.cos(a) * r2} y2={70 + Math.sin(a) * r2} />;
        })}
      </g>
      <path d="M18 70 A32 32 0 0 1 82 70" fill="none" stroke="#FF4500" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

const SLIDES = [
  { img: slide1, title: "Découvrez votre prochaine mission", text: "Testez en avant-première les applications Buyticle et façonnez les produits de demain." },
  { img: slide2, title: "Une communauté qui construit", text: "Rejoignez des centaines de testeurs à travers l'Afrique et partagez vos retours." },
  { img: slide3, title: "Vos retours, récompensés", text: "Chaque bug signalé et chaque idée compte — et vous rapporte des points." },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const [f, setF] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    try {
      const u = login(f);
      navigate(u.onboarded ? (loc.state?.from || "/testers/dashboard") : "/testers/onboarding");
    } catch (e2) { setErr(e2.message); }
  };

  const oauth = () => setInfo("Connexion sociale bientôt disponible — utilisez votre email pour l'instant.");

  return (
    <div className="font-jakarta min-h-screen bg-white flex p-3 md:p-4">
      {/* Left — form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-10 lg:px-20 py-5">
        <div className="w-full max-w-sm mx-auto">
          <SunMark />
          <h1 className="text-[26px] font-extrabold text-center mt-3 text-[#0A0A0A]">Bon retour !</h1>
          <p className="text-center text-[#0A0A0A]/45 text-[13px] mt-1">Connectez-vous pour reprendre là où vous vous êtes arrêté.</p>

          {/* Social */}
          <div className="mt-5 space-y-2.5">
            <button onClick={oauth} className="w-full flex items-center justify-center gap-3 border border-[#0A0A0A]/12 rounded-xl py-2.5 text-sm font-medium hover:bg-[#0A0A0A]/[0.03] transition">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.3C41.4 36 44 30.5 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
              Continuer avec Google
            </button>
            <button onClick={oauth} className="w-full flex items-center justify-center gap-3 border border-[#0A0A0A]/12 rounded-xl py-2.5 text-sm font-medium hover:bg-[#0A0A0A]/[0.03] transition">
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
            <button type="submit" className="w-full rounded-xl bg-[#0A0A0A] text-white py-3 text-sm font-bold hover:bg-[#FF4500] transition">Se connecter</button>
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
      <div className="hidden lg:block flex-1 relative rounded-[28px] overflow-hidden">
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-[1200ms]" style={{ opacity: i === slide ? 1 : 0 }}>
            <img src={s.img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          </div>
        ))}
        {/* Slide content */}
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <div className="flex gap-2 mb-6">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-8 bg-white" : "w-4 bg-white/40"}`} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
          <h2 className="text-3xl font-extrabold leading-tight max-w-md">{SLIDES[slide].title}</h2>
          <p className="text-white/70 text-sm mt-3 max-w-md leading-relaxed">{SLIDES[slide].text}</p>
        </div>
      </div>
    </div>
  );
}
