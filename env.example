import { Router } from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";
import { requireAuth, signToken, COOKIE_OPTIONS } from "../middleware/auth.js";

const router = Router();

function publicUser(row) {
  return { id: row.id, username: row.username, email: row.email };
}

router.post("/register", (req, res) => {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are all required" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const existing = db
    .prepare("SELECT id FROM users WHERE username = ? OR email = ?")
    .get(username, email);
  if (existing) {
    return res.status(409).json({ error: "Username or email is already taken" });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const now = Date.now();
  const info = db
    .prepare(
      "INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, ?)"
    )
    .run(username, email, passwordHash, now);

  const user = { id: info.lastInsertRowid, username, email };
  const token = signToken(user);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.status(201).json({ user });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!row || !bcrypt.compareSync(password, row.password_hash)) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  const token = signToken(row);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.json({ user: publicUser(row) });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", { ...COOKIE_OPTIONS, maxAge: undefined });
  res.json({ ok: true });
});

router.get("/me", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id);
  if (!row) return res.status(404).json({ error: "User not found" });
  res.json({ user: publicUser(row) });
});

export default router;
