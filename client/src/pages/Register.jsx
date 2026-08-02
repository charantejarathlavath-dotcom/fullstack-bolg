import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h1 className="page-title">Sign up</h1>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="helper-text">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
