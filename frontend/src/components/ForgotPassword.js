import React, { useState } from 'react';
import './ForgotPassword.css';

const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const doForgotPassword = async (event) => {
    event.preventDefault();

    const js = JSON.stringify({ email });

    try {
      const response = await fetch(buildPath('api/forgot-password'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });

      const res = await response.json();
      if (response.ok) {
        setMessage(res.message);
      } else {
        setMessage(res.error);
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1 className="forgot-password-title">Forgot Password</h1>
        <p className="forgot-password-description">Enter your email address to get instructions to reset your password.</p>
        <form onSubmit={doForgotPassword}>
          <div className="form-group">
            <input type="email" className="forgot-password-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="forgot-password-button">Submit</button>
        </form>
        {message && <p>{message}</p>}
        <a href="/login" className="forgot-password-back-link">Back to Login</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
