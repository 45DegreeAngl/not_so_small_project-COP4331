import { useState, useEffect } from 'react';
import AddTaskDuration from './AddTaskDuration';
import AddTask from './AddTask';
import Grid from './Grid';
import Settings from './Settings';
import Tasks from './Tasks';
import TimeRange from './TimeRange';
import TimeTable from './TimeTable';
import TaskDetails from './TaskDetails';
import './GanttChart.css';

const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

export default function GanttChart({ projectId, setUserRole, userRole }) {
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userId = ud._id;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [tasks, setTasks] = useState([]);
  const [taskDurations, setTaskDurations] = useState([]);
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: currentMonth,
    fromSelectYear: currentYear.toString(),
    toSelectMonth: currentMonth + 1, 
    toSelectYear: currentYear.toString(),
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(buildPath(`api/getProjectDetails/${projectId}`));
        const project = await response.json();
        
        if (!project || !project.team) {
          return;
        }
        
        const isFounder = project.founderId === userId;
        const isEditor = project.team.editors.includes(userId);

        if (isFounder) {
          setUserRole('founder');
        } else if (isEditor) {
          setUserRole('editor');
        } else {
          setUserRole('member');
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const obj = { projectId };
        const js = JSON.stringify(obj);

        const response = await fetch(buildPath('api/search/tasks/project'), {
          method: 'POST',
          body: js,
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`HTTP error, status: ${response.status}`);
        }

        const fetchedTasks = await response.json();

        if (!fetchedTasks) {
          throw new Error('No tasks found in the response.');
        }

        const durations = fetchedTasks.map(task => {
          const duration = {
            task: task._id,
            start: task.startDateTime,
            end: task.dueDateTime
          };
          if (!duration._id) {
            duration._id = `${task._id}-${Date.now()}`; 
          }
          return duration;
        });

        setTasks(fetchedTasks);
        setTaskDurations(durations);

      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    fetchProjectData();
    fetchTasks();
  }, [projectId, userId, setUserRole]);

  useEffect(() => {
  }, [taskDurations]);

  useEffect(() => {
    document.documentElement.style.setProperty('--task-count', tasks.length);
  }, [tasks]);

  return (
    <div id="gantt-container">
      <Grid>
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}
          userRole={userRole}
          setSelectedTask={setSelectedTask}
          setShowDetails={setShowDetails}
        />
        <TimeTable
          timeRange={timeRange}
          tasks={tasks}
          setTasks={setTasks}
          taskDurations={taskDurations}
          setTaskDurations={setTaskDurations}
          userId={userId}
          projectId={projectId}
          userRole={userRole}
        />
      </Grid>

      <TaskDetails
        show={showDetails}
        onHide={() => setShowDetails(false)}
        task={selectedTask}
        handleDelete={(taskId) => setTasks(tasks.filter(task => task._id !== taskId))}
        userId={userId}
      />
    </div>
  );
}
