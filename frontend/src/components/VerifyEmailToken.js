import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerifyEmail.css';

const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

function VerifyEmailToken() {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const doVerifyInvite = async () => {
      try {
        const response = await fetch(buildPath(`api/verify-invite/${token}`), {
          method: 'GET'
        });

        if (!response.ok) {
          const res = await response.text();
          setMessage(res);
          return;
        }

        const res = await response.text();
        setMessage(res);
      } catch (e) {
        setMessage('There was an issue with your email verification.');
      }
    };

    doVerifyInvite();
  }, [token]);

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

export default VerifyEmailToken;
