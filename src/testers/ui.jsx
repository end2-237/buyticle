import { Link } from "react-router-dom";
import logo from "../assets/buylogo2.png";
import { Icon } from "./icons";

/* Palette */
export const T = {
  bg: "#EDECEA",
  bgSoft: "#F5F4F2",
  ink: "#0A0A0A",
  orange: "#FF4500",
  line: "rgba(10,10,10,0.10)",
};

/* ─── Brand mark ─── */
export function BuyMark({ className = "", to = "/testers" }) {
  return (
    <Link to={to} className={`flex items-center gap-2.5 group ${className}`}>
      <img src={logo} alt="Buyticle" className="h-8 w-auto" />
      <span className="font-extrabold tracking-tight text-[#0A0A0A] group-hover:text-[#FF4500] transition-colors">
        BUYTICLE
      </span>
    </Link>
  );
}

/* ─── Buttons ─── */
export function Btn({ as = "button", to, href, variant = "primary", className = "", children, ...rest }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#0A0A0A] text-[#EDECEA] px-7 py-3.5 hover:bg-[#FF4500]",
    orange: "bg-[#FF4500] text-white px-7 py-3.5 hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(255,69,0,0.6)]",
    ghost: "border border-[#0A0A0A]/15 text-[#0A0A0A] px-7 py-3.5 hover:border-[#0A0A0A]",
    soft: "bg-[#0A0A0A]/[0.04] text-[#0A0A0A] px-5 py-2.5 hover:bg-[#0A0A0A]/[0.08]",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  const Tag = as;
  return <Tag className={cls} {...rest}>{children}</Tag>;
}

/* ─── Form field ─── */
export function Field({ label, hint, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">{label}</span>}
      {children}
      {hint && <span className="block text-[11px] text-[#0A0A0A]/40 mt-1.5">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-[#0A0A0A]/12 bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 outline-none focus:border-[#FF4500] focus:ring-2 focus:ring-[#FF4500]/15 transition";

export function Input(props) { return <input className={inputCls} {...props} />; }
export function Select({ children, ...props }) {
  return <select className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%230A0A0A%22 stroke-width=%221.6%22><path d=%22M4 6l4 4 4-4%22/></svg>')] bg-[right_0.9rem_center] bg-no-repeat pr-10`} {...props}>{children}</select>;
}

/* ─── Badges ─── */
export function StatusBadge({ status }) {
  const map = {
    en_cours: { t: "En cours", c: "bg-[#FF4500]/12 text-[#FF4500]" },
    a_venir: { t: "À venir", c: "bg-[#7A5AF8]/12 text-[#7A5AF8]" },
    termine: { t: "Terminé", c: "bg-[#0A0A0A]/8 text-[#0A0A0A]/50" },
  };
  const m = map[status] || map.en_cours;
  return <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${m.c}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-current" />{m.t}
  </span>;
}

export function VerdictBadge({ verdict }) {
  const map = {
    valide: { t: "Validé", c: "bg-emerald-500/12 text-emerald-600", i: "check-circle" },
    bug: { t: "Bug", c: "bg-red-500/12 text-red-600", i: "bug" },
    suggestion: { t: "Suggestion", c: "bg-amber-500/14 text-amber-600", i: "lightbulb" },
  };
  const m = map[verdict] || map.suggestion;
  return <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${m.c}`}><Icon name={m.i} size={13} /> {m.t}</span>;
}

/* ─── Utilities ─── */
export function timeAgo(iso) {
  const d = (Date.now() - new Date(iso)) / 1000;
  if (d < 60) return "à l'instant";
  if (d < 3600) return `il y a ${Math.floor(d / 60)} min`;
  if (d < 86400) return `il y a ${Math.floor(d / 3600)} h`;
  return `il y a ${Math.floor(d / 86400)} j`;
}

export function Stars({ value = 0, size = 14 }) {
  return (
    <span className="inline-flex" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= value ? "text-[#FF4500]" : "text-[#0A0A0A]/15"}>★</span>
      ))}
    </span>
  );
}
