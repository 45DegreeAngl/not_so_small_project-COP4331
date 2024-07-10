import React from 'react';

import NavBar from '../components/NavBar';
import ContentBox from '../components/ContentBox';


const HomePage = () =>{

    return(
        <div>            
            <NavBar layout = {1} />

            <ContentBox layout = {0} />

        </div>
    );
}

export default HomePage;