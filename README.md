# Marginalia

A full-stack blog with authentication — Express + SQLite API, React + Vite client, JWT auth via httpOnly cookies.

Anyone can read posts. Signed-in users can write, edit, and delete their own posts.

## Features

- **Auth** — register, log in, log out; sessions via a JWT stored in an `httpOnly` cookie (not readable by JS, so it isn't exposed to XSS)
- **Posts** — create, edit, and delete posts you authored; posts are public to read
- **Ownership enforcement** — the API checks the post's `author_id` against the logged-in user on every edit/delete, not just the UI
- **Dashboard** — a signed-in user's own posts in one place
- **SQLite storage** — no external database to install; the DB file is created automatically on first run

## Tech stack

**Server**
- [Express](https://expressjs.com/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — embedded SQL database
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — auth
- `cookie-parser`, `cors`, `dotenv`

**Client**
- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [react-router-dom](https://reactrouter.com/)

## Project structure

```
fullstack-blog/
├── server/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── index.js          # Express app entry point
│       ├── db.js             # SQLite connection + schema
│       ├── middleware/
│       │   └── auth.js       # JWT verification, cookie config
│       └── routes/
│           ├── auth.js       # register / login / logout / me
│           └── posts.js      # post CRUD + ownership checks
└── client/
    ├── package.json
    ├── vite.config.js        # dev proxy: /api → localhost:4000
    └── src/
        ├── main.jsx
        ├── App.jsx           # routes
        ├── index.css
        ├── lib/api.js        # fetch wrapper
        ├── context/AuthContext.jsx
        ├── components/       # Navbar, PostCard, ProtectedRoute
        └── pages/            # Home, Login, Register, PostDetail,
                               # PostEditor, Dashboard
```

## Getting started

You'll run two processes: the API server and the Vite dev server.

### 1. Server

```bash
cd server
npm install
cp .env.example .env   # then edit JWT_SECRET to something random
npm run dev
```

The API starts on `http://localhost:4000`. A `blog.db` SQLite file is created automatically in `server/` on first run — nothing else to set up.

### 2. Client

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The app opens on `http://localhost:5173`. Vite proxies any request to `/api/*` through to the server on port 4000, so in development the browser treats everything as same-origin and the auth cookie works without extra CORS configuration.

## How auth works

1. On register/login, the server signs a JWT (`{ sub: userId, username }`) and sets it as an `httpOnly`, `sameSite=lax` cookie named `token`.
2. The browser sends that cookie automatically on every request to the API (`credentials: "include"` in `lib/api.js`).
3. `requireAuth` middleware verifies the cookie on protected routes and attaches `req.user`.
4. Post-level ownership is checked server-side (`post.author_id === req.user.id`) before allowing edit or delete — the client hiding a button is not the security boundary.

Passwords are hashed with bcrypt (10 salt rounds) before being stored; the API never returns `password_hash`.

## Deploying to production

- Set a strong, random `JWT_SECRET` and `NODE_ENV=production` (this flips the cookie's `secure` flag on, so it only travels over HTTPS).
- Serve the client and API from the same origin (or configure `CLIENT_ORIGIN` and CORS properly if they're split across domains) so the cookie is sent correctly.
- `better-sqlite3` is fine for a single-server deployment; if you need multiple server instances, move to a hosted Postgres/MySQL database instead — the query layer is isolated in `server/src/db.js` and `routes/*.js`, so swapping it out doesn't touch the rest of the app.

## Known limitations / roadmap

This is a deliberately focused MVP. Not included yet:

- **Comments** on posts
- **Rich text / Markdown** editing (posts are stored and rendered as plain text)
- **Image uploads**
- **Pagination** on the post feed (currently loads everything)
- **Password reset / email verification**
- **Drafts** — every published post is immediately public; there's no draft state

## License

MIT — do whatever you'd like with this.
