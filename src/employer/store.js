/* ────────────────────────────────────────────────────────────
   Buyticle — Portail Employeur (gestion des employés + tâches)
   Backend réel Firestore. Collections : employees, emp_tasks.
──────────────────────────────────────────────────────────── */
import { db } from "../firebase";
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp,
} from "firebase/firestore";

const map = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));

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
export async function addTask(data) {
  return addDoc(collection(db, "emp_tasks"), {
    title: data.title || "Nouvelle tâche",
    description: data.description || "",
    mark: data.mark || "audience",
    color: data.color || TASK_COLORS[0],
    opacity: data.opacity ?? 100,
    assigneeIds: data.assigneeIds || [],
    date: data.date || "",            // "YYYY-MM-DD"
    start: data.start || "09:00",     // "HH:MM"
    end: data.end || "10:00",
    status: data.status || "todo",
    createdAt: serverTimestamp(),
  });
}
export async function updateTask(id, patch) {
  return updateDoc(doc(db, "emp_tasks", id), patch);
}
export async function setTaskStatus(id, status) {
  return updateDoc(doc(db, "emp_tasks", id), { status });
}
export async function deleteTask(id) {
  return deleteDoc(doc(db, "emp_tasks", id));
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
