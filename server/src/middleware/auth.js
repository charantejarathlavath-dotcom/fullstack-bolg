import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, username: payload.username };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}

export function signToken(user) {
  return jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
