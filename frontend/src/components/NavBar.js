import React, {useState} from 'react';

const app_name = 'ganttify-5b581a9c8167'
const baseStyle ={
    backgroundColor:"#FDDC87", 
    paddingLeft:"50px",
    paddingTop:"10px",
    paddingBottom:"10px"
}
function NavBar()
{


    return(
        <div id="navBarDiv" style={baseStyle}>
            <h2 id="appTitle">Ganttify</h2>
        </div>
    );
}

export default NavBar;