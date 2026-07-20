/* ────────────────────────────────────────────────────────────
   Buyticle Tester Program — Firestore + Firebase Auth data layer
   Real database (collections: tests, testers, reviews).
──────────────────────────────────────────────────────────── */
import { db, auth } from "../firebase";
import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, where, serverTimestamp, writeBatch, increment, arrayUnion,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  GoogleAuthProvider, signInWithPopup,
} from "firebase/auth";

export const WHATSAPP_NUMBER = "237696995879";
export const WHATSAPP_SUPPORT = "237640349236"; // service client
export const WHATSAPP_GROUP = "https://chat.whatsapp.com/CY3CbFlMIZNBhNVOUriIFq?s=sw&p=i&ilr=4&amv=2";
export const ADMIN_EMAIL = "admin@buyticle.com";
export const ADMIN_PASSWORD = "admin123";

const shot = (url) => `https://image.thum.io/get/width/900/crop/560/noanimate/${url}`;

/* Static rewards / advantages */
export const REWARDS = [
  { icon: "gift", title: "Points & récompenses", text: "Cumulez des points à chaque test validé, échangeables contre des cadeaux Buyticle." },
  { icon: "zap", title: "Accès anticipé", text: "Essayez les apps et fonctionnalités avant tout le monde, en avant-première." },
  { icon: "award", title: "Badges & niveaux", text: "Progressez de Testeur Débutant à Testeur Élite selon votre contribution." },
  { icon: "scroll", title: "Certificat officiel", text: "Recevez un certificat de testeur Buyticle valorisable sur votre CV." },
  { icon: "message-circle", title: "Communauté privée", text: "Rejoignez le groupe WhatsApp des testeurs et échangez avec l'équipe produit." },
  { icon: "banknote", title: "Primes bug critique", text: "Une prime en argent pour chaque bug critique découvert et confirmé." },
];

/* Seed programs — with live cover screenshots of the real apps */
const SEED_TESTS = [
  {
    id: "prog-buyticle", app: "Buyticle", title: "Buyticle App — Test interne Android",
    tag: "Application mobile", platform: "Android", version: "v2.4.0-beta", color: "#FF4500", icon: "shopping-bag",
    cover: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=70",
    status: "en_cours", startDate: "2026-06-01", endDate: "2026-07-15", durationDays: 44, participants: 128, reward: 500,
    link: "https://play.google.com/apps/internaltest/4701420296100637084",
    description: "Testez la nouvelle version de l'application Buyticle : parcours d'achat, paiement mobile, notifications et performances générales.",
    tasks: ["Créer un compte et compléter le profil", "Passer une commande de bout en bout", "Tester le paiement mobile (Mobile Money)", "Vérifier les notifications push", "Signaler tout crash ou lenteur"],
  },
  {
    id: "prog-eetra", app: "Eetra", title: "Eetra — Marketplace mobile",
    tag: "Marketplace", platform: "Web · Mobile", version: "v1.2.0", color: "#F2A900", icon: "shopping-cart",
    cover: shot("https://eetra.buyticle.com/"),
    status: "en_cours", startDate: "2026-06-10", endDate: "2026-07-05", durationDays: 25, participants: 74, reward: 350,
    link: "https://eetra.buyticle.com/",
    description: "Évaluez l'expérience vendeur et acheteur d'Eetra : mise en ligne d'un produit, recherche, panier et messagerie.",
    tasks: ["Publier une annonce produit", "Rechercher et filtrer des produits", "Contacter un vendeur via la messagerie", "Ajouter au panier et simuler l'achat"],
  },
  {
    id: "prog-obli", app: "Obli Space", title: "Obli Space — SaaS de productivité",
    tag: "SaaS · Web App", platform: "Web", version: "v0.9.0-rc", color: "#7A5AF8", icon: "layers",
    cover: shot("https://obli.space/"),
    status: "a_venir", startDate: "2026-07-20", endDate: "2026-08-20", durationDays: 31, participants: 0, reward: 400,
    link: "https://obli.space/",
    description: "Programme à venir : testez les espaces de travail collaboratifs, les tâches et les intégrations d'Obli Space.",
    tasks: ["Créer un espace de travail", "Inviter un collaborateur", "Créer et assigner des tâches", "Tester les intégrations"],
  },
  {
    id: "prog-camille", app: "Camille", title: "Camille — Site vitrine & réservation",
    tag: "Web · Vitrine", platform: "Web", version: "v1.0.0", color: "#00B4D8", icon: "leaf",
    cover: shot("http://camille.vps.buyticle.com/"),
    status: "termine", startDate: "2026-04-01", endDate: "2026-05-01", durationDays: 30, participants: 52, reward: 250,
    link: "http://camille.vps.buyticle.com/",
    description: "Programme clôturé : ergonomie du site vitrine, formulaire de réservation et compatibilité mobile.",
    tasks: ["Naviguer sur toutes les pages", "Remplir le formulaire de réservation", "Tester l'affichage mobile"],
  },
  {
    id: "prog-onefreestyle", app: "One Freestyle", title: "One Freestyle — E-commerce mode",
    tag: "E-commerce", platform: "Web", version: "v2.1.0", color: "#E94560", icon: "shirt",
    cover: shot("https://www.onefreestyle.store/"),
    status: "en_cours", startDate: "2026-06-05", endDate: "2026-07-10", durationDays: 35, participants: 61, reward: 300,
    link: "https://www.onefreestyle.store/",
    description: "Testez le tunnel d'achat de One Freestyle : fiches produit, tailles, panier et paiement.",
    tasks: ["Parcourir le catalogue", "Choisir une taille et ajouter au panier", "Compléter le checkout", "Évaluer la vitesse de chargement"],
  },
];

