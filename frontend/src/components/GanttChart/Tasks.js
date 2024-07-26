import { useEffect, useRef } from 'react';
import './Tasks.css'; 

export default function Tasks({ tasks, setTasks, setTaskDurations, setSelectedTask, setShowDetails }) {
  
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });

  function handleTaskClick(task) {
    setSelectedTask(task);
    setShowDetails(true);
  }

  return (
    <div id="gantt-grid-container__tasks">
    
      <div className="gantt-task-row placeholder-row first-placeholder-row"></div>
      <div className="gantt-task-row placeholder-row second-placeholder-row"></div>

      {tasks &&
        tasks.map((tsk, i) => (
          <div key={`${tsk?._id}-${i}`} className="gantt-task-row" onClick={() => handleTaskClick(tsk)}>
            <p data-task-id={tsk?._id} ref={(el) => (inputRef.current[i] = el)} className="task-title-text">
  
              {tsk?.taskTitle}

            </p>
          </div>
        ))}
    </div>
  );
}
