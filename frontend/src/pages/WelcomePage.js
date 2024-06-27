import React from 'react';

import NavBar from '../components/NavBar';
import Info from '../components/GantiffyInfo';
import Welcome from '../components/Welcome'


const WelcomePage = () =>{

    return(
        <div>
            <NavBar pageTitle = "Ganttify" layout = {1}/>
            <Welcome/>
            <Info/>
        </div>
    );
}

export default WelcomePage;