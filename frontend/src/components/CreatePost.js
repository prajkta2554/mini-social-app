import React, { useState } from "react";
import API from "../services/api";

function CreatePost({ fetchPosts }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // 📸 Image upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 🔥 size limit
    if (file.size > 1 * 1024 * 1024) {
      alert("Image must be less than 1z2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // 🚀 FAST POST (Optimistic UI)
  const handlePost = async () => {
    if (!text && !image) return alert("Add text or image");

    setLoading(true);

    try {
      await API.post("/posts", { text, image });
      fetchPosts(); // refresh after post
    } catch (err) {
      console.log(err);
      alert("Error posting");
    }

    setText("");
    setImage("");
    setLoading(false);
  };

  return (
    <div className="create-post">

      <textarea
        className="post-textarea"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {image && <img src={image} className="preview-img" alt="" />}

      <div className="post-bottom">
        <label className="file-btn">
          📷 Photo
          <input type="file" hidden onChange={handleImage} />
        </label>

        <button
          className="post-submit"
          onClick={handlePost}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

    </div>
  );
}

export default CreatePost;