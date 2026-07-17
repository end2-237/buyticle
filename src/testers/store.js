/* ────────────────────────────────────────────────────────────
   Buyticle Tester Program — self-contained data layer
   Backed by localStorage so the whole flow works end-to-end.
   Swap the internals for Firebase (already configured in
   src/firebase.js) later without touching the components.
──────────────────────────────────────────────────────────── */

const KEYS = {
  testers: "bt_testers",
  session: "bt_session",
  tests: "bt_tests",
  reviews: "bt_reviews",
};

/* WhatsApp — community contact + group invite (replace group link freely) */
export const WHATSAPP_NUMBER = "237696995879";
export const WHATSAPP_GROUP = "https://chat.whatsapp.com/Buyticle-Testeurs";

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

const read = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const write = (k, v) => { localStorage.setItem(k, JSON.stringify(v)); emit(); };

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
// tiny non-crypto obfuscation — demo only, not real security
const scramble = (s) => btoa(unescape(encodeURIComponent(`bt::${s}`)));

/* ─── Seed programs (tests) referencing real Buyticle products ─── */
const SEED_TESTS = [
  {
    id: "prog-buyticle",
    app: "Buyticle",
    title: "Buyticle App — Test interne Android",
    tag: "Application mobile",
    platform: "Android",
    version: "v2.4.0-beta",
    color: "#FF4500",
    emoji: "🛍️",
    status: "en_cours",
    startDate: "2026-06-01",
    endDate: "2026-07-15",
    durationDays: 44,
    participants: 128,
    reward: 500,
    link: "https://play.google.com/apps/internaltest/4701420296100637084",
    description:
      "Testez la nouvelle version de l'application Buyticle : parcours d'achat, paiement mobile, notifications et performances générales.",
    tasks: [
      "Créer un compte et compléter le profil",
      "Passer une commande de bout en bout",
      "Tester le paiement mobile (Mobile Money)",
      "Vérifier les notifications push",
      "Signaler tout crash ou lenteur",
    ],
  },
  {
    id: "prog-eetra",
    app: "Eetra",
    title: "Eetra — Marketplace mobile",
    tag: "Marketplace",
    platform: "Web · Mobile",
    version: "v1.2.0",
    color: "#F2A900",
    emoji: "🧺",
    status: "en_cours",
    startDate: "2026-06-10",
    endDate: "2026-07-05",
    durationDays: 25,
    participants: 74,
    reward: 350,
    link: "https://eetra.buyticle.com/",
    description:
      "Évaluez l'expérience vendeur et acheteur d'Eetra : mise en ligne d'un produit, recherche, panier et messagerie.",
    tasks: [
      "Publier une annonce produit",
      "Rechercher et filtrer des produits",
      "Contacter un vendeur via la messagerie",
      "Ajouter au panier et simuler l'achat",
    ],
  },
  {
    id: "prog-obli",
    app: "Obli Space",
    title: "Obli Space — SaaS de productivité",
    tag: "SaaS · Web App",
    platform: "Web",
    version: "v0.9.0-rc",
    color: "#7A5AF8",
    emoji: "🚀",
    status: "a_venir",
    startDate: "2026-07-20",
    endDate: "2026-08-20",
    durationDays: 31,
    participants: 0,
    reward: 400,
    link: "https://obli.space/",
    description:
      "Programme à venir : testez les espaces de travail collaboratifs, les tâches et les intégrations d'Obli Space.",
    tasks: [
      "Créer un espace de travail",
      "Inviter un collaborateur",
      "Créer et assigner des tâches",
      "Tester les intégrations",
    ],
  },
  {
    id: "prog-camille",
    app: "Camille",
    title: "Camille — Site vitrine & réservation",
    tag: "Web · Vitrine",
    platform: "Web",
    version: "v1.0.0",
    color: "#00B4D8",
    emoji: "🌿",
    status: "termine",
    startDate: "2026-04-01",
    endDate: "2026-05-01",
    durationDays: 30,
    participants: 52,
    reward: 250,
    link: "http://camille.vps.buyticle.com/",
    description:
      "Programme clôturé : ergonomie du site vitrine, formulaire de réservation et compatibilité mobile.",
    tasks: [
      "Naviguer sur toutes les pages",
      "Remplir le formulaire de réservation",
      "Tester l'affichage mobile",
    ],
  },
  {
    id: "prog-onefreestyle",
    app: "One Freestyle",
    title: "One Freestyle — E-commerce mode",
    tag: "E-commerce",
    platform: "Web",
    version: "v2.1.0",
    color: "#E94560",
    emoji: "👟",
    status: "en_cours",
    startDate: "2026-06-05",
    endDate: "2026-07-10",
    durationDays: 35,
    participants: 61,
    reward: 300,
    link: "https://www.onefreestyle.store/",
    description:
      "Testez le tunnel d'achat de One Freestyle : fiches produit, tailles, panier et paiement.",
    tasks: [
      "Parcourir le catalogue",
      "Choisir une taille et ajouter au panier",
      "Compléter le checkout",
      "Évaluer la vitesse de chargement",
    ],
  },
];

