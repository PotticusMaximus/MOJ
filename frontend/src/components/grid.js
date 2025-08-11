export function Grid({id, title, desc, status, due, modal, msgModal}) {

    function calculateDate(dueDate) {
        let color = ""
        const diff = Number(Math.floor((Date.parse(dueDate) - Date.now()) / 86_400_000));

        if (diff <7) {
            color = "red";
           } else if (diff >7 && diff < 14){
            color = "orange";}
           else if (diff > 14){
            color = "mediumseagreen";
           }
            else {color = "white";}

        return color;
        }

        return <div className="row">
            <div className="cell-id">
            <p>ID: {id} </p>
            </div>
            <div className="cell">
            <p>Title: {title} </p>
            </div>
            <div className="cell-desc">
            <p>Description: {desc} </p>
            </div>
            <div className="cell">
            <p>Status: {status} </p>
            </div>
            <div style={{ backgroundColor: calculateDate(due), fontWeight:"bold"}} className="cell">
            <p>Due: {due}</p>
            </div>
            <button className="taskButton" onClick={() => modal("Update", {id, title, desc, status, due})}>Update</button>
            <button className="taskButton-delete" onClick={() => msgModal(`Are you sure you want to delete task ${id}?`, {id, title, desc, status, due})}>Delete</button>
        </div>
    }
