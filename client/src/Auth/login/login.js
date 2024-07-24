import React from "react";
import "./login.css";
const Login = () => {
  return (
    <div className="login-form-container">
      <div className="form-header-text">
        <span className="login-text">
          <strong>LOGIN</strong>
        </span>
      </div>
      <div className="login-form">
        <input type="text" className="input-field" placeholder="Username" />
        <input type="text" className="input-field" placeholder="Password" />
      </div>
    </div>
  );
};

export default Login;
