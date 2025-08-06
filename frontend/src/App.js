import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { Grid } from './components/grid';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState([]);

async function getTasks(){
    const data = await fetch("http://localhost:3000/task/all").then((res)=> res.json());
    return setTasks(data);
  }

async function getOneTask(){
    const id = searchInput;
    const data = await fetch(`http://localhost:3000/task/${id}`).then((res)=> res.json());
    return setTasks(data);
  }

  const handleSearchInput = (e)=> {
    setSearchInput(e.target.value);
  }

  function handleTasks(input){
    console.log(input.length);
    if(input.length) {
      return input.map((item) => (
        Grid(item.id, item.title, item.desc, item.status, item.due)
    ))}
    else {
      return Grid(input.id, input.title, input.desc, input.status, input.due)
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/task/all")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      <h1>MOJ Task Manager</h1>
      <div class="buttonBar">
        <button class="taskButton" onClick={getTasks}>Show all</button>
        <button class="taskButton" onClick={getOneTask}>Search by ID</button>
        <input onChange={handleSearchInput}></input>
      </div>
      <div class="grid">
        {handleTasks(tasks)}
      </div>
    </div>
  );
}

export default App;
