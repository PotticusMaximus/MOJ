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
    if (checkDateType(task.due)) {
      return;
    }
    if (diff <= 0) {
      taskCount.overdue++;
    }
    if (diff >= 1 && diff <= 7) {
      taskCount.thisWeek++;
    }
    if (diff > 7 && diff <= 14) {
      taskCount.twoWeeks++;
    }
    if (diff > 14) {
      taskCount.more++;
    }
  });
  return taskCount;
}