const SEED_REVIEWS = [
  { testId: "prog-buyticle", userId: "seed-1", userName: "Aline N.", verdict: "bug", rating: 3, title: "Crash au paiement Mobile Money", body: "L'app se ferme quand je valide un paiement Orange Money sur Android 11. Reproductible à chaque fois.", status: "ouvert" },
  { testId: "prog-buyticle", userId: "seed-2", userName: "Boris K.", verdict: "suggestion", rating: 4, title: "Ajouter un mode sombre", body: "Un mode sombre serait top pour l'utilisation nocturne. Le reste est très fluide, bravo !", status: "revu" },
  { testId: "prog-eetra", userId: "seed-3", userName: "Chris M.", verdict: "valide", rating: 5, title: "Publication d'annonce parfaite", body: "J'ai publié une annonce en moins d'une minute, l'upload photo est rapide. RAS.", status: "resolu" },
];

/* ─── Seeding (runs once; safe to call repeatedly) ─── */
let seeded = false;
export async function ensureSeed() {
  if (seeded) return;
  seeded = true;
  try {
    const tSnap = await getDocs(collection(db, "tests"));
    if (tSnap.empty) {
      const batch = writeBatch(db);
      SEED_TESTS.forEach((t) => batch.set(doc(db, "tests", t.id), t));
      await batch.commit();
    }
    const rSnap = await getDocs(collection(db, "reviews"));
    if (rSnap.empty) {
      const batch = writeBatch(db);
      SEED_REVIEWS.forEach((r) => batch.set(doc(collection(db, "reviews")), { ...r, createdAt: serverTimestamp() }));
      await batch.commit();
    }
  } catch (e) { seeded = false; console.warn("Seed skipped:", e?.code || e?.message); }
}

/* ─── Auth ─── */
export async function registerUser({ email, phone, whatsapp, password }) {
  const clean = String(email).trim().toLowerCase();
  const cred = await createUserWithEmailAndPassword(auth, clean, password);
  await setDoc(doc(db, "testers", cred.user.uid), {
    email: clean, phone: String(phone || "").trim(), whatsapp: String(whatsapp || phone || "").trim(),
    role: "tester", profile: {}, onboarded: false, points: 0, createdAt: serverTimestamp(),
  });
  await pushNotif({ audience: cred.user.uid, type: "welcome", icon: "award", title: "Bienvenue chez Buyticle ! 🎉", body: "Complétez votre profil et rejoignez votre premier test." });
  await pushNotif({ audience: "admins", type: "new_tester", icon: "users", title: "Nouveau testeur inscrit", body: `${clean} a rejoint le programme.` });
  return cred.user;
}
export async function loginUser({ email, password }) {
  return signInWithEmailAndPassword(auth, String(email).trim().toLowerCase(), password);
}
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return signInWithPopup(auth, provider);
}
export async function logoutUser() { return signOut(auth); }

