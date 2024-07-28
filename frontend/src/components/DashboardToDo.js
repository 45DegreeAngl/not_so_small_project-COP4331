import React, { useLayoutEffect, useState } from 'react';
import './DashboardToDo.css';
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
    if (day - thisDay == 1) { return "Tomorrow";}
    if(day-thisDay == 0){return "Today";}
    return date;
}
function toPhonePretty(phoneNum){
    const first = phoneNum.slice(0,3);
    const second = phoneNum.slice(3,6);
    const third = phoneNum.slice(6, 10);
    return "("+first+")"+" "+second+"-"+third;
}
var i, task,tasks = [];
function DashboardToDo() {
    var search = ""
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud._id;
    var displayedTasks = [];
    const [taskList, setTaskList] = useState([]);
    const [taskToDisplay, setTaskToDisplay] = useState(null);

    function actionButtonClick(task){
        return function (){
            setTaskToDisplay(task);
            var turnOnDiv = 0;
            task.users.forEach(u =>{
                //console.log(u);
                if(u.localeCompare(userId) === 0){return;}
                const info = document.getElementById(u);
                if(!info){return;}
                info.style.display = "";
                if(turnOnDiv === 0){
                    turnOnDiv = 1;
                }
            })
            const contactInfoDiv = document.getElementById("taskContactsDiv");
            if(turnOnDiv === 1){
                contactInfoDiv.style.display = "";
            }
            else{
                contactInfoDiv.style.display = "none";
            }
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
            var usersTasks = JSON.parse(txt1);
            var txt2 = await respone2.text();
            var allProjects = JSON.parse(txt2);

            var usersToSearch = [];
            //create table for tasks
            //console.log(usersTasks);

            for (i = 0; i < usersTasks.length; i++) {
                if (displayedTasks.includes(usersTasks[i]._id) || taskList.includes(usersTasks[i]._id)) {
                    return;
                }
                displayedTasks.push(usersTasks[i]._id);
                //get all info relevant info  for respecitve task
                let currTaskId = usersTasks[i]._id;
                let currTaskTitle = usersTasks[i].taskTitle;
                let currTaskDescription = usersTasks[i].description;
                let currTaskWorkers = usersTasks[i].assignedTasksUsers;
                if(currTaskWorkers){
                    currTaskWorkers.forEach(teamUser => {
                        if(!usersToSearch.includes(teamUser)){usersToSearch.push(teamUser);}
                    });
                }
                let currDueDate = toDate(usersTasks[i].dueDateTime);
                let currDueDatePretty = toDisplayDate(currDueDate);
                let currProjectId = usersTasks[i].tiedProjectId;
                let currTaskProgress = usersTasks[i].progress
                let currProject = allProjects.filter(project => project._id === currProjectId);
                var currProjectName;
                var currProjectOwnerId;
                if(currProject[0]){
                    currProjectName = currProject[0].nameProject;
                    currProjectOwnerId = currProject[0].founderId;
                }
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
                    projectOwnerId: currProjectOwnerId,
                };
                tasks.push(task);
            };
            //get info on all users in projects that the user has a task in
            var userInfoRaw
            if(usersToSearch && usersToSearch.length){
                var obj3 = {ids:usersToSearch};
                var js3 = JSON.stringify(obj3);
                const response3 = await fetch(buildPath('api/search/taskworkers'),{ method: 'POST', body: js3, headers: { 'Content-Type': 'application/json' } });
                var txt3 = await response3.text();
                userInfoRaw = JSON.parse(txt3);
                //console.log(userInfoRaw);

            }
            const taskContactsDiv = document.getElementById("taskContactsDiv");
            taskContactsDiv.setAttribute("class","contactInfoDiv mt-1")
            const taskContactsHeader = document.createElement("h5");
            taskContactsHeader.textContent = "Teammate Information:"
            taskContactsDiv.appendChild(taskContactsHeader);
            if(userInfoRaw){
                userInfoRaw.forEach(userRaw =>{
                    //console.log(userRaw);
                    const userInfoDiv = document.createElement("div");
                    userInfoDiv.setAttribute("class","contactName");
                    if(userRaw._id.localeCompare(userId) === 0){
                        return;
                    }
                    //console.log(userRaw);
                    let email = "Email: " + userRaw.email;
                    const emailText = document.createElement("p");
                    emailText.innerText=email;
                    emailText.setAttribute("class","contactBody");
                    let phone = "Phone: " + toPhonePretty(userRaw.phone);
                    const phoneText = document.createElement("p");
                    phoneText.innerText = phone;
                    phoneText.setAttribute("class","contactBody");
                    let name = userRaw.name;
                    const nameText = document.createElement("p");
                    nameText.innerText = name;
                    nameText.setAttribute("class","contactName");
                    userInfoDiv.appendChild(nameText);
                    userInfoDiv.appendChild(emailText);
                    userInfoDiv.appendChild(phoneText);
                    userInfoDiv.id = userRaw._id
                    userInfoDiv.style.display = "none";
                    taskContactsDiv.appendChild(userInfoDiv);
                });
            }
            for (i = 0; i < tasks.length; i++) {
                const tableBody = document.getElementById('taskTableBody');
                const newRow = document.createElement('tr');

                const dueDateCol = document.createElement('td');
                dueDateCol.innerText =  tasks[i]['dueDatePretty'];

                const taskNameCol = document.createElement('td');
                taskNameCol.innerText = tasks[i]['taskTitle'];

                const projectNameCol = document.createElement('td');
                projectNameCol.innerText = tasks[i]['projectName'];

                const taskProgressCol = document.createElement('td');
                taskProgressCol.innerText = tasks[i]['progress'];

                const actionCol = document.createElement('td');

                const actionButton = document.createElement('button');
                actionButton.id = 'task-action-button' + i
                actionButton.setAttribute('data-bs-toggle','modal');
                actionButton.setAttribute('data-bs-target','#taskModal');
                actionButton.addEventListener("click",actionButtonClick(tasks[i]));
                actionButton.setAttribute("Class","taskBtn");
                actionButton.textContent = "..."

                newRow.appendChild(dueDateCol);
                newRow.appendChild(taskNameCol);
                newRow.appendChild(projectNameCol);
                newRow.appendChild(taskProgressCol);   
                actionCol.appendChild(actionButton); 
                newRow.appendChild(actionCol);
                tableBody.appendChild(newRow);
                if(tasks[i]['progress'].localeCompare("Completed") === 0 && tasks[i]['dueDatePretty'].localeCompare("PAST DUE") === 0){
                    newRow.style.display = "None";
                }
            }
            setTaskList(tasks);

        }
        catch (e) {
            console.log(e);
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
        var error = "";
        var obj = {progress:"Completed"};
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
    const doMarkTaskInProgress = async event => {
        var error = "";
        var obj = {progress:"In-Progress"};
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
    function doTaskModalClose(){
        const contactInfoDiv = document.getElementById("taskContactsDiv");
        taskToDisplay.users.forEach(u =>{
            //console.log(u);
            if(u.localeCompare(userId) === 0){return;}
            const info = document.getElementById(u);
            if(!info){return;}
            info.style.display = "none";
        })
        contactInfoDiv.style.display = "none";
    }
    useLayoutEffect(() => { getTasks() }, []);
    return (
        <div class="wrapper mt-3">
            <div class="container-sm px-0 mt-5 mx-0 mainContainer">
                <h1 class="title">To Do List</h1>
                <form>
                    <input type="search" class="form-control searchForm" placeholder='Search tasks by name or project...' id="search projects" onChange={doTaskSearch} ref={(c) => search = c} />
                </form>
                <div class="table-responsive-lg">
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
                </div>
                <div class="modal fade" tabindex="-1" id="taskModal" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                            {taskToDisplay ? <h3 class="modal-title">{taskToDisplay['taskTitle']}<h5 class="modal-title">{taskToDisplay['projectName']}</h5></h3> : null}
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={doTaskModalClose}></button>
                            </div>
                            <div class="modal-body">
                             {taskToDisplay ? 
                                <div><p>{taskToDisplay['description']}</p>{taskToDisplay['progress'].localeCompare("Completed") === 0 ? null:<p>{taskToDisplay['dueDatePretty'].localeCompare("PAST DUE") === 0 ? "THIS TASK WAS DUE: "+ taskToDisplay['dueDateActual']: "Due: "+ taskToDisplay['dueDatePretty']}</p>}{taskToDisplay['userInfoText']}</div> : null}<div id = "taskContactsDiv"></div></div>
                            {taskToDisplay? 
                            <div class="modal-footer">
                                {(taskToDisplay['progress'].localeCompare("Completed") === 0) ?  <button type="button" class="btn btn-primary" onClick={()=>doMarkTaskInProgress()}>Mark Task In Progress</button>:
                                <button type="button" class="btn btn-primary" onClick={()=>doMarkTaskComplete()}>Mark Task Complete</button>}
                            </div>:null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardToDo;