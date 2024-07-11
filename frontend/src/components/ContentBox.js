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
                    <h1 class = "title">
                        Welcome to Ganttify!
                    </h1>
                    <p class = "info">
                        Ganttify is a project management tool that helps you plan, organize, and track your projects in a visually appealing way.
                    </p>

                </div>

                <div className = "Start">
                    <h1 class = "animated-header-1">
                        Start
                    </h1>

                    <p class = "textbox">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Aenean commodo ligula eget dolor. Aenean massa. 
                    Cum sociis natoque penatibus et magnis dis parturient montes, 
                    nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                    pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
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
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Aenean commodo ligula eget dolor. Aenean massa. 
                    Cum sociis natoque penatibus et magnis dis parturient montes, 
                    nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                    pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
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
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Aenean commodo ligula eget dolor. Aenean massa. 
                    Cum sociis natoque penatibus et magnis dis parturient montes, 
                    nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                    pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                    </p>

                    <a href = "/">
                            <img src={Complete} alt="" className="complete_image" />
                    </a>

                    <div class = "Box"></div>
                </div>

                <div class = "endTag">
                    <h1 class = "title">
                        Learn about the Team.
                        <ul class = "align">
                            <li><Link to="/about-us"><button class = "button">About Us</button></Link></li>
                        </ul>                        
                    </h1>
                </div>


            </div>


            
        );
    }
}

export default ContentBox;