/* Static rewards / advantages of the program */
export const REWARDS = [
  { icon: "🎁", title: "Points & récompenses", text: "Cumulez des points à chaque test validé, échangeables contre des cadeaux Buyticle." },
  { icon: "⚡", title: "Accès anticipé", text: "Essayez les apps et fonctionnalités avant tout le monde, en avant-première." },
  { icon: "🏅", title: "Badges & niveaux", text: "Progressez de Testeur Débutant à Testeur Élite selon votre contribution." },
  { icon: "📜", title: "Certificat officiel", text: "Recevez un certificat de testeur Buyticle valorisable sur votre CV." },
  { icon: "💬", title: "Communauté privée", text: "Rejoignez le groupe WhatsApp des testeurs et échangez avec l'équipe produit." },
  { icon: "💸", title: "Primes bug critique", text: "Une prime en argent pour chaque bug critique découvert et confirmé." },
];

/* ─── Init ─── */
function ensureSeed() {
  if (!read(KEYS.tests, null)) write(KEYS.tests, SEED_TESTS);
  if (!read(KEYS.testers, null)) write(KEYS.testers, []);
  if (!read(KEYS.reviews, null)) write(KEYS.reviews, seedReviews());
  ensureAdmin();
}

/* A ready-to-use admin account so the admin space is reachable.
   Login: admin@buyticle.com / admin123 */
function ensureAdmin() {
  const testers = read(KEYS.testers, []);
  if (testers.some((t) => t.role === "admin")) return;
  const admin = {
    id: "admin-buyticle",
    email: "admin@buyticle.com",
    phone: WHATSAPP_NUMBER,
    whatsapp: WHATSAPP_NUMBER,
    pass: scramble("admin123"),
    role: "admin",
    profile: { fullName: "Admin Buyticle", country: "Cameroun", city: "Douala" },
    onboarded: true,
    points: 0,
    createdAt: new Date().toISOString(),
  };
  write(KEYS.testers, [admin, ...testers]);
}
function seedReviews() {
  return [
    {
      id: uid(), testId: "prog-buyticle", userId: "seed-1", userName: "Aline N.",
      verdict: "bug", rating: 3, title: "Crash au paiement Mobile Money",
      body: "L'app se ferme quand je valide un paiement Orange Money sur Android 11. Reproductible à chaque fois.",
      status: "ouvert", createdAt: "2026-06-12T09:20:00Z",
    },
    {
      id: uid(), testId: "prog-buyticle", userId: "seed-2", userName: "Boris K.",
      verdict: "suggestion", rating: 4, title: "Ajouter un mode sombre",
      body: "Un mode sombre serait top pour l'utilisation nocturne. Le reste est très fluide, bravo !",
      status: "revu", createdAt: "2026-06-13T14:05:00Z",
    },
    {
      id: uid(), testId: "prog-eetra", userId: "seed-3", userName: "Chris M.",
      verdict: "valide", rating: 5, title: "Publication d'annonce parfaite",
      body: "J'ai publié une annonce en moins d'une minute, l'upload photo est rapide. RAS.",
      status: "resolu", createdAt: "2026-06-14T11:30:00Z",
    },
  ];
}
ensureSeed();

/* ─── Auth ─── */
export function getSession() { return read(KEYS.session, null); }

export function getCurrentUser() {
  const s = getSession();
  if (!s) return null;
  return read(KEYS.testers, []).find((t) => t.id === s.userId) || null;
}

