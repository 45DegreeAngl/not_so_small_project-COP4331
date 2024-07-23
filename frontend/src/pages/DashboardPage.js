import React from 'react';

import NavBar from '../components/NavBar';
import DashboardToDo from '../components/DashboardToDo';
import DashboardNavBar from '../components/DashboardNavBar';

const DashboardPage = () =>
{
    return(
      <div>
        <NavBar layout={2}/>
        <DashboardNavBar/>
        <div class = "container-fluid px-0 mx-0 py-0 mt-5 mb-0">
            <DashboardToDo/>
        </div>
      </div>
    );
};

export default DashboardPage;
