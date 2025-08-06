export function Grid(id, title, desc, status, due) {
        return <div class="row">
            <div class="cell">
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
            <p>Due date: {due}</p>
            </div>
        </div>
    }
