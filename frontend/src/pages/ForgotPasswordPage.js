import React from 'react';

import NavBar from '../components/NavBar';
import ForgotPassword from '../components/ForgotPassword';

const ForgotPasswordPage = () =>
{

    return(
      <div>
        <NavBar pageTitle = "Ganttify" layout ={0}/>
        <ForgotPassword />
      </div>
    );
};

export default ForgotPasswordPage;
