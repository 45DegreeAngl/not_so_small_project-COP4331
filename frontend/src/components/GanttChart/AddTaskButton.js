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

const AddTaskButton = ({ projectId }) => {
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


  const [teamUsers, setTeamUsers] = useState([]);

  useEffect(() => {
    getTeamUsers(projectId);
  }, [projectId]);

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

        //Gets all of the ID's in a team
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

        let filteredUsers = usersInfo.filter(user => user !== null)



        const validUsers = Array.isArray(usersInfo) ? filteredUsers : [];

        setTeamUsers(validUsers);

    } catch (error) {
        console.error('Error fetching team users:', error);
    }

    } catch (error) {
      console.error('Error fetching team users:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({...prevData, [name]: value,}));
  };

  const checkboxChange = (userName) => {
    setTaskData((prevData) => {
      const assignedUsers = prevData.assignedTasksUsers.includes(userName) ? prevData.assignedTasksUsers.filter((name) => name !== userName): [...prevData.assignedTasksUsers, userName];

      return { ...prevData, assignedTasksUsers: assignedUsers,};
    });
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        ...taskData,
        tiedProjectId: projectId,
        taskCreatorId: localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data'))._id : null,
      };
      await createTask(newTask);
      closeModal();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const createTask = async (newTask) => {
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
      window.location.reload();
      return createdTask;
    } catch (error) {
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
      color: "#DC6B2C",
      pattern: "default-pattern"
    });
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
                <form onSubmit={addTask}>
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
                            checked={taskData.assignedTasksUsers.includes(user.name)}
                            onChange={() => checkboxChange(user.name)}
                          />
                          <label htmlFor={`user-${user._id}`}>{user.name}</label>
                        </div>
                      ))}
                    </div>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskButton;
