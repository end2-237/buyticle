import { Link } from "react-router-dom";
import { BuyMark, Btn } from "../ui";
import { Icon, WhatsAppIcon } from "../icons";
import { useAuth } from "../AuthContext";
import { WHATSAPP_GROUP } from "../store";

export default function Success() {
  const { user } = useAuth();
  const name = user?.profile?.fullName?.split(" ")[0] || "Testeur";

  return (
    <div className="font-jakarta min-h-screen bg-[#EDECEA] text-[#0A0A0A] flex flex-col">
      <header className="px-5 md:px-10 py-6"><BuyMark /></header>

      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-xl text-center">
          {/* Success mark */}
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full bg-[#FF4500]/15 animate-ping" style={{ animationDuration: "2.5s" }} />
            <div className="relative w-24 h-24 rounded-full bg-[#FF4500] grid place-items-center text-white shadow-[0_20px_40px_-15px_rgba(255,69,0,0.7)]"><Icon name="check" size={48} strokeWidth={2.5} /></div>
          </div>

          <h1 className="text-[clamp(30px,6vw,52px)] font-extrabold tracking-[-0.02em] mt-8 leading-tight">
            Bienvenue dans la communauté, {name} !
          </h1>
          <p className="text-[#0A0A0A]/55 mt-4 max-w-md mx-auto">
            Votre compte testeur est prêt. Rejoignez le groupe WhatsApp pour recevoir les prochains
            tests, puis explorez les programmes en cours et donnez votre premier avis.
          </p>

          {/* Primary CTAs */}
          <div className="grid sm:grid-cols-2 gap-4 mt-10 text-left">
            <a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer"
              className="group rounded-3xl border border-[#25D366]/30 bg-[#25D366]/[0.06] p-6 hover:border-[#25D366] transition">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#128C4A]"><WhatsAppIcon size={26} /></span>
              <h3 className="font-extrabold text-lg mt-3">Rejoindre le WhatsApp</h3>
              <p className="text-[#0A0A0A]/55 text-sm mt-1">Le groupe officiel des testeurs Buyticle.</p>
              <span className="inline-flex items-center gap-1.5 text-[#128C4A] font-semibold text-sm mt-4 group-hover:gap-2.5 transition-all">Ouvrir le groupe <Icon name="arrow-right" size={15} /></span>
            </a>

            <Link to="/testers/tests"
              className="group rounded-3xl border border-[#FF4500]/30 bg-[#FF4500]/[0.06] p-6 hover:border-[#FF4500] transition">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#FF4500]/15 text-[#FF4500]"><Icon name="pen" size={24} /></span>
              <h3 className="font-extrabold text-lg mt-3">Donner mon avis</h3>
              <p className="text-[#0A0A0A]/55 text-sm mt-1">Choisissez un test et partagez votre retour.</p>
              <span className="inline-flex items-center gap-1.5 text-[#FF4500] font-semibold text-sm mt-4 group-hover:gap-2.5 transition-all">Voir les tests <Icon name="arrow-right" size={15} /></span>
            </Link>
          </div>

          <div className="mt-8">
            <Btn to="/testers/dashboard" variant="primary">Aller à mon tableau de bord</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
