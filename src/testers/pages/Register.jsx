import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { inputCls } from "../ui";
import { Icon } from "../icons";
import AuthSlider from "../AuthSlider";
import { authError } from "../store";
import logo from "../../assets/buylogo2.png";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [f, setF] = useState({ email: "", phone: "", whatsapp: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!f.email || !f.password) return setErr("Email et mot de passe requis.");
    if (f.password.length < 6) return setErr("Le mot de passe doit faire au moins 6 caractères.");
    if (f.password !== f.confirm) return setErr("Les mots de passe ne correspondent pas.");
    if (!agree) return setErr("Veuillez accepter les conditions du programme.");
    setBusy(true);
    try {
      await register({ email: f.email, phone: f.phone, whatsapp: f.whatsapp || f.phone, password: f.password });
      navigate("/testers/onboarding");
    } catch (e2) { setErr(authError(e2)); setBusy(false); }
  };

  return (
    <div className="font-jakarta min-h-screen bg-white flex p-3 md:p-4">
      {/* Left — form (mirrors the login layout) */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-10 lg:px-20 py-5">
        <div className="w-full max-w-sm mx-auto">
          <img src={logo} alt="Buyticle" className="h-11 w-auto mx-auto" />
          <h1 className="text-[26px] font-extrabold text-center mt-4 text-[#0A0A0A]">Devenir testeur</h1>
          <p className="text-center text-[#0A0A0A]/45 text-[13px] mt-1">Créez votre compte pour rejoindre le programme communautaire Buyticle.</p>

          {err && <div className="mt-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5">{err}</div>}

          <form onSubmit={submit} className="mt-6 space-y-3">
            <div>
              <label className="block text-[13px] font-bold text-[#0A0A0A] mb-1.5">Adresse email</label>
              <input className={inputCls} type="email" placeholder="vous@exemple.com" value={f.email} onChange={set("email")} autoComplete="email" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[13px] font-bold text-[#0A0A0A] mb-1.5">Téléphone</label>
                <input className={inputCls} type="tel" placeholder="+237 6XX…" value={f.phone} onChange={set("phone")} />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0A0A0A] mb-1.5">WhatsApp</label>
                <input className={inputCls} type="tel" placeholder="+237 6XX…" value={f.whatsapp} onChange={set("whatsapp")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[13px] font-bold text-[#0A0A0A] mb-1.5">Mot de passe</label>
                <div className="relative">
                  <input className={inputCls} type={show ? "text" : "password"} placeholder="6+ caractères" value={f.password} onChange={set("password")} autoComplete="new-password" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0A0A]/40 hover:text-[#0A0A0A]/70" aria-label="Afficher le mot de passe"><Icon name={show ? "eye-off" : "eye"} size={17} /></button>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0A0A0A] mb-1.5">Confirmer</label>
                <input className={inputCls} type={show ? "text" : "password"} placeholder="Répéter" value={f.confirm} onChange={set("confirm")} autoComplete="new-password" />
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-[12px] text-[#0A0A0A]/60 cursor-pointer pt-1">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[#FF4500] w-4 h-4" />
              <span>J'accepte les <a href="#" className="underline">conditions</a> et la <a href="#" className="underline">politique de confidentialité</a>.</span>
            </label>

            <button type="submit" disabled={busy} className="w-full rounded-xl bg-[#0A0A0A] text-white py-3 text-sm font-bold hover:bg-[#FF4500] transition disabled:opacity-50">
              {busy ? "Création…" : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-[#0A0A0A]/50 mt-4">
            Déjà testeur ? <Link to="/testers/login" className="font-bold text-[#0A0A0A] underline underline-offset-2">Se connecter</Link>
          </p>
        </div>
      </div>

      {/* Right — image slider (same as login) */}
      <AuthSlider />
    </div>
  );
}
