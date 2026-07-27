/* ────────────────────────────────────────────────────────────
   Buyticle — Portail Employeur (gestion des employés + tâches)
   Backend réel Firestore. Collections : employees, emp_tasks.
──────────────────────────────────────────────────────────── */
import { db } from "../firebase";
import {
  collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where,
  onSnapshot, query, orderBy, serverTimestamp, arrayUnion,
} from "firebase/firestore";
import { pushNotif } from "../testers/store";

const map = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));

/* Types de tâches — chacun débloque des actions spécifiques */
export const TASK_KINDS = [
  { key: "standard", label: "Standard", icon: "list-checks", color: "#2C87F2", desc: "Tâche classique avec checklist et suivi." },
  { key: "branch", label: "Branche Git", icon: "git-branch", color: "#8B5CF6", desc: "Créer une branche et développer une fonctionnalité." },
  { key: "pr", label: "Pull Request", icon: "git-pull-request", color: "#22C55E", desc: "Espace de revue de code façon PR." },
  { key: "pipeline", label: "Pipeline / CI", icon: "git-action", color: "#F97316", desc: "Suivre des exécutions de pipeline et GitHub Actions." },
];
export const kindOf = (k) => TASK_KINDS.find((x) => x.key === k) || TASK_KINDS[0];
export const PR_STATES = { open: { label: "Ouverte", color: "#22C55E" }, review: { label: "En revue", color: "#F97316" }, merged: { label: "Fusionnée", color: "#8B5CF6" }, closed: { label: "Fermée", color: "#EF4444" } };
export const RUN_STATES = { running: { label: "En cours", color: "#F97316" }, success: { label: "Succès", color: "#22C55E" }, failed: { label: "Échoué", color: "#EF4444" } };

/* Palette pour les avatars / marqueurs de tâches */
export const TASK_COLORS = ["#2C87F2", "#22C55E", "#F97316", "#A855F7", "#EF4444", "#0EA5E9", "#EAB308"];
export const DEPARTMENTS = ["Développement", "Design", "Marketing", "Ventes", "Support", "Direction", "RH", "Finance"];
export const MARKS = [
  { key: "audience", label: "Audience", icon: "users" },
  { key: "personnel", label: "Personnel", icon: "briefcase" },
  { key: "reunion", label: "Réunion", icon: "message-square" },
  { key: "echeance", label: "Échéance", icon: "clock" },
];
export const TASK_STATUS = [
  { key: "todo", label: "À faire", color: "#64748B" },
  { key: "in_progress", label: "En cours", color: "#2C87F2" },
  { key: "done", label: "Terminé", color: "#22C55E" },
];

export function initials(name = "") {
  return name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
}
export function colorFor(id = "") {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % TASK_COLORS.length;
  return TASK_COLORS[h];
}

/* ─── Employés ─── */
export function subscribeEmployees(cb) {
  return onSnapshot(
    query(collection(db, "employees"), orderBy("createdAt", "desc")),
    (s) => cb(map(s)),
    (e) => console.warn("employees sub:", e.code)
  );
}
export async function addEmployee(data) {
  return addDoc(collection(db, "employees"), {
    name: data.name || "",
    email: data.email || "",
    poste: data.poste || "",
    department: data.department || DEPARTMENTS[0],
    phone: data.phone || "",
    color: data.color || TASK_COLORS[0],
    status: "active",
    createdAt: serverTimestamp(),
  });
}
export async function updateEmployee(id, patch) {
  return updateDoc(doc(db, "employees", id), patch);
}
export async function deleteEmployee(id) {
  return deleteDoc(doc(db, "employees", id));
}

