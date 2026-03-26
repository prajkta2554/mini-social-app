import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", { username, email, password });
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-box">

        <h2>Create Account</h2>

        <input
          className="input-box"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button className="signup-btn" onClick={handleSignup}>
          Signup
        </button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;