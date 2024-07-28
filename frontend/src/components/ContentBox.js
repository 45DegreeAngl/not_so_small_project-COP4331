
import Start from '../Images/People_Working_Temp.jpg';
import Plan from '../Images/People_Planning_Temp.jpg';
import Complete from '../Images/Hand_Shaking_Temp.jpg';

import {Link } from "react-router-dom";

import './ContentBox.css';

function ContentBox(props){

    if(props.layout == 0){
        return(
            <div> 
                <div>
                    <div className = "infoBox">
                        <p className = "info">
                            Ganttify is a project management tool that helps you plan, organize, and track your projects in a visually appealing way.
                        </p>
                    </div>
        
                    <div className = "Start">
                        <h1 className = "animated-header-1">
                            Start
                        </h1>
        
                        <p className = "textbox">
                        Take advantage of Ganttify's simple onboarding process to plan your day! Everyone gets Ganttify and all of its features for free. Simply sign up with a valid email address.
                        </p>
        
                        <a href = "/">
                                <img src={Start} alt="" className="start_image" />
                        </a>
        
                        <div className = "Box"></div>
                    </div>
        
                    <div className = "Plan">
                        <a href = "/">
                                <img src={Plan} alt="" className="plan_image" />
                        </a>
        
                        <p className = "textboxPlan">                   
                                At Ganttify, there's only one plan: free, simple and accessible to everyone! Divide and conquer by assigning team members to tasks within a chart. 
                                Use a color picker and pattern overlays for maximum visual constrast for task colors. 
                                If you do not want other users to see or team members to join your chart, simply make it private.
                        </p>
        
                        <h1 className = "animated-header-1">
                            Plan
                        </h1>
        
                        <div className = "Box"></div>
                    </div>
        
        
                    <div className = "Complete">
                        <h1 className = "animated-header-2">
                            Complete
                        </h1>
        
                        <p className = "textbox">
                        Simply toggle a task to indicate if it's done. You can mark tasks as complete on desktop or in our companion app.
                        </p>
        
                        <a href = "/">
                                <img src={Complete} alt="" className="complete_image" />
                        </a>
        
                        <div className = "Box"></div>
                    </div>
        
                    
                </div>
                <div>
                    <div className="EndTagWrapper">
                        <div className = "endTag">
                            <div className = "align">
                                <ul>
                                    <li><a href="https://github.com/45DegreeAngl/not_so_small_project-COP4331" target="_blank"><button className="button">GitHub</button></a></li>
                                    <li><a href = "/about-us"><button className="button">About Us</button></a></li> 
                                </ul>
                        </div>    
                    </div>            
                </div>
                </div>
            </div>
  
        );
    }
}

export default ContentBox;
