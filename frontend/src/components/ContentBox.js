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
                    <p class = "info">
                        Ganttify is a project management tool that helps you plan, organize, and track your projects in a visually appealing way.
                    </p>

                </div>

                <div className = "Start">
                    <h1 class = "animated-header-1">
                        Start
                    </h1>

                    <p class = "textbox">
                    Take advantage of Ganttify's simple onboarding process to plan your day! Everyone gets Ganttify and all of its features for free. Simply sign up with a valid email address.
                    </p>

                    <a href = "/">
                            <img src={Start} alt="" className="start_image" />
                    </a>

                    <div class = "Box"></div>
                </div>

                <div className = "Plan">
                    <a href = "/">
                            <img src={Plan} alt="" className="plan_image" />
                    </a>

                    <p class = "textbox">
                    At Ganttify, there's only one plan: free, simple and accessible to everyone! Divide and conquer by assigning team members to tasks within a chart. 
                    Use a color picker and pattern overlays for maximum visual constrast for task colors. 
                    If you do not want other users to see or team members to join your chart, simply make it private.
                    </p>

                    <h1 class = "animated-header-2">
                        Plan
                    </h1>

                    <div class = "Box"></div>
                </div>


                <div className = "Complete">
                    <h1 class = "animated-header-1">
                        Complete
                    </h1>

                    <p class = "textbox">
                    Simply toggle a task to indicate if it's done. You can mark tasks as complete on desktop or in our companion app.
                    </p>

                    <a href = "/">
                            <img src={Complete} alt="" className="complete_image" />
                    </a>

                    <div class = "Box"></div>
                </div>

                <div class = "endTag">
                        <div class = "align">
                            <p>Learn More   <li><a href = "/about-us"><button class="button">About Us</button></a></li> </p>
                        </div>                
                </div>




            </div>
  
        );
    }
}

export default ContentBox;
