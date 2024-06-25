import React, {useState} from 'react';
import {Link } from "react-router-dom";

const app_name = 'ganttify-5b581a9c8167'
const baseStyle ={
    backgroundColor:"#FDDC87", 
    paddingLeft:"50px",
    paddingTop:"10px",
    paddingBottom:"10px"
}
const buttonStyle ={
    border:"none",
    textJustify:"center",
    position:"relative",
    right:"20px",
    bottom:"47.5px",
    float:"right",
    width:"120px",
    height:"35px",
    backgroundColor:"#DC6B2C",
    color:"#ffffff",
    marginRight:"30px",
    cursor:"pointer"
}

function NavBar(props)
{
    if(props.layout == 0){
        return(
            <div id="navBarDiv" style={baseStyle}>
                <h3 id="appTitle">{props.pageTitle}</h3>
            </div>
        );
    }
    else if(props.layout == 1){
        return(
            <div id="navBarDiv" style={baseStyle}>
                <h3 id="appTitle">{props.pageTitle}</h3>
                <Link to="/login"><button id = "login"  style = {buttonStyle} >Login</button></Link>
                <button id = "creatAccount"  style = {buttonStyle} >Create Account</button>
                <button id = "aboutUs"  style = {buttonStyle}>About Us</button>
                
            </div>
        );
    }
    
}

export default NavBar;