import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './DashboardProjectCard.css';
const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    } else {
      return 'http://localhost:5000/' + route;
    }
}

function DashboardProjectCard(){
    return (
        <div class ="card">
            <img src='...' class = "card-img-top" alt='...'/>
            <div class = "card-body">
                
            </div>
        </div>
    );
}

export default DashboardProjectCard;
