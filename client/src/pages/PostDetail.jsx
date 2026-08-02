import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getPost(slug)
      .then(({ post }) => setPost(post))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    setDeleting(true);
    try {
      await api.deletePost(post.id);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (loading) return <p className="loading">Loading…</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!post) return null;

  const isOwner = user && user.id === post.authorId;

  return (
    <article>
      <div className="article-header">
        <h1 className="article-title">{post.title}</h1>
        <p className="post-meta">
          {post.authorUsername} · {formatDate(post.createdAt)}
          {post.updatedAt !== post.createdAt && " · edited"}
        </p>
        {isOwner && (
          <div className="article-actions">
            <Link className="btn" to={`/posts/${post.slug}/edit`}>
              Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        )}
      </div>
      <div className="prose">{post.content}</div>
    </article>
  );
}