/* ─── Tâches ─── */
export function subscribeTasks(cb) {
  return onSnapshot(
    query(collection(db, "emp_tasks"), orderBy("createdAt", "desc")),
    (s) => cb(map(s)),
    (e) => console.warn("emp_tasks sub:", e.code)
  );
}
export function subscribeTask(id, cb) {
  return onSnapshot(doc(db, "emp_tasks", id), (d) => cb(d.exists() ? { id: d.id, ...d.data() } : null));
}
export async function addTask(data) {
  const ref = await addDoc(collection(db, "emp_tasks"), {
    title: data.title || "Nouvelle tâche",
    description: data.description || "",
    kind: data.kind || "standard",
    mark: data.mark || "audience",
    color: data.color || TASK_COLORS[0],
    opacity: data.opacity ?? 100,
    assigneeIds: data.assigneeIds || [],
    date: data.date || "",            // "YYYY-MM-DD"
    start: data.start || "09:00",     // "HH:MM"
    end: data.end || "10:00",
    status: data.status || "todo",
    progress: data.progress ?? 0,
    checklist: data.checklist || [],  // [{ text, done }]
    project: data.project || "",
    branch: null, pr: null, runs: [],
    createdAt: serverTimestamp(),
  });
  // Notifier les employés assignés
  await notifyAssignees(data.assigneeIds || [], {
    type: "task_assigned", icon: "briefcase",
    title: "Nouvelle tâche assignée 📋",
    body: `« ${data.title || "Nouvelle tâche"} » vous a été attribuée.`,
  });
  return ref;
}
export async function updateTask(id, patch) {
  return updateDoc(doc(db, "emp_tasks", id), patch);
}
export async function setTaskStatus(id, status) {
  const patch = { status };
  if (status === "done") patch.progress = 100;
  return updateDoc(doc(db, "emp_tasks", id), patch);
}
export async function setProgress(id, progress) {
  const p = Math.max(0, Math.min(100, Math.round(progress)));
  const patch = { progress: p };
  if (p >= 100) patch.status = "done";
  else if (p > 0) patch.status = "in_progress";
  return updateDoc(doc(db, "emp_tasks", id), patch);
}
export async function setChecklist(id, checklist) {
  const done = checklist.filter((c) => c.done).length;
  const progress = checklist.length ? Math.round((done / checklist.length) * 100) : 0;
  const patch = { checklist, progress };
  if (progress >= 100 && checklist.length) patch.status = "done";
  else if (progress > 0) patch.status = "in_progress";
  return updateDoc(doc(db, "emp_tasks", id), patch);
}
export async function deleteTask(id) {
  return deleteDoc(doc(db, "emp_tasks", id));
}

/* Utilitaire : notifier une liste d'employés (email employé → uid du compte auth) */
async function notifyAssignees(employeeIds, notif) {
  for (const eid of employeeIds) {
    try {
      const snap = await getDoc(doc(db, "employees", eid));
      const email = snap.exists() ? (snap.data().email || "").toLowerCase() : "";
      if (!email) continue;
      const q = query(collection(db, "testers"), where("email", "==", email));
      const res = await getDocs(q);
      for (const t of res.docs) await pushNotif({ audience: t.id, ...notif });
    } catch { /* ignore */ }
  }
}
/* Retrouver l'employé lié à un email (pour l'espace employé) */
export async function employeeForEmail(email) {
  const e = (email || "").toLowerCase();
  const res = await getDocs(query(collection(db, "employees"), where("email", "==", e)));
  return res.empty ? null : { id: res.docs[0].id, ...res.docs[0].data() };
}

/* ─── Commentaires & activité d'une tâche ─── */
export function subscribeTaskComments(taskId, cb) {
  return onSnapshot(
    query(collection(db, "emp_tasks", taskId, "comments"), orderBy("createdAt", "asc")),
    (s) => cb(s.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate?.() ?? new Date() }))),
    (e) => console.warn("task comments sub:", e.code)
  );
}
export async function addTaskComment(taskId, { userId, userName, body, type = "comment" }) {
  const text = (body || "").trim();
  if (!text) return;
  return addDoc(collection(db, "emp_tasks", taskId, "comments"), {
    userId: userId || "system", userName: userName || "Système", body: text, type, createdAt: serverTimestamp(),
  });
}
export async function deleteTaskComment(taskId, commentId) {
  return deleteDoc(doc(db, "emp_tasks", taskId, "comments", commentId));
}
async function logActivity(taskId, actor, body) {
  return addTaskComment(taskId, { userId: actor?.id, userName: actor?.name || "Système", body, type: "activity" });
}

