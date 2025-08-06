export function Grid({id, title, desc, status, due, modal}) {
        return <div class="row">
            <div class="cell-id">
            <p>ID: {id} </p>
            </div>
            <div class="cell">
            <p>Title: {title} </p>
            </div>
            <div class="cell-desc">
            <p>Description: {desc} </p>
            </div>
            <div class="cell">
            <p>Status: {status} </p>
            </div>
            <div class="cell">
            <p>Due: {due}</p>
            </div>
            <button class="taskButton" onClick={modal}>Update</button>
            <button class="taskButton-delete">Delete</button>
        </div>
    }