export function authError(e) {
  const map = {
    "auth/email-already-in-use": "Un compte existe déjà avec cet email.",
    "auth/invalid-email": "Adresse email invalide.",
    "auth/weak-password": "Mot de passe trop faible (6 caractères minimum).",
    "auth/invalid-credential": "Email ou mot de passe incorrect.",
    "auth/wrong-password": "Email ou mot de passe incorrect.",
    "auth/user-not-found": "Aucun compte trouvé avec cet email.",
    "auth/too-many-requests": "Trop de tentatives. Réessayez dans un instant.",
    "auth/network-request-failed": "Problème de connexion. Vérifiez votre réseau.",
    "auth/popup-closed-by-user": "Connexion Google annulée.",
    "auth/popup-blocked": "La fenêtre Google a été bloquée par le navigateur.",
    "auth/operation-not-allowed": "La connexion Google n'est pas activée sur ce projet.",
    "auth/unauthorized-domain": "Ce domaine n'est pas autorisé pour la connexion Google.",
  };
  return map[e?.code] || "Une erreur est survenue. Réessayez.";
}

/* Ensure a profile doc exists for a signed-in user; returns the merged profile */
export async function ensureTesterDoc(uid, email) {
  const ref = doc(db, "testers", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    const role = email === ADMIN_EMAIL ? "admin" : data.role || "tester";
    return { id: uid, ...data, role };
  }
  const isAdmin = email === ADMIN_EMAIL;
  const fresh = { email, phone: "", whatsapp: "", role: isAdmin ? "admin" : "tester", profile: isAdmin ? { fullName: "Admin Buyticle", city: "Douala", country: "Cameroun" } : {}, onboarded: isAdmin, points: 0, createdAt: serverTimestamp() };
  await setDoc(ref, fresh);
  if (!isAdmin) {
    await pushNotif({ audience: uid, type: "welcome", icon: "award", title: "Bienvenue chez Buyticle ! 🎉", body: "Complétez votre profil et rejoignez votre premier test." });
    await pushNotif({ audience: "admins", type: "new_tester", icon: "users", title: "Nouveau testeur inscrit", body: `${email} a rejoint le programme (via Google).` });
  }
  return { id: uid, ...fresh };
}
export async function completeOnboarding(uid, profile) {
  await updateDoc(doc(db, "testers", uid), { profile, onboarded: true });
}
export async function saveProfile(uid, { phone, whatsapp, profile }) {
  const patch = { onboarded: true };
  if (phone !== undefined) patch.phone = String(phone).trim();
  if (whatsapp !== undefined) patch.whatsapp = String(whatsapp).trim();
  if (profile !== undefined) patch.profile = profile;
  await updateDoc(doc(db, "testers", uid), patch);
}

/* ─── Tests / programs ─── */
const mapDocs = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));
export function subscribeTests(cb) {
  return onSnapshot(collection(db, "tests"), (s) => cb(mapDocs(s)), (e) => console.warn("tests sub:", e.code));
}
export async function saveTest(t) {
  if (t.id) { await setDoc(doc(db, "tests", t.id), { ...t }, { merge: true }); return t.id; }
  const ref = await addDoc(collection(db, "tests"), { ...t, participants: t.participants || 0 });
  // Broadcast: a new program is available / upcoming
  await pushNotif({
    audience: "all",
    type: t.status === "a_venir" ? "test_upcoming" : "test_new",
    title: t.status === "a_venir" ? "Nouveau test à venir" : "Nouveau test disponible",
    body: `${t.app} — ${t.title}`,
    icon: t.status === "a_venir" ? "clock" : "rocket",
  });
  return ref.id;
}
export async function deleteTest(id) { await deleteDoc(doc(db, "tests", id)); }