/* ─── Actions type-Git ─── */
export async function createBranch(task, actor, { name, base = "main", project }) {
  const branch = { name, base, project: project || task.project || "", status: "active", at: Date.now() };
  await updateDoc(doc(db, "emp_tasks", task.id), { branch, project: project || task.project || "", status: task.status === "todo" ? "in_progress" : task.status });
  await logActivity(task.id, actor, `a créé la branche \`${name}\` depuis \`${base}\`.`);
}
export async function openPR(task, actor, { title, url }) {
  const pr = { title: title || task.title, url: url || "", status: "open", at: Date.now() };
  await updateDoc(doc(db, "emp_tasks", task.id), { pr, status: "in_progress" });
  await logActivity(task.id, actor, `a ouvert une Pull Request : ${title || task.title}.`);
}
export async function setPRStatus(task, actor, status) {
  await updateDoc(doc(db, "emp_tasks", task.id), { "pr.status": status });
  await logActivity(task.id, actor, `a marqué la PR comme « ${PR_STATES[status]?.label || status} ».`);
  if (status === "merged") { await updateDoc(doc(db, "emp_tasks", task.id), { progress: 100, status: "done" }); }
}
export async function addPipelineRun(task, actor, { name, status = "running" }) {
  const run = { name: name || "Pipeline", status, at: Date.now() };
  await updateDoc(doc(db, "emp_tasks", task.id), { runs: arrayUnion(run) });
  await logActivity(task.id, actor, `a lancé le pipeline « ${run.name} ».`);
}
export async function setRunStatus(task, actor, index, status) {
  const runs = (task.runs || []).map((r, i) => (i === index ? { ...r, status } : r));
  await updateDoc(doc(db, "emp_tasks", task.id), { runs });
  await logActivity(task.id, actor, `pipeline « ${runs[index]?.name} » : ${RUN_STATES[status]?.label || status}.`);
}
export async function finalizeTask(task, actor) {
  await updateDoc(doc(db, "emp_tasks", task.id), { status: "done", progress: 100 });
  await logActivity(task.id, actor, "a finalisé la tâche ✅.");
  // Prévenir l'admin
  await pushNotif({ audience: "admins", type: "task_done", icon: "check-circle", title: "Tâche finalisée ✅", body: `« ${task.title} » a été terminée par ${actor?.name || "un employé"}.` });
}

