import React, { useState } from 'react';
import './DashboardCharts.css';
import ProjectCard from './DashboardProjectCard'
const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    } else {
      return 'http://localhost:5000/' + route;
    }
}

function DashboardCharts(){
    var search = '';

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var _id = ud._id;
    const searchProjects = async event =>
        {
            
    
        }
    return (
        <div class ="container-fluid">
            <div class = "container px-0 mt-5 mx-0 mainContainer">
                <h1 class="title">Charts</h1>
                <form>
                    <input type="search" class="form-control searchForm" placeholder='Search charts by name or owner...' id="search projects"/>
                </form>
                <div class ="row px-0 mt-3 cardRow">
                    <div class ="col px-0">
                        <ProjectCard/>
                    </div>
                    <div class ="col px-0">
                        <ProjectCard/>
                    </div>
                    <div class ="col px-0">
                        <ProjectCard/>
                    </div>
                </div>
                <div class ="row px-0 mt-3 cardRow">
                    <div class ="col px-0">
                        <ProjectCard/>
                    </div>
                    <div class ="col px-0">
                        <ProjectCard/>
                    </div>
                    <div class ="col px-0">
                        <ProjectCard/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default DashboardCharts;
