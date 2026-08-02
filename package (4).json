import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function PostEditor() {
  const { slug } = useParams(); // present only when editing
  const isEditing = Boolean(slug);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [postId, setPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;
    api
      .getPost(slug)
      .then(({ post }) => {
        if (post.authorId !== user?.id) {
          setError("You can only edit your own posts");
          return;
        }
        setPostId(post.id);
        setTitle(post.title);
        setContent(post.content);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, isEditing, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (isEditing) {
        const { post } = await api.updatePost(postId, { title, content });
        navigate(`/posts/${post.slug}`);
      } else {
        const { post } = await api.createPost({ title, content });
        navigate(`/posts/${post.slug}`);
      }
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <p className="loading">Loading…</p>;

  return (
    <div>
      <h1 className="page-title">{isEditing ? "Edit post" : "Write a new post"}</h1>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Saving…" : isEditing ? "Save changes" : "Publish"}
        </button>
      </form>
    </div>
  );
}
