import React, { useState } from "react";
import API from "../services/api";

function PostCard({ post, fetchPosts }) {
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);

  // ❤️ LIKE
  const handleLike = async () => {
    try {
      setLoadingLike(true);
      await API.put(`/posts/${post._id}/like`);
      fetchPosts();
    } catch (err) {
      console.log(err);
      alert("Error liking post");
    } finally {
      setLoadingLike(false);
    }
  };

  // 💬 COMMENT
  const handleComment = async () => {
    const text = prompt("Enter comment");
    if (!text) return;

    try {
      setLoadingComment(true);
      await API.post(`/posts/${post._id}/comment`, { text });
      fetchPosts();
    } catch (err) {
      console.log(err);
      alert("Error adding comment");
    } finally {
      setLoadingComment(false);
    }
  };

  return (
    <div className="post-card">

      {/* HEADER */}
      <div className="post-header">
        <div className="user-info">
          <img
            src={`https://i.pravatar.cc/150?u=${post.username}`}
            className="avatar"
            alt=""
          />
          <div>
            <div className="username">{post.username}</div>
            <div className="time">Just now</div>
          </div>
        </div>

        <button className="follow-btn">Follow</button>
      </div>

      {/* TEXT */}
      {post.text && <p className="post-text">{post.text}</p>}

      {/* IMAGE */}
      {post.image && (
        <img src={post.image} className="post-image" alt="" />
      )}

      {/* ❤️ LIKES */}
      {post.likes.length > 0 && (
        <div className="likes-list">
          ❤️ Liked by: {post.likes.join(", ")}
        </div>
      )}

      {/* 💬 COMMENTS */}
      {post.comments.length > 0 && (
        <div className="comments">
          {post.comments.map((c, i) => (
            <p key={i}>
              <b>{c.username}</b>: {c.text}
            </p>
          ))}
        </div>
      )}

      {/* ACTIONS */}
      <div className="post-actions">

        <button onClick={handleLike} disabled={loadingLike}>
          {loadingLike ? "..." : `❤️ ${post.likes.length}`}
        </button>

        <button onClick={handleComment} disabled={loadingComment}>
          {loadingComment ? "..." : `💬 ${post.comments.length}`}
        </button>

        <button>🔗</button>

      </div>

    </div>
  );
}

export default PostCard;