import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80) || "post";
}

function uniqueSlug(title) {
  const base = slugify(title);
  let slug = base;
  let n = 2;
  while (db.prepare("SELECT id FROM posts WHERE slug = ?").get(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

function excerptOf(content, length = 160) {
  const plain = content.replace(/\s+/g, " ").trim();
  return plain.length > length ? `${plain.slice(0, length).trim()}…` : plain;
}

const listStmt = db.prepare(`
  SELECT posts.id, posts.slug, posts.title, posts.content, posts.created_at, posts.updated_at,
         users.username AS author_username, users.id AS author_id
  FROM posts
  JOIN users ON users.id = posts.author_id
  ORDER BY posts.created_at DESC
`);

const byAuthorStmt = db.prepare(`
  SELECT posts.id, posts.slug, posts.title, posts.content, posts.created_at, posts.updated_at,
         users.username AS author_username, users.id AS author_id
  FROM posts
  JOIN users ON users.id = posts.author_id
  WHERE posts.author_id = ?
  ORDER BY posts.created_at DESC
`);

const bySlugStmt = db.prepare(`
  SELECT posts.id, posts.slug, posts.title, posts.content, posts.created_at, posts.updated_at,
         users.username AS author_username, users.id AS author_id
  FROM posts
  JOIN users ON users.id = posts.author_id
  WHERE posts.slug = ?
`);

function toSummary(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: excerptOf(row.content),
    authorId: row.author_id,
    authorUsername: row.author_username,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toFull(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content,
    authorId: row.author_id,
    authorUsername: row.author_username,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// GET /api/posts — public feed
router.get("/", (req, res) => {
  const rows = listStmt.all();
  res.json({ posts: rows.map(toSummary) });
});

// GET /api/posts/mine — current user's posts (must come before /:slug)
router.get("/mine", requireAuth, (req, res) => {
  const rows = byAuthorStmt.all(req.user.id);
  res.json({ posts: rows.map(toSummary) });
});

// GET /api/posts/:slug — single post, public
router.get("/:slug", (req, res) => {
  const row = bySlugStmt.get(req.params.slug);
  if (!row) return res.status(404).json({ error: "Post not found" });
  res.json({ post: toFull(row) });
});

// POST /api/posts — create, requires auth
router.post("/", requireAuth, (req, res) => {
  const { title, content } = req.body || {};
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const slug = uniqueSlug(title);
  const now = Date.now();
  const info = db
    .prepare(
      "INSERT INTO posts (slug, title, content, author_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(slug, title.trim(), content, req.user.id, now, now);

  const row = db.prepare("SELECT id FROM posts WHERE id = ?").get(info.lastInsertRowid);
  const full = bySlugStmt.get(slug);
  res.status(201).json({ post: toFull(full) });
});

// PUT /api/posts/:id — update, requires auth + ownership
router.put("/:id", requireAuth, (req, res) => {
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.author_id !== req.user.id) {
    return res.status(403).json({ error: "You can only edit your own posts" });
  }

  const { title, content } = req.body || {};
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const now = Date.now();
  db.prepare("UPDATE posts SET title = ?, content = ?, updated_at = ? WHERE id = ?").run(
    title.trim(),
    content,
    now,
    post.id
  );

  const full = bySlugStmt.get(post.slug);
  res.json({ post: toFull(full) });
});

// DELETE /api/posts/:id — requires auth + ownership
router.delete("/:id", requireAuth, (req, res) => {
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.author_id !== req.user.id) {
    return res.status(403).json({ error: "You can only delete your own posts" });
  }

  db.prepare("DELETE FROM posts WHERE id = ?").run(post.id);
  res.json({ ok: true });
});

export default router;
