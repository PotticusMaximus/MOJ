import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { ValidationBox } from "./validationBox";
import Datepicker from "react-datepicker";
import { parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FaX } from "react-icons/fa6";

ReactModal.setAppElement("#root");

export function TaskModal({
  isOpen,
  onClose,
  setModalTask,
  taskType,
  processTask,
  updateTask,
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [due, setDue] = useState("");
  const [id, setId] = useState("");
  const [task, setTask] = useState({});
  const [validation, setValidation] = useState(false);
  const [message, setMessage] = useState("");

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
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

  const getTask = () => {
    const newTask = { id, title, desc, status, due };
    setModalTask(newTask);
    processTask(newTask);
  };

  async function checkTitle(input) {
    const data = await fetch("http://localhost:3000/task/all").then((res) =>
      res.json()
    );
    const valid = data.some((a) => a.title === input && a.id !== id);
    setMessage("Title must be unique");
    setValidation(valid);
  }

  useEffect(() => {
    if (updateTask) {
      setTask(updateTask);
    }
    if (task) {
      setTitle(task.title || "");
      setDesc(task.desc || "");
      setStatus(task.status || "");
      setId(task.id || "");
      if (task.due) {
        const dateObj =
          typeof task.due === "string"
            ? parse(task.due, "dd-MM-yyyy", new Date())
            : task.due;
        setDue(dateObj);
      } else {
        setDue(null);
      }
    }
  }, [task, updateTask]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Modal"
      style={modalStyles}
    >
      <div
        style={{
          padding: "30px",
        }}
      >
        <div className="modalHeader">
          <h2>
            {taskType} task {id}
          </h2>
          <button
            className="windowClose"
            onClick={onClose}
            style={{ fontSize: "x-large", height: "50px", width: "25%" }}
          >
            <FaX />
          </button>
        </div>
        <div>
          <p>Task Title: </p>
          <input
            placeholder="Type task title..."
            value={title}
            onChange={(e) => {
              if (checkTitle(e.target.value)) {
                setTitle(e.target.value);
              }
            }}
          ></input>
          <p>Description: </p>
          <textarea
            className="modalTextArea"
            placeholder="Task details..."
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
          <p>Status: </p>
          <textarea
            style={{ height: "5vh" }}
            className="modalTextArea"
            placeholder="current task status..."
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          ></textarea>
          <p>Due date: </p>
          <Datepicker
            dateFormat="dd/MM/yyyy"
            selected={due}
            onChange={(date) => {
              setDue(date);
            }}
          />
        </div>
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <button
            disabled={validation}
            className="taskButton"
            onClick={() => {
              if (!validation) {
                getTask();
              }
            }}
          >
            Proceed
          </button>
        </div>
        <ValidationBox
          style={{ marginLeft: "50px" }}
          message={`** ${message}`}
          visible={validation}
        />
      </div>
    </ReactModal>
  );
}
