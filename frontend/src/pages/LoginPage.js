import React from 'react';

import NavBar from '../components/NavBar';
import Login from '../components/Login';

const LoginPage = () =>
{

    return(
      <div>
        <NavBar pageTitle = "Ganttify" layout ={0}/>
        <Login />
      </div>
    );
};

export default LoginPage;

