
import React, { useState, useEffect } from 'react';
import './AddTaskButton.css';

const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

//Default color
const GanttifyOrange = "#DC6B2C";

// Initialization of the modal
const AddTaskButton = ({ projectId }) => {

  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    taskTitle: "",
    description: "",
    dueDateTime: "",
    startDateTime: "",
    assignedTasksUsers: [],
    color: GanttifyOrange,
    pattern: "No Pattern"
  });

  // Initialization of the variables
  const [teamUsers, setTeamUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState('#DC6B2C'); 
  const [pattern,setPattern] = useState('No Pattern');

  //All of the pre-choosen colors
  const colorOptions = [
    '#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d', '#70369d', 
    '#f47474', '#ffd580', '#fff77e','#b2e687', '#8fb9f9', '#9a86cc', '#b27fc6'
  ];


  // Gets the members of the team
  useEffect(() => {
    getTeamUsers(projectId);
  }, [projectId]);


  //Gets team users
  const getTeamUsers = async (projectId) => {

    try {
      const response = await fetch(buildPath(`api/getProjectDetails/${projectId}`));
      const project = await response.json();

      if (!project || !project.team) {
        return;
      }

      const teamId = project.team._id;

      try {
        const response = await fetch(buildPath(`api/teams/${teamId}`));
        const team = await response.json();

        const founderId = team.founderId;
        const editors = Array.isArray(team.editors) ? team.editors : [];
        const members = Array.isArray(team.members) ? team.members : [];

        const allUserIds = [founderId, ...editors, ...members];
        const uniqueUserIds = [...new Set(allUserIds)];

        const responseUsers = await fetch(buildPath('api/read/users'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ users: uniqueUserIds }),
        });

        if (!responseUsers.ok) {
          throw new Error('Failed to fetch user details');
        }

        const { usersInfo } = await responseUsers.json();
        const filteredUsers = usersInfo.filter(user => user !== null);
        const validUsers = Array.isArray(usersInfo) ? filteredUsers : [];

        setTeamUsers(validUsers);
      } catch (error) {
        console.error('Error fetching team users:', error);
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };


  //Updates the colors 
  const handleColorChange = async (newColor) => {
    console.log(newColor);
    setColor(newColor); 
    setTaskData(oldData => ({...oldData, color: newColor}));
  };


  //Updates the task data whenever a text field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };


  //Updates the array of users that are check marked
  const handleCheckboxChange = (userId) => {
    setTaskData((prevData) => {
      const assignedUsers = prevData.assignedTasksUsers.includes(userId) ? prevData.assignedTasksUsers.filter((id) => id !== userId) : [...prevData.assignedTasksUsers, userId];
      return { ...prevData, assignedTasksUsers: assignedUsers };
    });
  };

  const handlePatternChange = async (newPattern,newPatternToDisplay) => {
    console.log(newPattern);
    setPattern(newPatternToDisplay);
    setTaskData(oldData => ({...oldData, pattern: newPattern}));
  }


  //Validates the date 
  const handleAddTask = async (e) => {

    e.preventDefault();
    const { startDateTime, dueDateTime } = taskData;

    if (new Date(dueDateTime) < new Date(startDateTime)) {
      setErrorMessage("Due date cannot be before start date.");
      return;
    }

    try {
      const newTask = {...taskData, tiedProjectId: projectId, taskCreatorId: localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data'))._id : null,};
      
      
      console.log("New task being created:", newTask);
      await createTask(newTask);
      closeModal();


    } 
    
    catch (error) {
      console.error('Error creating task:', error);
    }
  };


  //Creates the task
  const createTask = async (newTask) => {
    
    
    try {

      const response = await fetch(buildPath('api/createtask'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Response data:', responseData);
        throw new Error('Failed to create task');
      }

      window.location.reload();
      return responseData;
    } 
    
    catch (error) {
      console.error('Error creating task:', error);
      throw error;
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
      color: GanttifyOrange,
      pattern: "default-pattern"
    });
    setColor(GanttifyOrange);
    setErrorMessage(""); 
  };

  return (
    <>
      <div className="floating-button" onClick={() => setShowModal(true)}>
        <div className="button-content">
          <span className="button-icon">+</span>
          <span className="button-text">Add Task</span>
        </div>
      </div>



      {showModal && (


        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">


              <div className="modal-header">
                <h5 className="modal-title">Add a Task</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>


              <div className="modal-body">
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                
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
                    <label htmlFor="assignedTasksUsers" className="form-label">Assigned Users</label>
                    <div className="checkbox-list">
                      {teamUsers.map(user => (
                        <div key={user._id}>
                          <input
                            type="checkbox"
                            id={`user-${user._id}`}
                            checked={taskData.assignedTasksUsers.includes(user._id)}
                            onChange={() => handleCheckboxChange(user._id)}
                          />
                          <label htmlFor={`user-${user._id}`}>{user.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                  <label className="form-label">Color</label>


                  <div className="color-options">
                    {colorOptions.map((colorOption) => (
                      <div key={colorOption} className="color-option" style={{ backgroundColor: colorOption }} onClick={() => handleColorChange(colorOption)} />
                    ))}
                  </div>


                  <div className="color-picker-container">
                    <input type="color" className="form-control form-control-color" id="myColor" value={color} title="Choose a color" onChange={(e) => handleColorChange(e.target.value)} />
                  </div>

                </div>

                  <div className="mb-4 dropup dropup-center d-grid gap-2">
                    <label htmlFor="pattern" className="form-label text-align-start">Pattern</label>
                    <button class="dropdownBtnAdd dropdown-toggle" type="button" id="pattern" data-bs-toggle="dropdown" aria-expanded="false">
                        {pattern}
                    </button>
                    <ul class="dropdown-menu">
                        <a onClick={()=>handlePatternChange('No Pattern','No Pattern')} class = "dropdown-item patternDropdownItem">No Pattern</a>
                        <a onClick={()=>handlePatternChange('Hollow_Single_Dot_Density_1.png','Hollow Dots')} class = "dropdown-item patternDropdownItem patternDropdownItem">Hollow Dots</a>
                        <a onClick={()=>handlePatternChange('Hollow_Single_Rhombus_Density_1.png','Hollow Rhombuses')} class = "dropdown-item patternDropdownItem patternDropdownItem">Hollow Rhombuses</a>
                        <a onClick={()=>handlePatternChange('Hollow_Single_Square_Density_1.png','Hollow Squares')} class = "dropdown-item patternDropdownItem">Hollow Squares</a>
                        <a onClick={()=>handlePatternChange('Hollow_Single_Star_Density_1.png','Hollow Stars')} class = "dropdown-item patternDropdownItem">Hollow Stars</a>
                        <a onClick={()=>handlePatternChange('Hollow_Single_Triangle_Density_1.png','Hollow Triangles')} class = "dropdown-item patternDropdownItem">Hollow Triangles</a>
                        <a onClick={()=>handlePatternChange('Diagonal_Left_Single_Line_Density_1.png','Left Diagonal Lines')} class = "dropdown-item patternDropdownItem">Left Diagonal Lines</a>
                        <a onClick={()=>handlePatternChange('Diagonal_Right_Single_Line_Density_1.png','Right Diagonal Lines')} class = "dropdown-item patternDropdownItem">Right Diagonal Lines</a>
                        <a onClick={()=>handlePatternChange('Diagonal_Woven_Line_Density_1.png','Woven Diagonal Lines')} class = "dropdown-item patternDropdownItem">Woven Diagonal Lines</a>
                        <a onClick={()=>handlePatternChange('Single_Horizontal_Line_Density_1.png','Horizontal Line')} class = "dropdown-item patternDropdownItem">Horizontal Line</a>
                        <a onClick={()=>handlePatternChange('Single_Vertical_Line_Density_1.png','Vertical Line')} class = "dropdown-item patternDropdownItem">Vertical Lines</a>
                        <a onClick={()=>handlePatternChange('Solid_Single_Circle_Density_1.png','Solid Circles')} class = "dropdown-item patternDropdownItem">Solid Circles</a>
                        <a onClick={()=>handlePatternChange('Solid_Single_Dot_Density_1.png','Solid Dots')} class = "dropdown-item patternDropdownItem">Solid Dots</a>
                        <a onClick={()=>handlePatternChange('Solid_Single_Rhombus_Density_1.png','Solid Rhombuses')} class = "dropdown-item patternDropdownItem">Solid Rhombuses</a>
                        <a onClick={()=>handlePatternChange('Solid_Single_Square_Density_1.png','Solid Squares')} class = "dropdown-item patternDropdownItem">Solid Squares</a>
                        <a onClick={()=>handlePatternChange('Solid_Single_Star_Density_1.png','Solid Stars')} class = "dropdown-item patternDropdownItem">Solid Stars</a>
                        <a onClick={()=>handlePatternChange('Solid_Single_Triangle_Density_1.png','Solid Triangles')} class = "dropdown-item patternDropdownItem">Solid Triangles</a>
                        <a onClick={()=>handlePatternChange('Halftone_Density_1.png','Halftone')} class = "dropdown-item patternDropdownItem">Halftone</a>
                        </ul>
                  </div>


                  <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default AddTaskButton;
