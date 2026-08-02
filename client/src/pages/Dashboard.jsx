import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .myPosts()
      .then(({ posts }) => setPosts(posts))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1 className="page-title">My posts</h1>
        <Link className="btn btn-primary" to="/new">
          Write a new post
        </Link>
      </div>

      {loading ? (
        <p className="loading">Loading…</p>
      ) : error ? (
        <p className="form-error">{error}</p>
      ) : posts.length === 0 ? (
        <p className="empty-state">You haven't published anything yet.</p>
      ) : (
        posts.map((post) => (
          <article className="post-card" key={post.id}>
            <h2 className="post-title">
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="post-meta">
              {formatDate(post.createdAt)}
              {post.updatedAt !== post.createdAt && " · edited"}
            </p>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="article-actions">
              <Link className="btn" to={`/posts/${post.slug}/edit`}>
                Edit
              </Link>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
