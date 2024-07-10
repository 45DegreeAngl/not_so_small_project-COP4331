import React from 'react';

import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';
import DashboardNavBar from '../components/DashboardNavBar';

const DashboardPage = () =>
{

    return(
      <div>
        <NavBar pageTitle ="Dashboard" layout={4}/>
         <DashboardNavBar/>
         <div class = "container-fluid px-0 mx-0 py-0 my-0">
            <Dashboard/>
        </div>
      </div>
    );
};

export default DashboardPage;
