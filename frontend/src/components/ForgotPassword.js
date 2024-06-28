import React from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1 className="forgot-password-title">Forgot Password</h1>
        <p className="forgot-password-description">Enter your email address to get instructions to reset your password.</p>
        <form>
          <div className="form-group">
            <input type="email" className="forgot-password-input" placeholder="Email" />
          </div>
          <button type="submit" className="forgot-password-button">Submit</button>
        </form>
        <a href="/login" className="forgot-password-back-link">Back to Login</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
