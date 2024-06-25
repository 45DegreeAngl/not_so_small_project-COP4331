import React from 'react';

import NavBar from '../components/NavBar';
import Info from '../components/GantiffyInfo';


const WelcomPage = () =>{

    return(
        <div>
            <NavBar pageTitle = "Ganttify" layout = {1}/>
            <Info/>
        </div>
    );
}

export default WelcomPage;