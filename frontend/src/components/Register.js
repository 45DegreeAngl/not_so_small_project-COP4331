import React, {useState} from 'react';
const app_name = 'ganttify-5b581a9c8167'
const baseStyle={
    marginTop:"200px",
    textAlign:"center"
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
    var regPhone;
    var regEmail;

    const [message,setMessage] = useState('');

    const doRegister= async event =>{
        event.preventDefault();

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
                setMessage("Account Created!S")
            }
        }
        catch(e){
            alert(e.toString());
            return;
        }
    }

    return(
        <div style={baseStyle}>
            <h1>Create an account</h1>
        </div>
    );
}
export default Register;
