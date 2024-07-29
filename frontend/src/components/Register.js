import React, { useEffect, useState } from 'react';
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
  const regUser = "username"
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordVerify, setRegPasswordVerify] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const validPhone = /^[(]?\d{3}[)]?[ -]?\d{3}[ -]?\d{4}$/;
  const validPassLower = RegExp("[a-z]+");
  const validPassUpper = RegExp("[A-Z]+");
  const validPassSymbol = RegExp("[^a-zA-Z0-9\s]+");
  const validPassDigit = RegExp("[0-9]+");
  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

    var obj = { email: regEmail.toLowerCase(), name: regName, phone: regPhone, password: regPassword, username: regUser };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/register'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });

      var txt = await response.text();
      var res = JSON.parse(txt);

      if (res.error && res.error.length > 0) {
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
  function checkPhoneValidity(){
    if(regPhone.localeCompare("") === 0){
        setMessage("");
    }
    else if (!validPhone.test(regPhone)) {
        setMessage("*** Please enter a valid 10 digit phone number ***");
    }
    else{
        setMessage("");
    }
  };
  function checkPasswordValidity(){
    if(regPassword.localeCompare("") === 0){
        setMessage("");
        return;
      }
    if (regPassword === null || regPassword.length < 8) {
        setMessage("*** Your password must be at least 8 characters ***");
        return;
      }
      if (!validPassLower.test(regPassword)) {
        setMessage("*** Your password must contain at least one lowercase letter ***");
        return;
      }
      if (!validPassUpper.test(regPassword)) {
        setMessage("*** Your password must contain at least one uppercase letter ***");
        return;
      }
      if (!validPassDigit.test(regPassword)) {
        setMessage("*** Your password must contain at least one digit ***");
        return;
      }
      if (!validPassSymbol.test(regPassword)) {
        setMessage("*** Your password must contain at least special symbol ***");
        return;
      }
      if(regPasswordVerify.localeCompare("") === 0){
        setMessage("");
        return;
      }
      if (regPassword !== regPasswordVerify) {
        setMessage("*** Passwords do not match ***");
        return;
      }
      else{
        setMessage("");
        return;
      }
  }
  function checkEmailValidity(){
    if(regEmail.localeCompare("") === 0){
        setMessage("");
    }
    else if(!validEmail.test(regEmail)){
        setMessage("*** Please enter a valid email ***")
    }
    else{
        setMessage("");
    }
  }
  useEffect(()=>{checkPhoneValidity()},[regPhone])
  useEffect(()=>{checkPasswordValidity()},[regPassword,regPasswordVerify])
  useEffect(()=>{checkEmailValidity()},[regEmail]);
  return (
    <div>
      <div>
        {formVisible ? (
          
          <div class = "registerContainer">
                <div class ="registerForm text-center mt-1">
                    <div class ="card-header registerFormHeader">
                        <h1 class = "registerTitle">Create an Account</h1>
                    </div>
                    <div class = "card-body p-0">
                        <form onSubmit={doRegister}>
                            <div class = "row text-start"><label class = "formLabel mb-1" for="nameForm">Full name</label></div>
                            
                            <div class = "row text-center mb-3"><input id="nameForm" type="text" class="formItem mx-0 mt-0" placeholder='Firstname Lastname' value={regName} onChange={(e) => setRegName(e.target.value)} required></input></div>
                            
                            <div class = "row text-start"><label class = "formLabel mb-1" for="emailForm">Email</label></div>
                            
                            <div class = "row text-center  mb-3"> <input id="emailForm" type="email" class="formItem" placeholder='example@email.com' value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required></input></div>
                           
                            <div class = "row text-start"><label class = "formLabel mb-1" for="telForm">10-digit phone number</label></div>
                            
                            <div class = "row align-items-center mb-3"><input id="telForm" type="tel" class="formItem" placeholder='(###) ###-####' value={regPhone} onChange={(e) => setRegPhone(e.target.value)} required></input></div>
                            
                            <div class = "row text-start"><label class = "formLabel mb-1" for="passwordForm">Password</label></div>
                            
                            <div class = "row text-center  mb-3"><input id="passwordForm" type="password" class="formItem" placeholder='Password1!' value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required></input></div>
                            
                            <div class = "row text-start"><label class = "formLabel mb-1" for="verifyPasswordForm">Re-enter password</label></div>
                            
                            <div class = "row text-center  mb-3"><input id="verifyPasswordForm" type="password" class="formItem" placeholder='Password1!'value={regPasswordVerify} onChange={(e) => setRegPasswordVerify(e.target.value)} required></input></div>
                            <div class = "row text-center mb-1"><span>{message}</span></div>
                            <div class = "row text center mb-2"><button type="submit" className="btn submitButton" disabled={disable}>{disable ? 'Submitting...' : 'Create Account'}</button></div>
                        </form>
                    </div> 
                </div>
          </div>
          
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