/* ─── Reviews ─── */
const mapReviews = (snap) => snap.docs.map((d) => {
  const data = d.data();
  return { id: d.id, ...data, createdAt: data.createdAt?.toDate?.() ?? new Date() };
});
export function subscribeReviews(cb) {
  return onSnapshot(query(collection(db, "reviews"), orderBy("createdAt", "desc")),
    (s) => cb(mapReviews(s)), (e) => console.warn("reviews sub:", e.code));
}
export async function submitReview({ testId, verdict, rating, title, body, user, appName }) {
  await addDoc(collection(db, "reviews"), {
    testId, userId: user.id, userName: user.profile?.fullName || user.email.split("@")[0],
    verdict, rating: Number(rating) || 0, title, body, status: "ouvert", createdAt: serverTimestamp(),
  });
  const pts = verdict === "bug" ? 50 : verdict === "suggestion" ? 30 : 20;
  try { await updateDoc(doc(db, "testers", user.id), { points: increment(pts) }); } catch { /* ignore */ }
  await pushNotif({
    audience: user.id, type: "points", icon: "gift",
    title: `+${pts} points gagnés 🎉`,
    body: `Merci pour votre retour${appName ? ` sur ${appName}` : ""} !`,
  });
  // Prévenir l'équipe admin du nouveau retour
  const reviewer = user.profile?.fullName || user.email.split("@")[0];
  await pushNotif({
    audience: "admins", type: "new_review", icon: "message-square",
    title: "Nouveau retour reçu",
    body: `${reviewer}${appName ? ` sur ${appName}` : ""} : ${title}`,
  });
}
export async function setReviewStatus(id, status, ownerId, reviewTitle) {
  await updateDoc(doc(db, "reviews", id), { status });
  if (ownerId) {
    const map = { resolu: "résolu", revu: "revu par l'équipe", ouvert: "rouvert" };
    const label = map[status] || status;
    const title = status === "revu" ? "Votre retour a été revu 👀" : status === "resolu" ? "Votre retour est résolu ✅" : "Statut de votre retour mis à jour";
    const what = reviewTitle ? `« ${reviewTitle} »` : "Votre retour";
    await pushNotif({
      audience: ownerId, type: "review_status", icon: "check-circle",
      title,
      body: `${what} a été marqué comme ${label} par l'équipe Buyticle.`,
    });
  }
}
export async function deleteReview(id) { await deleteDoc(doc(db, "reviews", id)); }

/* ─── Commentaires sur un retour (échange entre testeurs) ─── */
export function subscribeComments(reviewId, cb) {
  return onSnapshot(
    query(collection(db, "reviews", reviewId, "comments"), orderBy("createdAt", "asc")),
    (s) => cb(s.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate?.() ?? new Date() }))),
    (e) => console.warn("comments sub:", e.code)
  );
}
export async function addComment(reviewId, { user, body, review }) {
  const text = (body || "").trim();
  if (!text) return;
  const userName = user.profile?.fullName || user.email.split("@")[0];
  await addDoc(collection(db, "reviews", reviewId, "comments"), {
    userId: user.id, userName, body: text, createdAt: serverTimestamp(),
  });
  // Prévenir l'auteur du retour (sauf s'il commente le sien)
  if (review && review.userId && review.userId !== user.id) {
    await pushNotif({
      audience: review.userId, type: "comment", icon: "message-square",
      title: "Nouveau commentaire sur votre retour 💬",
      body: `${userName} a commenté « ${review.title} ».`,
    });
  }
}
export async function deleteComment(reviewId, commentId) {
  await deleteDoc(doc(db, "reviews", reviewId, "comments", commentId));
}

/* ─── Notifications ─── */
// audience = a user uid OR "all" for a broadcast
export async function pushNotif({ audience, type, title, body, icon }) {
  try {
    await addDoc(collection(db, "notifications"), {
      audience, type: type || "info", title, body: body || "", icon: icon || "bell", createdAt: serverTimestamp(),
    });
  } catch (e) { console.warn("notif:", e?.code || e?.message); }
}
// Live notifications for a user (their own + broadcasts + admins if admin)
export function subscribeNotifications(uid, isAdmin, cb) {
  const audiences = [uid, "all"];
  if (isAdmin) audiences.push("admins");
  const q = query(collection(db, "notifications"), where("audience", "in", audiences));
  return onSnapshot(q, (s) => {
    const list = s.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate?.() ?? new Date() }));
    list.sort((a, b) => b.createdAt - a.createdAt);
    cb(list);
  }, (e) => console.warn("notif sub:", e.code));
}
// Save a device's FCM token on the user's profile (for background push)
export async function saveFcmToken(uid, token) {
  try { await updateDoc(doc(db, "testers", uid), { fcmTokens: arrayUnion(token) }); } catch { /* ignore */ }
}

/* ─── Testers (admin) ─── */
export function subscribeTesters(cb) {
  return onSnapshot(collection(db, "testers"), (s) => cb(mapDocs(s)), (e) => console.warn("testers sub:", e.code));
}
export async function deleteTester(id) { await deleteDoc(doc(db, "testers", id)); }

/* ─── Derived stats ─── */
export function computeStats(reviews, tests, userId) {
  const mine = reviews.filter((r) => r.userId === userId);
  const validated = mine.filter((r) => r.verdict === "valide").length;
  const bugs = mine.filter((r) => r.verdict === "bug").length;
  const avg = mine.length ? Math.round((mine.reduce((s, r) => s + (r.rating || 0), 0) / mine.length) * 20) : 0;
  return { total: mine.length, validated, bugs, activePrograms: tests.filter((t) => t.status === "en_cours").length, avgScore: avg };
}
