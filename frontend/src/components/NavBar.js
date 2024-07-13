import {Link } from "react-router-dom";
import Logo from '../Images/assets/logo/Logo.svg';
import './NavBar.css'


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
    cursor:"pointer",
    borderRadius:"7.5px"
}
const dashboardNav ={
    position:"relative",
    float:"top"
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
            <div id="navBarDiv">
                <div className="navbar">
                    <a href = "/">
                        <img src={Logo} alt="" className="logo" />
                    </a>

                    <h1> Ganttify </h1>
                    <ul>
                        <li><Link to="/"><button id = "button"> Home</button></Link></li>
                        <li><Link to="/about-us"><button id = "button">About Us</button></Link></li>
                        <li><Link to="/register"><button id = "button">Create Account</button></Link></li>
                        <li><Link to="/login"><button id = "button" >Login</button></Link></li>

                    </ul>
                    
                </div>                
            </div>
        );
    }
    else if(props.layout == 2){
        return(
            <div id="navBarDiv" style={dashboardNav}>
                <div className="navbarDash">
                    <a href = "/">
                        <img src={Logo} alt="" className="logo" />
                    </a>

                    <h1> Dashboard </h1>
                    <ul>
                        <li><Link to="/register"><button id = "button">Account Settings</button></Link></li>
                        <li><Link to="/"><button id = "button" >Sign Out</button></Link></li>
                    </ul>
                </div>                
            </div>
        );
    }
    
}

export default NavBar;
