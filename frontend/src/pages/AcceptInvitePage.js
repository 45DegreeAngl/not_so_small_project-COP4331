import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'
import AcceptInvite from '../components/AcceptInvite'

const AcceptInvitePage = () =>{

    return(
        <div>
            <NavBar pageTitle="Ganttify" layout={0}/>
            <AcceptInvite/>
        </div>
    );
}
export default AcceptInvitePage;
