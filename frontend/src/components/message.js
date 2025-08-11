import ReactModal from 'react-modal';

ReactModal.setAppElement("#root");

export function MessageModal({message, relatedTask, setModalTask, isOpen, onClose, deleteTask}) {


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
<div style={{marginLeft:"10px"}}>
    <p>ID: {relatedTask.id}</p>
    <p>Task Title: {relatedTask.title}</p>
    <p>Description: {relatedTask.desc} </p>
    <p>Status: {relatedTask.status}</p>
    <p>Due date: {relatedTask.due} </p>
</div>
<div style={{marginLeft:"10px"}}>
    <button
  className="taskButton-delete"
  onClick={() => {
    deleteTask(relatedTask.id);
  }}
>
  Delete
</button>
    <button className="taskButton" onClick={onClose}>Cancel</button>
</div>


</ReactModal>
}
