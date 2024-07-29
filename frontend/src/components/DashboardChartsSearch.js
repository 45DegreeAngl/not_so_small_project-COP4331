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
   
    const doProjectSearch = async event =>{
        var obj;
        if(search.value){
            obj = {founderId:userId,title:search.value};
        }
        else{
            obj = {founderId:userId,title:""};
        }
        var js = JSON.stringify(obj);
        try
        {   
            const response = await fetch(buildPath('api/search/projects'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            //get list of project names and pass as prop to child
            var toDelete = [];
            if(res.length>0){
                var modifiedRes = res.filter((project) => {
                    if(project.founderId.localeCompare(userId) === 0 || project.isVisible === 1){
                        return true;
                    }
                    return false;
                });
                setChartsToDisplay(<DashboardCharts projects={modifiedRes}/>);
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
    const [chartsToDisplay, setChartsToDisplay] = useState(<DashboardCharts projects={empty}/>);


    //do an empty search before page renders
    useLayoutEffect(()=>{doProjectSearch()},[]);
    

    return(
        <div class = "mt-3">
            <div class = "container-sm px-0 mt-5 mx-0 mainContainer">
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