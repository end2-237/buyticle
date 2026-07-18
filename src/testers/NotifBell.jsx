import { useState, useEffect } from "react";
import { Icon } from "./icons";
import { timeAgo } from "./ui";
import { useNotifications } from "./hooks";
import { initFcm, showBrowserNotif } from "./push";

export default function NotifBell({ uid }) {
  const notifs = useNotifications(uid) || [];
  const [open, setOpen] = useState(false);
  const seenKey = `bt_notif_seen_${uid}`;
  const pushedKey = `bt_notif_pushed_${uid}`;
  const [seenAt, setSeenAt] = useState(() => Number(localStorage.getItem(seenKey) || 0));

  // Foreground browser notifications — de-dup persisted in localStorage so
  // navigating between pages (which remounts this component) never re-fires them.
  useEffect(() => {
    if (!notifs.length || !uid) return;
    const stored = localStorage.getItem(pushedKey);
    if (stored === null) {
      // First run for this device: set a baseline, don't notify existing history
      const newest = notifs.reduce((m, n) => Math.max(m, n.createdAt.getTime()), 0);
      localStorage.setItem(pushedKey, String(newest || Date.now()));
      return;
    }
    const last = Number(stored);
    const fresh = notifs.filter((n) => n.createdAt.getTime() > last).sort((a, b) => a.createdAt - b.createdAt);
    if (fresh.length) {
      fresh.forEach((n) => showBrowserNotif(n.title, n.body, "/logo-buyticle.png"));
      localStorage.setItem(pushedKey, String(Math.max(last, ...fresh.map((n) => n.createdAt.getTime()))));
    }
  }, [notifs, uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const unread = notifs.filter((n) => n.createdAt.getTime() > seenAt).length;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      initFcm(uid); // gesture-driven permission request + FCM registration
      const now = Date.now();
      localStorage.setItem(seenKey, String(now));
      setSeenAt(now);
    }
  };

  return (
    <div className="relative">
      <button onClick={toggle} className="grid place-items-center w-10 h-10 rounded-full text-[#0A0A0A]/60 hover:bg-[#0A0A0A]/[0.05] transition relative" aria-label="Notifications">
        <Icon name="bell" size={18} />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF4500] text-white text-[10px] font-bold grid place-items-center">{unread > 9 ? "9+" : unread}</span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-[340px] max-w-[90vw] bg-white rounded-2xl shadow-xl border border-[#0A0A0A]/8 z-20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#0A0A0A]/8">
              <span className="font-bold text-sm">Notifications</span>
              <span className="text-[11px] text-[#0A0A0A]/40">{notifs.length}</span>
            </div>
            <div className="max-h-[380px] overflow-y-auto">
              {notifs.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-[#0A0A0A]/40">
                  <Icon name="bell" size={22} className="mx-auto mb-2 text-[#0A0A0A]/20" />
                  Aucune notification pour l'instant.
                </div>
              )}
              {notifs.map((n) => {
                const fresh = n.createdAt.getTime() > seenAt;
                return (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-[#0A0A0A]/6 last:border-0 ${fresh ? "bg-[#FF4500]/[0.04]" : ""}`}>
                    <span className="grid place-items-center w-9 h-9 rounded-xl bg-[#FF4500]/10 text-[#FF4500] shrink-0"><Icon name={n.icon || "bell"} size={17} /></span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold leading-snug">{n.title}</div>
                      {n.body && <div className="text-[12px] text-[#0A0A0A]/55 mt-0.5 leading-snug">{n.body}</div>}
                      <div className="text-[10px] text-[#0A0A0A]/35 mt-1">{timeAgo(n.createdAt)}</div>
                    </div>
                    {fresh && <span className="w-2 h-2 rounded-full bg-[#FF4500] mt-1 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
