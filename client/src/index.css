@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Inter:wght@400;500;600&display=swap');

:root {
  --bg: #ffffff;
  --surface: #fbfaf8;
  --ink: #1a1a1a;
  --muted: #6b6b6b;
  --faint: #9a9a9a;
  --accent: #b3261e;
  --accent-ink: #ffffff;
  --rule: #e3e1db;
  --rule-strong: #1a1a1a;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Source Serif 4", Georgia, serif;
  --font-ui: "Inter", -apple-system, sans-serif;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--ink);
}

body {
  font-family: var(--font-body);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--accent);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ---------- Masthead / nav ---------- */
.masthead {
  border-bottom: 2px solid var(--rule-strong);
  padding: 1.5rem 0 1rem;
  margin-bottom: 2.5rem;
}
.masthead-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.9rem;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.brand:hover {
  text-decoration: none;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-family: var(--font-ui);
  font-size: 0.9rem;
  font-weight: 500;
}
.nav-links a,
.nav-links button {
  color: var(--muted);
}
.nav-links a:hover,
.nav-links button:hover {
  color: var(--ink);
  text-decoration: none;
}

/* ---------- Buttons & forms ---------- */
.btn {
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.6rem 1.1rem;
  border-radius: 6px;
  border: 1px solid var(--rule-strong);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.btn:hover {
  background: var(--ink);
  color: #fff;
}
.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.btn-primary:hover {
  background: #8f1e18;
  border-color: #8f1e18;
}
.btn-danger {
  border-color: var(--accent);
  color: var(--accent);
}
.btn-danger:hover {
  background: var(--accent);
  color: #fff;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn:disabled:hover {
  background: transparent;
  color: var(--ink);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.1rem;
}
.field label {
  font-family: var(--font-ui);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.field input,
.field textarea {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--rule);
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  outline: none;
}
.field input:focus,
.field textarea:focus {
  border-color: var(--ink);
}
.field textarea {
  resize: vertical;
  min-height: 320px;
  line-height: 1.6;
}
.form-card {
  max-width: 480px;
  margin: 2rem auto;
}
.form-error {
  font-family: var(--font-ui);
  font-size: 0.85rem;
  color: var(--accent);
  background: rgba(179, 38, 30, 0.08);
  border: 1px solid rgba(179, 38, 30, 0.25);
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

/* ---------- Post list ---------- */
.post-card {
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--rule);
}
.post-card:first-child {
  padding-top: 0;
}
.post-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0 0 0.35rem;
  letter-spacing: -0.01em;
}
.post-title a {
  color: var(--ink);
}
.post-title a:hover {
  color: var(--accent);
  text-decoration: none;
}
.post-meta {
  font-family: var(--font-ui);
  font-size: 0.82rem;
  color: var(--faint);
  margin: 0 0 0.6rem;
}
.post-excerpt {
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.6;
  margin: 0;
}
.empty-state {
  padding: 3rem 0;
  text-align: center;
  color: var(--muted);
  font-family: var(--font-ui);
}

/* ---------- Post detail ---------- */
.article-header {
  margin-bottom: 2rem;
}
.article-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
}
.article-actions {
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
}
.prose {
  font-size: 1.15rem;
  line-height: 1.75;
  color: #2a2a2a;
  white-space: pre-wrap;
}

/* ---------- Misc ---------- */
.page-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  margin: 0 0 1.5rem;
}
.helper-text {
  font-family: var(--font-ui);
  font-size: 0.85rem;
  color: var(--muted);
  margin-top: 1rem;
}
.loading {
  font-family: var(--font-ui);
  color: var(--muted);
  padding: 2rem 0;
}
