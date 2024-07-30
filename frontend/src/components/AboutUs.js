import React, { useState } from 'react';
import './AboutUs.css';
import member_an from '../Images/assets/team_member_icons/AN.jpg';
import member_nb from '../Images/assets/team_member_icons/NB.png';
import member_tk from '../Images/assets/team_member_icons/TK.jpg';
import member_lr from '../Images/assets/team_member_icons/LR.jpg';
import member_kr from '../Images/assets/team_member_icons/KR.jpg';
import member_sw from '../Images/assets/team_member_icons/SW.jpg';
import member_oc from '../Images/assets/team_member_icons/OC.jpg';
import member_ak from '../Images/assets/team_member_icons/AK.PNG';
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

    <br></br>
    <br></br>
    <br></br>

    <div className="bottomDiv">

        <div className = "box">
        

        <div className="team-member">
            <img src={member_nb} alt="Nickolas Brandenburg" className="team-image"/>   
            <div className="member-info">
                    <h2>Nickolas Brandenburg</h2>
                    <p>Database and API developer</p>
            </div>
        </div>

        <div className="team-member-reverse">
            <div className="member-info">
                <div className="member-text-info-reverse">
                    <h2>Ash Koltz</h2>
                    <p>Project Manager and Artist</p>
                </div>
            </div>
            <img src={member_ak} alt="Ash Koltz" className="team-image"/>
        </div>

        <div className="team-member">
            <img src={member_tk} alt="Tetiana Kotvitska" className="team-image"/>
            <div className="member-info">
                <h2>Tetiana Kotvitska</h2>
                <p>Database and API developer</p>
            </div>
        </div>

        <div className="team-member-reverse">
            <div className="member-info">
                <div className="member-text-info-reverse">
                    <h2>Aaron Nogues</h2>
                    <p>Mobile app developer</p>
                </div>
            </div>
            <img src={member_an} alt="Aaron Nogues" className="team-image"/>
        </div>

        <div className="team-member">
            <img src={member_kr} alt="Keyliz Rodriguez" className="team-image"/>
            <div className="member-info">
                <h2>Keyliz Rodriguez</h2>
                <p>Frontend developer</p>
            </div>
        </div>

        <div className="team-member-reverse">
            <div className="member-info">
                <div className="member-text-info-reverse">
                    <h2>Luis Rodriguez-Rivera</h2>
                    <p>Database and API developer</p>
                </div>
            </div>
            <img src={member_lr} alt="Luis Rodriguez-Rivera" className="team-image"/>
        </div>

        <div className="team-member">
            <img src={member_oc} alt="Omar Castro" className="team-image"/>
            <div className="member-info">
                <h2>Omar Castro</h2>
                <p>Frontend developer</p>
            </div>
        </div>

        <div className="team-member-reverse">
            <div className="member-info">
                <div className="member-text-info-reverse">
                    <h2>Shane Welz</h2>
                    <p>Frontend and API developer</p>
                </div>
            </div>
            <img src={member_sw} alt="Shane Welz" className="team-image"/>
        </div>
        </div>
    </div>
</div>



  );
};

export default AboutUs;
