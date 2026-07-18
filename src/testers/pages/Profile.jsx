import { useState } from "react";
import { DashboardShell } from "../TesterNav";
import { useAuth } from "../AuthContext";
import { Icon } from "../icons";
import { Field, inputCls, Select, Btn } from "../ui";

const SECTORS = ["Étudiant", "Technologie / IT", "Commerce / Vente", "Éducation", "Santé", "Finance", "Marketing / Communication", "Artisanat", "Agriculture", "Fonction publique", "Autre"];
const PROFESSIONS = ["Développeur", "Designer", "Étudiant", "Entrepreneur", "Commerçant", "Enseignant", "Marketeur", "Chef de projet", "Comptable", "Sans emploi", "Autre"];
const COUNTRIES = ["Cameroun", "Côte d'Ivoire", "Sénégal", "Gabon", "Congo", "Bénin", "Togo", "France", "Canada", "Autre"];
const HEARD = ["Réseaux sociaux", "Un ami / bouche à oreille", "Groupe WhatsApp", "Site Buyticle", "Événement / campus", "Autre"];

export default function Profile() {
  const { user, saveProfile } = useAuth();
  const p = user.profile || {};
  const [d, setD] = useState({
    phone: user.phone || "", whatsapp: user.whatsapp || "",
    fullName: p.fullName || "", gender: p.gender || "", age: p.age || "",
    country: p.country || "Cameroun", region: p.region || "", city: p.city || "",
    profession: p.profession || "", sector: p.sector || "", experience: p.experience || "",
    devices: p.devices || [], appTypes: p.appTypes || [], availability: p.availability || "", heard: p.heard || "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const set = (k, v) => setD((s) => ({ ...s, [k]: v }));
  const toggle = (k, v) => setD((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));

  const save = async () => {
    setBusy(true); setMsg("");
    const { phone, whatsapp, ...profile } = d;
    try {
      await saveProfile({ phone, whatsapp, profile });
      setMsg("Profil enregistré ✓");
      setTimeout(() => setMsg(""), 3000);
    } catch { setMsg("Enregistrement impossible. Réessayez."); }
    setBusy(false);
  };

  const name = d.fullName || user.email.split("@")[0];
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const Chip = ({ active, onClick, children }) => (
    <button type="button" onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[13px] font-medium transition ${active ? "border-[#FF4500] bg-[#FF4500]/8 text-[#FF4500]" : "border-[#0A0A0A]/12 hover:border-[#0A0A0A]/30"}`}>{children}</button>
  );

  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto">
        {/* Header card */}
        <div className="rounded-3xl bg-white border border-[#0A0A0A]/8 p-6 flex items-center gap-4">
          <span className="grid place-items-center w-16 h-16 rounded-2xl bg-[#FF4500] text-white text-xl font-extrabold">{initials}</span>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold truncate">{name}</h1>
            <p className="text-[13px] text-[#0A0A0A]/50 truncate">{user.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-[#FF4500] bg-[#FF4500]/10 rounded-full px-2.5 py-0.5">
              <Icon name="award" size={12} /> {user.points || 0} points · {user.role === "admin" ? "Administrateur" : "Testeur"}
            </span>
          </div>
        </div>

        {!user.phone && (
          <div className="mt-4 rounded-2xl bg-[#FF4500]/8 border border-[#FF4500]/25 text-[#0A0A0A] text-sm px-4 py-3 flex items-center gap-2">
            <Icon name="alert-triangle" size={16} className="text-[#FF4500]" />
            Complétez votre numéro WhatsApp pour recevoir les invitations aux tests.
          </div>
        )}

        {/* Compte */}
        <section className="mt-4 rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
          <h2 className="font-bold text-lg mb-4">Compte & contact</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email"><input className={`${inputCls} opacity-60`} value={user.email} disabled /></Field>
            <Field label="Nom complet"><input className={inputCls} value={d.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Ex. Jean Nkeng" /></Field>
            <Field label="Téléphone"><input className={inputCls} type="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+237 6XX XXX XXX" /></Field>
            <Field label="WhatsApp"><input className={inputCls} type="tel" value={d.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+237 6XX XXX XXX" /></Field>
          </div>
        </section>

        {/* Identité */}
        <section className="mt-4 rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
          <h2 className="font-bold text-lg mb-4">Identité</h2>
          <div className="space-y-4">
            <div>
              <span className="block text-[13px] font-semibold mb-2">Sexe</span>
              <div className="flex gap-2">{["Homme", "Femme", "Autre"].map((g) => <Chip key={g} active={d.gender === g} onClick={() => set("gender", g)}>{g}</Chip>)}</div>
            </div>
            <div>
              <span className="block text-[13px] font-semibold mb-2">Tranche d'âge</span>
              <div className="flex flex-wrap gap-2">{["-18", "18-24", "25-34", "35-44", "45-54", "55+"].map((a) => <Chip key={a} active={d.age === a} onClick={() => set("age", a)}>{a}</Chip>)}</div>
            </div>
          </div>
        </section>

        {/* Localisation */}
        <section className="mt-4 rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
          <h2 className="font-bold text-lg mb-4">Localisation</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Pays"><Select value={d.country} onChange={(e) => set("country", e.target.value)}>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</Select></Field>
            <Field label="Région"><input className={inputCls} value={d.region} onChange={(e) => set("region", e.target.value)} placeholder="Ex. Littoral" /></Field>
            <Field label="Ville"><input className={inputCls} value={d.city} onChange={(e) => set("city", e.target.value)} placeholder="Ex. Douala" /></Field>
          </div>
        </section>

        {/* Profil pro */}
        <section className="mt-4 rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
          <h2 className="font-bold text-lg mb-4">Profil professionnel</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Profession"><Select value={d.profession} onChange={(e) => set("profession", e.target.value)}><option value="">Choisir…</option>{PROFESSIONS.map((x) => <option key={x}>{x}</option>)}</Select></Field>
            <Field label="Secteur d'activité"><Select value={d.sector} onChange={(e) => set("sector", e.target.value)}><option value="">Choisir…</option>{SECTORS.map((x) => <option key={x}>{x}</option>)}</Select></Field>
          </div>
          <div className="mt-4">
            <span className="block text-[13px] font-semibold mb-2">Niveau d'expérience technique</span>
            <div className="flex gap-2">{["Débutant", "Intermédiaire", "Avancé"].map((x) => <Chip key={x} active={d.experience === x} onClick={() => set("experience", x)}>{x}</Chip>)}</div>
          </div>
        </section>

        {/* Préférences */}
        <section className="mt-4 rounded-3xl bg-white border border-[#0A0A0A]/8 p-6">
          <h2 className="font-bold text-lg mb-4">Préférences de test</h2>
          <div className="space-y-4">
            <div>
              <span className="block text-[13px] font-semibold mb-2">Appareils <span className="text-[#0A0A0A]/35 font-normal">(plusieurs)</span></span>
              <div className="flex flex-wrap gap-2">{["Android", "iPhone / iOS", "Ordinateur / Web"].map((x) => <Chip key={x} active={d.devices.includes(x)} onClick={() => toggle("devices", x)}>{x}</Chip>)}</div>
            </div>
            <div>
              <span className="block text-[13px] font-semibold mb-2">Types d'apps préférés <span className="text-[#0A0A0A]/35 font-normal">(plusieurs)</span></span>
              <div className="flex flex-wrap gap-2">{["E-commerce", "Marketplace", "SaaS / Productivité", "Réseaux sociaux", "Fintech", "Éducation", "Jeux"].map((x) => <Chip key={x} active={d.appTypes.includes(x)} onClick={() => toggle("appTypes", x)}>{x}</Chip>)}</div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Disponibilité / semaine"><Select value={d.availability} onChange={(e) => set("availability", e.target.value)}><option value="">Choisir…</option>{["1-2 h", "3-5 h", "6-10 h", "10 h et +"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
              <Field label="Comment nous avez-vous connus ?"><Select value={d.heard} onChange={(e) => set("heard", e.target.value)}><option value="">Choisir…</option>{HEARD.map((x) => <option key={x}>{x}</option>)}</Select></Field>
            </div>
          </div>
        </section>

        {/* Save bar */}
        <div className="sticky bottom-4 mt-5 flex items-center justify-between gap-3 rounded-2xl bg-[#0A0A0A] text-white px-5 py-3 shadow-xl">
          <span className="text-sm text-white/70">{msg || "Vos informations restent confidentielles."}</span>
          <Btn as="button" onClick={save} variant="orange" disabled={busy}>{busy ? "Enregistrement…" : "Enregistrer"}</Btn>
        </div>
      </div>
    </DashboardShell>
  );
}
