import { useEffect, useRef } from 'react';
import './Tasks.css'; 

export default function Tasks({ tasks, setTasks, setTaskDurations, userRole }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  function onChange(e, i) {
    const { value } = e.target;
    const taskId = e.target.getAttribute('data-task-id');
    indexRef.current = i;

    let newTasks = tasks.filter((task) => task._id !== taskId);
    newTasks.push({ ...tasks.find((task) => task._id === taskId), taskTitle: value });
    newTasks = newTasks.sort((a, b) => a._id - b._id);
    setTasks(newTasks);
  }

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });


  return (
    <div id="gantt-grid-container__tasks">
      <div className="gantt-task-row placeholder-row first-placeholder-row"></div>
      <div className="gantt-task-row placeholder-row second-placeholder-row"></div>

      {tasks &&
        tasks.map((tsk, i) => (
          <div key={`${tsk?._id}-${i}`} className="gantt-task-row">
            <input
              data-task-id={tsk?._id}
              value={tsk?.taskTitle}
              onChange={(e) => onChange(e, i)}
              ref={(el) => (inputRef.current[i] = el)}
              className="task-title-input"
            />
          </div>
        ))}
    </div>
  );
}


