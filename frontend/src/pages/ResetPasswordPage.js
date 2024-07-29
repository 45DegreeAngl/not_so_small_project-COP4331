import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'
import ResetPassword from '../components/ResetPassword'

const ResetPasswordPage = () =>{

    const { id, token } = useParams();


    return(
        <div>
            <NavBar layout = {1} />
            <ResetPassword/>
        </div>
    );
}
export default ResetPasswordPage;
