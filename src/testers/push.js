/* Web push + browser notifications.
   In-app + foreground browser notifications work out of the box.
   Background push (app closed) additionally needs:
     1) a VAPID key below (Firebase Console → Project settings → Cloud Messaging → Web Push certificates)
     2) a sender (Cloud Function) — see functions/notifications example. */
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { app } from "../firebase";
import { saveFcmToken } from "./store";

// Clé publique "Web Push certificates" (Firebase Console → Cloud Messaging)
const VAPID_KEY = "BOcfE6EXYg4jGvNTn5WP-scqF_9EAbo2I4Br2h0CyDJkDNww9HTvaK3yrff3QIT6ehiwSTArIhsp7UUK1Qd6bvc";

export function canNotify() {
  return typeof window !== "undefined" && "Notification" in window;
}

export async function requestNotifPermission() {
  if (!canNotify()) return "unsupported";
  if (Notification.permission !== "default") return Notification.permission;
  try { return await Notification.requestPermission(); } catch { return "default"; }
}

export function showBrowserNotif(title, body, icon, tag) {
  try {
    if (canNotify() && Notification.permission === "granted") {
      new Notification(title, {
        body: body || "",
        icon: icon || "/logo-buyticle.png",
        badge: "/logo-buyticle.png",
        tag: tag || undefined,   // same tag ⇒ the browser replaces, never stacks a duplicate
        renotify: false,
      });
    }
  } catch { /* ignore */ }
}

let fcmInited = false;
export async function initFcm(uid) {
  if (fcmInited) return;
  fcmInited = true;
  try {
    const perm = await requestNotifPermission();
    if (perm !== "granted") return;
    if (!(await isSupported())) return;

    let reg;
    if ("serviceWorker" in navigator) {
      reg = await navigator.serviceWorker.register("/firebase-messaging-sw.js").catch(() => null);
    }
    const messaging = getMessaging(app);
    // Foreground messages: do NOT show a notification here — the in-app
    // Firestore listener (NotifBell) already shows it, so this avoids a double.
    onMessage(messaging, () => { /* handled in-app */ });
    // Register this device's token for background push (only if a VAPID key is set)
    if (VAPID_KEY) {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: reg || undefined }).catch(() => null);
      if (token && uid) await saveFcmToken(uid, token);
    }
  } catch { /* push is optional */ }
}
