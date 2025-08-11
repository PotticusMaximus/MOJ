import ReactModal from 'react-modal';

ReactModal.setAppElement("#root");

export function MessageModal({message, relatedTask, isOpen, onClose, deleteTask}) {

    const information = () => {
        if (relatedTask) {
            return <div style={{marginLeft:"10px"}}>
    <p>ID: {relatedTask.id}</p>
    <p>Task Title: {relatedTask.title}</p>
    <p>Description: {relatedTask.desc} </p>
    <p>Status: {relatedTask.status}</p>
    <p>Due date: {relatedTask.due} </p>
    </div>
        } else {
            return <div style={{marginLeft:"10px"}}>
            <p>Not Found</p>
            </div>
        }
    }

    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Modal"
      style={{
        content: {
        justify: "center",
        padding:0,
        border: "2px solid black",
        width: "30%",
        height: "40%",
        margin: "auto",
        },
      }}
    >
        <div className="header">
        <h2>{message}</h2>
        </div>
      <>
      {information()}
      </>
<div style={{marginLeft:"10px"}}>
    <button
  className="taskButton-delete"
  onClick={() => {
    deleteTask(relatedTask.id);
  }}
  disabled={!relatedTask}
>
  Delete
</button>
    <button className="taskButton" onClick={onClose}>Cancel</button>
</div>


</ReactModal>
}
