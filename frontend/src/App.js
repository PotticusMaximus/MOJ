import './App.css';
import { useEffect, useState } from "react";
import { Grid } from './components/grid';
import { TaskModal } from './components/modal';
import { MessageModal } from './components/message';
import { orderByDate } from './components/utils';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [modal, setModal] = useState(false);
  const [msgModal, setMsgModal] = useState(false);
  const [msg, setMsg] = useState('');
  const [modalTask, setModalTask] = useState({});
  const [type, setType] = useState('');
  const [sortDate, setSortDate] = useState(true);

async function getTasks(){
    const id = searchInput;
    if(!checkForId(id) && id) {
      return openMsgModal(`ID: ${id} Not found.`, null);
    }
    let data = id? await fetch(`http://localhost:3000/task/${id}`).then((res)=> res.json()) :
    await fetch("http://localhost:3000/task/all").then((res)=> res.json());

    setSearchInput('');
    return setTasks(data);
  }

async function deleteTask(id) {
    await fetch(`http://localhost:3000/task/${id}`, {method: "DELETE"});
    const data = await fetch("http://localhost:3000/task/all").then((res)=> res.json());
    setTasks(data);
    closeMsgModal()
}

async function processTask(task) {
  const { id } = task;
  const url = id
    ? `http://localhost:3000/task/${id}`
    : `http://localhost:3000/task/newTask`;
  const method = id ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const data = await fetch("http://localhost:3000/task/all").then((res) =>
    res.json()
  );
  setTasks(data);
  closeModal();
}

  const handleSearchInput = (e)=> {
    setSearchInput(e.target.value);
  }

  function handleTasks(input){
    if(input.length) {
      return input.map((item) => (
        <Grid key={item.id} id={item.id} title={item.title} desc={item.desc} status={item.status} due={item.due} modal={(type, task) => openModal(type, task)} msgModal={(message, task) => openMsgModal(message, task)}/>
    ))}
    else {
      return <Grid key={input.id} id={input.id} title={input.title} desc={input.desc} status={input.status} due={input.due} modal={(type, task) => openModal(type, task)} msgModal={(message, task) => openMsgModal(message, task)} />
    }
  }

  function handleModal() {
    if (modal) {
    return <TaskModal isOpen={modal} onClose={closeModal} setModalTask={modalTasks} taskType={type} processTask={processTask} updateTask={modalTask}/>
    }
  }

  function handleMsgModal() {
    if (msgModal) {
    return <MessageModal message={msg} relatedTask={modalTask} setModalTask={modalTasks} isOpen={msgModal} onClose={closeMsgModal} deleteTask={deleteTask}/>
    }
  }

  const openModal = (type, task = {}) => {
    setType(type);
    setModalTask(task)
    setModal(true);
    }
  const closeModal = () => {
    setModal(false);
    setType('');
    setModalTask({});
  };
  const modalTasks = (task) => {
    setModalTask(task);
};

  const openMsgModal = (message, task) => {
    setMsg(message);
    setModalTask(task);
    setMsgModal(true);
  }
  const closeMsgModal = () => {
    setMsgModal(false);
    setMsg('');
    setModalTask({});
  };

  const checkForId = (thisId) => {
    if (!thisId) return false;
    return tasks.some((e) => {return thisId == e.id});
  }

  useEffect(() => {
    fetch("http://localhost:3000/task/all")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      <h1 style={{paddingLeft:"20px"}}>MOJ Task Manager</h1>
      <div className="buttonBar">
         <button className="taskButton" title="Create new Task" style={{fontSize:"large", fontWeight:"bold", minWidth:"30px"}} onClick={() => openModal('Create', {})}>+</button>
        <button className="taskButton" onClick={getTasks}>Fetch all by ID</button>
        <button className="taskButton" onClick={() => {setTasks(orderByDate(tasks, sortDate))
              setSortDate(!sortDate);
            }}>Fetch by due date {sortDate? "ascending" : "descending"}</button>
        <button className="taskButton" onClick={getTasks}>Search by ID</button>
        <input onChange={handleSearchInput} onKeyDown={(e) => {
          if(e.key === "Enter") {
            getTasks()
            e.target.value = '';
          };
        }}></input>
      </div>
      <div className="grid">
        <div className="rowHeader">
            <div className="cellHeader">
            <h3>ID </h3>
            </div>
            <div className="cellHeader">
            <h3>Title </h3>
            </div>
            <div className="cellHeader">
            <h3>Description </h3>
            </div>
            <div className="cellHeader">
            <h3>Status </h3>
            </div>
            <div className="cellHeader">
            <h3>Due</h3>
            </div>
            <div>
            </div>
            <div></div>
        </div>
        {handleTasks(tasks)}
      </div>
      {handleModal()}
      {handleMsgModal()}
    </div>
  );
};

export default App;
