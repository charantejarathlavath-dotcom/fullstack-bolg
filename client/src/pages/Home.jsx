import React, { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import PostCard from "../components/PostCard.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { posts } = await api.listPosts();
        setPosts(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="loading">Loading posts…</p>;
  if (error) return <p className="form-error">{error}</p>;

  return (
    <div>
      {posts.length === 0 ? (
        <p className="empty-state">Nothing published yet. Be the first to write something.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
