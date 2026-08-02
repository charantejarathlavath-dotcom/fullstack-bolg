import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="masthead">
      <div className="container masthead-row">
        <Link to="/" className="brand">
          Marginalia
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/new">Write</Link>
              <Link to="/dashboard">My posts</Link>
              <span style={{ color: "var(--faint)" }}>{user.username}</span>
              <button onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
