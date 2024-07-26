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
  const [message, setMessage] = useState('');
  const [loginEmail,setLoginEmail] = useState('');
  const [loginPassword,setLoginPassword] = useState('');

  const doLogin = async event => {
    event.preventDefault();

    var obj = { email: loginEmail, password: loginPassword };
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
    <div class = "registerContainer mt-5">
    <div class ="registerForm text-center">
        <div class ="card-header registerFormHeader">
            <h1 class = "registerTitle">Login</h1>
        </div>
        <div class = "card-body p-0">
            <form onSubmit={doLogin}>
                <div class = "row text-start"><label class = "formLabel mb-1" for="nameForm">Email</label></div>
                
                <div class = "row text-center mb-3"><input id="nameForm" type="email" class="formItem mx-0 mt-0" placeholder='Email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required></input></div>
                
                <div class = "row text-start"><label class = "formLabel mb-1" for="passwordForm">Password</label></div>
                
                <div class = "row text-center  mb-3"><input id="passwordForm" type="password" class="formItem" placeholder='Password1!' value ={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required></input></div>
                
                <div class = "row text-center mb-1"><span>{message}</span></div>

                <div class = "row text-center mb-2"><input id="submitLogin" class = "btn"type="submit" value="Login"/></div>

                <div class ="row text-start mb-2"><a href="/forgot-password" className="forgot-password-link">Forgot your password?</a></div>
                
            </form>
        </div> 
    </div>
</div>
          
     
  );
};

export default Login;
