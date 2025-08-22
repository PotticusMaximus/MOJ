import "./App.css";
import { useEffect, useState } from "react";
import { Grid } from "./components/grid";
import { TaskModal } from "./components/modal";
import { MessageModal } from "./components/message";
import { orderByDate } from "./components/utils";
import {
  FaSearch,
  FaPlus,
  FaSortAmountDown,
  FaSortAmountUp,
  FaEye,
  FaEyeSlash,
  FaCalendar,
} from "react-icons/fa";
import {
  FaArrowsRotate,
  FaTriangleExclamation,
  FaExclamation,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa6";
import {
  determineTasks,
  removeCompleteTasks,
  orderByOverdue,
} from "./components/utils";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modal, setModal] = useState(false);
  const [msgModal, setMsgModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [modalTask, setModalTask] = useState({});
  const [type, setType] = useState("");
  const [sortDate, setSortDate] = useState(true);
  const [notes, setNotes] = useState({});
  const [complete, setComplete] = useState(true);
  const [overdueFilter, setOverdueFilter] = useState(false);

  async function getTasks() {
    const id = searchInput;
    if (!checkForId(id) && id) {
      openMsgModal(`ID: ${id} Not found.`, null);
      setSearchInput("");
      return;
    }
    let data = id
      ? await fetch(`http://localhost:3000/task/${id}`).then((res) =>
          res.json()
        )
      : await fetch("http://localhost:3000/task/all").then((res) => res.json());

    setSearchInput("");
    setTasks(removeCompleteTasks(data, complete));
    setComplete(!complete);
    setOverdueFilter(false);
  }

  function getCompleteIcon() {
    if (complete) {
      return <FaEye />;
    } else {
      return <FaEyeSlash />;
    }
  }

  async function deleteTask(id) {
    await fetch(`http://localhost:3000/task/${id}`, { method: "DELETE" });
    const data = await fetch("http://localhost:3000/task/all").then((res) =>
      res.json()
    );
    setTasks(data);
    closeMsgModal();
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

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  function handleTasks(input) {
    if (input.length) {
      return input.map((item) => (
        <Grid
          key={item.id}
          id={item.id}
          title={item.title}
          desc={item.desc}
          status={item.status}
          due={item.due}
          modal={(type, task) => openModal(type, task)}
          msgModal={(message, task) => openMsgModal(message, task)}
        />
      ));
    } else {
      return (
        <Grid
          key={input.id}
          id={input.id}
          title={input.title}
          desc={input.desc}
          status={input.status}
          due={input.due}
          modal={(type, task) => openModal(type, task)}
          msgModal={(message, task) => openMsgModal(message, task)}
        />
      );
    }
  }

  function handleModal() {
    if (modal) {
      return (
        <TaskModal
          isOpen={modal}
          onClose={closeModal}
          setModalTask={modalTasks}
          taskType={type}
          processTask={processTask}
          updateTask={modalTask}
        />
      );
    }
  }

  function handleMsgModal() {
    if (msgModal) {
      return (
        <MessageModal
          message={msg}
          relatedTask={modalTask}
          setModalTask={modalTasks}
          isOpen={msgModal}
          onClose={closeMsgModal}
          deleteTask={deleteTask}
        />
      );
    }
  }

  const openModal = (type, task = {}) => {
    setType(type);
    setModalTask(task);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setType("");
    setModalTask({});
  };
  const modalTasks = (task) => {
    setModalTask(task);
  };

  const openMsgModal = (message, task) => {
    setMsg(message);
    setModalTask(task);
    setMsgModal(true);
  };
  const closeMsgModal = () => {
    setMsgModal(false);
    setMsg("");
    setModalTask({});
  };

  const checkForId = (thisId) => {
    if (!thisId) return false;
    return tasks.some((e) => {
      return thisId == e.id;
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000/task/all")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setNotes(determineTasks(data));
      });
  }, []);

  return (
    <>
      <header class="header">
        <div style={{ marginLeft: "10%", width: "50%" }}>
          <img src="moj-logo.svg" alt="logo" />
          <h1
            style={{
              color: "white",
              maxWidth: "320px",
              textAlign: "left",
              fontSize: "x-large",
            }}
          >
            Task Manager
          </h1>
        </div>
        <div className="noteBox">
          <button
            disabled={overdueFilter}
            className="iconButton"
            onClick={() => {
              setTasks(orderByOverdue(tasks, "overdue"));
              setOverdueFilter(true);
            }}
          >
            <h3 className="notesH3">
              <FaTriangleExclamation
                style={{
                  color: "red",
                  marginRight: "10px",
                }}
              />
              Overdue Tasks: {notes.overdue}
            </h3>
          </button>
          <button
            disabled={overdueFilter}
            className="iconButton"
            onClick={() => {
              setTasks(orderByOverdue(tasks, "week"));
              setOverdueFilter(true);
            }}
          >
            <h3 className="notesH3">
              <FaExclamation
                style={{
                  color: "red",
                  marginRight: "10px",
                }}
              />
              Tasks due this week: {notes.thisWeek}
            </h3>
          </button>
          <button
            disabled={overdueFilter}
            className="iconButton"
            onClick={() => {
              setTasks(orderByOverdue(tasks, "twoWeek"));
              setOverdueFilter(true);
            }}
          >
            <h3 className="notesH3">
              <FaCheck style={{ color: "orange", marginRight: "10px" }} />
              Tasks due in the next 14 days: {notes.twoWeeks}
            </h3>
          </button>
          <button
            disabled={overdueFilter}
            className="iconButton"
            onClick={() => {
              setTasks(orderByOverdue(tasks, "overTwo"));
              setOverdueFilter(true);
            }}
          >
            <h3 className="notesH3">
              <FaCheckDouble
                style={{
                  color: "green",
                  marginRight: "10px",
                }}
              />
              Tasks due in more than 2 weeks: {notes.more}
            </h3>
          </button>
        </div>
      </header>
      <div className="page">
        <div className="appHeader">
          <div className="mobileSplit">
            <div className="titleBox">
              <h2
                style={{
                  color: "black",
                  padding: "2px",
                  width: "max-content",
                  marginLeft: "10px",
                }}
              >
                Tasks on page: {`${tasks.length}`}
              </h2>
            </div>
          </div>
        </div>
        <div className="splitPage">
          <div className="buttonBar">
            <div className="buttonBarCell">
              <p>Create Task</p>
              <button
                className="taskButton-fill"
                title="Create new Task"
                onClick={() => openModal("Create", {})}
              >
                <FaPlus />
              </button>
            </div>
            <div className="buttonBarCell">
              <p>Load Full Task List</p>
              <button
                className="taskButton-fill"
                title="Fetch all tasks"
                onClick={getTasks}
              >
                {" "}
                <FaArrowsRotate />
              </button>
            </div>
            <div className="buttonBarCell">
              <p>
                Sort List by Due Date {sortDate ? "Descending" : "Ascending"}
              </p>
              <button
                className="taskButton-fill"
                title="Sort List by Due Date"
                onClick={() => {
                  setTasks(orderByDate(tasks, sortDate));
                  setSortDate(!sortDate);
                }}
              >
                <FaCalendar style={{ marginRight: "5px" }} />
                {sortDate ? <FaSortAmountDown /> : <FaSortAmountUp />}
              </button>
            </div>
            <div className="buttonBarCell">
              <p>Search Task by ID</p>
              <textarea
                placeholder="Search ID"
                style={{
                  resize: "none",
                  fontFamily: "inherit",
                  minWidth: "25%",
                  width: "auto",
                  maxWidth: "100%",
                  marginBottom: "5px",
                }}
                onChange={handleSearchInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getTasks();
                    e.target.value = "";
                  }
                }}
                disabled={tasks.length === 1}
              ></textarea>
              <button
                disabled={tasks.length === 1}
                className="taskButton-fill"
                title="Search for task ID"
                onClick={getTasks}
              >
                <FaSearch />
              </button>
            </div>
            <div className="buttonBarCell">
              <p>{complete ? "Hide" : "Show"} Completed Tasks</p>
              <button
                disabled={tasks.length === 1}
                className="taskButton-fill"
                title={`Showing Complete Tasks: ${complete}`}
                onClick={() => {
                  getTasks();
                }}
              >
                {getCompleteIcon()}
              </button>
            </div>
          </div>
          <div className="grid">{handleTasks(tasks)}</div>
        </div>
        {handleModal()}
        {handleMsgModal()}
      </div>
      <footer className="footerStyle">
        <div className="footBar">
          <img
            src="https://jobs.justice.gov.uk/portal/13/images/logo--footer.svg"
            alt="Ministry of Justice Logo"
            loading="lazy"
            aria-hidden="true"
          />
          <p>Copyright © 2025</p>
          <div style={{ marginLeft: "50px" }}>
            <h3>
              Privacy | Accessibility | Terms & Conditions | Contact us | Help
              Centre | Cookie settings{" "}
            </h3>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
