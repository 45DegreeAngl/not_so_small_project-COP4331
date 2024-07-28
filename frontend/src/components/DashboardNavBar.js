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
    const [projectCreated,setProjectCreated] = useState(false);

    var newProjectName = "";
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud._id;

    const doCreateProject = async event => {
        event.preventDefault();

        var obj = {founderId:userId,nameProject:newProjectName.value};
        var js = JSON.stringify(obj);
        //console.log(js);
        try
        {
            if (newProjectName.value.length > 35){
                setMessage("Project names cannot be longer then 35 characters");
                return;
            }
            const response = await fetch(buildPath('api/createproject'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error != null )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Project has been created');
                setProjectCreated(true);
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    };
    //when project is created, page is refreshed
    const hanldeProjectCreated = () =>{
        if(projectCreated){
            setProjectCreated(false);
            window.location.assign(window.location.pathname);
        }
    }
    return(
        <div>
            <div class = "d-none d-md-block container-lg navBarBody mb-5">
                    <a id ="ToDo List" class = "btn navBtn topNavBtn" href="/dashboard"><span class = "navBtnText">To Do List</span></a>
                    <a id ="Charts" class = "btn navBtn" href="/dashboard/charts"><span class = "navBtnText">Charts</span></a>
                    <a id ="Recently Deleted" class ="btn navBtn" href="/dashboard/recently-deleted"><span class = "navBtnText">Recently Deleted</span></a>
                    <button id ="Create Project" class ="btn navBtn" data-bs-toggle="modal" data-bs-target="#createProjectModal"><span class = "navBtnText">Create Project</span></button> 

                   
            </div>
            <div class = "d-md-none navBarBodySmall mb-5">
                <div class = "row align-items-center mt-3">
                    <div class = "col-3"><a id ="ToDo List" class = "btn navBtnSmall" href="/dashboard"><span class = "navBtnTextSmall">To Do</span></a></div>
                    <div class = "col-3"><a id ="Charts" class = "btn navBtnSmall" href="/dashboard/charts"><span class = "navBtnTextSmall">Charts</span></a></div>
                    <div class = "col-3"><a id ="Recently Deleted" class ="btn navBtnSmall" href="/dashboard/recently-deleted"><span class = "navBtnTextSmall">R.D.</span></a></div>
                    <div class = "col-3"><button id ="Create Project" class ="btn navBtnSmall" data-bs-toggle="modal" data-bs-target="#createProjectModal"><span class = "navBtnTextSmall">Create</span></button> </div>
                 </div>
            </div>

            <div class="modal fade px-0" id="createProjectModal" tabindex="-1" aria-labelledby="createProjectModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="createProjectModalLabel">{projectCreated? "Project has been Created":"Create a Project"}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hanldeProjectCreated}></button>
                            </div>
                            <div class="modal-body">
                                {projectCreated ? <button class = "btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={hanldeProjectCreated}>Got It</button>:
                                <form onSubmit={doCreateProject}>
                                    <label for="newProjectNameInput">Enter a name your new project:</label>
                                    <input id="newProjectNameInput" class = "form-control mt-2" placeholder='35 characters maximum' ref={(c) => newProjectName = c}/>
                                    <button type="submit" class="btn btn-primary">Create Project</button>
                                </form>}
                            </div>
                            {projectCreated ? null :
                            <div class = "modal-footer">
                                <h5 class = "message">{message}</h5>
                            </div>}
                        </div>
                </div>
            </div>
        </div>
    );
    
}

export default DasboardNavBar;