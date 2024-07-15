import React from 'react';
import './DashboardToDo.css';
import DashboardToDoTable from './DashboardToDoTable';

function DashboardToDo(){
    var search = "";
    const doTaskSearch = async event =>{

    }
    return(
        <div class ="container-fluid">
            <div class = "container px-0 mt-5 mx-0 mainContainer">
                <h1 class="title">To Do List</h1>
                <form>
                    <input type="search" class="form-control searchForm" placeholder='Search tasks by name or project...' id="search projects" onChange={doTaskSearch} ref={(c) => search = c}/>
                </form>
                <DashboardToDoTable/>
            </div>
        </div>
    );
};

export default DashboardToDo;