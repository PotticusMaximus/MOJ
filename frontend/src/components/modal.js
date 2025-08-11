import ReactModal from 'react-modal';
import { useEffect, useState } from "react";
import { ValidationBox } from './validationBox';
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ReactModal.setAppElement("#root");

export function TaskModal({isOpen, onClose, setModalTask, taskType, processTask, updateTask}) {

const [title, setTitle] = useState('');
const [desc, setDesc] = useState('');
const [status, setStatus] = useState('');
const [due, setDue] = useState('');
const [id, setId] = useState('');
const [task, setTask] = useState({});
const [validation, setValidation] = useState(false);
const [message, setMessage] = useState('');

const getTask = () => {
    const newTask = { id, title, desc, status, due };
    setModalTask(newTask)
    processTask(newTask);
  }

async function checkTitle(input){
    const data = await fetch("http://localhost:3000/task/all").then((res)=> res.json());
    const valid = data.some((a) =>(a.title === input && a.id !== id));
    setMessage("Title must be unique");
    setValidation(valid);
  }

  useEffect(() => {
    if(updateTask){
        setTask(updateTask);
    }
  if (task) {
    setTitle(task.title || "");
    setDesc(task.desc || "");
    setStatus(task.status || "");
    setDue(task.due || "");
    setId(task.id || "");
}
}, [task, updateTask]);


    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Modal"
      style={{
        content: {
        justify: "center",
        padding:0,
        border: "2px solid black",
        width: "40%",
        margin: "auto",
        },
      }}
    >
        <div className="header">
        <h2>{taskType} task {id}</h2>
        </div>
<div style={{marginLeft:"50px"}}>
    <p>Task Title: </p>
    <input placeholder='Type task title...' value={title} onChange={(e)=> {
        if(checkTitle(e.target.value)) {
    setTitle(e.target.value)}}}></input>
    <p>Description: </p>
    <textarea style={{
    fontFamily: "inherit",
    maxWidth: "80%",
    maxHeight: "200px",
    boxSizing: "border-box",
    padding: "4px 8px",
    border: "1px solid #ccc"
  }} placeholder='Task details...' value={desc} onChange={(e)=> {
    setDesc(e.target.value);
  }}></textarea>
    <p>Status: </p>
    <textarea style={{
    fontFamily: "inherit",
    maxWidth: "80%",
    maxHeight: "100px",
    boxSizing: "border-box",
    padding: "4px 8px",
    border: "1px solid #ccc"
  }} placeholder='current task status...' value={status} onChange={(e)=> {
    setStatus(e.target.value);
  }}></textarea>
    <p>Due date: </p>
    <Datepicker selected={due} onChange={(date) => setDue(date)} />
</div>
<div style={{marginLeft:"50px", marginTop:"20px"}}>
    <button disabled={validation}
  className="taskButton"
  onClick={() => {
    if (!validation) {
    getTask()
    }
  }}
>
  Proceed
</button>
    <button className="taskButton-delete" onClick={onClose}>Cancel</button>
</div>
<ValidationBox style={{marginLeft:"50px"}} message={`** ${message}`} visible={validation}/>


</ReactModal>
}
