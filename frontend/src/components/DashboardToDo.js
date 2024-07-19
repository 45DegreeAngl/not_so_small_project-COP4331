import React, { useEffect, useLayoutEffect, useState } from 'react';
import './DashboardToDo.css';
import { useRoutes } from 'react-router-dom';
const app_name = 'ganttify-5b581a9c8167'
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}
function toDate(timestanp) {
    var i = 0;
    var date = "";
    date += timestanp.slice(5, 7) + "/" + timestanp.slice(8, 10) + "/" + timestanp.slice(0, 4);
    return date;
}
// MM/DD/YYYY
function toDisplayDate(date) {
    const today = new Date();
    const year = parseInt(date.slice(6, 10));
    const month = parseInt(date.slice(0, 2));
    const day = parseInt(date.slice(3, 5));
    const thisDay = parseInt(today.getDate());
    const thisMonth = parseInt(today.getMonth()) + 1;
    const thisYear = parseInt(today.getFullYear());
    if (year < thisYear) { return "PAST DUE"; }
    if (year > thisYear || (month > thisMonth)) { return date }
    if (month < thisMonth) { return "PAST DUE"; }
    if (day - thisDay > 1) { return date; }
    if (day - thisDay < 0) { return "PAST DUE"; }
    if (day - thisDay == 1) { return "Tomorrow" }
    return date;
}
var i;
var task;
function DashboardToDo() {
    var search = ""
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud._id;
    var displayedTasks = [];
    var tasks = [];
    const [taskList, setTaskList] = useState([]);
    const [taskToDisplay, setTaskToDisplay] = useState(null);


    const taskModal = document.getElementById("taskModal")
    function actionButtonClick(task){
        return function (){
            setTaskToDisplay(task);
        }
    }
    const getTasks = async event => {
        var obj = { userId: userId };
        var js = JSON.stringify(obj);
        try {
            //get list of tasks user is assigned to 
            const response1 = await fetch(buildPath('api/search/tasks/todo'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            //get list of projects to get project info for tasks
            const respone2 = await fetch(buildPath("api/readprojects"),
                { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            var txt1 = await response1.text();
            var res1 = JSON.parse(txt1);
            var txt2 = await respone2.text();
            var res2 = JSON.parse(txt2);
            //create table for tasks

            for (i = 0; i < res1.length; i++) {
                if (displayedTasks.includes(res1[i]._id) || taskList.includes(res1[i]._id)) {
                    return;
                }
                displayedTasks.push(res1[i]._id);
                //get all info relevant info  for respecitve task
                let currTaskId = res1[i]._id;
                let currTaskTitle = res1[i].taskTitle;
                let currTaskDescription = res1[i].description;
                let currTaskWorkers = res1[i].assignedTasksUsers;
                let currDueDate = toDate(res1[i].dueDateTime);
                let currDueDatePretty = toDisplayDate(currDueDate);
                let currProjectId = res1[i].tiedProjectId;
                let currTaskProgress = res1[i].progress
                let currProject = res2.filter(project => project._id === currProjectId);
                let currProjectName = currProject[0].nameProject;
                let currProjectOwnerId = currProject[0].founderId;
                task = {
                    _id: currTaskId,
                    taskTitle: currTaskTitle,
                    description: currTaskDescription,
                    users: currTaskWorkers,
                    dueDatePretty: currDueDatePretty,
                    dueDateActual:currDueDate,
                    projectId: currProjectId,
                    projectName: currProjectName,
                    progress: currTaskProgress,
                    projectOwnerId: currProjectOwnerId
                };
                tasks.push(task);
                const tableBody = document.getElementById('taskTableBody');
                const newRow = document.createElement('tr');

                const dueDateCol = document.createElement('td');
                dueDateCol.innerText = currDueDatePretty;

                const taskNameCol = document.createElement('td');
                taskNameCol.innerText = currTaskTitle;

                const projectNameCol = document.createElement('td');
                projectNameCol.innerText = currProjectName;

                const taskProgressCol = document.createElement('td');
                taskProgressCol.innerText = currTaskProgress;

                const actionCol = document.createElement('td');

                const actionButton = document.createElement('button');
                actionButton.id = 'task-action-button' + i
                actionButton.setAttribute('data-bs-toggle','modal');
                actionButton.setAttribute('data-bs-target','#taskModal');
                actionButton.addEventListener("click",actionButtonClick(task));
                actionButton.setAttribute("Class","taskBtn");
                actionButton.textContent = "..."

                newRow.appendChild(dueDateCol);
                newRow.appendChild(taskNameCol);
                newRow.appendChild(projectNameCol);
                newRow.appendChild(taskProgressCol);   
                actionCol.appendChild(actionButton); 
                newRow.appendChild(actionCol);
                tableBody.appendChild(newRow);
                if(currTaskProgress.localeCompare("Done") === 0 && currDueDatePretty.localeCompare("PAST DUE") === 0){
                    console.log("hiding" + i);
                    newRow.style.display = "None";
                }

            };
            setTaskList(tasks)

        }
        catch (e) {
            alert(e);
        }
    }
   
    function doTaskSearch() {
        let value = search.value.toLowerCase();
        let rows = document.getElementById("taskTableBody").getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
            let taskCol = rows[i].getElementsByTagName("td")[1].textContent.toLowerCase();
            let projectCol = rows[i].getElementsByTagName("td")[2].textContent.toLowerCase();
            if (taskCol.includes(value) || projectCol.includes(value)) {
                rows[i].style.display = "";
            }
            else {
                rows[i].style.display = "none";
            }
        }

    }
    const doMarkTaskComplete = async event => {
        console.log(taskToDisplay['taskTitle'] + " is complete");
        var error = "";
        var obj = {progress:"Done"};
        var js = JSON.stringify(obj);

        try{
            const response = await fetch(buildPath('api/tasks/'+taskToDisplay['_id']),{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();
            var res = JSON.parse(txt);
            if(res.acknowledged){
                window.location.assign(window.location.pathname);
            }
            else{
                error = "Failed to update project visibility"
                alert(error);
            }
        }
        catch(e){
            alert(error);
        }
    }
    useLayoutEffect(() => { getTasks() }, []);
    //useEffect(() => { setToDoList() }, [taskList])
    return (
        <div class="container-fluid">
            <div class="container px-0 mt-5 mx-0 mainContainer">
                <h1 class="title">To Do List</h1>
                <form>
                    <input type="search" class="form-control searchForm" placeholder='Search tasks by name or project...' id="search projects" onChange={doTaskSearch} ref={(c) => search = c} />
                </form>
                <table class="table table-bordereless" id="taskTableHeader">
                    <thead>
                        <tr>
                            <th width="15%" scope='col'>Due Date</th>
                            <th width="30%" scope='col'>Task Name</th>
                            <th width="30%" scope='col'>Project</th>
                            <th width="25%" scope='col'>Progress</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="taskTableBody">
                        <script>

                        </script>
                    </tbody>
                </table>
                <div class="modal" tabindex="-1" id="taskModal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                            {taskToDisplay ? <h3 class="modal-title">{taskToDisplay['taskTitle']}<h5 class="modal-title">{taskToDisplay['projectName']}</h5></h3> : null}
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                             {taskToDisplay ? <div><p>{taskToDisplay['description']}</p>{taskToDisplay['progress'].localeCompare("DONE") === 0 ? null:<p>{taskToDisplay['dueDatePretty'].localeCompare("PAST DUE") === 0 ? "THIS TASK WAS DUE: "+ taskToDisplay['dueDateActual']: "Due: "+ taskToDisplay['dueDatePretty']}</p>}</div> : null}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={()=>doMarkTaskComplete()}>Mark Task Complete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardToDo;