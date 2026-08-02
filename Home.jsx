import React from "react";
import { Link } from "react-router-dom";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <h2 className="post-title">
        <Link to={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="post-meta">
        {post.authorUsername} · {formatDate(post.createdAt)}
      </p>
      <p className="post-excerpt">{post.excerpt}</p>
    </article>
  );
}
