import { Link, useParams } from "react-router-dom";
import Logo from '../Images/assets/logo/Logo.png';
import AddTaskDuration from './AddTaskDuration';
import TimeRange from './GanttChart/TimeRange';
import './NavBar.css';
import React, { useState } from 'react';

const app_name = 'ganttify-5b581a9c8167';

const baseStyle = {
  backgroundColor: "#FDDC87",
  paddingLeft: "50px",
  paddingTop: "10px",
  paddingBottom: "10px"
};

const buttonStyle = {
  border: "none",
  textJustify: "center",
  position: "relative",
  right: "20px",
  bottom: "47.5px",
  float: "right",
  width: "120px",
  height: "35px",
  backgroundColor: "#DC6B2C",
  color: "#ffffff",
  marginRight: "30px",
  cursor: "pointer",
  borderRadius: "7.5px"
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
  const [taskData, setTaskData] = useState({
    taskTitle: "",
    description: "",
    dueDateTime: "",
    startDateTime: "",
    assignedTasksUsers: [],
    color: "#DC6B2C",
    pattern: "default-pattern"
  });

  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userId = ud._id;

  let projectId = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      console.log("These are the props: ", projectId, " ", userId);
      console.log("This is the task data: ", taskData);
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
    } catch (error) {
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

  if (props.layout == 0) {
    return (
      <div id="navBarDiv" style={baseStyle}>
        <h3 id="appTitle">{props.pageTitle}</h3>
      </div>
    );
  } else if (props.layout == 1) {
    return (
      <div id="navBarDiv">
        <div className="navbar">
          <a href="/">
            <img src={Logo} alt="" className="logo" />
          </a>

          <h1> Ganttify </h1>
          <ul>
            <li><Link to="/"><button id="button"> Home</button></Link></li>
            <li><Link to="/about-us"><button id="button">About Us</button></Link></li>
            <li><Link to="/register"><button id="button">Create Account</button></Link></li>
            <li><Link to="/login"><button id="button">Login</button></Link></li>
          </ul>
        </div>
      </div>
    );
  } else if (props.layout == 2) {
    return(
      <div id="navBarDiv" style={dashboardNav}>
          <div className="navbarDash">
              <a href = "/">
                  <img src={Logo} alt="" className="logo" />
              </a>

              <h1> Dashboard </h1>
              <ul>
                  <li><Link to="/"><button id = "button" >Sign Out</button></Link></li>
              </ul>
          </div>                
      </div>
    );
  } else if (props.layout == 3) {
      return (
        <div className="layout-3">
        <div id="navBarDiv" style={dashboardNav} role="navigation">
          <div className="navbarDash">
            <a href="/">
              <img src={Logo} alt="" className="logo" />
            </a>
            <h1> Dashboard </h1>
            <ul>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Actions
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a id="Add Task" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#addTaskModal" onClick={openModal}>Add Task</a>
                  <a className="dropdown-item" onClick={() => openModal(<AddTaskDuration tasks={props.tasks} setTaskDurations={props.setTaskDurations} />)}>Add Task Duration</a>
                  <a className="dropdown-item" onClick={() => openModal(<TimeRange timeRange={props.timeRange} setTimeRange={props.setTimeRange} />)}>Tracker Period</a>
                </div>
              </li>
              <li><Link to="/"><button id="button">Sign Out</button></Link></li>
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
                    <input type="text" className="form-control" id="taskTitle" name="taskTitle" value={taskData.taskTitle} onChange={handleInputChange} required/> 
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={taskData.description} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="startDateTime" className="form-label">Start Date and Time</label>
                    <input type="date" className="form-control" id="startDateTime" name="startDateTime" value={taskData.startDateTime} onChange={handleInputChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dueDateTime" className="form-label">Due Date and Time</label>
                    <input type="date" className="form-control" id="dueDateTime" name="dueDateTime" value={taskData.dueDateTime} onChange={handleInputChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="assignedTasksUsers" className="form-label">Assigned Users (comma separated IDs)</label>
                    <input type="text" className="form-control" id="assignedTasksUsers" name="assignedTasksUsers" value={taskData.assignedTasksUsers.join(',')} onChange={(e) =>
                        setTaskData((prevData) => ({
                          ...prevData,
                          assignedTasksUsers: e.target.value.split(','),
                        }))
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="color" className="form-label">Color</label>
                    <input type="color" className="form-control" id="color" name="color" value={taskData.color} onChange={handleInputChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pattern" className="form-label">Pattern</label>
                    <input type="text" className="form-control" id="pattern" name="pattern" value={taskData.pattern} onChange={handleInputChange}/>
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
      </div>
      );
  }
}

export default NavBar;


