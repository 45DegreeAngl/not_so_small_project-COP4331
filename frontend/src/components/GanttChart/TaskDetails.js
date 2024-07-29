import React, { useEffect, useState } from 'react';
import './TaskDetails.css';
import DeleteTaskButton from '..../Images/assets/action_buttons/Delete_Task_or_Chart.png';
import EditTaskButton from '..../Images/assets/action_buttons/Edit_Task.png';

const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

const colorOptions = [
  '#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d', '#70369d', 
  '#f47474', '#ffd580', '#fff77e','#b2e687', '#8fb9f9', '#9a86cc', '#b27fc6'
];

const TaskDetails = ({ show, onHide, task, handleDelete, userId }) => {
  const [status, setStatus] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('white'); // Default color
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
  const [progressEditPermission, setProgressEditPermission] = useState(false)

  const [originalTask, setOriginalTask] = useState(null);
  
  useEffect(() => {
    if (task) {
      setStatus(task.progress);
      setColor(task.color); 
      fetchTaskCreator(task.taskCreatorId);
      fetchAssignedUsers(task.assignedTasksUsers);
      fetchProjectData(task.tiedProjectId);
      setTaskTitle(task.taskTitle);
      setTaskDescription(task.description);
      setCreatedDate(task.taskCreated);
      setStartDate(task.startDateTime);
      setDueDate(task.dueDateTime);

      setOriginalTask({
        progress: task.progress,
        color: task.color,
        taskTitle: task.taskTitle,
        description: task.description,
        taskCreated: task.taskCreated,
        startDateTime: task.startDateTime,
        dueDateTime: task.dueDateTime
      });
    }
  }, [task]);

  const handleClickOutside = (event) => {
    if (show && !document.getElementById('task-details-sidebar').contains(event.target)) {
      if (editMode) {
        resetTaskDetails(); 
        setEditMode(false);
      }
      setProgressEditPermission(false);
      onHide();
    }
  };

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

  useEffect(() => {
    const handleColorPickerClickOutside = (event) => {
      if (showColorPicker && !document.getElementById('color-picker').contains(event.target) && !document.getElementById('color-circle').contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleColorPickerClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleColorPickerClickOutside);
    };
  }, [showColorPicker]);

  const fetchProjectData = async (projectId) => {
    try {
      const response = await fetch(buildPath(`api/getProjectDetails/${projectId}`));
      const project = await response.json();

      if (!project || !project.team) {
        return;
      }

      const isFounder = project.founderId === userId;
      const isEditor = project.team.editors.includes(userId);
      //if a user is the founder ot editor they can change the progress of a task
      if(isFounder || isEditor){
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


        const validUsers = usersInfo.filter(user=> user !== null);
        const userNames = validUsers.map(user => user.name || 'User not found');

        setAssignedUserNames(userNames);
        //if user is a  assigned to the task they can edit task progress
        if(userIds.includes(userId)){
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

  const handleColorChange = async (newColor) => {
    //console.log(newColor);
    setColor(newColor); 

    var element = document.getElementById('color-circle');
    element.style.backgroundColor = newColor;

    try {
      const response = await fetch(buildPath(`api/tasks/${task._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color: newColor }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task color');
      }

      const updatedTask = await response.json();
      console.log('Task color updated successfully:', updatedTask);
   
      

    } catch (error) {
      console.error('Error updating task color:', error);
    }
  };

  const handleSaveChanges = async () => {
    const currentDate = new Date();
    const threeMonthsBefore = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 0);
    const threeMonthsAfter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 4, 0);

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
          assignedTasksUsers: assignedUserNames.map(name => teamUsers.find(user => user.name === name)?._id).filter(id => id),
          taskCreated: createdDate,
          startDateTime: startDate,
          dueDateTime: dueDate
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
    
    setAssignedUserNames((prevAssignedUserNames) => { const updatedAssignedUsers = prevAssignedUserNames.includes(userName) ? prevAssignedUserNames.filter((name) => name !== userName): [...prevAssignedUserNames, userName];

  
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
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      handleDelete(task._id);
    }
  };

  if (!show || !task) return null;

  return (
    <div id="task-details-sidebar" className="task-details-sidebar">
      <div className="task-details-header">
        <div className="icon-button-container">
          // Edit button and delete button.
          {isEditable && <button type="button" className="edit-button" onClick={() => setEditMode(!editMode)}><img alt="EditTaskIcon" src={EditTaskButton}/></button>}
          {isEditable && <button type="button" className="delete-button" onClick={handleDeleteClick}><img alt="DeleteTaskIcon" src={DeleteTaskButton}/></button>}
          <button type="button" className="close" onClick={handleCloseClick}>&times;</button>
        </div>
        <div className="task-title-container">
          <div className={`color-circle ${editMode ? 'clickable' : ''}`} id="color-circle" style={{ backgroundColor: color }} onClick={() => editMode && setShowColorPicker(!showColorPicker)} />
          {editMode ? (
            <input id="title-text" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          ) : (
            <h5 id="task-title" className="task-title">{task.taskTitle}</h5>
          )}
        </div>
      </div>
      {showColorPicker && (
        <div id="color-picker" className="color-picker">
          {colorOptions.map((colorOption) => (
            <div key={colorOption} className="color-option" style={{ backgroundColor: colorOption }} onClick={() => handleColorChange(colorOption)} />
          ))}
          <input type="color" className="form-control form-control-color" id="myColor" value={color} title="Choose a color" onChange={(e) => handleColorChange(e.target.value)} />
        </div>
      )}
      {progressEditPermission?
      <div className="dropdownDetails">
        <a className="nav-link dropdown-toggle" id="todoDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >{status}</a>
        <div className="dropdown-menu" aria-labelledby="todoDropdown">
          <a className="dropdown-item" onClick={() => handleStatusChange('Not Started')}>Not Started</a>
          <a className="dropdown-item" onClick={() => handleStatusChange('In-Progress')}>In-Progress</a>
          <a className="dropdown-item" onClick={() => handleStatusChange('Completed')}>Completed</a>:
        </div>
      </div>:
      <div className="dropdownDetails">
        <a className="nav-link" id="todoDropdown" disabled aria-expanded="false" >{status}</a>
      </div>}



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
            
            <p><strong>Created Date:</strong> {formatDate(task.taskCreated)}</p>
            <p><strong>Start Date:</strong> {editMode ? (
              <input type="date" value={startDate.split('T')[0]} onChange={(e) => setStartDate(e.target.value)} />
            ) : (
              formatDate(task.startDateTime)
            )}</p>
            <p><strong>Due Date:</strong> {editMode ? (
              <input type="date" value={dueDate.split('T')[0]} onChange={(e) => setDueDate(e.target.value)} />
            ) : (
              formatDate(task.dueDateTime)
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
