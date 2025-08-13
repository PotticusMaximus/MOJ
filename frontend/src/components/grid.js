import { reverseDate } from "./utils";
import { FaTrash, FaEdit } from 'react-icons/fa';

export function Grid({id, title, desc, status, due, modal, msgModal}) {

function checkDateType(date) {
    return (!date || typeof date !== "string");
}

const dateDifference = (date) => Math.floor((Date.parse(reverseDate(date)) - Date.now()) / 86_400_000);

function setOverdue(date) {
    if (dateDifference(date) <= -1) {
        return "red 2px solid"
    } else {
        return "1px solid #333"
    }
}

function calculateDate(dueDate) {
    if (checkDateType(dueDate)) {
    return "white";
    }


    const diff = dateDifference(dueDate);

    if (diff < 7) return "red";
    if (diff >= 7 && diff < 14) return "orange";
    if (diff > 14) return "mediumseagreen";
        return "white";
    }

        return <div className="row" >
            <div className="cell" data-label="ID" style={{ border: setOverdue(due)}} >
            <p>{id} </p>
            </div>
            <div className="cell" data-label="Title" style={{ border: setOverdue(due)}}>
            <p>{title} </p>
            </div>
            <div className="cell" data-label="Description" style={{ border: setOverdue(due)}}>
            <p>{desc} </p>
            </div>
            <div className="cell" data-label="Status" style={{ border: setOverdue(due)}}>
            <p>{status} </p>
            </div>
            <div style={{ backgroundColor: calculateDate(due), fontWeight:"bold"}} className="cell" data-label="Due date">
            <p>{due}</p>
            </div>
            <button className="taskButton" title="Edit task" style={{fontSize:"x-large"}} onClick={() => modal("Update", {id, title, desc, status, due})}><FaEdit/></button>
            <button className="taskButton-delete" style={{fontSize:"x-large"}}title="Delete task" onClick={() => msgModal(`Are you sure you want to delete task ${id}?`, {id, title, desc, status, due})}><FaTrash/></button>
        </div>
    }
