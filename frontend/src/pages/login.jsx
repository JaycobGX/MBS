import React from "react";
import { Link } from "react-router-dom";
import "./login.css"; 

function Login() {
  return (
    <div className="login-container">
      <h1 className="login-title">MBS</h1>
      <div className="login-image">{/* You can add your image later */}</div>

      <form className="login-form">
        <input type="text" placeholder="Username/Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <div className="signup-link">
        New here? <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
}

export default Login;
