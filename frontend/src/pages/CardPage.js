import React from 'react';

import NavBar from '../components/NavBar';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';

const CardPage = () =>
{
    return(
        <div>
            <NavBar pageTitle="Gantiffy" layout={0}/>
            <LoggedInName />
            <CardUI />
        </div>
    );
}

export default CardPage;

