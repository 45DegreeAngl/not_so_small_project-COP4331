import React, { useState } from 'react';
import './Register.css';
const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

function Register() {
  const [regName, setRegName] = useState('');
  const [regUser, setRegUser] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordVerify, setRegPasswordVerify] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const validPhone = /^[(]?\d{3}[)]?[ -]?\d{3}[ -]?\d{4}$/;
  const validPassLower = RegExp("[a-z]+");
  const validPassUpper = RegExp("[A-Z]+");
  const validPassSymbol = RegExp("[^a-zA-Z0-9\s]+");
  const validPassDigit = RegExp("[0-9]+");

  const msgTag = " *** ";

  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const doRegister = async event => {
    event.preventDefault();
    setDisable(true);

    if (!validPhone.test(regPhone)) {
      setMessage("*** Please enter a valid 10 digit phone number ***");
      setDisable(false);
      return;
    }

    if (regPassword === null || regPassword.length < 8) {
      setMessage("*** Your password must be at least 8 characters ***");
      setDisable(false);
      return;
    }
    if (!validPassLower.test(regPassword)) {
      setMessage("*** Your password must contain at least one lowercase letter ***");
      setDisable(false);
      return;
    }
    if (!validPassUpper.test(regPassword)) {
      setMessage("*** Your password must contain at least one uppercase letter ***");
      setDisable(false);
      return;
    }
    if (!validPassDigit.test(regPassword)) {
      setMessage("*** Your password must contain at least one digit ***");
      setDisable(false);
      return;
    }
    if (!validPassSymbol.test(regPassword)) {
      setMessage("*** Your password must contain at least special symbol ***");
      setDisable(false);
      return;
    }

    if (regPassword !== regPasswordVerify) {
      setMessage("*** Passwords do not match ***");
      setDisable(false);
      return;
    }

    var obj = { email: regEmail, name: regName, phone: regPhone, password: regPassword, username: regUser };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/register'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });

      var txt = await response.text();
      var res = JSON.parse(txt);

      if (res.error.length > 0) {
        setMessage(msgTag.concat(res.error, msgTag));
        setDisable(false);
      } else {
        setMessage("Email has been sent to " + regEmail);
        setFormVisible(false);
      }
    } catch (e) {
      alert(e.toString());
      setDisable(false);
      return;
    }
  }

  (function () {
    'use strict';
    window.addEventListener('load', function () {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  return (
    <div>
      <div className='topDiv'>
        <h1>Create an Account</h1>
      </div>
      <div className="mb-3 bottomDiv">
        {formVisible ? (
          <form onSubmit={doRegister}>
            <div className="form-group">
              <label htmlFor="inputName"><h5><b>Name*</b></h5></label>
              <input type="text" className="form-control form-control-lg" id="inputName" placeholder='Firstname Lastname' value={regName} onChange={e => setRegName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail"><h5><b>Email Address*</b></h5></label>
              <input type="email" className="form-control form-control-lg" id="inputEmail" placeholder='example@email.com' value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="inputPhone"><h5><b>Phone Number</b></h5></label>
              <input type="tel" className="form-control form-control-lg" id="inputPhone" placeholder='(###) ###-####' value={regPhone} onChange={e => setRegPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="inputUsername"><h5><b>Username*</b></h5></label>
              <input type="text" className="form-control form-control-lg" id="inputUsername" placeholder='Username' value={regUser} onChange={e => setRegUser(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword"><h5><b>Password*</b></h5></label>
              <input type="password" className="form-control form-control-lg" id="inputPassword" placeholder='Password1!' value={regPassword} onChange={e => setRegPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword2"><h5><b>Re-enter Password*</b></h5></label>
              <input type="password" className="form-control form-control-lg" id="inputPassword2" placeholder='Password1!' value={regPasswordVerify} onChange={e => setRegPasswordVerify(e.target.value)} />
            </div>
            <div className='formDescription'><span>* indicates a required field</span></div>
            <div className="row justify-content-center buttonDiv"><button type="submit" className="btn submitButton" disabled={disable}>{disable ? 'Submitting...' : 'Create Account'}</button></div>
            <div className='formMessage'><span>{message}</span></div>
          </form>
          
        ) : (
          <div>
            <div className="verify-email-container">
              <div className="verify-email-card">
                <h1 className="verify-email-title">Please Verify Your Email</h1>
                <p className="verify-email-description">An email has been sent to <span className="email-style">{regEmail}</span>. Follow the instructions in the email to verify your account.</p>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Register;
