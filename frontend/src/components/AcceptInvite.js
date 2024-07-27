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

function AcceptInvite() {


  const { token } = useParams();
  const [message, setMessage] = useState('');


  useEffect(() => {
    const doAcceptInvite = async () => {


      try {
        const response = await fetch(buildPath(`api/accept-invite/${token}`), {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const contentType = response.headers.get('content-type');


        if (contentType && contentType.indexOf('application/json') !== -1) {


          const res = await response.json();
          if (res.error) {
            setMessage('There was an issue with accepting your invite.');
          } else {
            setMessage('Your invite has been successfully accepted and you are now a team member!');
          }



        } else {
          setMessage('Invite accepted, redirecting to login.');
        
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
        }
      } catch (e) {
        console.error('Error accepting invite:', e);
        setMessage('There was an issue with accepting your invite.');
      }
    };

    doAcceptInvite();
  }, [token]);

  return (

    <div className="verify-email-container">

      <div className="verify-email-card">

        <h1 className="verify-email-title">Accept Invite</h1>

        <p className='verify-email-description'>{message}</p>

        <div className="button-container d-grid gap-2">

          <a href="/login" className="btn-2 btn-link mt-2">Back to Login</a>

        </div>
      </div>
    </div>
  );
}

export default AcceptInvite;
