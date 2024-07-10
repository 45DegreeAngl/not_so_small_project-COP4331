import {Link } from "react-router-dom";
import "./DashboardNavBar.css"

const app_name = 'ganttify-5b581a9c8167'

function DasboardNavBar()
{
    return(
        <div class = "container-fluid navBarBody">
                <button id ="Charts" class = "btn navBtn topNavBtn"><span class = "navBtnText">Charts</span></button>
                <button id ="ToDo List" class = "btn navBtn navBtn"><span class = "navBtnText">To Do List</span></button>
                <button id ="Create Project" class ="btn navBtn"><span class = "navBtnText">Create Project</span></button>
                <button id ="Recently Deleted" class ="btn navBtn"><span class = "navBtnText">Recently Deleted</span></button>
        </div>
    );
    
}

export default DasboardNavBar;