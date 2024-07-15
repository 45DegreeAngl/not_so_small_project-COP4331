import React, { useState } from 'react';
import "./DashboardNavBar.css"

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    } else {
      return 'http://localhost:5000/' + route;
    }
}
const app_name = 'ganttify-5b581a9c8167'

function DasboardNavBar()
{   const [message,setMessage] = useState('');

    var newProjectName = "";
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud._id;

    const doCreateProject = async event => {
        event.preventDefault();

        var obj = {founderId:userId,nameProject:newProjectName.value};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/createproject'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Project has been created');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    };
    return(
        <div class = "container-fluid navBarBody">
                <a id ="Charts" class = "btn navBtn topNavBtn" href="/dashboard/charts"><span class = "navBtnText">Charts</span></a>
                <a id ="ToDo List" class = "btn navBtn navBtn" href="/dashboard"><span class = "navBtnText">To Do List</span></a>
                <button id ="Create Project" class ="btn navBtn" data-bs-toggle="modal" data-bs-target="#createProjectModal"><span class = "navBtnText">Create Project</span></button> 
                <a id ="Recently Deleted" class ="btn navBtn" href="/dashboard/recently-deleted"><span class = "navBtnText">Recently Deleted</span></a>
                <a>{message}</a>

                <div class="modal fade" id="createProjectModal" tabindex="-1" aria-labelledby="createProjectModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="createProjectModalLabel">Create a Project</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={doCreateProject}>
                                <label for="newProjectNameInput">Enter a name your new project:</label>
                                <input id="newProjectNameInput" class = "form-control mt-2" placeholder='35 characters maximum' ref={(c) => newProjectName = c}/>
                                <button type="submit" class="btn btn-primary">Create Project</button>
                            </form>
                        </div>
                        <div class = "modal-footer">
                            <h5 class = "message">{message}</h5>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    );
    
}

export default DasboardNavBar;