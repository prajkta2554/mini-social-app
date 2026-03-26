import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchPosts();
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="feed-container">

      {/* HEADER */}
      <div className="feed-header">
        <h2>Social Feed</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* CREATE POST */}
      <CreatePost fetchPosts={fetchPosts} />

      {/* POSTS */}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} fetchPosts={fetchPosts} />
      ))}

    </div>
  );
}

export default Feed;
