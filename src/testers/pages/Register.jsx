import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { BuyMark, Btn, Field, inputCls } from "../ui";
import { Icon } from "../icons";
import { REWARDS } from "../store";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [f, setF] = useState({ email: "", phone: "", whatsapp: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    if (!f.email || !f.password) return setErr("Email et mot de passe requis.");
    if (f.password.length < 6) return setErr("Le mot de passe doit faire au moins 6 caractères.");
    if (f.password !== f.confirm) return setErr("Les mots de passe ne correspondent pas.");
    if (!agree) return setErr("Veuillez accepter les conditions du programme.");
    setBusy(true);
    try {
      register({ email: f.email, phone: f.phone, whatsapp: f.whatsapp || f.phone, password: f.password });
      navigate("/testers/onboarding");
    } catch (e2) {
      setErr(e2.message); setBusy(false);
    }
  };

  return (
    <div className="font-jakarta min-h-screen grid lg:grid-cols-2 bg-[#EDECEA]">
      {/* Left — form */}
      <div className="flex flex-col px-5 sm:px-10 lg:px-16 py-8 overflow-y-auto">
        <BuyMark />
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Devenir testeur</h1>
          <p className="text-[#0A0A0A]/50 mt-2 text-sm">Créez votre compte pour rejoindre le programme communautaire Buyticle.</p>

          {err && <div className="mt-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{err}</div>}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Adresse email">
              <input className={inputCls} type="email" placeholder="vous@exemple.com" value={f.email} onChange={set("email")} autoComplete="email" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Téléphone">
                <input className={inputCls} type="tel" placeholder="+237 6XX XXX XXX" value={f.phone} onChange={set("phone")} />
              </Field>
              <Field label="WhatsApp" hint="Laissez vide = même numéro">
                <input className={inputCls} type="tel" placeholder="+237 6XX XXX XXX" value={f.whatsapp} onChange={set("whatsapp")} />
              </Field>
            </div>
            <Field label="Mot de passe">
              <div className="relative">
                <input className={inputCls} type={show ? "text" : "password"} placeholder="Au moins 6 caractères" value={f.password} onChange={set("password")} autoComplete="new-password" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0A0A]/40 hover:text-[#0A0A0A]/70" aria-label="Afficher le mot de passe"><Icon name={show ? "eye-off" : "eye"} size={18} /></button>
              </div>
            </Field>
            <Field label="Confirmer le mot de passe">
              <input className={inputCls} type={show ? "text" : "password"} placeholder="Répétez le mot de passe" value={f.confirm} onChange={set("confirm")} autoComplete="new-password" />
            </Field>

            <label className="flex items-start gap-2.5 text-[13px] text-[#0A0A0A]/60 cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[#FF4500] w-4 h-4" />
              <span>J'accepte les <a href="#" className="underline">conditions du programme</a> et la <a href="#" className="underline">politique de confidentialité</a>.</span>
            </label>

            <Btn as="button" type="submit" variant="orange" className="w-full" disabled={busy}>
              {busy ? "Création…" : "Créer mon compte →"}
            </Btn>
          </form>

          <p className="text-center text-sm text-[#0A0A0A]/50 mt-6">
            Déjà testeur ? <Link to="/testers/login" className="font-semibold text-[#0A0A0A] underline">Se connecter</Link>
          </p>
        </div>
      </div>

      {/* Right — benefits panel */}
      <div className="hidden lg:flex flex-col justify-center p-16 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(150deg,#141414,#2a1206)" }}>
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#FF4500]/20 blur-2xl" />
        <div className="relative max-w-sm">
          <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.3em] uppercase mb-4">◆ Programme testeurs</p>
          <h2 className="text-4xl font-extrabold leading-tight">Testez les apps Buyticle. Soyez récompensé.</h2>
          <div className="mt-10 space-y-5">
            {REWARDS.slice(0, 4).map((r) => (
              <div key={r.title} className="flex gap-4">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/10 text-[#FF4500] shrink-0"><Icon name={r.icon} size={20} /></span>
                <div>
                  <div className="font-bold">{r.title}</div>
                  <div className="text-white/50 text-sm">{r.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
