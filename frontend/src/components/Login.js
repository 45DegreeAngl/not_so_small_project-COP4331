import React, { useState } from 'react';
import './Login.css';
const app_name = 'ganttify-5b581a9c8167';



function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

function Login() {
  var loginEmail;
  var loginPassword;

  const [message, setMessage] = useState('');

  const doLogin = async event => {
    event.preventDefault();

    var obj = { email: loginEmail.value, password: loginPassword.value };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/login'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });

      var res = JSON.parse(await response.text());

      if (res.error !== "") {
        setMessage(res.error);
      } else {
        var user = {
            _id:res._id,
            email: res.email,
            name: res.name,
            username: res.username,
            phone: res.phone,
            projects: res.projects,
            toDoList: res.toDoList,
            error: res.error};
        localStorage.setItem('user_data', JSON.stringify(user));
        console.log(user._id);
        

        setMessage('');
        window.location.href = '/dashboard';
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div>
        <div class = 'topDiv'>
            <h1>
                Login
            </h1>
        </div>
        <div>
          
            <br></br>
            <br></br>

        <div class="mb-3 bottomDiv">
          <form onSubmit={doLogin}>
            <div class="form-group">
                <label for="inputEmail"><h5><b>Email Address</b></h5></label>
                <input type="email" class="form-control form-control-lg" id="inputEmail" placeholder='example@email.com' ref={(c) => loginEmail = c} required/>
            </div>
            <div class="form-group">
                <label for="inputPassword"><h5><b>Password</b></h5></label>
                <input type="password" class="form-control form-control-lg" id="inputPassword" placeholder='Password1!' ref={(c) => loginPassword = c} required/>
            </div>
            <div class="row justify-content-center buttonDiv"><button type="submit" class="btn submitButton">Login</button></div>
          </form>
          <div className='formMessage'><span>{message}</span></div>
          <a href="/forgot-password" className="forgot-password-link">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
