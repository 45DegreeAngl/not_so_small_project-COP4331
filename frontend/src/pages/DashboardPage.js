import React from 'react';

import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';
import DashboardNavBar from '../components/DashboardNavBar';

const DashboardPage = () =>
{

    return(
      <div>
        <NavBar pageTitle ="Dashboard" layout={2}/>
        <DashboardNavBar/>
        <Dashboard/>
      </div>
    );
};

export default DashboardPage;
