export function Grid({id, title, desc, status, due, modal, msgModal}) {

function calculateDate(dueDate) {
    if (!dueDate || typeof dueDate !== "string") {
    return "white";
    }

    const reverse = dueDate.split('-').reverse().join('-');
    const diff = Math.floor((Date.parse(reverse) - Date.now()) / 86_400_000);

    if (diff < 7) return "red";
    if (diff >= 7 && diff < 14) return "orange";
    if (diff > 14) return "mediumseagreen";
        return "white";
    }

        return <div className="row">
            <div className="cell" data-label="ID">
            <p>{id} </p>
            </div>
            <div className="cell" data-label="Title">
            <p>{title} </p>
            </div>
            <div className="cell" data-label="Description">
            <p>{desc} </p>
            </div>
            <div className="cell" data-label="Status">
            <p>{status} </p>
            </div>
            <div style={{ backgroundColor: calculateDate(due), fontWeight:"bold"}} className="cell" data-label="Due date">
            <p>{due}</p>
            </div>
            <button className="taskButton" onClick={() => modal("Update", {id, title, desc, status, due})}>Update</button>
            <button className="taskButton-delete" onClick={() => msgModal(`Are you sure you want to delete task ${id}?`, {id, title, desc, status, due})}>Delete</button>
        </div>
    }
