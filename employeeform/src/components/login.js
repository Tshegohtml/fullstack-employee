import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    setLoading(true); 
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", response.data.token); // Store the token
      navigate("/employee-info"); 
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-section">
        <h1>PLEASE LOGIN</h1>
        <form>
          <div className="input-group">
            <label htmlFor="email">Enter your email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Enter password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <Link to="/forgotpassword">Forgot Password</Link>

          <div className="input-group">
            <button type="button" className="Login-btt" onClick={handleLogin}>
              {loading ? "Loading..." : "Login"} 
            </button>
          </div>

          {error && <p className="error-message">Error: {error}</p>}

          <p>
            Don't have an account yet?{" "}
            <Link to="/register">
              <b>Sign Up!</b>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
