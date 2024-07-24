import React from "react";
import "./register.css";
const Register = () => {
  return (
    <div className="register-form-container">
      <div className="form-header-text">
        <span className="register-text">
          <strong>REGISTER</strong>
        </span>
      </div>
      <div className="register-form">
        <input type="text" className="input-field" placeholder="Full Name" />
        <input type="text" className="input-field" placeholder="E-mail" />
        <input type="text" className="input-field" placeholder="Phone" />
        <input type="text" className="input-field" placeholder="Password" />
        <input
          type="text"
          className="input-field"
          placeholder="Confirm Password"
        />
      </div>
    </div>
  );
};

export default Register;
