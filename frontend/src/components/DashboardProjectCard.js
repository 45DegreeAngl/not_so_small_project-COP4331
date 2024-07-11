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
            <a class="card-block stretched-link text-decoration-none" href="/"></a>
                <img src='...' class = "card-img-top" alt='...'/>
                <div class = "card-body">
                    <h5 class = "card-title">Example Project Title</h5>
                    <p class ="card-text">Project description</p>
                </div>
            <a/>
        </div>
    );
}

export default DashboardProjectCard;
