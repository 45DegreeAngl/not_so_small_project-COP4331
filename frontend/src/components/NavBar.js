import {Link } from "react-router-dom";
import "./NavBar.css"

const app_name = 'ganttify-5b581a9c8167'

function NavBar(props)
{
    if(props.layout == 0){
    return(
        <nav class = "navbar navbar-expand-sm topNavBar"> 
            <div class = "container-fluid">
                <ul class ="navbar-nav">
                    <a class = "nav-link pageTitle" href="/">{props.pageTitle}</a>
                </ul>
                <ul class ="navbar-nav linkList">
                    <li class = "nav-item">
                        <a class = "nav-link btn linkBtn" href="/about-us">About Us</a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link btn linkBtn" href="/register">Create Account</a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link btn linkBtn" href="/login">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
   }
    if(props.layout == 1){
        return(
            <nav class = "navbar navbar-expand-sm topNavBar"> 
                <div class = "container-fluid">
                    <ul class ="navbar-nav">
                        <a class = "nav-link pageTitle" href="/">{props.pageTitle}</a>
                    </ul>
                    <ul class ="navbar-nav linkList">
                        <li class = "nav-item">
                            <a class = "nav-link btn linkBtn" href="/about-us">About Us</a>
                        </li>
                        <li class = "nav-item">
                            <a class = "nav-link btn linkBtn" href="/login">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
   
   if(props.layout == 2){
    return(
        <nav class = "navbar navbar-expand-sm topNavBar"> 
            <div class = "container-fluid">
                <ul class ="navbar-nav">
                    <a class = "nav-link pageTitle" href="/">{props.pageTitle}</a>
                </ul>
                <ul class ="navbar-nav linkList">
                    <li class = "nav-item">
                        <a class = "nav-link btn linkBtn" href="/about-us">About Us</a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link btn linkBtn" href="/register">Create Account</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
   }
   if(props.layout == 3){
    return(
        <nav class = "navbar navbar-expand-sm topNavBar"> 
            <div class = "container-fluid">
                <ul class ="navbar-nav">
                    <a class = "nav-link pageTitle" href="/">{props.pageTitle}</a>
                </ul>
                <ul class ="navbar-nav linkList">
                    <li class = "nav-item">
                        <a class = "nav-link btn linkBtn" href="/register">Create Account</a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link btn linkBtn" href="/login">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
   }
   if(props.layout == 4){
    return(
        <nav class = "navbar navbar-expand-sm topNavBar"> 
            <div class = "container-fluid">
                <ul class ="navbar-nav">
                    <a class = "nav-link pageTitle" href="/">{props.pageTitle}</a>
                </ul>
                <ul class ="navbar-nav linkList">
                    <li class = "nav-item">
                        <a class = "nav-link pageTitle linkText" href="/account-settings">Account Settings</a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link btn linkBtn" href="/">Sign Out</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
   }
}

export default NavBar;
