import React, {useState} from 'react';
const app_name = 'ganttify-5b581a9c8167'

const divStyle={
    marginTop:"100px",
    textAlign:"center"
}
const titleStyle={
    textAlign:"center",
}
const form={
    width:"600px",
    height:"60px",
    borderRadius:"6px",
    borderColor:"#E0E0E0",
    borderStyle:"inset",
    borderWidth:"thin",
    marginTop:"10px",
    marginBottom:"30px",
    paddingLeft:"5px"
}
const formTitle={
    textAlign:"left",
    paddingLeft:"725px"
}
const registerButton ={
    border:"none",
    textJustify:"center",
    width:"300x",
    height:"55px",
    backgroundColor:"#DC6B2C",
    color:"#ffffff",
    cursor:"pointer",
    borderRadius:"7.5px",
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

function Register(){
    var regName;
    var regUser;
    var regPassword;
    var regPasswordVerify;
    var regPhone;
    var regEmail;

    const [message,setMessage] = useState('');

    const doRegister= async event =>{
        event.preventDefault();
        if(regPassword.value != regPasswordVerify.value){
            setMessage("Passwords do not match");
            return;
        }

        var obj = {email:regEmail.value,name:regName.value,phone:regPhone.value,password:regPassword.value,username:regUser.value};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/register'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error.length > 0 ){
                    setMessage( "API Error:" + res.error );
            }
            else{
                setMessage("Account created")
            }
        }
        catch(e){
            alert(e.toString());
            return;
        }
    }

    return(
        <div style={divStyle}>
            <h2 id="pageTitle" style={titleStyle}>Create an account</h2>
            <div style={formTitle}><span id="nameTitle" ><b>Name*</b></span><br/></div>
            <input type="text" id="accountName" placeholder='Name' style={form} ref={(c) => regName = c} input/><br/>
            <div style={formTitle}><span id="phoneTitle" ><b>Phone</b></span><br/></div>
            <input type="text" id="accountPhone" placeholder='Phone Number' style={form} ref={(c) => regPhone = c} input/><br/>
            <div style={formTitle}><span id="emailTitle" ><b>Email*</b></span><br/></div>
            <input type="text" id="accountEmail" placeholder='Email' style={form} ref={(c) => regEmail = c} input/><br/>
            <div style={formTitle}><span id="userTitle" ><b>Username*</b></span><br/></div>
            <input type="text" id="accountUsername" placeholder='Username' style={form} ref={(c) => regUser = c} input/><br/>
            <div style={formTitle}><span id="passwordTitle" ><b>Password*</b></span><br/></div>
            <input type="password" id="accountPassword" placeholder='Password' style={form} ref={(c) => regPassword = c} input/><br/>
            <div style={formTitle}><span id="retypeTitle" ><b>Re-enter password*</b></span><br/></div>
            <input type="password" id="accountPasswordVerify" placeholder='Password' style={form} ref={(c) => regPasswordVerify = c} input/><br/>
            <input type="submit" id="registerButton" style={registerButton} class="buttons" 
            value = "Create account" onClick={doRegister} /><br/>       
            </div>
    );
}
export default Register;
