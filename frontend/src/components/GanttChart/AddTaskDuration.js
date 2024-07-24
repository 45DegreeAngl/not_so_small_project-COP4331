import { useState } from 'react';
import AddButton from './AddButton';

export default function AddTaskDuration({ tasks, setTaskDurations }) {
  const [task, setTask] = useState('');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-03');

  function onChange(e) {
    const { value, id } = e.target;

    if (id === 'select-task') {
      setTask(value);
    }
    if (id === 'start-date') {
      setStartDate(value);
    }
    if (id === 'end-date') {
      setEndDate(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (task === '') return;
    const newTaskDuration = {
      _id: Date.now().toString(), 
      startDateTime: startDate,
      dueDateTime: endDate,
      task: task, 
    };

    setTaskDurations((prevState) => {
      return [...prevState, newTaskDuration];
    });
  }

  return (
    <div> </div>
    // <form id="add-task-duration" onSubmit={handleSubmit}>
    //   <h2>Add Task Duration</h2>
    //   <div className="inner-form-container">
    //     <fieldset id="task" style={{ paddingLeft: '0px' }}>
    //       <label htmlFor="select-task">Which task?</label>
    //       <select
    //         id="select-task"
    //         name="select-task"
    //         onChange={onChange}
    //         value={task}
    //       >
    //         <option disabled defaultValue value="">
    //           select a task
    //         </option>
    //         {tasks &&
    //           tasks.map((tsk) => (
    //             <option key={tsk?._id} value={tsk?._id}>
    //               {tsk?.taskTitle}
    //             </option>
    //           ))}
    //       </select>
    //     </fieldset>
    //     <fieldset id="date">
    //       <div className="fieldset-container">
    //         <label htmlFor="start-date">Start date:</label>
    //         <input
    //           type="date"
    //           id="start-date"
    //           name="start-date"
    //           value={startDate}
    //           min="2022-01-01"
    //           max="2050-12-31"
    //           onChange={onChange}
    //         />
    //       </div>
    //       <div className="fieldset-container" style={{ marginLeft: '10px' }}>
    //         <label htmlFor="end-date">End date:</label>
    //         <input
    //           type="date"
    //           id="end-date"
    //           name="end-date"
    //           value={endDate}
    //           min="2022-01-01"
    //           max="2050-12-31"
    //           onChange={onChange}
    //         />
    //       </div>
    //     </fieldset>
    //   </div>
    //   <AddButton />
    //   <style jsx>{`
    //     #add-task-duration {
    //       margin-right: 10px;
    //       margin-bottom: 10px;
    //       border-radius: 5px;
    //       box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
    //     }

    //     .fieldset-container {
    //       display: flex;
    //       align-items: center;
    //       flex-direction: row;
    //       flex-wrap: wrap;
    //     }

    //     fieldset {
    //       display: flex;
    //       align-items: center;
    //       border: none;
    //       padding: 5px 7px;
    //     }

    //     fieldset label {
    //       margin-right: 10px;
    //     }

    //     input[type='date'] {
    //       padding: 10px 5px;
    //     }
    //   `}</style>
    // </form>
  );
}
