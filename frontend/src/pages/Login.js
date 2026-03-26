import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/feed");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="signup-container"> {/* SAME container */}

      <div className="signup-box"> {/* SAME box */}

        <h2>Welcome Back 👋</h2>

        <input
          className="input-box"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input-box"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signup-btn" onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have account? <Link to="/signup">Signup</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;