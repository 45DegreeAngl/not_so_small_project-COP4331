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
        <RecentlyDeletedSearch/>
      </div>
    );
};

export default RecentlyDeletedPage;
