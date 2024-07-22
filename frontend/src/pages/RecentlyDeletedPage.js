import React from 'react';
import NavBar from '../components/NavBar';
import DashboardNavBar from '../components/DashboardNavBar';
import RecentlyDeletedSearch from '../components/RecentlyDeletedSearch'

const  RecentlyDeletedPage = () =>
{
    return(
      <div>
        <NavBar layout={2}/>
        <DashboardNavBar/>
        <div class = "container-fluid px-0 mx-0 py-0 mt-5 mb-0">
            <RecentlyDeletedSearch/>
        </div>
      </div>
    );
};

export default RecentlyDeletedPage;
