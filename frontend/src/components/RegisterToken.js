import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Register.css';

const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

function RegisterToken() {
  const { token } = useParams();
  const [regName, setRegName] = useState('');
  const regUser = "username";
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordVerify, setRegPasswordVerify] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const validPhone = /^[(]?\d{3}[)]?[ -]?\d{3}[ -]?\d{4}$/;
  const validPassLower = RegExp("[a-z]+");
  const validPassUpper = RegExp("[A-Z]+");
  const validPassSymbol = RegExp("[^a-zA-Z0-9\s]+");
  const validPassDigit = RegExp("[0-9]+");
  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const msgTag = " *** ";

  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        
        const response = await fetch(buildPath('api/decode-token'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        const result = await response.json();
        if (result.email) {
          setRegEmail(result.email);
        } else {
          setMessage('Invalid token.');
        }
      } catch (error) {
        console.error('Error fetching email:', error);
        setMessage('Error fetching email.');
      }
    };
    fetchEmail();
  }, [token]);
  

  const doRegisterToken = async event => {
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
      const response = await fetch(buildPath(`api/register/${token}`), {
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
          <div className="registerContainer">
                <div className="registerForm text-center mt-1">
                    <div className="card-header registerFormHeader">
                        <h1 className="registerTitle">Create an Account</h1>
                    </div>
                    <div className="card-body p-0">
                        <form onSubmit={doRegisterToken}>
    
                            <div className="row text-start"><label className="formLabel mb-1" htmlFor="nameForm">Full name</label></div>
                            <div className="row text-center mb-3"><input id="nameForm" type="text" className="formItem mx-0 mt-0" placeholder='Firstname Lastname' value={regName} onChange={(e) => setRegName(e.target.value)} required></input></div>
                            <div className="row text-start"><label className="formLabel mb-1" htmlFor="emailForm">Email</label></div>
                            <div className="row text-center mb-3"><input id="emailForm" type="email" className="formItem" placeholder='example@email.com' value={regEmail} readOnly required></input></div>
                            <div className="row text-start"><label className="formLabel mb-1" htmlFor="telForm">10-digit phone number</label></div>
                            <div className="row align-items-center mb-3"><input id="telForm" type="tel" className="formItem" placeholder='(###) ###-####' value={regPhone} onChange={(e) => setRegPhone(e.target.value)} required></input></div>
                            <div className="row text-start"><label className="formLabel mb-1" htmlFor="passwordForm">Password</label></div>
                            <div className="row text-center mb-3"><input id="passwordForm" type="password" className="formItem" placeholder='Password1!' value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required></input></div>
                            <div className="row text-start"><label className="formLabel mb-1" htmlFor="verifyPasswordForm">Re-enter password</label></div>
                            <div className="row text-center mb-3"><input id="verifyPasswordForm" type="password" className="formItem" placeholder='Password1!' value={regPasswordVerify} onChange={(e) => setRegPasswordVerify(e.target.value)} required></input></div>
                            <div className="row text-center mb-1"><span>{message}</span></div>
                            <div className="row text center mb-2"><button type="submit" className="btn submitButton" disabled={disable}>{disable ? 'Submitting...' : 'Create Account'}</button></div>
  
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

export default RegisterToken;