export function register({ email, phone, whatsapp, password }) {
  const testers = read(KEYS.testers, []);
  const clean = String(email || "").trim().toLowerCase();
  if (testers.some((t) => t.email === clean)) {
    throw new Error("Un compte existe déjà avec cet email.");
  }
  const user = {
    id: uid(),
    email: clean,
    phone: String(phone || "").trim(),
    whatsapp: String(whatsapp || "").trim(),
    pass: scramble(password),
    role: "tester",
    profile: {},
    onboarded: false,
    points: 0,
    createdAt: new Date().toISOString(),
  };
  write(KEYS.testers, [...testers, user]);
  write(KEYS.session, { userId: user.id });
  return user;
}

export function login({ email, password }) {
  const clean = String(email || "").trim().toLowerCase();
  const user = read(KEYS.testers, []).find((t) => t.email === clean);
  if (!user || user.pass !== scramble(password)) {
    throw new Error("Email ou mot de passe incorrect.");
  }
  write(KEYS.session, { userId: user.id });
  return user;
}

export function logout() { localStorage.removeItem(KEYS.session); emit(); }

export function completeOnboarding(profile) {
  const s = getSession();
  if (!s) throw new Error("Non connecté.");
  const testers = read(KEYS.testers, []);
  const next = testers.map((t) =>
    t.id === s.userId ? { ...t, profile: { ...t.profile, ...profile }, onboarded: true } : t
  );
  write(KEYS.testers, next);
  return next.find((t) => t.id === s.userId);
}

/* ─── Tests / programs ─── */
export function getTests() { return read(KEYS.tests, []); }
export function getTest(id) { return getTests().find((t) => t.id === id) || null; }

export function saveTest(test) {
  const tests = read(KEYS.tests, []);
  if (test.id && tests.some((t) => t.id === test.id)) {
    write(KEYS.tests, tests.map((t) => (t.id === test.id ? { ...t, ...test } : t)));
  } else {
    write(KEYS.tests, [...tests, { ...test, id: test.id || uid(), participants: test.participants || 0 }]);
  }
}
export function deleteTest(id) {
  write(KEYS.tests, read(KEYS.tests, []).filter((t) => t.id !== id));
}

/* ─── Reviews (community feedback — PR-like) ─── */
export function getReviews() {
  return read(KEYS.reviews, []).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
export function getReviewsForTest(testId) { return getReviews().filter((r) => r.testId === testId); }
export function getReviewsByUser(userId) { return getReviews().filter((r) => r.userId === userId); }

export function submitReview({ testId, verdict, rating, title, body }) {
  const user = getCurrentUser();
  if (!user) throw new Error("Non connecté.");
  const reviews = read(KEYS.reviews, []);
  const review = {
    id: uid(), testId, userId: user.id,
    userName: user.profile?.fullName || user.email.split("@")[0],
    verdict, rating: Number(rating) || 0, title, body,
    status: "ouvert", createdAt: new Date().toISOString(),
  };
  write(KEYS.reviews, [...reviews, review]);
  // award points + increment participation
  const pts = verdict === "bug" ? 50 : verdict === "suggestion" ? 30 : 20;
  const testers = read(KEYS.testers, []);
  write(KEYS.testers, testers.map((t) => (t.id === user.id ? { ...t, points: (t.points || 0) + pts } : t)));
  return review;
}

export function setReviewStatus(id, status) {
  write(KEYS.reviews, read(KEYS.reviews, []).map((r) => (r.id === id ? { ...r, status } : r)));
}
export function deleteReview(id) {
  write(KEYS.reviews, read(KEYS.reviews, []).filter((r) => r.id !== id));
}

/* ─── Admin ─── */
export function getTesters() { return read(KEYS.testers, []); }
export function deleteTester(id) {
  write(KEYS.testers, read(KEYS.testers, []).filter((t) => t.id !== id));
}

/* ─── Derived stats for the dashboard ─── */
export function getUserStats(userId) {
  const mine = getReviewsByUser(userId);
  const tests = getTests();
  const active = tests.filter((t) => t.status === "en_cours").length;
  const validated = mine.filter((r) => r.verdict === "valide").length;
  const bugs = mine.filter((r) => r.verdict === "bug").length;
  const avg = mine.length ? Math.round((mine.reduce((s, r) => s + (r.rating || 0), 0) / mine.length) * 20) : 0;
  const user = getTesters().find((t) => t.id === userId);
  return {
    total: mine.length, validated, bugs,
    activePrograms: active, avgScore: avg,
    points: user?.points || 0,
  };
}
