import React, { useState } from 'react';
import './AboutUs.css';

const app_name = 'ganttify-5b581a9c8167';


function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

function AboutUs() {


  return (
   
    <div>
        <div className="topDiv">
            <h1>About Us</h1>
        </div>
        <div className="bottomDiv">

            <div className="team-member">
                <img src="/images/kittens.webp" alt="Nickolas Brandenburg" className="team-image"/>   
                <div className="member-info">
                    <h2>Nickolas Brandenburg</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <div className="team-member-reverse">
                <div className="member-info">
                    <h2>Ash Koltz</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <img src="/images/kittens.webp" alt="Ash Koltz" className="team-image"/>
            </div>

            <div className="team-member">
                <img src="/images/kittens.webp" alt="Tetiana Kotvitska" className="team-image"/>
                <div className="member-info">
                    <h2>Tetiana Kotvitska</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <div className="team-member-reverse">
                <div className="member-info">
                    <h2>Aaron Nogues</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <img src="/images/kittens.webp" alt="Aaron Nogues" className="team-image"/>
            </div>

            <div className="team-member">
                <img src="/images/kittens.webp" alt="Keyliz Rodriguez" className="team-image"/>
                <div className="member-info">
                    <h2>Keyliz Rodriguez</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <div className="team-member-reverse">
                <div className="member-info">
                    <h2>Luis Rodriguez-Rivera</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <img src="/images/kittens.webp" alt="Luis Rodriguez-Rivera" className="team-image"/>
            </div>

            <div className="team-member">
                <img src="/images/kittens.webp" alt="Omar Castro" className="team-image"/>
                <div className="member-info">
                    <h2>Omar Castro</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <div className="team-member-reverse">
                <div className="member-info">
                    <h2>Shane Welz</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <img src="/images/kittens.webp" alt="Shane Welz" className="team-image"/>
            </div>
        </div>
    </div>



  );
};

export default AboutUs;
