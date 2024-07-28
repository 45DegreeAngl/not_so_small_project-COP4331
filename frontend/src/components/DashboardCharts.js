import React, { useEffect, useLayoutEffect, useState } from 'react';
import './DashboardCharts.css';
import GanttChartIcon from "./GanttChartIcon.js";
import DeleteIcon from "../Images/assets/action_buttons/Delete_Task_or_Chart.png";
import InvisibleProjectIcon from "../Images/assets/action_buttons/Private_Gantt_Chart.png";
import VisibleProjectIcon from "../Images/assets/action_buttons/Public_Gantt_Chart.png";
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



function DashboardCharts({ projects }) {
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud._id;
    const [chartListPage, setChartListPage] = useState(0);
    const [projectToDelete, setProjectToDelete] = useState({});
    const [projectIsDeleted,setProjectIsDeleted] = useState(false);
    const friendText = "Friend";
    const meText = "Me";
    const publicText = "(public)"
    const privateText = "(private)";




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
            const response = await fetch(buildPath('api/projects/'+projectToDelete._id.toString()),
            {method:'DELETE',headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            console.log(res);
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
    const toggleProjectVisibilityChart1 = async event =>{
        console.log("");
        var newVisibility;
        var error = ""
        if(chart1 && chart1.project&& chart1.project.isVisible === 1){
            newVisibility = 0;
        }
        else if (chart1 && chart1.project&& chart1.project.isVisible === 0){
            newVisibility = 1;
        }
        else{
            newVisibility = -1;
            error = "No project to toggle visibilty for";
            alert(error);
        }
        if(newVisibility != -1){
            var obj = {isVisible:newVisibility};
            var js = JSON.stringify(obj);
            try{
                const response = await fetch(buildPath('api/projects/'+chart1.project._id.toString()),{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
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
                error = "API ERROR: "+e.toString();
                alert(error);
            }
        }
    }
    const toggleProjectVisibilityChart2 = async event =>{
        console.log("");
        var newVisibility;
        var error = ""
        if(chart2 && chart2.project&& chart2.project.isVisible === 1){
            newVisibility = 0;
        }
        else if (chart2 && chart2.project&& chart2.project.isVisible === 0){
            newVisibility = 1;
        }
        else{
            newVisibility = -1;
            error = "No project to toggle visibilty for";
            alert(error);
        }
        if(newVisibility != -1){
            var obj = {isVisible:newVisibility};
            var js = JSON.stringify(obj);
            try{
                const response = await fetch(buildPath('api/projects/'+chart2.project._id.toString()),{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
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
                error = "API ERROR: "+e.toString();
                alert(error);
            }
        }
    }

    const toggleProjectVisibilityChart3 = async event =>{
        console.log("");
        var newVisibility;
        var error = ""
        if(chart3 && chart3.project&& chart3.project.isVisible === 1){
            newVisibility = 0;
        }
        else if (chart3 && chart3.project&& chart3.project.isVisible === 0){
            newVisibility = 1;
        }
        else{
            newVisibility = -1;
            error = "No project to toggle visibilty for";
            alert(error);
        }
        if(newVisibility != -1){
            var obj = {isVisible:newVisibility};
            var js = JSON.stringify(obj);
            try{
                const response = await fetch(buildPath('api/projects/'+chart3.project._id.toString()),{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
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
                error = "API ERROR: "+e.toString();
                alert(error);
            }
        }
    }
    const toggleProjectVisibilityChart4 = async event =>{
        console.log("");
        var newVisibility;
        var error = ""
        if(chart4 && chart4.project&& chart4.project.isVisible === 1){
            newVisibility = 0;
        }
        else if (chart4 && chart4.project&& chart4.project.isVisible === 0){
            newVisibility = 1;
        }
        else{
            newVisibility = -1;
            error = "No project to toggle visibilty for";
            alert(error);
        }
        if(newVisibility != -1){
            var obj = {isVisible:newVisibility};
            var js = JSON.stringify(obj);
            try{
                const response = await fetch(buildPath('api/projects/'+chart4.project._id.toString()),{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
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
                error = "API ERROR: "+e.toString();
                alert(error);
            }
        }
    }
    const toggleProjectVisibilityChart5 = async event =>{
        console.log("");
        var newVisibility;
        var error = ""
        if(chart5 && chart5.project&& chart5.project.isVisible === 1){
            newVisibility = 0;
        }
        else if (chart5 && chart5.project&& chart5.project.isVisible === 0){
            newVisibility = 1;
        }
        else{
            newVisibility = -1;
            error = "No project to toggle visibilty for";
            alert(error);
        }
        if(newVisibility != -1){
            var obj = {isVisible:newVisibility};
            var js = JSON.stringify(obj);
            try{
                const response = await fetch(buildPath('api/projects/'+chart5.project._id.toString()),{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
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
                error = "API ERROR: "+e.toString();
                alert(error);
            }
        }
    }
    const toggleProjectVisibilityChart6 = async event =>{
        console.log("");
        var newVisibility;
        var error = ""
        if(chart6 && chart6.project&& chart6.project.isVisible === 1){
            newVisibility = 0;
        }
        else if (chart6 && chart6.project&& chart6.project.isVisible === 0){
            newVisibility = 1;
        }
        else{
            newVisibility = -1;
            error = "No project to toggle visibilty for";
            alert(error);
        }
        if(newVisibility != -1){
            var obj = {isVisible:newVisibility};
            var js = JSON.stringify(obj);
            try{
                const response = await fetch(buildPath('api/projects/'+chart6.project._id.toString()),{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
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
                error = "API ERROR: "+e.toString();
                alert(error);
            }
        }
    }






    //whenever projects is updated by the parent component, rerender charts
    useEffect(() => { setChartPage() }, [projects]);
    return (
        <div class="container-fluid px-0">
            <div id="chart-row" class="row row-cols-xxl-3 row-cols-xl-2 row-cols-md-1 px-0 mt-3 gx-5 gy-3 cardRow">
                <div class="col cardCol px-0">
                {chart1.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                {userId.toString().localeCompare(chart1.project.founderId.toString()) === 0 ? 
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton1" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart1.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn">{chart1.project.isVisible === 1 ? <img alt="PublicGanttChartIcon" src={VisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart1()}/> : <img alt="PrivateGanttChartIcon" src={InvisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart1()}/>}</button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Visibility</h5></div>
                                    <div class = "col col-3 px-0 ms-4"><a class = "btn viewChartBtn" href = {`/viewchart/${chart1.project?._id}`}>View Chart</a></div>
                                </div>
                                    : 
                                <div class = "row align-items-start justify-content-end mb-1">
                                    <div class = "col col-3 px-0 ms-0 me-1"><a class = "btn viewChartBtn mx-0" href = {`/viewchart/${chart1.project?._id}`}>View Chart</a></div>
                                </div>}
                                <h5 class="card-title">{chart1.project.nameProject}</h5>
                                <p class="card-text">Owner: {chart1.project.founderId.toString().localeCompare(userId.toString()) === 0 ? meText : friendText} {chart1.project.isVisible === 1 ? publicText : privateText}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                    {chart2.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                {userId.toString().localeCompare(chart2.project.founderId.toString()) === 0 ? 
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton2" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal"  onClick={()=>setProjectToDelete(chart2.project)}><img  alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn">{chart2.project.isVisible === 1 ? <img alt="PublicGanttChartIcon" src={VisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart2()}/> : <img alt="PrivateGanttChartIcon" src={InvisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart2()}/>}</button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Visibility</h5></div>
                                    <div class = "col col-3 px-0 ms-4"><a class = "btn viewChartBtn" href = {`/viewchart/${chart2.project?._id}`}>View Chart</a></div>
                                </div>
                                    : 
                                <div class = "row align-items-center justify-content-end mb-1">
                                    <div class = "col col-3 px-0 ms-0 me-1"><a class = "btn viewChartBtn mx-0" href = {`/viewchart/${chart2.project?._id}`}>View Chart</a></div>
                                </div>}
                                <h5 class="card-title">{chart2.project.nameProject}</h5>
                                <p class="card-text">Owner: {chart2.project.founderId.toString().localeCompare(userId.toString()) === 0 ? meText : friendText} {chart2.project.isVisible === 1 ? publicText : privateText}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                {chart3.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon mb-1" />
                            <div class="card-body">
                                {userId.toString().localeCompare(chart3.project.founderId.toString()) === 0 ? 
                                <div class="row align-items-center">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton3" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart3.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn">{chart3.project.isVisible === 1 ? <img alt="PublicGanttChartIcon" src={VisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart3()}/> : <img alt="PrivateGanttChartIcon" src={InvisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart3()}/>}</button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Visibility</h5></div>
                                    <div class = "col col-3 px-0 ms-4"><a class = "btn viewChartBtn" href = {`/viewchart/${chart3.project?._id}`}>View Chart</a></div>
                                </div>
                                    : 
                                <div class = "row align-items-center justify-content-end mb-1">
                                    <div class = "col col-3 px-0 ms-0 me-1"><a class = "btn viewChartBtn mx-0" href = {`/viewchart/${chart3.project?._id}`}>View Chart</a></div>
                                </div>}
                                <h5 class="card-title">{chart3.project.nameProject}</h5>
                                <p class="card-text">Owner: {chart3.project.founderId.toString().localeCompare(userId.toString()) === 0 ? meText : friendText} {chart3.project.isVisible === 1 ? publicText : privateText}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                {chart4.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                {userId.toString().localeCompare(chart4.project.founderId.toString()) === 0 ? 
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton4" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart4.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn">{chart4.project.isVisible === 1 ? <img alt="PublicGanttChartIcon" src={VisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart4()}/> : <img alt="PrivateGanttChartIcon" src={InvisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart4()}/>}</button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Visibility</h5></div>
                                    <div class = "col col-3 px-0 ms-4"><a class = "btn viewChartBtn" href = {`/viewchart/${chart4.project?._id}`}>View Chart</a></div>
                                </div>
                                    : 
                                <div class = "row align-items-center justify-content-end mb-1">
                                    <div class = "col col-3 px-0 ms-0 me-1"><a class = "btn viewChartBtn mx-0" href = {`/viewchart/${chart4.project?._id}`}>View Chart</a></div>
                                </div>}
                                <h5 class="card-title">{chart4.project.nameProject}</h5>
                                <p class="card-text">Owner: {chart4.project.founderId.toString().localeCompare(userId.toString()) === 0 ? meText : friendText} {chart4.project.isVisible === 1 ? publicText : privateText}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                {chart5.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                {userId.toString().localeCompare(chart5.project.founderId.toString()) === 0 ? 
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton5" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart5.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn">{chart5.project.isVisible === 1 ? <img alt="PublicGanttChartIcon" src={VisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart5()}/> : <img alt="PrivateGanttChartIcon" src={InvisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart5()}/>}</button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Visibility</h5></div>
                                    <div class = "col col-3 px-0 ms-4"><a class = "btn viewChartBtn" href = {`/viewchart/${chart5.project?._id}`}>View Chart</a></div>
                                </div>
                                    : 
                                <div class = "row align-items-center justify-content-end mb-1">
                                    <div class = "col col-3 px-0 ms-0 me-1"><a class = "btn viewChartBtn mx-0" href = {`/viewchart/${chart5.project?._id}`}>View Chart</a></div>
                                </div>}
                                <h5 class="card-title">{chart5.project.nameProject}</h5>
                                <p class="card-text">Owner: {chart5.project.founderId.toString().localeCompare(userId.toString()) === 0 ? meText : friendText} {chart5.project.isVisible === 1 ? publicText : privateText}</p>
                            </div>
                        </div> : null}
                </div>
                <div class="col cardCol px-0">
                    {chart6.isVisible ?
                        <div class="card" >
                            <GanttChartIcon class="projectIcon" />
                            <div class="card-body">
                                {userId.toString().localeCompare(chart6.project.founderId.toString()) === 0 ? 
                                <div class="row align-items-center mb-1">
                                    <div class = "col col-1 px-0 me-3"><button name="DeleteButton6" class="projectBtn" data-bs-toggle="modal" data-bs-target="#deleteProjectModal" onClick={()=>setProjectToDelete(chart6.project)}><img alt="DeleteButtonIcon" src={DeleteIcon} class="btnIcon" /></button></div>
                                    <div class = "col col-2 px-0"><h5 class="btnLabel">Delete</h5></div>
                                    <div class="col col-1 ps-0 me-3"><button class="projectBtn">{chart6.project.isVisible === 1 ? <img alt="PublicGanttChartIcon" src={VisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart6()}/> : <img alt="PrivateGanttChartIcon" src={InvisibleProjectIcon} class="btnIcon"  onClick={()=>toggleProjectVisibilityChart6()}/>}</button></div>
                                    <div class = "col col-3 px-0"><h5 class = "btnLabel">Visibility</h5></div>
                                    <div class = "col col-3 px-0 ms-4"><a class = "btn viewChartBtn" href = {`/viewchart/${chart6.project?._id}`}>View Chart</a></div>
                                </div>
                                    : 
                                <div class = "row mb-1 align-items-center justify-content-end">
                                    <div class = "col col-3 px-0 ms-0 me-1"><a class = "btn viewChartBtn mx-0" href = {`/viewchart/${chart6.project?._id}`}>View Chart</a></div>
                                </div>}
                                <h5 class="card-title">{chart6.project.nameProject}</h5>
                                <p class="card-text">Owner: {chart6.project.founderId.toString().localeCompare(userId.toString()) === 0 ? meText : friendText} {chart6.project.isVisible === 1 ? publicText : privateText}</p>
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
                            <h1 class="modal-title fs-5" id="DeleteProjectModalLabel">{projectIsDeleted ? "Project was deleted succesfully" :"Are you sure you want to delete " + projectToDelete.nameProject+"?"}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handleProjectDeleted()}></button>
                        </div>
                        <div class="modal-body">
                            {projectIsDeleted  ? "You can also delete your project from the recently deleted page manually":"Your project will be moved to your recently deleted page for 30 days, then it is deleted permanantly"}
                        </div>
                        <div class="modal-footer">
                        {projectIsDeleted?  <button type="button" class="btn deleteModalBtn" data-bs-dismiss="modal" onClick={()=>handleProjectDeleted()}>Got It!</button> : <button type="button" class="btn deleteModalBtn" onClick={doProjectDelete}>Yes, delete my project </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default DashboardCharts;



