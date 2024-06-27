import React, {useState} from 'react';
const app_name = 'ganttify-5b581a9c8167'
const baseStyle ={
    textAlign:"center"
}
const loginButton ={
    border:"none",
    textJustify:"center",
    width:"300px",
    height:"55px",
    backgroundColor:"#DC6B2C",
    color:"#ffffff",
    cursor:"pointer",
    borderRadius:"7.5px",
    marginTop:"15px"
}
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

function Login()
{
    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstname:res.firstname,lastname:res.lastname,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


    return(
      <div id="loginDiv" style={baseStyle}>
        <h1 id="loginTitle">Login</h1>
        <h3 id="loginDescription">For exsisting users only.</h3>
        <h5 id="usernameTitle">Username</h5>
        <input type="text" id="loginName" placeholder="Username" 
	    ref={(c) => loginName = c} />
         <h5 id="passwordTitle">Password</h5>
	<input type="password" id="loginPassword" placeholder="Password"
	    ref={(c) => loginPassword = c} /><br/>
        <input type="submit" id="loginButton" style={loginButton} class="buttons" value = "Login"
          onClick={doLogin} /><br/>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;

