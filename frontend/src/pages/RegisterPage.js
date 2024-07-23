import React from 'react';

import NavBar from '../components/NavBar'
import Register from '../components/Register'

const RegisterPage = () =>{
    return(
        <div>
            <NavBar pageTitle="Ganttify" layout={1}/>
            <br></br>
            <br></br>
            <br></br>
            <Register/>
        </div>
    );
}
export default RegisterPage;