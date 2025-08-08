export function Grid({id, title, desc, status, due, modal, msgModal}) {
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
            <div className="cell">
            <p>Due: {due}</p>
            </div>
            <button className="taskButton" onClick={() => modal("Update Existing", {id, title, desc, status, due})}>Update</button>
            <button className="taskButton-delete" onClick={() => msgModal("Are you sure you want to delete?", {id, title, desc, status, due})}>Delete</button>
        </div>
    }
