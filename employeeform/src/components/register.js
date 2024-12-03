import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    
    const newUser = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: phone,
      password: password,
    };

    try {
   
      const response = await axios.post("http://localhost:5000/api/SignUp", newUser);
      console.log("User registered:", response.data);
      
     
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-section">
        <h1>REGISTER HERE !</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              required
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              required
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          {error && <p className="error-message">Error: {error}</p>}

          <div className="login-link">
            <p>
              If you have an account, <Link to="/login"><b>Login</b></Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
