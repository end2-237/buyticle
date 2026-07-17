import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { BuyMark, Btn, Field, inputCls, Select } from "../ui";

const STEPS = [
  { key: "identite", title: "Faisons connaissance", sub: "Votre identité de testeur." },
  { key: "localisation", title: "D'où testez-vous ?", sub: "Cela nous aide à cibler les tests par région." },
  { key: "pro", title: "Votre profil", sub: "Profession et expérience technique." },
  { key: "prefs", title: "Vos préférences", sub: "Pour vous proposer les bons programmes." },
];

const SECTORS = ["Étudiant", "Technologie / IT", "Commerce / Vente", "Éducation", "Santé", "Finance", "Marketing / Communication", "Artisanat", "Agriculture", "Fonction publique", "Autre"];
const PROFESSIONS = ["Développeur", "Designer", "Étudiant", "Entrepreneur", "Commerçant", "Enseignant", "Marketeur", "Chef de projet", "Comptable", "Sans emploi", "Autre"];
const COUNTRIES = ["Cameroun", "Côte d'Ivoire", "Sénégal", "Gabon", "Congo", "Bénin", "Togo", "France", "Canada", "Autre"];
const HEARD = ["Réseaux sociaux", "Un ami / bouche à oreille", "Groupe WhatsApp", "Site Buyticle", "Événement / campus", "Autre"];

