import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { Grid } from './components/grid';
import { TaskModal } from './components/modal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [modal, setModal] = useState(false);

async function getTasks(){
    const data = await fetch("http://localhost:3000/task/all").then((res)=> res.json());
    return setTasks(data);
  }

async function getOneTask(){
    const id = searchInput;
    const data = await fetch(`http://localhost:3000/task/${id}`).then((res)=> res.json());
    return setTasks(data);
  }

async function deleteTask(id) {
    const taskDelete = await fetch(`http://localhost:3000/task/${id}`, {method: "DELETE"});
    const data = await fetch("http://localhost:3000/task/all").then((res)=> res.json());
    return setTasks(data);
}

  const handleSearchInput = (e)=> {
    setSearchInput(e.target.value);
  }

  function handleTasks(input){
    console.log(input.length);
    if(input.length) {
      return input.map((item) => (
        <Grid id={item.id} title={item.title} desc={item.desc} status={item.status} due={item.due} modal={openModal}/>
    ))}
    else {
      return <Grid id={input.id} title={input.title} desc={input.desc} status={input.status} due={input.due} modal={openModal}/>
    }
  }

  function handleModal() {
    if (modal) {
    return <TaskModal isOpen={openModal} onClose={closeModal}/>
    }
  }

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  useEffect(() => {
    fetch("http://localhost:3000/task/all")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      <h1>MOJ Task Manager</h1>
      <div class="buttonBar">
        <button class="taskButton">Create Task</button>
        <button class="taskButton" onClick={getTasks}>Show all</button>
        <button class="taskButton" onClick={getOneTask}>Search by ID</button>
        <input onChange={handleSearchInput}></input>
      </div>
      <div class="grid">
        {handleTasks(tasks)}
      </div>
      {handleModal()}
    </div>
  );
}

export default App;
