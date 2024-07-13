import React, { useState } from 'react';
import DashboardCharts from '../components/DashboardCharts'
import './DashboardCharts.css';
var projects1 = [
    "project 1",
    "project 2",
    "project 3",
    "project 4",
    "project 5",
    "project 6",
    "project 7",
    "project 8",
    "project 9",
    "project 10",
    "project 11",
    "project 12",
    "project 13",
    "project 14",
    "project 15",
    "project 16",
    "project 17"
]
var projects2 = [
    "Ganttify",
    "Personal Chart",
    "COP4302 pl/0 Compiler"
]

function DashboardChartsSearch(){
    var search = "";
    const [chartsToDisplay, setChartsToDisplay] = useState(<DashboardCharts projects={projects1}/>);
     
    const doProjectSearch = async event =>{
        setChartsToDisplay(<DashboardCharts projects={projects2}/>);
        console.log(search.value);
    }

    return(
        <div class ="container-fluid">
            <div class = "container px-0 mt-4 mx-0 mainContainer">
                <h1 class="title">Charts</h1>
                <form>
                    <input type="search" class="form-control searchForm" placeholder='Search charts by name...' id="search projects" onChange={doProjectSearch} ref={(c) => search = c}/>
                </form>
                {chartsToDisplay}
            </div>
        </div>
    );
};

export default DashboardChartsSearch;