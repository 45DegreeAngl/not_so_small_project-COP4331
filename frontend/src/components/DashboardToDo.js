import React, { useLayoutEffect, useState } from 'react';
import './DashboardToDo.css';
import { useRoutes } from 'react-router-dom';
const app_name = 'ganttify-5b581a9c8167'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}
function toDate(timestanp){
    var i = 0;
    var date = "";
    date +=  timestanp.slice(5,7) +"/"+ timestanp.slice(8,10) +"/"+timestanp.slice(0,4) ;
    return date;
}
// MM/DD/YYYY
function toDisplayDate(date){
    const today = new Date();
    const year = parseInt(date.slice(6,10));
    const month = parseInt(date.slice(0,2));
    const day = parseInt(date.slice(3,5));
    const thisDay = parseInt(today.getDate());
    const thisMonth = parseInt(today.getMonth()) + 1;
    const thisYear = parseInt(today.getFullYear());
    if(year < thisYear){return "PAST DUE"; }
    if(year > thisYear || (month > thisMonth)){return date }
    if(month < thisMonth){return "PAST DUE";}
    if(day -  thisDay > 1){return date;}
    if(day -  thisDay < 0){return "PAST DUE";}
    if(day -  thisDay== 1){return "tomorrow"}
    return date;
}
function DashboardToDo(){
    var search = ""
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud._id;
    var displayedTasks = [];

    const [taskDescription,setTaskDescription] = useState("");
    const [taskTitle,setTaskTitle] = useState("");
    const [taskUsers,setTaskUsers] = useState([]);
    const [taskProgress,setTaskProgress] = useState("");
    const [taskDueDate,setTaskDueDate] = useState("");
    const [projectName,setProjectName] = useState("");

    const getTasks = async event =>{
        var obj= {userId:userId};
        var js = JSON.stringify(obj);
        try
        {   
            const response1 = await fetch(buildPath('api/search/tasks/todo'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            const respone2 = await fetch(buildPath("api/readprojects"),
            {method:'GET',headers:{'Content-Type': 'application/json'}});
            var txt1 = await response1.text();
            var res1 = JSON.parse(txt1);
            var txt2 = await respone2.text();
            var res2 = JSON.parse(txt2);
            //console.log(res2);
            res1.forEach(element => {
                if(displayedTasks.includes(element._id)){
                    return;
                }
                displayedTasks.push(element._id);
                let currTaskId = element._id;
                let currTaskTitle = element.taskTitle;
                let currTaskDescription = element.description;
                //console.log(currTaskTitle);
                let currDueDate = toDate(element.dueDateTime);
                //console.log(currDueDate);
                let currProjectId = element.tiedProjectId;
                //console.log(currProjectId);
                let currTaskProgress = element.progress
                //console.log(currTaskProgress);
                let currProject = res2.filter(project => project._id === currProjectId);
                //console.log(currProject);
                let currProjectName = currProject[0].nameProject;
                //console.log(currProjectName);
                let currProjectOwnerId = currProject[0].founderId;
                //console.log(currProjectOwnerId);
                
                const tableBody = document.getElementById("taskTableBody");
                const newRow = document.createElement("tr");

                const progressCol = document.createElement("td");
                progressCol.textContent = currTaskProgress;

                const dueDateCol = document.createElement("td");
                dueDateCol.textContent = toDisplayDate(currDueDate);

                const taskNameCol = document.createElement("td");
                taskNameCol.innerText = currTaskTitle;

                const projectNameCol = document.createElement("td");
                projectNameCol.innerText = currProjectName;

                const actionsCol = document.createElement("td");
                actionsCol.innerHTML = `<button class = "btn actionsBtn" onClick={${displayTask(currTaskTitle,currTaskProgress,currProjectName,currDueDate,currProjectId,currTaskId,currTaskDescription)}} data-bs-toggle="modal" data-bs-target="#taskModal"/>`

                newRow.appendChild(dueDateCol);
                newRow.appendChild(taskNameCol);
                newRow.appendChild(projectNameCol)
                newRow.appendChild(progressCol);
                newRow.appendChild(actionsCol);
                tableBody.append(newRow);
            });

        }
        catch(e)
        {
            alert(e.toString());
        }
    }
    function doTaskSearch(){
        let value = search.value.toLowerCase();
        let rows = document.getElementById("taskTableBody").getElementsByTagName("tr");

        for(var i = 0; i< rows.length;i++){
            let taskCol = rows[i].getElementsByTagName("td")[1].textContent.toLowerCase();
            let projectCol = rows[i].getElementsByTagName("td")[2].textContent.toLowerCase();
            if(taskCol.includes(value) || projectCol.includes(value)){
                rows[i].style.display="";
            }
            else{
                rows[i].style.display="none";
            }
        }

    }
    function displayTask(currTaskTitle,currTaskProgress,currProjectName,currDueDate,currProjectId,currTaskId,currTaskDescription){
        setTaskTitle(currTaskTitle);
        setTaskDescription(currTaskDescription);
        setProjectName(currProjectName);
        return;
    }
    useLayoutEffect(()=>{getTasks()},[]);
    return(
        <div class ="container-fluid">
            <div class = "container px-0 mt-5 mx-0 mainContainer">
                <h1 class="title">To Do List</h1>
                <form>
                    <input type="search" class="form-control searchForm" placeholder='Search tasks by name or project...' id="search projects" onChange={doTaskSearch} ref={(c) => search = c}/>
                </form>
                <table class = "table table-bordereless" id="taskTableHeader">
                    <thead>
                        <tr>
                            <th  width="15%" scope='col'>Due Date</th>
                            <th  width="30%" scope='col'>Task Name</th>
                            <th width="30%" scope='col'>Project</th>
                            <th width="25%" scope='col'>Progress</th>
                        </tr>
                    </thead>
                    <tbody class = "table-group-divider" id="taskTableBody">
                        
                    </tbody>
                </table>
                <div class="modal" tabindex="-1" id="taskModal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">{taskTitle}</h3>
                                <h5 class =" modal-title modalSubTitle">{projectName}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>{taskDescription}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardToDo;