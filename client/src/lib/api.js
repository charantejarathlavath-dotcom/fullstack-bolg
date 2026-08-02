// Thin fetch wrapper. In dev, Vite proxies /api to the Express server (see
// vite.config.js), so requests are same-origin and the auth cookie is sent
// automatically. In production, deploy the API and client behind the same
// origin, or update this base URL and enable CORS credentials accordingly.

const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me"),

  listPosts: () => request("/posts"),
  myPosts: () => request("/posts/mine"),
  getPost: (slug) => request(`/posts/${slug}`),
  createPost: (payload) => request("/posts", { method: "POST", body: JSON.stringify(payload) }),
  updatePost: (id, payload) => request(`/posts/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deletePost: (id) => request(`/posts/${id}`, { method: "DELETE" }),
};
