import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'
import VerifyEmail from '../components/VerifyEmail'

const VerifyEmailPage = () =>{

    const { email, token } = useParams();


    return(
        <div>
            <NavBar pageTitle="Ganttify" layout={0}/>
            <VerifyEmail/>
        </div>
    );
}
export default VerifyEmailPage;
