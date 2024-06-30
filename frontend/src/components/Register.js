import React, {useState} from 'react';
import './Register.css';
const app_name = 'ganttify-5b581a9c8167'

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
                    setMessage(res.error);
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
        <div className="registerComponent">
            <h2 id="pageTitle" className='registerTitle'>Create an account</h2>
            <form onSubmit={doRegister}>
                <div className='formTitle'><label for="accountName" id="nameTitle" ><b>Name*</b></label><br/></div>
                <input required="" type="text" id="accountName" placeholder='Name' className='registerForm' ref={(c) => regName = c} /><br/>
                <div className='formTitle'><label for="accountPhone" id="phoneTitle" ><b>Phone</b></label><br/></div>
                <input type="tel" id="accountPhone" placeholder='Phone Number' className='registerForm' pattern="[0-9]{10}" title="Please enter a valid phone number" ref={(c) => regPhone = c}/><br/>
                <div className='formTitle'><label for="accountEmail" id="emailTitle" ><b>Email*</b></label><br/></div>
                <input required="" type="email" id="accountEmail" placeholder='Email' className='registerForm' ref={(c) => regEmail = c} /><br/>
                <div className='formTitle'><label for="accountUsername" id="userTitle" ><b>Username*</b></label><br/></div>
                <input required="" type="text" id="accountUsername" placeholder='Username' className='registerForm' ref={(c) => regUser = c} /><br/>
                <div className='formTitle'><label for="accountPassword" id="passwordTitle" ><b>Password*</b></label><br/></div>
                <input required type="password" id="accountPassword" placeholder='Password' className='registerForm' title="Password must be at least 8 characters and contain at least one capital letter, number and symbol" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"  onchange="try{setCustomValidity('')}catch(e){}" oninput="setCustomValidity('')" ref={(c) => regPassword = c} /><br/>
                <div className='formTitle'><label for="accountPasswordVerify" id="retypeTitle" ><b>Re-enter password*</b></label><br/></div>
                <input required="" type="password" id="accountPasswordVerify" placeholder='Password' className='registerForm' title="Password must be at least 8 characters and contain at least one capital letter, number and symbol" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" onchange="try{setCustomValidity('')}catch(e){}" oninput="setCustomValidity('')" ref={(c) => regPasswordVerify = c} /><br/>
                <h5 className="formDescription">* indicates a required field</h5>
                <input type="submit" id="registerButton" className='registerButton' value='Create Account'/><br/>
            </form>
            <h5>{message}</h5>     
        </div>
    );
    
}
export default Register;