/* ─── Helpers date ─── */
export const pad = (n) => String(n).padStart(2, "0");
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export function startOfWeek(d) {
  const x = new Date(d);
  const dow = (x.getDay() + 6) % 7; // lundi = 0
  x.setDate(x.getDate() - dow);
  x.setHours(0, 0, 0, 0);
  return x;
}
export function minutesOf(hhmm = "00:00") {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}
export function fmtTime(hhmm = "") {
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${pad(h12)}:${pad(m || 0)} ${ap}`;
}
export const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);

/* ─── Brainstorm / Idées (collaboration d'équipe) ─── */
export const IDEA_STATUS = [
  { key: "idea", label: "Idée", color: "#2C87F2" },
  { key: "planned", label: "Planifiée", color: "#F97316" },
  { key: "converted", label: "Convertie en tâche", color: "#22C55E" },
];
export function subscribeIdeas(cb) {
  return onSnapshot(
    query(collection(db, "emp_ideas"), orderBy("createdAt", "desc")),
    (s) => cb(map(s)),
    (e) => console.warn("ideas sub:", e.code)
  );
}
export async function addIdea({ user, title, body, tag }) {
  if (!title?.trim()) return;
  const authorName = user.profile?.fullName || user.email.split("@")[0];
  const ref = await addDoc(collection(db, "emp_ideas"), {
    title: title.trim(), body: (body || "").trim(), tag: tag || "général",
    authorId: user.id, authorName, votes: [], status: "idea", createdAt: serverTimestamp(),
  });
  await pushNotif({ audience: "admins", type: "idea", icon: "lightbulb", title: "Nouvelle idée proposée 💡", body: `${authorName} : « ${title.trim()} »` });
  return ref;
}
export async function toggleIdeaVote(idea, userId) {
  const voted = Array.isArray(idea.votes) && idea.votes.includes(userId);
  await updateDoc(doc(db, "emp_ideas", idea.id), { votes: voted ? arrayRemove(userId) : arrayUnion(userId) });
}
export async function setIdeaStatus(id, status) {
  return updateDoc(doc(db, "emp_ideas", id), { status });
}
export async function deleteIdea(id) {
  return deleteDoc(doc(db, "emp_ideas", id));
}
export async function convertIdeaToTask(idea, { date, assigneeIds = [] } = {}) {
  await addTask({
    title: idea.title, description: idea.body || `Idée proposée par ${idea.authorName}.`,
    kind: "standard", date: date || ymd(new Date()), assigneeIds,
  });
  await setIdeaStatus(idea.id, "converted");
}
/* Commentaires d'idée (discussion / brainstorm) */
export function subscribeIdeaComments(ideaId, cb) {
  return onSnapshot(
    query(collection(db, "emp_ideas", ideaId, "comments"), orderBy("createdAt", "asc")),
    (s) => cb(s.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate?.() ?? new Date() }))),
    (e) => console.warn("idea comments sub:", e.code)
  );
}
export async function addIdeaComment(ideaId, { user, body }) {
  const text = (body || "").trim();
  if (!text) return;
  return addDoc(collection(db, "emp_ideas", ideaId, "comments"), {
    userId: user.id, userName: user.profile?.fullName || user.email.split("@")[0], body: text, createdAt: serverTimestamp(),
  });
}

/* ─── Rappels de tâches (côté client, délivrés via FCM par la Cloud Function) ─── */
/* Génère des notifications de rappel pour l'employé connecté : échéance aujourd'hui/demain + en retard.
   Déduplication via localStorage pour ne pas spammer (une fois par tâche/type/jour). */
export async function runTaskReminders(uid, myTasks) {
  if (!uid || !myTasks?.length) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const key = ymd(today);
  let store;
  try { store = JSON.parse(localStorage.getItem("bt_emp_reminders") || "{}"); } catch { store = {}; }
  if (store.day !== key) store = { day: key, sent: [] };
  const sent = new Set(store.sent);

  for (const t of myTasks) {
    if (t.status === "done" || !t.date) continue;
    const diff = daysBetween(today, t.date + "T00:00:00");
    let kind = null, title = null, body = null;
    if (diff < 0) { kind = "late"; title = "Tâche en retard ⏰"; body = `« ${t.title} » était due le ${t.date}.`; }
    else if (diff === 0) { kind = "today"; title = "Tâche à rendre aujourd'hui 📅"; body = `« ${t.title} » — ${fmtTime(t.start)}.`; }
    else if (diff === 1) { kind = "tomorrow"; title = "Échéance demain ⏳"; body = `« ${t.title} » est prévue pour demain.`; }
    if (!kind) continue;
    const mark = `${t.id}:${kind}`;
    if (sent.has(mark)) continue;
    sent.add(mark);
    try { await pushNotif({ audience: uid, type: "reminder", icon: "clock", title, body }); } catch { /* ignore */ }
  }
  try { localStorage.setItem("bt_emp_reminders", JSON.stringify({ day: key, sent: [...sent] })); } catch { /* ignore */ }
}
