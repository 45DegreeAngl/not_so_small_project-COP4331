import { useState, useEffect, useRef } from 'react';
import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  createFormattedDateFromDate,
  dayDiff,
} from '../../helpers/dateFunctions';
import { months } from '../../constants';
import TaskDetails from './TaskDetails';
import './TimeTable.css';
import Halftone_Density_3 from '../../Images/assets/accessible_patterns/halftone_family/Halftone_Density_3.png';
import Halftone_Density_2 from '../../Images/assets/accessible_patterns/halftone_family/Halftone_Density_2.png';
import Halftone_Density_1 from '../../Images/assets/accessible_patterns/halftone_family/Halftone_Density_1.png';
import Diagonal_Right_Single_Line_Density_1 from '../../Images/assets/accessible_patterns/line_family/Diagonal_Right_Single_Line_Density_1.png';
import Diagonal_Left_Single_Line_Density_1 from '../../Images/assets/accessible_patterns/line_family/Diagonal_Left_Single_Line_Density_1.png';
import Diagonal_Woven_Line_Density_1 from '../../Images/assets/accessible_patterns/line_family/Diagonal_Woven_Line_Density_1.png';
import Single_Horizontal_Line_Density_1 from '../../Images/assets/accessible_patterns/line_family/Single_Horizontal_Line_Density_1.png';
import Single_Vertical_Line_Density_1 from '../../Images/assets/accessible_patterns/line_family/Single_Vertical_Line_Density_1.png'
import Solid_Single_Circle_Density_1 from  '../../Images/assets/accessible_patterns/solid_shape_family/Solid_Single_Circle_Density_1.png';
import Solid_Single_Dot_Density_1 from '../../Images/assets/accessible_patterns/solid_shape_family/Solid_Single_Dot_Density_1.png';
import Solid_Single_Rhombus_Density_1 from '../../Images/assets/accessible_patterns/solid_shape_family/Solid_Single_Rhombus_Density_1.png';
import Solid_Single_Square_Density_1 from '../../Images/assets/accessible_patterns/solid_shape_family/Solid_Single_Square_Density_1.png';
import Solid_Single_Star_Density_1 from '../../Images/assets/accessible_patterns/solid_shape_family/Solid_Single_Star_Density_1.png';
import Solid_Single_Triangle_Density_1 from '../../Images/assets/accessible_patterns/solid_shape_family/Solid_Single_Triangle_Density_1.png';
import Hollow_Single_Circle_Density_1 from '../../Images/assets/accessible_patterns/hollow_shape_family/Hollow_Single_Circle_Density_1.png';
import Hollow_Single_Dot_Density_1 from'../../Images/assets/accessible_patterns/hollow_shape_family/Hollow_Single_Dot_Density_1.png';
import Hollow_Single_Rhombus_Density_1 from '../../Images/assets/accessible_patterns/hollow_shape_family/Hollow_Single_Rhombus_Density_1.png';
import Hollow_Single_Square_Density_1 from '../../Images/assets/accessible_patterns/hollow_shape_family/Hollow_Single_Square_Density_1.png';
import Hollow_Single_Star_Density_1 from '../../Images/assets/accessible_patterns/hollow_shape_family/Hollow_Single_Star_Density_1.png';
import Hollow_Single_Triangle_Density_1 from '../../Images/assets/accessible_patterns/hollow_shape_family/Hollow_Single_Triangle_Density_1.png';



const app_name = 'ganttify-5b581a9c8167';


function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}



