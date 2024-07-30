import { Link, useParams } from "react-router-dom";
import Logo from '../Images/assets/logo/Logo.png';
import './NavBar.css';
import React, { useState, useEffect } from 'react';
import ProjectTitle from './GanttChart/ProjectTitle';

const app_name = 'ganttify-5b581a9c8167';


const baseStyle = {
  backgroundColor: "#FDDC87",
  paddingLeft: "50px",
  paddingTop: "10px",
  paddingBottom: "10px"
};


const dashboardNav = {
  position: "relative",
  float: "top",
  zIndex: "100"
};


function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}



async function createTask(newTask) {


  try {

    const response = await fetch(buildPath('api/createtask'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });


    if (!response.ok) {
      throw new Error('Failed to create task');
    }


    const createdTask = await response.json();
    return createdTask;


  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}



function NavBar(props) {

  const [showModal, setShowModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");


  const [taskData, setTaskData] = useState({
    taskTitle: "",
    description: "",
    dueDateTime: "",
    startDateTime: "",
    assignedTasksUsers: [],
    color: "#DC6B2C",
    pattern: "default-pattern"
  });




  const [isEditor, setIsEditor] = useState(false);
  const [founderId, setFounderId] = useState(null);
  const [team, setTeam] = useState(null);



 
  var _ud;
  var ud;
  var userId;
  if(localStorage.getItem('user_data')){
    _ud = localStorage.getItem('user_data');
    ud = JSON.parse(_ud);
    userId = ud._id;
  }


  let tempProjectId = useParams();
  let projectId = tempProjectId.id;



  useEffect(() => {
    if (props.layout === 3) {
      fetchTeamMembers(projectId);
    }
  }, [props.layout, projectId]);



  const fetchTeamMembers = async (projectId) => {


    try {

      const response = await fetch(buildPath(`api/getProjectDetails/${projectId}`));
      const project = await response.json();


      if (project && project.team) {


        const teamId = project.team._id;
        setFounderId(project.team.founderId);
        setTeam(project.team);


        const teamResponse = await fetch(buildPath(`api/teams/${teamId}`));
        const teamData = await teamResponse.json();

        const userIds = [teamData.founderId, ...teamData.editors, ...teamData.members];



        const userResponse = await fetch(buildPath('api/read/users'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ users: userIds }),
        });

        const { usersInfo } = await userResponse.json();
        const validUsers = Array.isArray(usersInfo) ? filterValidUsers(usersInfo) : [];

        setTeamMembers(validUsers);

        if (userId === teamData.founderId || teamData.editors.includes(userId)) {
          setIsEditor(true);
        }
      }


    } 
    
    catch (error) {
      console.error('Error fetching team members:', error);
    }
  };


  const filterValidUsers = (users) => {
    return users.filter(user => user !== null);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleInviteEmailChange = (e) => {
    setInviteEmail(e.target.value);
  };



  const handleInviteSubmit = async () => {

    if (!inviteEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setInviteMessage('Please enter a valid email address.');
      return;
    }


    // Check if the user is already in the team
    const isMember = teamMembers.some(member => member.email === inviteEmail);
    if (isMember) {
      setInviteMessage('User is already in the team.');
      return;
    }


    try {
      const response = await fetch(buildPath('api/invite-user'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, projectId }),
      });



      const result = await response.json();



      if (response.ok) {
        setInviteMessage('Invitation email sent successfully.');
        setInviteEmail("");
        setTimeout(() => {
          setInviteMessage('');
          closeInviteModal();
        }, 3000);
      } 
      
      
      else {
        setInviteMessage(result.error || 'An error occurred while sending the invitation.');
      }

    } 
    
    catch (error) {
      console.error('Error sending invite:', error);
      setInviteMessage('An error occurred while sending the invitation.');
    }
  };


  const handleAddTask = async (e) => {


    e.preventDefault();

    try {
      const newTask = {
        ...taskData,
        tiedProjectId: projectId,
        taskCreatorId: userId
      };


      const createdTask = await createTask(newTask);
      if (props.setTasks) {
        props.setTasks(prevTasks => [...prevTasks, createdTask]);
      }


      closeModal();
    } 
    
    catch (error) {
      console.error('Error creating task:', error);
    }
  };



  const closeModal = () => {
    setShowModal(false);
    setTaskData({
      taskTitle: "",
      description: "",
      dueDateTime: "",
      startDateTime: "",
      assignedTasksUsers: [],
      color: "#DC6B2C",
      pattern: "default-pattern"
    });
  };


  const openModal = () => setShowModal(true);
  const openInviteModal = () => setInviteModal(true);
  const closeInviteModal = () => {
    setInviteModal(false);
    setInviteMessage('');
    setInviteEmail('');
  };


  const openEditModal = (member) => {


    setSelectedMember(member);
    let role = "member";


    if (member._id === founderId) {
      role = "Founder";
    } 
    
    else if (team.editors.includes(member._id)) {
      role = "editor";
    }
    setSelectedRole(role);
    setEditModal(true);
  };



  const closeEditModal = () => {
    setEditModal(false);
    setSelectedMember(null);
    setSelectedRole("");
    setEditMessage("");
  };



  const handleEditMemberSubmit = async () => {
    if (!selectedMember || !selectedRole || selectedRole === "Founder") {
      return;
    }

    const currentRole = selectedMember._id === founderId ? "Founder" : team.editors.includes(selectedMember._id) ? "editor" : "member";
    if (currentRole === selectedRole) {
      setEditMessage(`User is already assigned to the role: ${selectedRole}`);
      return;
    }



    const response = await fetch(buildPath(`api/getProjectDetails/${projectId}`));
    const project = await response.json();
    const teamId = project.team._id;


    try {
      const response = await fetch(buildPath(`api/teams/${teamId}/update-role`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedMember._id, newRole: selectedRole }),
      });


      const result = await response.json();


      if (response.ok) {
        setEditMessage('Role updated successfully.');
        fetchTeamMembers(projectId);
        setTimeout(() => {
          closeEditModal();
        }, 3000);
      } 
      
      else {
        setEditMessage(result.error || 'An error occurred while updating the role.');
      }
    } 
    
    
    catch (error) {
      console.error('Error updating role:', error);
      setEditMessage('An error occurred while updating the role.');
    }
  };

  const handleDeleteMember = async () => {


    if (!selectedMember || selectedMember._id === founderId) {
      return;
    }


    const response = await fetch(buildPath(`api/getProjectDetails/${projectId}`));
    const project = await response.json();
    const teamId = project.team._id;

    try {
      const response = await fetch(buildPath(`api/teams/${teamId}/removeteammember`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedMember._id, projectId: projectId }),
      });

      const result = await response.json();

      if (response.ok) {
        setEditMessage('Member removed successfully.');
        fetchTeamMembers(projectId);
        setTimeout(() => {
          closeEditModal();
        }, 3000);
      } 
      
      else {
        setEditMessage(result.error || 'An error occurred while removing the member.');
      }
    } 
    
    catch (error) {
      console.error('Error removing member:', error);
      setEditMessage('An error occurred while removing the member.');
    }
  };

  if (props.layout == 0) {


    return (
      <div id="navBarDiv" style={baseStyle}>
        <h3 id="appTitle">{props.pageTitle}</h3>
      </div>
    );


  } 
  
  
  else if (props.layout == 1) {
    
    return (
      <div id="navBarDiv">
        <div className="navbar">
          <a href="/" aria-label="Go back to home page">
            <img src={Logo} alt="GanttifyHomePage" className="logo" />
          </a>
          <h1 className="navbarHeader"> Ganttify </h1>
          <ul className="navbarOptions">
            <li><Link to="/"><button id="button"> Home</button></Link></li>
            <li><Link to="/about-us"><button id="button">About Us</button></Link></li>
            <li><Link to="/register"><button id="button">Create Account</button></Link></li>
            <li><Link to="/login"><button id="button">Login</button></Link></li>
          </ul>
        </div>
      </div>
    );
  } else if (props.layout == 2) {
    return (
      <div id="navBarDiv" style={dashboardNav}>
        <div className="navbarDash">
          <a href="/" aria-label="Go back to home page">
            <img src={Logo} alt="GanttifyHomePage" className="logoDash" />
          </a>
          <h1 className="navbarHeaderDash"> DashBoard </h1>
          <ul className="navbarOptionsDash">
            <li><Link to="/"><button id="button">Sign Out</button></Link></li>
          </ul>
        </div>
      </div>
    );
  } else if (props.layout == 3) {
    return (
      <div className="layout-3">
        <div id="navBarDiv" style={dashboardNav} role="navigation">
          <div className="navbarDash">
            <a href="/" aria-label="Go back to home page">
              <img src={Logo} alt="GanttifyHomePage" className="logoDash" />
            </a>
            <ProjectTitle projectId={projectId} />
            <ul className="navbarOptionsView">
              {isEditor && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Team
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {teamMembers.map(member => (
                      <a key={member._id} className="dropdown-item" onClick={() => openEditModal(member)}>{member.name}</a>
                    ))}
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-header" onClick={openInviteModal}>Invite Team Members</a>
                  </div>
                </li>
              )}
              <li><Link to="/dashboard"><button id="button" className="dashBoardButtons">Dashboard</button></Link></li>
              <li><Link to="/"><button id="button" className="dashBoardButtons">Sign Out</button></Link></li>
            </ul>
          </div>
        </div>

        <div id="placeHolderDiv"></div>
        <div className="modal fade modal-custom" id="addTaskModal" tabIndex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addTaskModalLabel">Add a Task</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddTask}>
                  <div className="mb-3">
                    <label htmlFor="taskTitle" className="form-label">Task Title</label>
                    <input type="text" className="form-control" id="taskTitle" name="taskTitle" value={taskData.taskTitle} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={taskData.description} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="startDateTime" className="form-label">Start Date</label>
                    <input type="date" className="form-control" id="startDateTime" name="startDateTime" value={taskData.startDateTime} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dueDateTime" className="form-label">Due Date</label>
                    <input type="date" className="form-control" id="dueDateTime" name="dueDateTime" value={taskData.dueDateTime} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="assignedTasksUsers" className="form-label">Assigned Users (comma separated IDs)</label>
                    <input type="text" className="form-control" id="assignedTasksUsers" name="assignedTasksUsers" value={taskData.assignedTasksUsers.join(',')} onChange={(e) =>
                      setTaskData((prevData) => ({
                        ...prevData,
                        assignedTasksUsers: e.target.value.split(','),
                      }))
                    } />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="color" className="form-label">Color</label>
                    <input type="color" className="form-control" id="color" name="color" value={taskData.color} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pattern" className="form-label">Pattern</label>
                    <input type="text" className="form-control" id="pattern" name="pattern" value={taskData.pattern} onChange={handleInputChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
              </div>
              <div className="modal-footer">
                <h5 className="message">{props.message}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={`modal ${inviteModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: inviteModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invite Team Member</h5>
                <button type="button" className="closeEmailModal" aria-label="Close" onClick={closeInviteModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Enter the email address of the person you want to invite to the team.</p>
                <input type="email" className="form-control" value={inviteEmail} onChange={handleInviteEmailChange} placeholder="Email address" required />
                <div className="invite-message" style={{ textAlign: 'center' }}>{inviteMessage}</div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleInviteSubmit}>Send Invite</button>
              </div>
            </div>
          </div>
        </div>
        {editModal && (
          <div className={`modal ${editModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: editModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Team Member</h5>
                  <button type="button" className="closeEmailModal" aria-label="Close" onClick={closeEditModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{selectedMember && selectedMember._id === founderId ? `The founder is ${selectedMember.name}` : `Edit role for ${selectedMember && selectedMember.name}`}</p>
                  {selectedMember && selectedMember._id === founderId ? (
                    <input type="text" className="form-control" value="Founder" readOnly />
                  ) : (
                    <select className="form-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                      <option value="member">Member</option>
                      <option value="editor">Editor</option>
                    </select>
                  )}
                  <div className="edit-message" style={{ textAlign: "center" }}>{editMessage}</div>
                </div>
                <div className="modal-footer">
                  {selectedMember && selectedMember._id !== founderId && (
                    <>
                      <button type="button" className="btn btn-secondary" onClick={handleDeleteMember}>Remove Member</button>
                      <button type="button" className="btn btn-primary" onClick={handleEditMemberSubmit}>Update Role</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
