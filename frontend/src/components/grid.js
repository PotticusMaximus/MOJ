import { FaTrash, FaEdit } from "react-icons/fa";
import { checkDateType, dateDifference } from "./utils";
import {
  FaTriangleExclamation,
  FaExclamation,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa6";

const icons = {
  check: (
    <FaCheck
      className="iconG"
      style={{
        color: "orange",
      }}
    />
  ),
  checkDouble: (
    <FaCheckDouble
      className="iconG"
      style={{
        color: "green",
      }}
    />
  ),
  exclamation: (
    <FaExclamation
      className="iconG"
      style={{
        color: "red",
      }}
    />
  ),
  triangle: (
    <FaTriangleExclamation
      className="iconG"
      style={{
        color: "red",
      }}
    />
  ),
};

export function Grid({ id, title, desc, status, due, modal, msgModal }) {
  let icon = null;

  function setOverdue(date) {
    if (dateDifference(date) <= -1) {
      return "red 2px solid";
    } else {
      return "1px solid #333";
    }
  }

  function calculateDate(dueDate) {
    if (checkDateType(dueDate)) {
      return "white";
    }

    const diff = dateDifference(dueDate);
    if (diff <= -1) {
      icon = icons.triangle;
      return "red";
    }
    if (diff >= 0 && diff < 7) {
      icon = icons.exclamation;
      return "red";
    }
    if (diff >= 7 && diff < 14) {
      icon = icons.check;
      return "orange";
    }
    if (diff >= 14) {
      icon = icons.checkDouble;
      return "mediumseagreen";
    }
    return "white";
  }

  return (
    <div className="row">
      <div className="cell" data-label="ID" style={{ border: setOverdue(due) }}>
        <p>{id} </p>
      </div>
      <div
        className="cell"
        data-label="Title"
        style={{ border: setOverdue(due) }}
      >
        <p>{title} </p>
      </div>
      <div
        className="cell"
        data-label="Description"
        style={{ border: setOverdue(due) }}
      >
        <p>{desc} </p>
      </div>
      <div
        className="cell"
        data-label="Status"
        style={{ border: setOverdue(due) }}
      >
        <p>{status} </p>
      </div>
      <div
        style={{
          backgroundColor: calculateDate(due),
          fontWeight: "bold",
          border: setOverdue(due),
        }}
        className="cell"
        data-label="Due date"
      >
        <p>{due}</p>
      </div>
      <div className="cell" style={{ border: setOverdue(due) }}>
        {icon}
      </div>
      <div className="gridButton">
        <button
          className="taskButton"
          title="Edit task"
          style={{ fontSize: "x-large", width: "auto" }}
          onClick={() => modal("Update", { id, title, desc, status, due })}
        >
          <FaEdit />
        </button>
        <button
          className="taskButton-delete"
          style={{ fontSize: "x-large", width: "auto" }}
          title="Delete task"
          onClick={() =>
            msgModal(`Are you sure you want to delete task ${id}?`, {
              id,
              title,
              desc,
              status,
              due,
            })
          }
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