function isTaskHappeningNow(startDate,dueDate,dateToCheck){
    const timestamp = new Date(dateToCheck+"T00:00:00.000Z");
    const start = new Date(startDate);
    const end = new Date(dueDate);
    if(timestamp < start || timestamp > end){
        return false;
    }
    return true;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export default function TimeTable({
  timeRange,
  tasks,
  setTasks,
  taskDurations,
  setTaskDurations,
  userId,
  projectId,
}) {


  const patterns = {
    'Halftone_Density_1.png':Halftone_Density_1 , 'Halftone_Density_2.png':Halftone_Density_2,
    'Halftone_Density_3.png':Halftone_Density_3,  'Diagonal_Right_Single_Line_Density_1.png':Diagonal_Right_Single_Line_Density_1,
    'Diagonal_Left_Single_Line_Density_1.png':Diagonal_Left_Single_Line_Density_1, 'Diagonal_Left_Single_Line_Density_1.png':Diagonal_Left_Single_Line_Density_1,
    'Diagonal_Woven_Line_Density_1.png':Diagonal_Woven_Line_Density_1, 'Single_Horizontal_Line_Density_1.png':Single_Horizontal_Line_Density_1,
    'Single_Vertical_Line_Density_1.png':Single_Vertical_Line_Density_1,'Solid_Single_Circle_Density_1.png':Solid_Single_Circle_Density_1,
    'Solid_Single_Dot_Density_1.png':Solid_Single_Dot_Density_1,'Solid_Single_Rhombus_Density_1.png':Solid_Single_Rhombus_Density_1,
    'Solid_Single_Square_Density_1.png':Solid_Single_Square_Density_1,'Solid_Single_Star_Density_1.png':Solid_Single_Star_Density_1,
    'Solid_Single_Triangle_Density_1.png':Solid_Single_Triangle_Density_1,'Hollow_Single_Circle_Density_1.png':Hollow_Single_Circle_Density_1,
    'Hollow_Single_Dot_Density_1.png':Hollow_Single_Dot_Density_1,'Hollow_Single_Rhombus_Density_1.png':Hollow_Single_Rhombus_Density_1,
    'Hollow_Single_Square_Density_1.png':Hollow_Single_Square_Density_1,'Hollow_Single_Star_Density_1.png':Hollow_Single_Star_Density_1,
    'Hollow_Single_Triangle_Density_1.png':Hollow_Single_Triangle_Density_1
  }

  const ganttRef = useRef(null);


  // Initializing the Gantt Chart's different states
  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [resizingTask, setResizingTask] = useState(null);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Gets the project's details
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

        setIsEditable(isFounder || isEditor);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [projectId, userId]);



  // Event handlers
  const handleOutsideClick = (e) => {
    if (e.target.closest('.task-duration') === null) {
      setHoveredTask(null);
    }
  };


  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleResizeEnd);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);


  // Handles the "resizing" of a singular task
  const handleResizeStart = (e, taskDurationId, direction) => {
    //console.log("starting resize");
    e.stopPropagation();
    e.preventDefault();
    setResizingTask(taskDurationId);
    setResizeDirection(direction);
    setIsResizing(true);
    setShowDetails(false);
  };



  const handleResizeEnd = async () => {
    if (resizingTask && resizeDirection) {
      const taskDuration = taskDurations.find(
        (taskDuration) => taskDuration._id === resizingTask
      );

      if (!taskDuration) {
        return;
      }
      turnOnPattern(taskDuration);
      const endDate = new Date(taskDuration.end)
      const startDate = new Date(taskDuration.start)
      const id = taskDuration._id.slice(0,24);
      for(let i = 1;i<15;i++){
        togglePatternDate(endDate.addDays(i).toISOString().slice(0,10),id,true);
        togglePatternDate(startDate.addDays(-i).toISOString().slice(0,10),id,true);
      }

      const obj = { startDateTime: taskDuration.start, dueDateTime: taskDuration.end };
      const js = JSON.stringify(obj);

      try {
        const response = await fetch(buildPath(`api/tasks/${taskDuration.task}/dates`), {
          method: 'PUT',
          body: js,
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`HTTP error, status: ${response.status}`);
        }

        setTaskDurations((prevDurations) =>
          prevDurations.map((duration) =>
            duration._id === taskDuration._id ? taskDuration : duration
          )
        );
      } catch (error) {
        console.error('Error updating task dates: ', error);
      }

      setResizingTask(null);
      setResizeDirection(null);
      setIsResizing(false);
    }
    if (isDragging) {
      setIsDragging(false);
      handleDragEnd(taskDurationElDraggedId);
    }
  };
  function togglePatternDate(date,id,hide){
    const pattern = document.getElementById(`pattern/${date}/${id}`);
    if(hide){
        pattern.setAttribute("hidden","true");
    }
    else{  
        pattern.removeAttribute("hidden");
    }
  }

  // Updates the task's dates based off of the user's mouse's position 
  const handleMouseMove = (e) => {
    if (resizingTask && resizeDirection) {
      const taskDuration = taskDurations.find(
        (taskDuration) => taskDuration._id === resizingTask
      );

      if (!taskDuration) {
        return;
      }

      const dateCells = Array.from(document.querySelectorAll('[data-date]'));
      const closestDateCell = dateCells.reduce((closest, cell) => {
        const box = cell.getBoundingClientRect();
        const distance = Math.abs(e.clientX - (box.left + box.right) / 2);

        if (distance < closest.distance) {
          return { cell, distance };
        }

        return closest;
      }, { cell: null, distance: Infinity });

      if (closestDateCell.cell) {
        const newDate = closestDateCell.cell.getAttribute('data-date');
        const id = taskDuration._id.slice(0,24);

        if (resizeDirection === 'left') {
          if (new Date(newDate) <= new Date(taskDuration.end)) {
            if(new Date(newDate) > new Date(taskDuration.start)){
                let patternDate = new Date(newDate).addDays(-1);
                let formattedPatternDate = patternDate.toISOString().slice(0,10);
                togglePatternDate(formattedPatternDate,id,true)
            }
            else if(new Date(newDate) < new Date(taskDuration.start)){
                togglePatternDate(newDate,id,false)
            }
            taskDuration.start = newDate;
          }
        } else if (resizeDirection === 'right') {
          if (new Date(newDate) >= new Date(taskDuration.start)) {
            if(new Date(newDate) < new Date(taskDuration.end)){
                let patternDate = new Date(newDate).addDays(1);
                let formattedPatternDate = patternDate.toISOString().slice(0,10);
                togglePatternDate(formattedPatternDate,id,true)
            }
            else if(new Date(newDate) > new Date(taskDuration.end)){
                togglePatternDate(newDate,id,false)
            }
            taskDuration.end = newDate;
          }
        }


        setTaskDurations((prevDurations) =>
          prevDurations.map((duration) =>
            duration._id === taskDuration._id ? { ...taskDuration } : duration
          )
        );
      }
    }



    if (isDragging) {
      const taskDuration = taskDurations.find(
        (taskDuration) => taskDuration._id === taskDurationElDraggedId
      );

      if (!taskDuration) {
        return;
      }

      const dateCells = Array.from(document.querySelectorAll('[data-date]'));



      // Gets the cell date that is closest to the user's mouse
      const closestDateCell = dateCells.reduce((closest, cell) => {
        const box = cell.getBoundingClientRect();
        const distance = Math.abs(e.clientX - (box.left + box.right) / 2);

        if (distance < closest.distance) {
          return { cell, distance };
        }

        return closest;
      }, 
      { cell: null, distance: Infinity }
    );

      // Update's the dates that is closest to the user's mouse's position
      if (closestDateCell.cell) {
        const newStartDate = closestDateCell.cell.getAttribute('data-date');
        const daysDuration = dayDiff(new Date(taskDuration.start), new Date(taskDuration.end));
        const newEndDate = new Date(new Date(newStartDate).setDate(new Date(newStartDate).getDate() + daysDuration - 1));

        taskDuration.start = newStartDate;
        taskDuration.end = createFormattedDateFromDate(newEndDate);

        setTaskDurations((prevDurations) =>
          prevDurations.map((duration) =>
            duration._id === taskDuration._id ? { ...taskDuration } : duration
          )
        );
      }
    }
  };

  // Styling
  const ganttTimePeriod = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(60px, 1fr)',
    outline: '0.5px solid var(--color-outline)',
    textAlign: 'center',
    height: 'var(--cell-height)',
  };

  const ganttTimePeriodSpan = {
    margin: 'auto',
    fontSize: '20px',
  };

  const ganttTimePeriodSpanMonths = {
    margin: 'auto',
    fontSize: '10px',
  };

  const ganttTimePeriodCell = {
    position: 'relative',
    outline: '0.5px solid var(--color-outline)',
    marginTop: '0.5px',
  };

  const taskDurationBaseStyle = {
    position: 'absolute',
    height: 'calc(var(--cell-height) * 0.75)',
    top: 'calc(var(--cell-height) / 8)',
    zIndex: '1',
    borderRadius: 'var(--border-radius)',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.05)',
    cursor: isEditable && !isResizing ? 'move' : 'default', // Update cursor style
  };

  const currentDate = new Date();

  // Gets the start and end dates
  const startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6);
  const endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6);

  const numMonths = monthDiff(startMonth, endMonth) + 1;
  let month = new Date(startMonth);

  let monthRows = [];
  let dayRows = [];
  let dayRow = [];
  let weekRows = [];
  let weekRow = [];
  let taskRows = [];
  let taskRow = [];
  let currentDayIndex = 0;
  let dayCounter = -1;



  // Get the st, th, and rd for the respective numbers
  function getOrdinal(n) {
    return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th";
  }

  // Begins the loops for adding elements, with styling, to their respective arrays
  for (let i = 0; i < numMonths; i++) {
    monthRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        <span style={ganttTimePeriodSpan}>
          {months[month.getMonth()] + ' ' + month.getFullYear()}
        </span>
      </div>
    );


    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
    const currYear = month.getFullYear();
    const currMonth = month.getMonth() + 1;

    for (let j = 1; j <= numDays; j++) {
      let k = getOrdinal(j);

      const formattedDate = createFormattedDateFromStr(currYear, currMonth, j);
      if (new Date(formattedDate).toDateString() === currentDate.toDateString()) { currentDayIndex = dayCounter; }

      dayRow.push(
        
        <div key={j} style={{ ...ganttTimePeriod, outline: 'none' }}>
          <span style={ganttTimePeriodSpanMonths}>
            {getDayOfWeek(currYear, currMonth - 1, j - 1)} {j}{k}
          </span>
        </div>

      );

      weekRow.push(
        
        <div key={j} style={{ ...ganttTimePeriod, outline: 'none' }}>
          <span style={{ ...ganttTimePeriodSpanMonths, color: '#3E455B' }}>
            {getDayOfWeek(currYear, currMonth - 1, j - 1)}
          </span>
        </div>

      );

      dayCounter++;
    }

    dayRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        {dayRow}
      </div>
    );

    weekRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        {weekRow}
      </div>
    );

    dayRow = [];
    weekRow = [];
    month.setMonth(month.getMonth() + 1);
  }

  if (tasks) {
    tasks.forEach((task, index) => {
      const startDate = task.startDateTime;
      const dueDate = task.dueDateTime;
      let mnth = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear();
        const curMonth = mnth.getMonth() + 1;

        const numDays = getDaysInMonth(curYear, curMonth);

        for (let j = 1; j <= numDays; j++) {

          
          const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);
          const formattedDate = createFormattedDateFromStr(curYear, curMonth, j);
          var taskHappening=false;
          if(task['pattern'] && (task['pattern'] in patterns)){
            taskHappening = isTaskHappeningNow(startDate,dueDate,formattedDate);
          }
          taskRow.push(
            <div
              key={`${task._id}-${j}`}
              style={{
                ...ganttTimePeriodCell,
                backgroundColor:
                  dayOfTheWeek === 'S' ? 'var(--color-tertiary)' : index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                ...(hoveredRow === task._id && { backgroundColor: '#f0f0f0' }),
              }}

              data-task={task?._id}
              data-date={formattedDate}
              data-task-id={task._id}
              onDrop={onTaskDurationDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onMouseEnter={() => setHoveredRow(task._id)} 
              onMouseLeave={() => setHoveredRow(null)} 
            >


            <img id={`pattern/${formattedDate}/${task._id}`}src={patterns[task.pattern]} class = "patternImg" hidden={!taskHappening}/>
              {taskDurations.map((el, i) => {
                const elStartDate = el?.start.split('T')[0];

                if (el?.task === task?._id && elStartDate === formattedDate) {
                  return (
                    
                    <div
                      key={`${i}-${el?.task}`}

                
                      className={`task-duration ${taskDurationElDraggedId === el?._id ? 'dragging' : ''}`}
                                 
                      draggable={isEditable && !isResizing ? "true" : "false"}

                      tabIndex="0"
                      onDragStart={isEditable && !isResizing ? () => handleDragStart(el?._id) : null}
                      onDragEnd={isEditable && !isResizing ? () => handleDragEnd(el?._id) : null}
                      onMouseMove={(e) => handleMouseMove(e)}


                      onMouseUp={handleResizeEnd}

                      style={{
                        
                        ...taskDurationBaseStyle,
                        width: `calc(${dayDiff(el?.start, el?.end)} * 100% - 1px)`,
                        opacity: taskDurationElDraggedId === el?._id ? '0.5' : '1',
                        background: task.color || 'var(--color-primary-light)',
                        border: hoveredTask === el?._id && !isResizing ? '2px solid black' : 'none',
                        cursor: isEditable && !isResizing ? 'move' : 'default'
                      }}

                      onKeyDown={isEditable ? (e) => deleteTaskDuration(e, el?.task) : null}
                      onClick={() => { setSelectedTask(task); setShowDetails(true); }}
                    >

                      {isEditable && (
                        <>
                        
                          <div
                            className="resize-handle left"
                            onMouseDown={(e) => handleResizeStart(e, el?._id, 'left')}
                            style={{ cursor: 'ew-resize', position: 'absolute', left: '0', width: '10px', height: '100%', zIndex: 2 }}
                          />
                          <div
                            className="resize-handle right"
                            onMouseDown={(e) => handleResizeStart(e, el?._id, 'right')}
                            style={{ cursor: 'ew-resize', position: 'absolute', right: '0', width: '10px', height: '100%', zIndex: 2 }}
                          />

                            
                        </>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          );
        }

        taskRows.push(
          
          <div key={`${i}-${task?._id}`} style={ganttTimePeriod}>
            {taskRow}
          </div>

        );

        taskRow = [];
        mnth.setMonth(mnth.getMonth() + 1);
      }
    });
  }

  const handleDelete = async (taskId) => {
    const newTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(newTasks);

    setTaskDurations((prevState) => {

      
      const newTaskDurations = prevState.filter(
        (taskDuration) => taskDuration.task !== taskId
      );
      return newTaskDurations;
    });


    
    try {

      const response = await fetch(buildPath(`api/tasks/${taskId}`), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Task deleted successfully:', data);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  function deleteTaskDuration(e, id) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const newTaskDurations = taskDurations.filter( (taskDuration) => taskDuration.id !== id);
      
      setTaskDurations(newTaskDurations);
      
      console.log("Deleted taskDuration with id:", id);

      
    }
  }


  function turnOffPattern(taskDurationId){
    const taskDuration = taskDurations.find(
        (taskDuration) => taskDuration._id === taskDurationId
    );

    if (!taskDuration) {
        return;
    }
    const startDate = new Date(taskDuration.start);
    const endDate = new Date(taskDuration.end);
    var day = startDate;
    while(day <= endDate){
        let pattern = document.getElementById(`pattern/${day.toISOString().slice(0,10)}/${taskDurationId.slice(0,24)}`)
        pattern.setAttribute("hidden",true)
        day = day.addDays(1);
    }
  }



  function handleDragStart(taskDurationId) {
    if (!resizingTask) {
      
      setTaskDurationElDraggedId(taskDurationId);
      setHoveredTask(null);
      setIsDragging(true);
      console.log("Drag started for taskDurationId:", taskDurationId);
      turnOffPattern(taskDurationId);
    }
  }


  function handleDragEnd(taskDurationId) {

    if (!resizingTask) {
      
      setTaskDurationElDraggedId(null);

      setHoveredTask(null);
      
      setIsDragging(false);
      
      console.log("Drag ended for taskDurationId:", taskDurationId);
    }
  }


  function turnOnPattern(taskDuration){
    const id = (taskDuration._id).slice(0,24);
    console.log(id);
    const startDate = new Date(taskDuration.start);
    const endDate = new Date(taskDuration.end);
    var day = startDate;
    while(day <= endDate){
        let pattern = document.getElementById(`pattern/${day.toISOString().slice(0,10)}/${id}`);
        console.log(pattern.id);
        pattern.removeAttribute("hidden")
        day = day.addDays(1);
    }
  }

  async function onTaskDurationDrop(e) {
    const targetCell = e.target;

    const taskDuration = taskDurations.find(
      (taskDuration) => taskDuration._id === taskDurationElDraggedId
    );


    if (!taskDuration) {
      return;
    }


    const dataTask = targetCell.getAttribute('data-task');
    const dataDate = targetCell.getAttribute('data-date');
    const targetTaskId = targetCell.getAttribute('data-task-id');

    if (taskDuration.task !== targetTaskId) {
      turnOnPattern(taskDuration);
      console.log("Task can only be dropped within its respective row.");
      return;
    }

    const adjustedDataDate = new Date(dataDate + 'T00:00:00');
    const originalStartDate = new Date(taskDuration.start.split('T')[0] + 'T00:00:00');
    const daysDuration = dayDiff(new Date(taskDuration.start), new Date(taskDuration.end));

    const newStartDate = new Date(adjustedDataDate);
    let newEndDate = new Date(newStartDate);

    
    newEndDate.setDate(newEndDate.getDate() + daysDuration - 1);

    const allowableRange = 1;

    if (!targetCell.hasAttribute('draggable') || Math.abs(dayDiff(originalStartDate, newStartDate)) <= allowableRange) {
      
      taskDuration.task = dataTask;
      taskDuration.start = createFormattedDateFromDate(newStartDate);
      taskDuration.end = createFormattedDateFromDate(newEndDate);
      turnOnPattern(taskDuration);

      const newTaskDurations = taskDurations.filter(
        (taskDuration) => taskDuration._id !== taskDurationElDraggedId
      );
      newTaskDurations.push(taskDuration);

      try {
        const obj = { startDateTime: taskDuration.start, dueDateTime: taskDuration.end };
        const js = JSON.stringify(obj);

        const response = await fetch(buildPath(`api/tasks/${taskDuration.task}/dates`), {
          method: 'PUT',
          body: js,
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`HTTP error, status: ${response.status}`);
        }

        setTaskDurations(newTaskDurations);
        console.log("Dropped taskDuration:", taskDuration);

      } catch (error) {
        console.error('Error editing tasks: ', error);
      }
    } 
    
    else {
      console.log("It's occupied!");
    }

    setTaskDurationElDraggedId(null);
  }

  useEffect(() => {
   
    if (ganttRef.current) {
      const cellWidth = 60; 
      const scrollPosition = currentDayIndex * cellWidth;
  
      ganttRef.current.scrollLeft = scrollPosition;
      console.log("Scrolling to current day index:", currentDayIndex, "Scroll position:", scrollPosition);
    }
  }, [currentDayIndex]);

  return (

    <div
      id="gantt-grid-container__time"
      style={{ gridTemplateColumns: `repeat(${numMonths}, 1fr)` }}
      ref={ganttRef}
    >
      {monthRows}
      {dayRows}

      <div
        id="gantt-time-period-cell-container"
        style={{
          gridColumn: '1/-1',
          display: 'grid',
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          paddingLeft: '0.5px',
          paddingBottom: '-100px',
        }}

        
        onMouseMove={handleMouseMove}
        onMouseUp={handleResizeEnd}
        onDragOver={(e) => e.preventDefault()}
      >
        {taskRows}
      </div>

      <TaskDetails
        show={showDetails}
        onHide={() => setShowDetails(false)}
        task={selectedTask}
        handleDelete={handleDelete}
        userId={userId}
      />
    </div>
  );
}
