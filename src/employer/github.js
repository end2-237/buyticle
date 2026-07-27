/* Client GitHub — appelle les Cloud Functions (le secret reste côté serveur) */
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

const GITHUB_CLIENT_ID = "Iv23lif6fAjd88glfvtQ";
const CALLBACK = "https://us-central1-buyticle-bce3f.cloudfunctions.net/githubCallback";
const fns = getFunctions(app);
const call = (name) => httpsCallable(fns, name);

/* Lance le flux OAuth (redirige vers GitHub) */
export function connectGithub(uid) {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&state=${encodeURIComponent(uid)}&redirect_uri=${encodeURIComponent(CALLBACK)}`;
  window.location.href = url;
}

export async function githubStatus() {
  const { data } = await call("githubStatus")();
  return data;
}
export async function githubDisconnect() {
  const { data } = await call("githubDisconnect")();
  return data;
}
export async function githubListRepos() {
  const { data } = await call("githubListRepos")();
  return data.repos || [];
}
export async function githubCreateBranch(repo, name, base = "main", collaborators = []) {
  const { data } = await call("githubCreateBranch")({ repo, name, base, collaborators });
  return data;
}
export async function githubAddCollaborator(repo, username, permission = "push") {
  const { data } = await call("githubAddCollaborator")({ repo, username, permission });
  return data;
}
export async function githubListCommits(repo, branch, since, until) {
  const { data } = await call("githubListCommits")({ repo, branch, since, until });
  return data.commits || [];
}
export async function githubListDeployments(repo, ref) {
  const { data } = await call("githubListDeployments")({ repo, ref });
  return data.deployments || [];
}
export async function githubCreatePR(repo, head, base, title, body) {
  const { data } = await call("githubCreatePR")({ repo, head, base, title, body });
  return data;
}
export async function githubListRuns(repo) {
  const { data } = await call("githubListRuns")({ repo });
  return data.runs || [];
}
export async function githubRerun(repo, runId) {
  const { data } = await call("githubRerun")({ repo, runId });
  return data;
}
