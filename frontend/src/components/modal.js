import ReactModal from 'react-modal';
import React, { useState } from "react";

ReactModal.setAppElement("#root");

export function TaskModal({isOpen, onClose}) {

const [title, setTitle] = useState('');
const [desc, setDesc] = useState('');
const [status, setStatus] = useState('');
const [due, setDue] = useState('');

const getTask = () => {
    return {title, desc, status, due}
  }

    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Modal"
      style={{
        content: {
          width: "400px",
          margin: "auto",
        },
      }}
    >
        <div class="header">
        <h2>Create Task</h2>
        </div>
<div>
    <p>Task Title: </p>
    <input placeholder='Type task title...' onChange={(e)=> {
    setTitle(e.target.value)}}></input>
    <p>Description: </p>
    <input placeholder='Task details...' onChange={(e)=> {
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
<div>
    <button class="taskButton" onClick={getTask}>Update</button>
    <button class="taskButton-delete" onClick={onClose}>Cancel</button>
</div>


</ReactModal>
}
