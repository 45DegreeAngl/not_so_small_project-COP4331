import React from 'react';
import Start from '../Images/assets/backgrounds/Homepage_Start_Image.JPG';
import Plan from '../Images/assets/backgrounds/Homepage_Plan_Image.JPG';
import Complete from '../Images/assets/backgrounds/Homepage_Mobile_Image.png';
import Logo from '../Images/assets/logo/Logo.png';
import { Link } from "react-router-dom";
import GanttChartIcon from "./GanttChartIcon.js";
import './ContentBox.css';

function ContentBox() {
  return (
    <div>
      <div className="landing-page-container">
        <div className="left-column">
          <h1 className="animated-header-1">Never pay for Gantt charts again.</h1>
          <p>At Ganttify, there's only one plan: free, simple and accessible to everyone.</p>
          <Link to="/register" className="cta-button">Get free Ganttify access</Link>
        </div>
        <div className="right-column">
          <div className="gantt-chart-icon-container">
            <GanttChartIcon />
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="midTitle">
        <h1>Streamline Your Project Management</h1>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <div className="cards-container">
        <div className="cardContent">
          <img src={Start} alt="User dashaboard preview." />
          <div className="card-contentbox">
            <h2 className="card-title">Start Your Project</h2>
            <p className="card-subtext">Take advantage of Ganttify's simple onboarding process to plan your day! Everyone gets Ganttify and all of its features for free. Simply sign up with a valid email address.</p>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="cardContent">
          <img src={Plan} alt="View a chart and plan on it." />
          <div className="card-contentbox">
            <h2 className="card-title">Plan Efficiently</h2>
            <p className="card-subtext">Ganttify offers a single plan that's free, easy to use, and open to everyone! Divide and conquer by assigning team members to tasks within a chart. Use a color picker and pattern overlays for maximum visual contrast for task colors. If you do not want other users to see or team members to join your chart, simply make it private.</p>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="cardContent">
          <img src={Complete} alt="Mobile task list." />
          <div className="card-contentbox">
            <h2 className="card-title">Complete Tasks</h2>
            <p className="card-subtext">Simply toggle a task to indicate if it's done. You can mark tasks as complete on desktop or in our companion app.</p>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <footer className="footer">
        <ul className="footer-links">
          <li><a href="https://github.com/45DegreeAngl/not_so_small_project-COP4331" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a></li>
          <li><a href="/about-us" className="footer-link">About Us</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default ContentBox;
