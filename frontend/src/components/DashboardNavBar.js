import React, { useState } from 'react';

import "./DashboardNavBar.css"

const app_name = 'ganttify-5b581a9c8167'

function DasboardNavBar()
{
    return(
        <div class = "container-fluid navBarBody">
                <a id ="Charts" class = "btn navBtn topNavBtn" href="/dashboard/charts"><span class = "navBtnText">Charts</span></a>
                <a id ="ToDo List" class = "btn navBtn navBtn" href="/dashboard"><span class = "navBtnText">To Do List</span></a>
                <a id ="Create Project" class ="btn navBtn" href="/"><span class = "navBtnText">Create a Chart</span></a> 
                <a id ="Recently Deleted" class ="btn navBtn" href="/dashboard/recently-deleted"><span class = "navBtnText">Recently Deleted</span></a>
        </div>
    );
    
}

export default DasboardNavBar;