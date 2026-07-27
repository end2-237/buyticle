import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EmployerShell } from "../EmployerShell";
import { Icon } from "../../testers/icons";
import { useAuth } from "../../testers/AuthContext";
import { WHATSAPP_SUPPORT } from "../../testers/store";
import * as gh from "../github";

const ITEMS = [
  { icon: "message-square", name: "WhatsApp", desc: "Notifier l'équipe et le service client.", color: "#22C55E", href: `https://wa.me/${WHATSAPP_SUPPORT}`, cta: "Ouvrir" },
  { icon: "mail", name: "Email", desc: "Recevoir les récapitulatifs de tâches.", color: "#2C87F2", href: "mailto:contact@buyticle.com", cta: "Configurer" },
  { icon: "calendar", name: "Google Agenda", desc: "Synchroniser le calendrier des tâches.", color: "#F97316", href: "https://calendar.google.com", cta: "Connecter" },
  { icon: "shield", name: "Espace testeurs", desc: "Gérer le programme de testeurs Buyticle.", color: "#A855F7", href: "/testers/admin", cta: "Ouvrir" },
];

function GitHubCard() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const [status, setStatus] = useState(null);
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const refresh = () => {
    setLoading(true);
    gh.githubStatus().then((s) => {
      setStatus(s);
      if (s.connected) gh.githubListRepos().then(setRepos).catch((e) => setErr(e.message));
    }).catch((e) => setErr(e.message)).finally(() => setLoading(false));
  };
  useEffect(refresh, []);
  const justConnected = params.get("github") === "connected";
  const errorConnect = params.get("github") === "error";

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 mb-4">
      <div className="flex items-start gap-4 flex-wrap">
        <span className="w-12 h-12 rounded-xl grid place-items-center bg-slate-900 text-white shrink-0"><Icon name="git-branch" size={24} /></span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[15px]">GitHub</h3>
            {status?.connected && <span className="text-[11px] font-semibold text-green-600 bg-green-500/10 rounded-full px-2 py-0.5">Connecté</span>}
          </div>
          <p className="text-[13px] text-slate-400 mt-0.5">Créez de vraies branches, ouvrez des PR et suivez vos GitHub Actions depuis les tâches.</p>

          {justConnected && <div className="text-[12px] text-green-600 mt-2">✅ GitHub connecté avec succès.</div>}
          {errorConnect && <div className="text-[12px] text-red-500 mt-2">❌ Échec de connexion{params.get("reason") ? ` : ${params.get("reason")}` : ""}. Vérifiez la configuration (config/github) puis réessayez.</div>}
          {err && <div className="text-[12px] text-red-500 mt-2">{err}</div>}

          {loading ? (
            <div className="mt-3 text-[13px] text-slate-400">Chargement…</div>
          ) : status?.connected ? (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-[13px]">
                {status.avatar && <img src={status.avatar} alt="" className="w-6 h-6 rounded-full" />}
                <span className="font-semibold">@{status.login}</span>
                <button onClick={() => gh.githubDisconnect().then(refresh)} className="ml-2 text-[12px] text-red-500 font-semibold hover:underline">Déconnecter</button>
              </div>
              {repos && (
                <div className="mt-3">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">{repos.length} dépôts détectés</div>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                    {repos.map((r) => (
                      <a key={r.full_name} href={`https://github.com/${r.full_name}`} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[12px] font-medium bg-slate-100 hover:bg-slate-200 rounded-full px-2.5 py-1 text-slate-600">
                        {r.private && <Icon name="lock" size={11} />}{r.full_name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => gh.connectGithub(user.id)} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-[13px] font-semibold hover:bg-slate-800">
              <Icon name="git-branch" size={15} /> Connecter GitHub
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Integrations() {
  const { user } = useAuth();
  return (
    <EmployerShell title="Intégrations">
      <div className="mb-4">
        <h2 className="font-bold text-[16px] tracking-tight">Intégrations</h2>
        <p className="text-[13px] text-slate-400">Connectez vos outils au portail employeur.</p>
      </div>

      <GitHubCard />

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
