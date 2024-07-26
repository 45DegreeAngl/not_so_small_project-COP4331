import React from 'react';
import NavBar from '../components/NavBar';
import DashboardNavBar from '../components/DashboardNavBar';
import DashboardChartsSearch from '../components/DashboardChartsSearch'

const DashboardChartsPage = () =>
{
    return(
      <div>
        <NavBar layout={2}/>
        <DashboardNavBar/>
        <DashboardChartsSearch/>
      </div>
    );
};

export default DashboardChartsPage;
