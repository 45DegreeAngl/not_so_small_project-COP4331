import React from 'react';

function DashboardToDoTableCell({dueDate,taskName,projectName,owner,isHidden}){
    if(isHidden === true){
        return(
            <tr class = "hidden">
                <td class = "cell" width="15%" scoope='col'></td>
                <td class = "cell" width="35%" scoope='col'></td>
                <td class = "cell" width="35%" scoope='col'></td>
                <td class = "cell" width="15%" scoope='col'></td>
            </tr>
            );
    }

    return(
    <tr>
        <td class = "cell" width="15%" scoope='col'><h5>{dueDate}</h5></td>
        <td class = "cell" width="35%" scoope='col'><h6>{taskName}</h6></td>
        <td class = "cell" width="35%" scoope='col'><h6>{projectName}</h6></td>
        <td class = "cell" width="15%" scoope='col'><h6>{owner}</h6></td>
    </tr>
    );
}
export default DashboardToDoTableCell;