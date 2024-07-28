
import React, { useState, useEffect } from 'react';
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
  const [timer, setTimer] = useState(120);
  const [disable, setDisable] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const doForgotPassword = async (event) => {
    event.preventDefault();

     
    setDisableButton(true);
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
        setDisable(true);
        setTimer(120);
      } else {
        alert(res.error);
      }
    } catch (e) {
      alert('An error has occurred');
      return;
    } finally {
      setDisableButton(false);
    }
  };

   
  useEffect(() => {
    if (disable) {
      let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          if (lastTimerCount <= 1) {
            clearInterval(interval);
            setDisable(false);
            return lastTimerCount;
          }
          return lastTimerCount - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [disable]);

  return (
     
    <div className="forgot-password-container">
      <div className="forgot-password-card">

     
        {disable ? (
          <div>
            <h1 className="forgot-password-title">Email Sent</h1>
            <p className="forgot-password-description">
              An email has been sent to <span className="email-style">{email}</span>. Follow the instructions in the email to reset your password.
            </p>
            <p className="forgot-password-description">
              You can resend an email in <span className="timer-style">{timer}</span>s.
            </p>
          </div>
        ) : (

           
          <div>
            <h1 className="forgot-password-title">Forgot Password</h1>
     
            <p className="forgot-password-description">Enter your email address to get instructions to reset your password.</p>
            <form onSubmit={doForgotPassword}>
     
              <div className="form-group">
                <input
                  type="email"
                  className="formItem"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

                     
              <button type="submit" className="btn" disabled={disableButton}>
                     
                {disableButton ? 'Submitting...' : 'Submit'}

              </button>
            </form>
          </div>
        )}
        <a href="/login" className="forgot-password-back-link">Back to Login</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
