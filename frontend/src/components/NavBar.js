import {Link } from "react-router-dom";
import "./NavBar.css"

const app_name = 'ganttify-5b581a9c8167'

function NavBar(props)
{
    if(props.layout == 0){
        return(
            <div id="navBarDiv" class = "base">
                <h3 id="appTitle">{props.pageTitle}</h3>
            </div>
        );
    }
    else if(props.layout == 1){
        return(
            <div id="navBarDiv" class="base">
                <h3 id="appTitle"><Link to="/" class="pageTitle">{props.pageTitle}</Link></h3>
                <Link to="/login"><button id = "login"  class = "btn linkBtn" >Login</button></Link>
                <Link to="/register"><button id = "creatAccount"  class = "btn linkBtn" >Create Account</button></Link>
                <Link to="/about-us"> <button id = "about" class = "btn linkBtn">About Us</button></Link>
                
            </div>
        );
    }
    else if(props.layout == 2){
        return(
            <div id="navBarDiv" class="base">
                <h3 id="dashboardTitle"><Link to="/dashboard" class="pageTitle">{props.pageTitle}</Link></h3>
                <div class = "linkBtnContainer"><Link to="/" class="link"><button id = "about" class = "btn linkBtn">Sign Out</button></Link></div>
                <h5 id="accountSettings" ><Link to="/accountSettings" class="accountSettingsLink">Account Settings</Link></h5>
            </div>
        )
    }
    
}

export default NavBar;
