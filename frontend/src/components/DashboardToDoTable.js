import React from 'react';
import DashboardToDoTableCell from './DashboardToDoTableCell'

function DashboardToDoTable(){
    
    return(
      <table class = "table table-bordereless" id="taskTableHeader">
        <thead>
            <tr>
                <th  width="15%" scope='col'>Due Date</th>
                <th  width="30%" scope='col'>Task Name</th>
                <th width="30%" scope='col'>Project</th>
                <th width="25%" scope='col'>Owner</th>
            </tr>
        </thead>
        <tbody class = "table-group-divider" id="taskTableBody">
            
        </tbody>
      </table>

    );
};

export default DashboardToDoTable;