import { FaTrash, FaEdit } from "react-icons/fa";
import { checkDateType, dateDifference, complete } from "./utils";
import {
  FaTriangleExclamation,
  FaExclamation,
  FaCheck,
  FaCheckDouble,
  FaTrophy,
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
  trophy: (
    <FaTrophy
      className="iconG"
      style={{
        color: "gold",
      }}
    />
  ),
};

const iconMobileLabel = {
  complete: "Task Completed",
  overdue: "Task overdue",
  due: "Due this week",
  twoWeeks: "Due in the next 2 weeks",
  overTwo: "Not due for over two weeks",
};

export function Grid({ id, title, desc, status, due, modal, msgModal }) {
  let icon = null;
  let iconLabel = "";

  function setOverdue(date) {
    if (status === complete) {
      return "green 2px solid";
    } else if (dateDifference(date) <= -1) {
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
    if (status === complete) {
      icon = icons.trophy;
      iconLabel = iconMobileLabel.complete;
      return "mediumseagreen";
    } else {
      if (diff <= -1) {
        icon = icons.triangle;
        iconLabel = iconMobileLabel.overdue;
        return "red";
      }
      if (diff >= 0 && diff < 7) {
        icon = icons.exclamation;
        iconLabel = iconMobileLabel.due;
        return "red";
      }
      if (diff >= 7 && diff < 14) {
        icon = icons.check;
        iconLabel = iconMobileLabel.twoWeeks;
        return "orange";
      }
      if (diff >= 14) {
        icon = icons.checkDouble;
        iconLabel = iconMobileLabel.overTwo;
        return "mediumseagreen";
      }
      return "white";
    }
  }

  function getComplete() {
    if (status === complete) {
      return "line-through";
    } else return "none";
  }

  return (
    <div className="row" style={{ textDecoration: getComplete() }}>
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
      <div
        className="cell"
        style={{
          border: setOverdue(due),
          flexDirection: "row",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {icon}
        <p className="mobile-only">{iconLabel}</p>
      </div>
      <div
        className="cell"
        style={{
          border: "none",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <button
          className="taskButton-check"
          title="Mark as complete"
          style={{ fontSize: "x-large", height: "100%", width: "30%" }}
          onClick={() =>
            modal("Complete", {
              id,
              title,
              desc,
              status: complete,
              due,
            })
          }
        >
          <FaCheck />
        </button>
        <button
          className="taskButton"
          title="Edit task"
          style={{ fontSize: "x-large", height: "100%", width: "30%" }}
          onClick={() => modal("Update", { id, title, desc, status, due })}
        >
          <FaEdit />
        </button>
        <button
          className="taskButton-delete"
          style={{ fontSize: "x-large", height: "100%", width: "30%" }}
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
