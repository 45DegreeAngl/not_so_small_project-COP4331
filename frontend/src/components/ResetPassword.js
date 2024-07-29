import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';
const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
   }
}

function ResetPassword() {

  const params = useParams();
  let { id } = params;

  const validPassLower = RegExp("[a-z]+");
  const validPassUpper = RegExp("[A-Z]+");
  const validPassSymbol = RegExp("[^a-zA-Z0-9]+");
  const validPassDigit = RegExp("[0-9]+");

  const [password, setPassword] = useState('');
  const [verifiedPassword, setVerifiedPassword] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const doResetPassword = async event => {
    event.preventDefault();

    if (password === null || password.length < 8) {
      window.alert('*** Your password must be at least 8 characters ***');
      return;
    }
    if (!validPassLower.test(password)) {
      window.alert('*** Your password must contain at least one lowercase letter ***');
      return;
    }
    if (!validPassUpper.test(password)) {
      window.alert('*** Your password must contain at least one uppercase letter ***');
      return;
    }
    if (!validPassDigit.test(password)) {
      window.alert('*** Your password must contain at least one digit ***');
      return;
    }
    if (!validPassSymbol.test(password)) {
      window.alert('*** Your password must contain at least special symbol ***');
      return;
    }

    if (password !== verifiedPassword) {
      window.alert('*** Passwords do not match ***');
      return;
    }

    setDisableButton(true);

    var obj = { id: id, password: password };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/reset-password'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });

      var txt = await response.text();
      var res = JSON.parse(txt);

      if (res.error) {
        window.alert("There was an issue with your password reset.");
      } else {
        window.alert("Password has been reset successfully!");
        navigate("/login");
      }

    } catch (e) {
      alert(e.toString());
      return;
    } finally {
      setDisableButton(false);
    }
  };

  return (
    <div className="reset-password-container">

      <form className="reset-password-form" onSubmit={doResetPassword}>

        <h1 className="reset-password-title">Reset Password</h1>


        <div className="form-floating pb-2">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <label htmlFor="floatingPassword">New password</label>
        </div>

        <div className="form-floating pb-2">
            <input type="password" className="form-control" id="floatingPassword2" placeholder="Password" value={verifiedPassword} onChange={e => setVerifiedPassword(e.target.value)} required />
            <label htmlFor="floatingPassword2">Re-enter new password</label>
        </div>

        <div className="button-container d-grid gap-2">
            <button className="btn btn-primary" type="submit" disabled = {disableButton}>
            {disableButton ? 'Resetting...' : 'Reset Password'}
            </button>
            <a href="/login" className="btn-2 btn-link mt-2">Back to Login</a>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
