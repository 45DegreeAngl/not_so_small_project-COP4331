import React, { useEffect, useLayoutEffect, useState } from 'react';
import './DashboardCharts.css';
import GanttChartIcon from "./GanttChartIcon.js";
import DeleteIcon from "../Images/assets/action_buttons/Delete_Task_or_Chart.png";
import RestoreIcon from "../Images/assets/action_buttons/Restore_Chart.png";

const app_name = 'ganttify-5b581a9c8167';
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
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function toRecoverDate(timestamp) {
    var addDate = new Date(timestamp);
    addDate = addDate.addDays(30);
    var date = addDate.toISOString();
    var i = 0;
    var recoverDate = "";
    recoverDate += date.slice(5, 7) + "/" + date.slice(8, 10) + "/" + date.slice(0, 4);
    return recoverDate;
}
// MM/DD/YYYY


function RecentlyDeletedCharts({ projects }) {
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud._id;
    const [chartListPage, setChartListPage] = useState(0);
    const [projectToDelete, setProjectToDelete] = useState({});
    const [projectIsDeleted,setProjectIsDeleted] = useState(false);




    const buttonOn = "btn chartNavButton", buttonOff = "btn chartNavButton hiddenButton";
    var chartVisibility = [true, true, true, true, true, true], buttonVisibility = [buttonOff, buttonOff]; //0->prev 1->next
    //when component is rendered, display the first page
    const [chart1, setChart1] = useState({ project: projects[0], isVisible: false });
    const [chart2, setChart2] = useState({ project: projects[1], isVisible: false });
    const [chart3, setChart3] = useState({ project: projects[2], isVisible: false });
    const [chart4, setChart4] = useState({ project: projects[3], isVisible: false });
    const [chart5, setChart5] = useState({ project: projects[4], isVisible: false });
    const [chart6, setChart6] = useState({ project: projects[5], isVisible: false });
    const [prevButton, setPrevButton] = useState(buttonVisibility[0]);
    const [nextButton, setNextButton] = useState(buttonVisibility[1]);


    const setChartPage = event => {
        if (projects.length < 6) {//only the first page is present, need to not show charts that do not exsist
            switch (projects.length) {
                case 0: chartVisibility[0] = false;
                case 1: chartVisibility[1] = false;
                case 2: chartVisibility[2] = false;
                case 3: chartVisibility[3] = false;
                case 4: chartVisibility[4] = false;
                case 5: chartVisibility[5] = false;
                default: break;
            }
        }
        if (projects.length > 6) {
            setNextButton(buttonOn);
        }
        else {
            setNextButton(buttonOff);
        }
        setChart1({ project: projects[0], isVisible: chartVisibility[0] });
        setChart2({ project: projects[1], isVisible: chartVisibility[1] });
        setChart3({ project: projects[2], isVisible: chartVisibility[2] });
        setChart4({ project: projects[3], isVisible: chartVisibility[3] });
        setChart5({ project: projects[4], isVisible: chartVisibility[4] });
        setChart6({ project: projects[5], isVisible: chartVisibility[5] });
    }
    //next page, need to render only the charts and buttons that need to be rendered
    const nextChartPage = event => {
        event.preventDefault();
        const chartsToDisplay = projects.length - ((chartListPage + 1) * 6);
        const firstChartIndex = ((chartListPage + 1) * 6);
        if (chartsToDisplay <= 0) {
            setChart1({ project: projects[0], isVisible: false });
            setChart2({ project: projects[1], isVisible: false });
            setChart3({ project: projects[2], isVisible: false });
            setChart4({ project: projects[3], isVisible: false });
            setChart5({ project: projects[4], isVisible: false });
            setChart6({ project: projects[5], isVisible: false });
        }
        else if (chartsToDisplay > 6) {
            setChart1({ project: projects[firstChartIndex], isVisible: true });
            setChart2({ project: projects[firstChartIndex + 1], isVisible: true });
            setChart3({ project: projects[firstChartIndex + 2], isVisible: true });
            setChart4({ project: projects[firstChartIndex + 3], isVisible: true });
            setChart5({ project: projects[firstChartIndex + 4], isVisible: true });
            setChart6({ project: projects[firstChartIndex + 5], isVisible: true });
            setNextButton(buttonOn);
        }
        else if (chartsToDisplay > 0) {
            const emptyCharts = 6 - chartsToDisplay;
            switch (chartsToDisplay) {
                case 6: setChart6({ project: projects[firstChartIndex + 5], isVisible: true });
                case 5: setChart5({ project: projects[firstChartIndex + 4], isVisible: true });
                case 4: setChart4({ project: projects[firstChartIndex + 3], isVisible: true });
                case 3: setChart3({ project: projects[firstChartIndex + 2], isVisible: true });
                case 2: setChart2({ project: projects[firstChartIndex + 1], isVisible: true });
                case 1: setChart1({ project: projects[firstChartIndex], isVisible: true });
                default: break
            }
            switch (emptyCharts) {
                case 5: setChart2({ project: projects[0], isVisible: false })
                case 4: setChart3({ project: projects[0], isVisible: false })
                case 3: setChart4({ project: projects[0], isVisible: false })
                case 2: setChart5({ project: projects[0], isVisible: false })
                case 1: setChart6({ project: projects[0], isVisible: false })
                case 0: break;
            }
            //no more charts to display on next page, no next button
            setNextButton(buttonOff);
        }
        //always need previous button when going to next page
        setPrevButton(buttonOn);
        setChartListPage(chartListPage + 1);
    }
    //previous page, need to render only the charts and buttons that need to be rendered
    const prevChartPage = event => {
        event.preventDefault();
        const chartsToDisplay = 6;
        const firstChartIndex = ((chartListPage - 1) * 6);
        setChart1({ project: projects[firstChartIndex], isVisible: true });
        setChart2({ project: projects[firstChartIndex + 1], isVisible: true });
        setChart3({ project: projects[firstChartIndex + 2], isVisible: true });
        setChart4({ project: projects[firstChartIndex + 3], isVisible: true });
        setChart5({ project: projects[firstChartIndex + 4], isVisible: true });
        setChart6({ project: projects[firstChartIndex + 5], isVisible: true });
        if (chartListPage == 1) {
            //firts page, no need for prev button
            setPrevButton("btn chartNavButton hiddenButton");
        }
        else {
            setPrevButton("btn chartNavButton");
        }
        //next button always needed if we are going back from another page
        setNextButton("btn chartNavButton");
        setChartListPage(chartListPage - 1);
    }
    const doProjectDelete = async event =>{
        try
        {   
            const response = await fetch(buildPath('api/wipeproject/'+projectToDelete._id.toString()),
            {method:'DELETE',headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            setProjectIsDeleted(true);
        }
        catch(e)
        {
            alert(e.toString());
        }
    }
    //when project is deleted, page is refreshed
    const handleProjectDeleted = () =>{
        if(projectIsDeleted){
            setProjectIsDeleted(false);
            window.location.assign(window.location.pathname);
        }
        
    }
    const setProjectToRestoreChart1 = async event =>{
       try{
            const response = await fetch(buildPath('api/restore-project/'+chart1.project._id.toString()),{method:'POST',headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            console.log(res);
            window.location.assign(window.location.pathname);
            alert("Your project has been restored succsessfully!");

       }
       catch(e){
            alert(e);
       }
    }
    const setProjectToRestoreChart2 = async event =>{
        try{
             const response = await fetch(buildPath('api/restore-project/'+chart2.project._id.toString()),{method:'POST',headers:{'Content-Type': 'application/json'}});
 
             var txt = await response.text();
             var res = JSON.parse(txt);
             console.log(res);
             window.location.assign(window.location.pathname);
             alert("Your project has been restored succsessfully!");

        }
        catch(e){
             alert(e);
        }
     }
     const setProjectToRestoreChart3 = async event =>{
        try{
             const response = await fetch(buildPath('api/restore-project/'+chart3.project._id.toString()),{method:'POST',headers:{'Content-Type': 'application/json'}});
 
             var txt = await response.text();
             var res = JSON.parse(txt);
             console.log(res);
             window.location.assign(window.location.pathname);
             alert("Your project has been restored succsessfully!");

        }
        catch(e){
             alert(e);
        }
     }
     const setProjectToRestoreChart4 = async event =>{
        try{
             const response = await fetch(buildPath('api/restore-project/'+chart4.project._id.toString()),{method:'POST',headers:{'Content-Type': 'application/json'}});
 
             var txt = await response.text();
             var res = JSON.parse(txt);
             console.log(res);
             window.location.assign(window.location.pathname);
             alert("Your project has been restored succsessfully!");

        }
        catch(e){
             alert(e);
        }
     }
     const setProjectToRestoreChart5 = async event =>{
        try{
             const response = await fetch(buildPath('api/restore-project/'+chart5.project._id.toString()),{method:'POST',headers:{'Content-Type': 'application/json'}});
 
             var txt = await response.text();
             var res = JSON.parse(txt);
             console.log(res);
             window.location.assign(window.location.pathname);
             alert("Your project has been restored succsessfully!");

        }
        catch(e){
             alert(e);
        }
     }
     const setProjectToRestoreChart6 = async event =>{
        try{
             const response = await fetch(buildPath('api/restore-project/'+chart6.project._id.toString()),{method:'POST',headers:{'Content-Type': 'application/json'}});
 
             var txt = await response.text();
             var res = JSON.parse(txt);
             console.log(res);
             window.location.assign(window.location.pathname);
             alert("Your project has been restored succsessfully!");
        }
        catch(e){
             alert(e);
        }
     }

   






    //whenever projects is updated by the parent component, rerender charts
    useEffect(() => { setChartPage() }, [projects]);
    return (
        <div>
            <div id="chart-row" class="row row-cols-xxl-3 row-cols-xl-2 row-cols-md-1 px-0 mt-3 gx-0 gy-3 cardRow">
                <div class="col cardCol px-0">
                {chart1.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton1" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart1.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn"><img alt="RestoreButtonIcon" src={RestoreIcon} class="btnIcon"  onClick={()=>setProjectToRestoreChart1()}/></button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Restore</h5></div>
                                </div>
                                <h5 class="card-title">{chart1.project.nameProject}</h5>
                                <p class="card-text">Recover Until: {toRecoverDate(chart1.project.dateMoved)}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                {chart2.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton2" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart2.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn"><img alt="RestoreButtonIcon" src={RestoreIcon} class="btnIcon"  onClick={()=>setProjectToRestoreChart2()}/></button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Restore</h5></div>
                                </div>
                                <h5 class="card-title">{chart2.project.nameProject}</h5>
                                <p class="card-text">Recover Until: {toRecoverDate(chart2.project.dateMoved)}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                {chart3.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton3" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart3.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn"><img alt="RestoreButtonIcon" src={RestoreIcon} class="btnIcon"  onClick={()=>setProjectToRestoreChart3()}/></button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Restore</h5></div>
                                </div>
                                <h5 class="card-title">{chart3.project.nameProject}</h5>
                                <p class="card-text">Recover Until: {toRecoverDate(chart3.project.dateMoved)}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                {chart4.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton4" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart4.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn"><img alt="RestoreButtonIcon" src={RestoreIcon} class="btnIcon"  onClick={()=>setProjectToRestoreChart4()}/></button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Restore</h5></div>
                                </div>
                                <h5 class="card-title">{chart4.project.nameProject}</h5>
                                <p class="card-text">Recover Until: {toRecoverDate(chart4.project.dateMoved)}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                {chart5.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton5" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart5.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn"><img alt="RestoreButtonIcon" src={RestoreIcon} class="btnIcon"  onClick={()=>setProjectToRestoreChart5()}/></button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Restore</h5></div>
                                </div>
                                <h5 class="card-title">{chart5.project.nameProject}</h5>
                                <p class="card-text">Recover Until: {toRecoverDate(chart5.project.dateMoved)}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                {chart6.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton6" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart6.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn"><img alt="RestoreButtonIcon" src={RestoreIcon} class="btnIcon"  onClick={()=>setProjectToRestoreChart6()}/></button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Restore</h5></div>
                                </div>
                                <h5 class="card-title">{chart6.project.nameProject}</h5>
                                <p class="card-text">Recover Until: {toRecoverDate(chart6.project.dateMoved)}</p>
                            </div>
                        </div> : null}
                </div>
            </div>
            <div class="row px-0 mt-3">
                <div class="col px-0">
                    <button class={prevButton} onClick={prevChartPage}>Previous</button>
                </div>
                <div class="col px-0">
                    <button class={nextButton} onClick={nextChartPage}>Next</button>
                </div>
            </div>
            <div class="modal modal-lg fade" id="deleteProjectModal" tabindex="-1" aria-labelledby="DeleteProjectModalLabel" aria-hidden="true"  data-bs-backdrop="static" data-bs-keyboard="false" >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="DeleteProjectModalLabel">{projectIsDeleted ? "Project was deleted succesfully" :"Are you sure you want to delete " + projectToDelete.nameProject+" permanently?"}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handleProjectDeleted()}></button>
                        </div>
                        {projectIsDeleted?null:
                        <div class="modal-body">
                            This action cannot be undone!
                        </div>}
                        <div class="modal-footer">
                        {projectIsDeleted?  <button type="button" class="btn deleteModalBtn" data-bs-dismiss="modal" onClick={()=>handleProjectDeleted()}>Got It!</button> : <button type="button" class="btn deleteModalBtn" onClick={doProjectDelete}>Yes, delete my project</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default RecentlyDeletedCharts;



