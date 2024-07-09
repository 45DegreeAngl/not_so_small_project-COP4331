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

    const validPhone = /^[(]?\d{3}[)]?[ -]?\d{3}[ -]?\d{4}$/;
    const validPassLower= RegExp("[a-z]+");
    const validPassUpper = RegExp("[A-Z]+");
    const validPassSymbol = RegExp("[^a-zA-Z0-9\s]+");
    const validPassDigit = RegExp("[0-9]+");

    const msgTag = " *** ";

    const [message,setMessage] = useState('');

    const doRegister= async event =>{
        event.preventDefault();
        console.log(regPhone.value);
        if(!validPhone.test(regPhone.value)){
            setMessage("*** Please enter a valid 10 digit phone number ***");
            return;
        }
        
        if (regPassword.value === null || regPassword.value.length < 8) {
            setMessage("*** Your password must be at least 8 characters ***");
            return;
        }
        if (!validPassLower.test(regPassword.value)){
            setMessage("*** Your password must contain at least one lowercase letter ***")
            return;
        }
        if (!validPassUpper.test(regPassword.value)) {
            setMessage("*** Your password must contain at least one uppercase letter ***"); 
            return;
        }
        if (!validPassDigit.test(regPassword.value)) {
            setMessage("*** Your password must contain at least one digit ***");
            return;
        } 
        if (!validPassSymbol.test(regPassword.value)) {
            setMessage("*** Your password must contain at least special symbol ***");
            return;
        } 
        
        if(regPassword.value !== regPasswordVerify.value){
            setMessage("*** Passwords do not match ***");
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
                    setMessage(msgTag.concat(res.error,msgTag));
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
    (function() {
        'use strict';
        window.addEventListener('load', function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();

    return(
        <div>
            <div className='topDiv'>
                <h1>Create an Account</h1>
            </div>
            <div class="mb-3 bottomDiv">
                <form onSubmit={doRegister}>
                    <div class="form-group">
                        <label for="inputName"><h5><b>Name*</b></h5></label>
                        <input type="text" class="form-control form-control-lg" id="inputName" placeholder='Firstname Lastname'  ref={(c) => regName = c} required/>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail"><h5><b>Email Address*</b></h5></label>
                        <input type="email" class="form-control form-control-lg" id="inputEmail" placeholder='example@email.com' ref={(c) => regEmail = c} required/>
                    </div>
                    <div class="form-group">
                        <label for="inputPhone"><h5><b>Phone Number</b></h5></label>
                        <input type="tel" class="form-control form-control-lg" id="inputPhone" placeholder='(###) ###-####' ref={(c) => regPhone = c}/>
                    </div>
                    <div class="form-group">
                        <label for="inputUsermname"><h5><b>Username*</b></h5></label>
                        <input type="text" class="form-control form-control-lg" id="inputUsername" placeholder='Username' ref={(c) => regUser = c} required/>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword"><h5><b>Password*</b></h5></label>
                        <input type="password" class="form-control form-control-lg" id="inputPassword" placeholder='Password1!' ref={(c) => regPassword = c}/>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword2"><h5><b>Re-enter Password*</b></h5></label>
                        <input type="password" class="form-control form-control-lg" id="inputPassword2" placeholder='Password1!' ref={(c) => regPasswordVerify = c}/>
                    </div>
                    <div className='formDescription'><span>* indicates a required field</span></div>
                    <div class="row justify-content-center buttonDiv"><button type="submit" class="btn submitButton">Create Account</button></div>
                </form>
                <div className='formMessage'><span>{message}</span></div>
            </div>
        </div>
    );
    
}
export default Register;
