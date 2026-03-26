const Post = require("../models/Post");


// ✅ CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    const newPost = new Post({
      userId: req.user.id,
      username: req.user.username,
      text,
      image,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};


// ✅ GET ALL POSTS (FEED)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};


// ✅ LIKE / UNLIKE POST (TOGGLE)
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const username = req.user.username;

    if (!post) {
      return res.status(404).json("Post not found");
    }

    // 🔥 toggle like
    if (post.likes.includes(username)) {
      post.likes = post.likes.filter((u) => u !== username);
    } else {
      post.likes.push(username);
    }

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};


// ✅ COMMENT ON POST
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    post.comments.push({
      username: req.user.username,
      text: req.body.text,
    });

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};