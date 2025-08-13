import './App.css';
import { useEffect, useState } from "react";
import { Grid } from './components/grid';
import { TaskModal } from './components/modal';
import { MessageModal } from './components/message';
import { orderByDate } from './components/utils';
import { FaSearch, FaPlus, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

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
    <>
  <div className="page">
    <div className='titleBox'>
      <h1>Task Manager</h1>
      <h2>Tasks on page: {`${tasks.length || 1}` }</h2>
    </div>
      <div className="buttonBar">
         <button className="taskButton" title="Create new Task" style={{fontSize:"large", minWidth:"30px"}} onClick={() => openModal('Create', {})}><FaPlus/></button>
        <button className="taskButton" title="Sort List by ID" onClick={getTasks}> ID <FaSortAmountUp/></button>
        <button className="taskButton" title="Sort List by Due Date" onClick={() => {setTasks(orderByDate(tasks, sortDate))
              setSortDate(!sortDate);
            }}>Due {sortDate? <FaSortAmountDown/> : <FaSortAmountUp/>}</button>
             <input placeholder='ID to search...' style={{marginLeft:"20px", marginRight:"5px", width:"25%", maxWidth:"25%"}}onChange={handleSearchInput} onKeyDown={(e) => {
          if(e.key === "Enter") {
            getTasks()
            e.target.value = '';
          };
        }}></input>
        <button className="taskButton" title="Search for task ID" onClick={getTasks} style={{fontSize:"large", minWidth:"30px"}}><FaSearch/></button>

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
  <footer className='footerStyle'>
    <div className='footBar'>
    <img src="https://jobs.justice.gov.uk/portal/13/images/logo--footer.svg" alt="Ministry of Justice Logo" loading="lazy" aria-hidden="true"/>
    <p>Copyright © 2025</p>
    <div style={{marginLeft:"50px"}}>
      <h3>Privacy | Accessibility | Terms & Conditions | Contact us | Help Centre | Cookie settings </h3>
    </div>
    </div>
    </footer>
  </>
  );
};

export default App;
