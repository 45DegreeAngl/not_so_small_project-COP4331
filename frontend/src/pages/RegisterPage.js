import React from 'react';

import NavBar from '../components/NavBar'
import Register from '../components/Register'

const RegisterPage = () =>{
    return(
        <div>
            <NavBar layout={1}/>
            <Register/>
        </div>
    );
}
export default RegisterPage;
