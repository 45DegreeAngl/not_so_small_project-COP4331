import React, { useEffect, useState } from 'react';
import './TaskDetails.css';

import DeleteTaskButton from '../../Images/assets/action_buttons/Delete_Task_or_Chart_30x30.png';
import EditTaskButton from '../../Images/assets/action_buttons/Edit_Task_30x30.png';

const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

// Colors to choose from
const colorOptions = [
  '#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d', '#70369d',
  '#f47474', '#ffd580', '#fff77e','#b2e687', '#8fb9f9', '#9a86cc', '#b27fc6'
];
const patternDisplayNames = {
	'Hollow_Single_Circle_Density_1.png':'Hollow Circles',
	'Hollow_Single_Dot_Density_1.png':'Hollow Dots',
	'Hollow_Single_Rhombus_Density_1.png':'Hollow Rhombuses',
	'Hollow_Single_Square_Density_1.png':'Hollow Squares',
	'Hollow_Single_Star_Density_1.png':'Hollow Stars',
	'Hollow_Single_Triangle_Density_1.png':'Hollow Triangles',
	'Diagonal_Left_Single_Line_Density_1.png':'Left Diagonal Lines',
	'Diagonal_Right_Single_Line_Density_1.png':'Right Diagonal Lines',
	'Diagonal_Woven_Line_Density_1.png':'Woven Diagonal Lines',
	'Single_Horizontal_Line_Density_1.png':'Horizontal Line',
	'Single_Vertical_Line_Density_1.png':'Vertical Line',
	'Solid_Single_Circle_Density_1.png':'Solid Circles',
	'Solid_Single_Dot_Density_1.png':'Solid Dots',
	'Solid_Single_Rhombus_Density_1.png':'Solid Rhombuses',
	'Solid_Single_Square_Density_1.png':'Solid Squares',
	'Solid_Single_Star_Density_1.png':'Solid Stars',
	'Solid_Single_Triangle_Density_1.png':'Solid Triangles',
	'Halftone_Density_1.png':'Halftone',
	'Halftone_Density_2.png':'Light Halftone',
	'Halftone_Density_3.png':'Dense Halftone',
    'No Pattern':'No Pattern'
}


