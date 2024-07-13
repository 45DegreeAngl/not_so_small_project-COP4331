import React, { useEffect, useState } from 'react';
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

function DashboardCharts({projects}){
    const [chartListPage,setChartListPage] = useState(0);
    const buttonOn = "btn chartNavButton", buttonOff = "btn chartNavButton hiddenButton";
    var chartVisibility = [true,true,true,true,true,true], buttonVisibility = [buttonOff,buttonOff]; //0->prev 1->next
    //when component is rendered, display the first page
    if(projects.length<6){//only the first page is present, need to not show charts that do not exsist
        switch(projects.length){
            case 0: chartVisibility[0] = false;
            case 1: chartVisibility[1] = false;
            case 2: chartVisibility[2] = false; 
            case 3: chartVisibility[3] = false;
            case 4: chartVisibility[4] = false;
            case 5: chartVisibility[5] = false;
            default: break;
        }
    }
    if(projects.length > 6){//more then 1 page is needed, turn on button
        buttonVisibility[1] = buttonOn;
    }
    const [chart1,setChart1] = useState(<ProjectCard projectTitle={projects[0]} isVisible={chartVisibility[0]}/>);
    const [chart2,setChart2] = useState(<ProjectCard projectTitle={projects[1]} isVisible={chartVisibility[1]}/>);
    const [chart3,setChart3] = useState(<ProjectCard projectTitle={projects[2]} isVisible={chartVisibility[2]}/>);
    const [chart4,setChart4] = useState(<ProjectCard projectTitle={projects[3]} isVisible={chartVisibility[3]}/>);
    const [chart5,setChart5] = useState(<ProjectCard projectTitle={projects[4]} isVisible={chartVisibility[4]}/>);
    const [chart6,setChart6] = useState(<ProjectCard projectTitle={projects[5]} isVisible={chartVisibility[5]}/>);
    const [prevButton,setPrevButton] = useState(buttonVisibility[0]);
    const [nextButton,setNextButton] = useState(buttonVisibility[1]);
    const setChartPage = event =>{
        if(projects.length<6){//only the first page is present, need to not show charts that do not exsist
            switch(projects.length){
                case 0: chartVisibility[0] = false;
                case 1: chartVisibility[1] = false;
                case 2: chartVisibility[2] = false; 
                case 3: chartVisibility[3] = false;
                case 4: chartVisibility[4] = false;
                case 5: chartVisibility[5] = false;
                default: break;
            }
        }
        if(projects.length > 6){
            setNextButton(buttonOn);
        }
        else{
            setNextButton(buttonOff);
        }
        setChart1(<ProjectCard projectTitle = {projects[0]} isVisible={chartVisibility[0]}/>);
        setChart2(<ProjectCard projectTitle = {projects[1]} isVisible={chartVisibility[1]}/>);
        setChart3(<ProjectCard projectTitle = {projects[2]} isVisible={chartVisibility[2]}/>);
        setChart4(<ProjectCard projectTitle = {projects[3]} isVisible={chartVisibility[3]}/>);
        setChart5(<ProjectCard projectTitle = {projects[4]} isVisible={chartVisibility[4]}/>);
        setChart6(<ProjectCard projectTitle = {projects[5]} isVisible={chartVisibility[5]}/>);
    }
    //next page, need to render only the charts and buttons that need to be rendered
    const nextChartPage = event =>{
        event.preventDefault();
        const chartsToDisplay = projects.length - ((chartListPage+1)*6);
        const firstChartIndex = ((chartListPage+1) * 6);
        if(chartsToDisplay <= 0){
            setChart1(<ProjectCard/>);
            setChart2(<ProjectCard/>);
            setChart3(<ProjectCard/>);
            setChart4(<ProjectCard/>);
            setChart5(<ProjectCard/>);
            setChart6(<ProjectCard/>);
        }
        else if(chartsToDisplay > 6){
            setChart1(<ProjectCard projectTitle = {projects[firstChartIndex]} isVisible={true}/>);
            setChart2(<ProjectCard projectTitle = {projects[firstChartIndex+1]} isVisible={true}/>);
            setChart3(<ProjectCard projectTitle = {projects[firstChartIndex+2]} isVisible={true}/>);
            setChart4(<ProjectCard projectTitle = {projects[firstChartIndex+3]} isVisible={true}/>);
            setChart5(<ProjectCard projectTitle = {projects[firstChartIndex+4]} isVisible={true}/>);
            setChart6(<ProjectCard projectTitle = {projects[firstChartIndex+5]} isVisible={true}/>);
            setNextButton(buttonOn);
        }
        else if(chartsToDisplay>0){
            const emptyCharts = 6 - chartsToDisplay;
            switch(chartsToDisplay){
                case 6: setChart6(<ProjectCard projectTitle = {projects[firstChartIndex+5]} isVisible={true}/>);
                case 5: setChart5(<ProjectCard projectTitle = {projects[firstChartIndex+4]} isVisible={true}/>);
                case 4: setChart4(<ProjectCard projectTitle = {projects[firstChartIndex+3]} isVisible={true}/>);
                case 3: setChart3(<ProjectCard projectTitle = {projects[firstChartIndex+2]} isVisible={true}/>);
                case 2: setChart2(<ProjectCard projectTitle = {projects[firstChartIndex+1]} isVisible={true}/>);
                case 1: setChart1(<ProjectCard projectTitle = {projects[firstChartIndex]} isVisible={true}/>);
                default: break
            }
            switch(emptyCharts){
                case 5:setChart2(<ProjectCard/>)
                case 4:setChart3(<ProjectCard/>)
                case 3:setChart4(<ProjectCard/>)
                case 2:setChart5(<ProjectCard/>)
                case 1:setChart6(<ProjectCard/>)
                case 0: break;
            }
            //no more charts to display on next page, no next button
            setNextButton(buttonOff);
        }
        //always need previous button when going to next page
        setPrevButton(buttonOn);
        setChartListPage(chartListPage+1);
    }
     //previous page, need to render only the charts and buttons that need to be rendered
    const prevChartPage = event =>{
        event.preventDefault();
        const chartsToDisplay = 6;
        const firstChartIndex = ((chartListPage-1)*6);
        setChart1(<ProjectCard projectTitle = {projects[firstChartIndex]} isVisible={true}/>);
        setChart2(<ProjectCard projectTitle = {projects[firstChartIndex+1]} isVisible={true}/>);
        setChart3(<ProjectCard projectTitle = {projects[firstChartIndex+2]} isVisible={true}/>);
        setChart4(<ProjectCard projectTitle = {projects[firstChartIndex+3]} isVisible={true}/>);
        setChart5(<ProjectCard projectTitle = {projects[firstChartIndex+4]} isVisible={true}/>);
        setChart6(<ProjectCard projectTitle = {projects[firstChartIndex+5]} isVisible={true}/>);
        if(chartListPage == 1){
            //firts page, no need for prev button
            setPrevButton("btn chartNavButton hiddenButton");
        }
        else{
            setPrevButton("btn chartNavButton");
        }
        //next button always needed if we are going back from another page
        setNextButton("btn chartNavButton");
        setChartListPage(chartListPage-1);
    }

    useEffect(() =>{setChartPage()},[projects]);
    
    return (
        <div>
                <div id="top-chart-row" class ="row px-0 mt-3 cardRow">
                    <div class ="col px-0">
                        {chart1}
                    </div>
                    <div class ="col px-0">
                        {chart2}
                    </div>
                    <div class ="col px-0">
                        {chart3}
                    </div>
                </div>
                <div id="bottom-chart-row"class ="row px-0 mt-3 cardRow">
                    <div class ="col px-0">
                        {chart4}
                    </div>
                    <div class ="col px-0">
                        {chart5}
                    </div>
                    <div class ="col px-0">
                        {chart6}
                    </div>
                    
                </div>
                <div class ="row px-0 mt-3"> 
                    <div class ="col px-0">
                        <button class ={prevButton} onClick={prevChartPage}>Previous</button>
                    </div>
                    <div class ="col px-0">
                        <button class ={nextButton} onClick={nextChartPage}>Next</button>
                    </div>
                </div>
        </div>
    );
}

export default DashboardCharts;
