import ReactModal from 'react-modal';
import React, { useEffect, useState } from "react";

ReactModal.setAppElement("#root");

export function TaskModal({isOpen, onClose, setModalTask, taskType, processTask, updateTask}) {

const [title, setTitle] = useState('');
const [desc, setDesc] = useState('');
const [status, setStatus] = useState('');
const [due, setDue] = useState('');
const [id, setId] = useState('');
const [task, setTask] = useState({});

const getTask = () => {
    const newTask = { id, title, desc, status, due };
    setModalTask(newTask)
    console.log(`New Task: ${newTask}`);
    processTask(newTask);
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
    console.log(`Modal task: ${JSON.stringify(task)}`)
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
        width: "30%",
        margin: "auto",
        },
      }}
    >
        <div className="header">
        <h2>{taskType} Task</h2>
        </div>
<div style={{marginLeft:"10px"}}>
    <p>Task Title: </p>
    <input placeholder='Type task title...' onChange={(e)=> {
    setTitle(e.target.value)}}></input>
    <p>Description: </p>
    <input style={{
    width: "80%",
    height: "24px",
    boxSizing: "border-box",
    padding: "4px 8px",
    border: "1px solid #ccc"
  }} placeholder='Task details...' onChange={(e)=> {
    setDesc(e.target.value);
  }}></input>
    <p>Status: </p>
    <input placeholder='current task status...' onChange={(e)=> {
    setStatus(e.target.value);
  }}></input>
    <p>Due date: </p>
    <input style={{marginBottom: "5px"}} placeholder='YYYY-MM-DD format' onChange={(e)=> {
    setDue(e.target.value);
  }}></input>
</div>
<div style={{marginLeft:"10px"}}>
    <button
  className="taskButton"
  onClick={() => {
    getTask()
  }}
>
  Update
</button>
    <button className="taskButton-delete" onClick={onClose}>Cancel</button>
</div>


</ReactModal>
}
