export const complete = "** Complete **";

let store = {
  overdue: [],
  week: [],
  twoWeek: [],
  overTwo: [],
};

export function reverseDate(dateString) {
  if (!dateString || typeof dateString !== "string") {
    return;
  }
  return dateString.split("-").reverse().join("-");
}

export function checkDateType(date) {
  return !date || typeof date !== "string";
}

export const dateDifference = (date) =>
  Math.floor((Date.parse(reverseDate(date)) - Date.now()) / 86_400_000);

export function orderByDate(tasks, sortType = true) {
  if (!Array.isArray(tasks)) {
    return tasks;
  }
  const ordered = [...tasks].sort((a, b) => {
    return sortType
      ? Date.parse(reverseDate(a.due)) - Date.parse(reverseDate(b.due))
      : Date.parse(reverseDate(b.due)) - Date.parse(reverseDate(a.due));
  });
  return ordered;
}

export function determineTasks(tasks) {
  let taskCount = { overdue: 0, thisWeek: 0, twoWeeks: 0, more: 0 };

  tasks.forEach((task) => {
    const diff = dateDifference(task.due);
    if (checkDateType(task.due) || task.status === complete) {
      return;
    }
    if (diff <= 0) {
      store.overdue.push(task);
      taskCount.overdue++;
    }
    if (diff >= 1 && diff <= 7) {
      store.week.push(task);
      taskCount.thisWeek++;
    }
    if (diff > 7 && diff <= 14) {
      store.twoWeek.push(task);
      taskCount.twoWeeks++;
    }
    if (diff > 14) {
      store.overTwo.push(task);
      taskCount.more++;
    }
  });
  return taskCount;
}

export function removeCompleteTasks(tasks, visible) {
  if (visible) {
    return [...tasks].filter((t) => t.status !== complete);
  } else return tasks;
}

export function orderByOverdue(tasks, type) {
  store = {
    overdue: [],
    week: [],
    twoWeek: [],
    overTwo: [],
  };
  determineTasks(tasks);
  return store[type];
}
