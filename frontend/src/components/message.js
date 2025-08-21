import ReactModal from "react-modal";
import { FaX } from "react-icons/fa6";

ReactModal.setAppElement("#root");

export function MessageModal({
  message,
  relatedTask,
  isOpen,
  onClose,
  deleteTask,
}) {
  const information = () => {
    if (relatedTask) {
      return (
        <div style={{ marginLeft: "10px" }}>
          <h3>Title:</h3>
          <p>{relatedTask.title}</p>
          <h3>Description: </h3>
          <p>{relatedTask.desc} </p>
          <h3>Status: </h3>
          <p>{relatedTask.status}</p>
          <h3>Due date: </h3>
          <p>{relatedTask.due} </p>
        </div>
      );
    } else {
      return (
        <div style={{ marginLeft: "10px" }}>
          <p>Not Found</p>
        </div>
      );
    }
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      zIndex: "10000",
    },
    content: {
      border: "none",
      justifyContent: "center",
      padding: 0,
      maxWidth: "80vw",
      width: "70%",
      margin: "auto",
      height: "70%",
      maxHeight: "80vh",
      overflowY: "auto",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Modal"
      style={modalStyles}
    >
      <div className="modalHeader">
        <h2>{message}</h2>
        <button className="windowClose" onClick={onClose} style={{}}>
          <FaX />
        </button>
      </div>

      <div>
        <>{information()}</>
        <button
          className="taskButton-delete"
          onClick={() => {
            deleteTask(relatedTask.id);
          }}
          disabled={!relatedTask}
        >
          Delete
        </button>
      </div>
    </ReactModal>
  );
}