// Initializes variables
const TaskDetails = ({ show, onHide, task, handleDelete, userId }) => {
  const [status, setStatus] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('white'); // Default color
  const [pattern,setPattern] = useState('No Pattern');
  const [patternToDisplay,setPatternToDisplay] = useState('No Pattern');
  const [taskCreatorName, setTaskCreatorName] = useState('');
  const [assignedUserNames, setAssignedUserNames] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [teamUsers, setTeamUsers] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [progressEditPermission, setProgressEditPermission] = useState(false);

  const [originalTask, setOriginalTask] = useState(null);
  const [fetchedTask, setFetchedTask] = useState(null);

  useEffect(() => {
    if (task && show) {
      setProgressEditPermission(false);
      setStatus(task.progress);
      setColor(task.color);
      fetchTaskCreator(task.taskCreatorId);
      fetchAssignedUsers(task.assignedTasksUsers);
      getProjectData(task.tiedProjectId);
      setTaskTitle(task.taskTitle);
      setTaskDescription(task.description);
      setCreatedDate(task.taskCreated);
      setStartDate(task.startDateTime);
      setDueDate(task.dueDateTime);
      setPattern(task.pattern);
      setPatternToDisplay(patternDisplayNames[task.pattern])

      setOriginalTask({
        progress: task.progress,
        color: task.color,
        taskTitle: task.taskTitle,
        description: task.description,
        taskCreated: task.taskCreated,
        startDateTime: task.startDateTime,
        dueDateTime: task.dueDateTime,
        pattern: task.pattern
      });

      fetchTaskFromAPI(task._id);
    }
  }, [task, show]);

  // Makes sure that task gets updated live
  const fetchTaskFromAPI = async (taskId) => {
    if (taskId) {
      try {
        const response = await fetch(buildPath(`api/tasks/${taskId}`));

        console.log("Response: ", response);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Response not JSON");
        }

        const fetchedTask = await response.json();

        console.log("fetched task? ", fetchedTask);

        if (fetchedTask) {
          setTaskDetails(fetchedTask);
          setFetchedTask(fetchedTask);
        }
      } catch (error) {
        console.error('Error fetching task from API:', error);
      }
    }
  };

  // Re-sets the variables with the updated tasks
  const setTaskDetails = (fetchedTask) => {
    setProgressEditPermission(false);
    setStatus(fetchedTask.progress);
    setColor(fetchedTask.color);
    setPattern(fetchedTask.pattern);
    fetchTaskCreator(fetchedTask.taskCreatorId);
    fetchAssignedUsers(fetchedTask.assignedTasksUsers);
    getProjectData(fetchedTask.tiedProjectId);
    setTaskTitle(fetchedTask.taskTitle);
    setTaskDescription(fetchedTask.description);
    setCreatedDate(fetchedTask.taskCreated);
    setStartDate(fetchedTask.startDateTime);
    setDueDate(fetchedTask.dueDateTime);
    setPatternToDisplay(patternDisplayNames[fetchedTask.pattern])

    setOriginalTask({
      progress: fetchedTask.progress,
      color: fetchedTask.color,
      taskTitle: fetchedTask.taskTitle,
      description: fetchedTask.description,
      taskCreated: fetchedTask.taskCreated,
      startDateTime: fetchedTask.startDateTime,
      dueDateTime: fetchedTask.dueDateTime,
      pattern : fetchedTask.pattern
    });
  };

  const handleClickOutside = (event) => {
    if (show && !document.getElementById('task-details-sidebar').contains(event.target)) {
      if (editMode) {
        resetTaskDetails();
        setEditMode(false);
      }
      onHide();
    }
  };

  // If the user clicks off of the sidebar, all of the values get reset
  const resetTaskDetails = () => {
    if (originalTask) {
      setStatus(originalTask.progress);
      setColor(originalTask.color);
      setTaskTitle(originalTask.taskTitle);
      setTaskDescription(originalTask.description);
      setCreatedDate(originalTask.taskCreated);
      setStartDate(originalTask.startDateTime);
      setDueDate(originalTask.dueDateTime);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onHide, editMode]);

  // Resets the color picker
  useEffect(() => {
    const handleColorPickerClickOutside = (event) => {
      const colorPickerElement = document.getElementById('color-picker-sidebar');
      const colorCircleElement = document.getElementById('color-circle');

      if (showColorPicker && colorPickerElement && colorCircleElement && !colorPickerElement.contains(event.target) && !colorCircleElement.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleColorPickerClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleColorPickerClickOutside);
    };
  }, [showColorPicker]);

  const getProjectData = async (projectId) => {
    try {
      const response = await fetch(buildPath(`api/getProjectDetails/${projectId}`));
      const project = await response.json();

      if (!project || !project.team) {
        return;
      }

      const isFounder = project.founderId === userId;
      const isEditor = project.team.editors.includes(userId);

      // If a user is the founder or editor they can change the progress of a task
      if (isFounder || isEditor) {
        setProgressEditPermission(true);
      }
      setIsEditable(isFounder || isEditor);
      fetchTeamUsers(project.team._id);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const fetchTeamUsers = async (teamId) => {
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
      const validUsers = Array.isArray(usersInfo) ? filterValidUsers(usersInfo) : [];

      setTeamUsers(validUsers);
    } catch (error) {
      console.error('Error fetching team users:', error);
    }
  };

  const fetchTaskCreator = async (taskCreatorId) => {
    try {
      const response = await fetch(buildPath('api/read/users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users: [taskCreatorId] }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch task creator details');
      }

      const { usersInfo } = await response.json();
      if (Array.isArray(usersInfo) && usersInfo.length > 0) {
        const creatorName = usersInfo[0]?.name || 'Unknown';
        setTaskCreatorName(creatorName);
      } else {
        throw new Error('Invalid response structure for task creator details');
      }
    } catch (error) {
      console.error('Error fetching task creator details:', error);
    }
  };

  const fetchAssignedUsers = async (userIds) => {


    try {
      const response = await fetch(buildPath('api/read/users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users: userIds }),
      });

      if (!response.ok) {
        throw new Error('Error fetching assigned users');
      }

      const { usersInfo } = await response.json();

      if (Array.isArray(usersInfo)) {
        const validUsers = usersInfo.filter(user => user !== null);
        const userNames = validUsers.map(user => user.name || 'User not found');

        setAssignedUserNames(userNames);
        // If user is assigned to the task they can edit task progress
        if (userIds.includes(userId)) {
          setProgressEditPermission(true);
        }

      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Error fetching assigned users:', error);
    }


  };

  const filterValidUsers = (users) => {
    return users.filter(user => user !== null);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);

    try {
      const response = await fetch(buildPath(`api/tasks/${task._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      const updatedTask = await response.json();
      console.log('Task updated successfully:', updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);

    var element = document.getElementById('color-circle');
    element.style.backgroundColor = newColor;
  };

  const handleSaveChanges = async () => {
    if (!task) return;

    const currentDate = new Date();

    if (new Date(startDate) > new Date(dueDate)) {
      setDateError("Due date cannot be before start date.");
      return;
    }
 
    setDateError(''); // Clear the error message if dates are valid

    try {
      const response = await fetch(buildPath(`api/tasks/${task._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskTitle,
          description: taskDescription,
          color, // Include color in the update
          assignedTasksUsers: assignedUserNames.map(name => teamUsers.find(user => user.name === name)?._id).filter(id => id),
          taskCreated: createdDate,
          startDateTime: startDate,
          dueDateTime: dueDate,
          pattern: pattern
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task details');
      }

      const updatedTask = await response.json();
      console.log('Task updated successfully:', updatedTask);

      await updateUsersToDoList(task._id, assignedUserNames.map(name => teamUsers.find(user => user.name === name)._id).filter(id => id));

      setEditMode(false);

      window.location.reload();

    } catch (error) {
      console.error('Error updating task details:', error);
    }
  };
  const handlePatternChange = async (newPattern,newPatternToDisplay) => {
    console.log(newPattern);
    setPatternToDisplay(newPatternToDisplay)
    setPattern(newPattern);
  }

  const updateUsersToDoList = async (taskId, userIds) => {
    try {
      const response = await fetch(buildPath('api/updateUsersToDoList'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, userIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to update users\' toDoList');
      }

      console.log('Users\' toDoList updated successfully');
    } catch (error) {
      console.error('Error updating users\' toDoList:', error);
    }
  };

  const handleCheckboxChange = async (userName) => {
    setAssignedUserNames((prevAssignedUserNames) => {
      const updatedAssignedUsers = prevAssignedUserNames.includes(userName) ? prevAssignedUserNames.filter((name) => name !== userName) : [...prevAssignedUserNames, userName];

      const isChecked = !prevAssignedUserNames.includes(userName);
    
      const userId = teamUsers.find(user => user.name === userName)._id;
    
      updateSingleUserToDoList(task._id, userId, isChecked);

      return updatedAssignedUsers;
    });
  };

  const updateSingleUserToDoList = async (taskId, userId, isChecked) => {
    try {
      const response = await fetch(buildPath('api/updateSingleUserToDoList'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, userId, isChecked }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user\'s toDoList');
      }

      console.log('User\'s toDoList updated successfully');
    } catch (error) {
      console.error('Error updating user\'s toDoList:', error);
    }
  };

  const handleCloseClick = () => {
    handleClickOutside(true);
    onHide();
    resetTaskDetails();
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      handleDelete(task._id);
    }
  };

  if (!show || !task || !fetchedTask) return null;

  return (

    <div id="task-details-sidebar" className="task-details-sidebar">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
      <div className="task-details-header">
        <div className="icon-button-container">
          {isEditable && <button type="button" className="edit-button" onClick={() => setEditMode(!editMode)}><img alt="EditTaskIcon" src={EditTaskButton}/></button>}
          {isEditable && <button type="button" className="delete-button" onClick={handleDeleteClick}><img alt="DeleteTaskIcon" src={DeleteTaskButton}/></button>}
          <button type="button" className="close" onClick={handleCloseClick}>&times;</button>
        </div>
        <div className="task-title-container">
        <div className={`color-circle ${editMode ? 'clickable hover-highlight' : ''}`} id="color-circle" style={{ backgroundColor: color }} onClick={() => editMode && setShowColorPicker(!showColorPicker)} />
          {editMode ? (
            <input id="title-text" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          ) : (
            <h5 id="task-title" className="task-title">{task.taskTitle}</h5>
          )}
        </div>
      </div>

      {showColorPicker && (
         <div id="color-picker-sidebar" className="color-picker-sidebar">
         {colorOptions.map((colorOption) => (
           <div key={colorOption} className="color-option-sidebar" style={{ backgroundColor: colorOption }} onClick={() => handleColorChange(colorOption)} />
         ))}
         <div className="color-picker-wrapper">
           <i className="fas fa-eye-dropper"></i>
           <input type="color" className="form-control form-control-color-sidebar" id="myColor" value={color} title="Choose a color" onChange={(e) => handleColorChange(e.target.value)} />
         </div>
       </div>
      )}
      <div class = "d-inline-flex">
      {progressEditPermission ?
      <div className="dropdownDetails">
        <a className="nav-link dropdown-toggle" id="todoDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >{status}</a>
        <div className="dropdown-menu" aria-labelledby="todoDropdown">
          <a className="dropdown-item" onClick={() => handleStatusChange('Not Started')}>Not Started</a>
          <a className="dropdown-item" onClick={() => handleStatusChange('In-Progress')}>In-Progress</a>
          <a className="dropdown-item" onClick={() => handleStatusChange('Completed')}>Completed</a>:
        </div>
      </div> :
      <div className="dropdownDetails">
        <a className="nav-link" id="todoDropdown" disabled aria-expanded="false" >{status}</a>
      </div>}
      {editMode?
      <div className="dropdownDetails flex-fill mx-1">
                    <button class="nav-link dropdown-toggle dropdownBtn" type="button" id="pattern" data-bs-toggle="dropdown" aria-expanded="false">
                        {patternToDisplay}
                    </button>
                    <ul class="dropdown-menu">
                        <a onClick={()=>handlePatternChange('Hollow_Single_Circle_Density_1.png','Hollow Circles')} class = "dropdown-item patternDropdownItem patternDropdownItem">Hollow Circles</a>
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
                        <a onClick={()=>handlePatternChange('No Pattern','No Pattern')} class = "dropdown-item patternDropdownItem">No Pattern</a>
                        </ul>
                  </div>:
                   <div className="dropdownDetails flex-fill mx-1">
                   <button class="nav-link dropdownBtn" type="button" id="pattern" data-bs-toggle="dropdown" aria-expanded="false" disabled>
                       {patternToDisplay}
                   </button></div>}</div>



      <div className="task-details-body">
        <div id="description-title">Description</div>
        {editMode ? (
          <textarea id="description-text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
        ) : (
          <div id="description">{task.description || 'Add a description here...'}</div>
        )}
      </div>

      <div className="task-details-footer">
        <div className="details">

          <div className="details-header">Details</div>
          <div className="details-body">


            <p><strong>Task Creator:</strong> {taskCreatorName}</p>

            {editMode ? (
              <div>

                <p><strong>Assigned Users:</strong></p>
                <div className="checkbox-list">
                  {teamUsers.map(user => (
                    <div key={user._id}>
                      <input
                        type="checkbox"
                        id={`user-${user._id}`}
                        checked={assignedUserNames.includes(user.name)}
                        onChange={() => handleCheckboxChange(user.name)}
                      />
                      <label htmlFor={`user-${user._id}`}>{user.name}</label>
                    </div>
                  ))}


                </div>

                <div id="placeholder-temp"></div>
              </div>
            ) : (

              <p><strong>Assigned Users:</strong> {assignedUserNames.join(', ')}</p>


            )}
            

            <p><strong>Created Date:</strong> {formatDate(fetchedTask.taskCreated)}</p>
            <p><strong>Start Date:</strong> {editMode ? (


              <input type="date" value={startDate.split('T')[0]} onChange={(e) => setStartDate(e.target.value)} />
            ) : (


              formatDate(fetchedTask.startDateTime)
            )}</p>


            <p><strong>Due Date:</strong> {editMode ? (
              <input type="date" value={dueDate.split('T')[0]} onChange={(e) => setDueDate(e.target.value)} />
            ) : (

              formatDate(fetchedTask.dueDateTime)

            )}</p>
          </div>

          {dateError && <p className="error">{dateError}</p>}

        </div>

        {editMode && <button type="button" className="done-button" onClick={handleSaveChanges}>Done</button>}

      </div>
    </div>
  );
};

export default TaskDetails;