export default function Onboarding() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [err, setErr] = useState("");
  const [d, setD] = useState({
    fullName: "", gender: "", age: "",
    country: "Cameroun", region: "", city: "",
    profession: "", sector: "", experience: "",
    devices: [], appTypes: [], availability: "", heard: "",
  });

  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const toggle = (k, v) => setD((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  const validate = () => {
    if (step === 0 && (!d.fullName.trim() || !d.gender || !d.age)) return "Renseignez votre nom, sexe et âge.";
    if (step === 1 && (!d.country || !d.city.trim())) return "Renseignez au moins le pays et la ville.";
    if (step === 2 && (!d.profession || !d.sector || !d.experience)) return "Renseignez profession, secteur et niveau.";
    if (step === 3 && (d.devices.length === 0 || !d.availability)) return "Choisissez vos appareils et votre disponibilité.";
    return "";
  };

  const next = () => {
    const v = validate();
    if (v) return setErr(v);
    setErr("");
    if (step < STEPS.length - 1) setStep(step + 1);
    else { completeOnboarding(d); navigate("/testers/success"); }
  };
  const back = () => { setErr(""); setStep(Math.max(0, step - 1)); };

  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="font-jakarta min-h-screen bg-[#EDECEA] text-[#0A0A0A] flex flex-col">
      <header className="px-5 md:px-10 py-4 flex items-center justify-between">
        <BuyMark />
        <span className="text-sm text-[#0A0A0A]/40">Étape {step + 1} / {STEPS.length}</span>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 py-3">
        <div className="w-full max-w-xl">
          {/* Progress */}
          <div className="flex gap-2 mb-5">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex-1 h-1.5 rounded-full bg-[#0A0A0A]/8 overflow-hidden">
                <div className="h-full bg-[#FF4500] transition-all duration-500" style={{ width: i <= step ? "100%" : "0%" }} />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-[#0A0A0A]/8 p-6 md:p-7 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.3)]">
            <p className="text-[#FF4500] font-mono text-[11px] tracking-[0.3em] uppercase mb-1.5">◆ {STEPS[step].key}</p>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">{STEPS[step].title}</h1>
            <p className="text-[#0A0A0A]/50 text-[13px] mt-1">{STEPS[step].sub}</p>

            {err && <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5">{err}</div>}

            <div className="mt-5 space-y-3.5">
              {/* STEP 1 — Identité */}
              {step === 0 && (
                <>
                  <Field label="Nom complet">
                    <input className={inputCls} placeholder="Ex. Jean Nkeng" value={d.fullName} onChange={(e) => set("fullName", e.target.value)} />
                  </Field>
                  <div>
                    <span className="block text-[13px] font-semibold mb-2">Sexe</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Homme", "Femme", "Autre"].map((g) => (
                        <button key={g} type="button" onClick={() => set("gender", g)}
                          className={`rounded-xl border py-3 text-sm font-medium transition ${d.gender === g ? "border-[#FF4500] bg-[#FF4500]/8 text-[#FF4500]" : "border-[#0A0A0A]/12 hover:border-[#0A0A0A]/30"}`}>{g}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[13px] font-semibold mb-2">Tranche d'âge</span>
                    <div className="grid grid-cols-4 gap-2">
                      {["-18", "18-24", "25-34", "35-44", "45-54", "55+"].map((a) => (
                        <button key={a} type="button" onClick={() => set("age", a)}
                          className={`rounded-xl border py-2.5 text-sm font-medium transition ${d.age === a ? "border-[#FF4500] bg-[#FF4500]/8 text-[#FF4500]" : "border-[#0A0A0A]/12 hover:border-[#0A0A0A]/30"}`}>{a}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2 — Localisation */}
              {step === 1 && (
                <>
                  <Field label="Pays">
                    <Select value={d.country} onChange={(e) => set("country", e.target.value)}>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </Select>
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Région">
                      <input className={inputCls} placeholder="Ex. Littoral" value={d.region} onChange={(e) => set("region", e.target.value)} />
                    </Field>
                    <Field label="Ville">
                      <input className={inputCls} placeholder="Ex. Douala" value={d.city} onChange={(e) => set("city", e.target.value)} />
                    </Field>
                  </div>
                </>
              )}

              {/* STEP 3 — Profil pro */}
              {step === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Profession">
                      <Select value={d.profession} onChange={(e) => set("profession", e.target.value)}>
                        <option value="">Choisir…</option>
                        {PROFESSIONS.map((p) => <option key={p}>{p}</option>)}
                      </Select>
                    </Field>
                    <Field label="Secteur d'activité">
                      <Select value={d.sector} onChange={(e) => set("sector", e.target.value)}>
                        <option value="">Choisir…</option>
                        {SECTORS.map((s) => <option key={s}>{s}</option>)}
                      </Select>
                    </Field>
                  </div>
                  <div>
                    <span className="block text-[13px] font-semibold mb-2">Niveau d'expérience technique</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Débutant", "Intermédiaire", "Avancé"].map((x) => (
                        <button key={x} type="button" onClick={() => set("experience", x)}
                          className={`rounded-xl border py-3 text-sm font-medium transition ${d.experience === x ? "border-[#FF4500] bg-[#FF4500]/8 text-[#FF4500]" : "border-[#0A0A0A]/12 hover:border-[#0A0A0A]/30"}`}>{x}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* STEP 4 — Préférences */}
              {step === 3 && (
                <>
                  <div>
                    <span className="block text-[13px] font-semibold mb-2">Appareils disponibles <span className="text-[#0A0A0A]/35 font-normal">(plusieurs)</span></span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Android", "iPhone / iOS", "Ordinateur / Web"].map((x) => (
                        <button key={x} type="button" onClick={() => toggle("devices", x)}
                          className={`rounded-xl border py-3 text-sm font-medium transition ${d.devices.includes(x) ? "border-[#FF4500] bg-[#FF4500]/8 text-[#FF4500]" : "border-[#0A0A0A]/12 hover:border-[#0A0A0A]/30"}`}>{x}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[13px] font-semibold mb-2">Types d'apps préférés <span className="text-[#0A0A0A]/35 font-normal">(plusieurs)</span></span>
                    <div className="flex flex-wrap gap-2">
                      {["E-commerce", "Marketplace", "SaaS / Productivité", "Réseaux sociaux", "Fintech", "Éducation", "Jeux"].map((x) => (
                        <button key={x} type="button" onClick={() => toggle("appTypes", x)}
                          className={`rounded-full border px-4 py-2 text-[13px] font-medium transition ${d.appTypes.includes(x) ? "border-[#FF4500] bg-[#FF4500]/8 text-[#FF4500]" : "border-[#0A0A0A]/12 hover:border-[#0A0A0A]/30"}`}>{x}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Disponibilité / semaine">
                      <Select value={d.availability} onChange={(e) => set("availability", e.target.value)}>
                        <option value="">Choisir…</option>
                        {["1-2 h", "3-5 h", "6-10 h", "10 h et +"].map((x) => <option key={x}>{x}</option>)}
                      </Select>
                    </Field>
                    <Field label="Comment nous avez-vous connus ?">
                      <Select value={d.heard} onChange={(e) => set("heard", e.target.value)}>
                        <option value="">Choisir…</option>
                        {HEARD.map((x) => <option key={x}>{x}</option>)}
                      </Select>
                    </Field>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button onClick={back} disabled={step === 0}
                className="text-sm font-medium text-[#0A0A0A]/50 hover:text-[#0A0A0A] disabled:opacity-0 transition">← Retour</button>
              <Btn as="button" onClick={next} variant="orange">
                {step === STEPS.length - 1 ? "Terminer ✓" : "Continuer →"}
              </Btn>
            </div>
          </div>

          <p className="text-center text-xs text-[#0A0A0A]/35 mt-3">Bienvenue {user?.email} — vos réponses restent confidentielles.</p>
        </div>
      </div>
    </div>
  );
}
