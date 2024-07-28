import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'
import VerifyEmailToken from '../components/VerifyEmailToken'

const VerifyEmailTokenPage = () =>{

    const { email, token } = useParams();


    return(
        <div>
            <NavBar pageTitle="Ganttify" layout={0}/>
            <VerifyEmailToken/>
        </div>
    );
}
export default VerifyEmailTokenPage;
