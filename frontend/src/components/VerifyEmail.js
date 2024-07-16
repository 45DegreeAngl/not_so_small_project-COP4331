import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VerifyEmail.css';
const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

function VerifyEmail() {

  const { email, token } = useParams();
  const [message, setMessage] = useState('');
  
  useEffect(() => {

    const doVerifyEmail = async () => {

      try {
        const response = await fetch(buildPath(`api/verify-email`), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, token })
        });

        if (!response.ok) {
          setMessage(`Account has already been verified.`);
          return;
        }

        const res = await response.json();

        if (res.error) {
          setMessage('There was an issue with your email verification.');
        } else {
          setMessage('Your email has been successfully verified and you are now registered!');
        }

      } catch (e) {
        setMessage('There was an issue with your email verification.');
      }
    };

    doVerifyEmail();
  }, [email, token]);

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        <h1 className="verify-email-title">Verify Email</h1>
        <p className='verify-email-description'>{message}</p>
        <div className="button-container d-grid gap-2">
        <a href="/login" className="btn-2 btn-link mt-2">Back to Login</a>
      </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
