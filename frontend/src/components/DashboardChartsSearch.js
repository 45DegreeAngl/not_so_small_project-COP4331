import React, { useLayoutEffect, useState } from 'react';
import DashboardCharts from '../components/DashboardCharts'
import './DashboardCharts.css';
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

//empty array for displaying nothing
var empty = []

function DashboardChartsSearch(){
    var search = "";
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud._id;

    const [chartsToDisplay, setChartsToDisplay] = useState(<DashboardCharts projects={empty}/>);

    const doProjectSearch = async event =>{
        var obj = {founderId:userId,title:search.value};
        var js = JSON.stringify(obj);
        try
        {   
            const response = await fetch(buildPath('api/search/projects'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            //get list of project names and pass as prop to child
            var projectNames = [];
            if(res.length>0){
                for(var i = 0; i<res.length;i++){
                    projectNames[i] = res[i].nameProject;
                }
                setChartsToDisplay(<DashboardCharts projects={projectNames}/>);
            }
            else{
                setChartsToDisplay(<DashboardCharts projects={empty}/>);
            }
        }
        catch(e)
        {
            alert(e.toString());
        }
    }

    //do an empty search before page renders
    useLayoutEffect(()=>{doProjectSearch()},[]);
    

    return(
        <div class ="container-fluid">
            <div class = "container px-0 mt-4 mx-0 mainContainer">
                <h1 class="title">Charts</h1>
                <div class="row">
                    <form>
                            <div class = "col"><input type="search" class="form-control searchForm" placeholder='Search charts by name...' id="search projects" onChange={doProjectSearch} ref={(c) => search = c}/></div>
                    </form>
                </div>
                {chartsToDisplay}
            </div>
        </div>
    );
};

export default DashboardChartsSearch;