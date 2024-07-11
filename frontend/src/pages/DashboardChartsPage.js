import React from 'react';
import { useState } from 'react';

import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';
import DashboardNavBar from '../components/DashboardNavBar';
import DashboardCharts from '../components/DashboardCharts'

const DashboardChartsPage = () =>
{
    return(
      <div>
        <NavBar layout={2}/>
        <DashboardNavBar/>
        <div class = "container-fluid px-0 mx-0 py-0 mt-5 mb-0">
            <DashboardCharts/>
        </div>
      </div>
    );
};

export default DashboardChartsPage;
