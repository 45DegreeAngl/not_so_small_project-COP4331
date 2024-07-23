import React, { useState } from 'react';
import './Dashboard.css';
const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    } else {
      return 'http://localhost:5000/' + route;
    }
}

function Dashboard(){
    return (
        <div>
            Hey
        </div>
    );
}

export default Dashboard;
