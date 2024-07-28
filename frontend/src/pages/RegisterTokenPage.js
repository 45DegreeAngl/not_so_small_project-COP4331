import React from 'react';

import NavBar from '../components/NavBar'
import RegisterToken from '../components/RegisterToken'

const RegisterTokenPage = () =>{
    return(
        <div>
            <NavBar pageTitle="Ganttify" layout={1}/>
            <br></br>
            <br></br>
            <br></br>
            <RegisterToken/>
        </div>
    );
}
export default RegisterTokenPage;
