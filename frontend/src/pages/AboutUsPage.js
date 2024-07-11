import React from 'react';
import NavBar from '../components/NavBar';
import AboutUs from '../components/AboutUs';

const AboutUsPage = () => {
    return (
        <div className="about-us-page">
            <NavBar layout={1} pageTitle="Ganttify" />
            <br></br>
            <br></br>
            <br></br>
            <AboutUs />
        </div>
    );
};

export default AboutUsPage;
