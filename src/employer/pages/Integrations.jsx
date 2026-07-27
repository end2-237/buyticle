import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import { WHATSAPP_SUPPORT } from "../../testers/store";

const ITEMS = [
  { icon: "message-square", name: "WhatsApp", desc: "Notifier l'équipe et le service client.", color: "#22C55E", href: `https://wa.me/${WHATSAPP_SUPPORT}`, cta: "Ouvrir" },
  { icon: "mail", name: "Email", desc: "Recevoir les récapitulatifs de tâches.", color: "#2C87F2", href: "mailto:contact@buyticle.com", cta: "Configurer" },
  { icon: "calendar", name: "Google Agenda", desc: "Synchroniser le calendrier des tâches.", color: "#F97316", href: "https://calendar.google.com", cta: "Connecter" },
  { icon: "shield", name: "Espace testeurs", desc: "Gérer le programme de testeurs Buyticle.", color: "#A855F7", href: "/testers/admin", cta: "Ouvrir" },
];

export default function Integrations() {
  return (
    <EmployerShell title="Intégrations">
      <div className="mb-4">
        <h2 className="font-extrabold text-[20px]">Intégrations</h2>
        <p className="text-[13px] text-slate-400">Connectez vos outils au portail employeur.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ITEMS.map((it) => (
          <div key={it.name} className="rounded-2xl bg-white border border-slate-200 p-5">
            <span className="w-11 h-11 rounded-xl grid place-items-center" style={{ background: `${it.color}18`, color: it.color }}><Icon name={it.icon} size={22} /></span>
            <h3 className="font-bold text-[15px] mt-3">{it.name}</h3>
            <p className="text-[13px] text-slate-400 mt-1 leading-snug">{it.desc}</p>
            <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 rounded-lg border border-slate-200 px-3.5 py-2 text-[13px] font-semibold text-slate-700 hover:border-[#2C87F2] hover:text-[#2C87F2] transition">
              {it.cta} <Icon name="arrow-right" size={14} />
            </a>
          </div>
        ))}
      </div>
    </EmployerShell>
  );
}
