export function reverseDate(dateString){
    if (!dateString || typeof dateString !== "string") {
        return;
    }
    return dateString.split('-').reverse().join('-');
}

export function orderByDate(tasks, sortType = true) {
    const ordered = [...tasks].sort((a,b) => {
            return sortType
            ? Date.parse(reverseDate(a.due)) - Date.parse(reverseDate(b.due))
            : Date.parse(reverseDate(b.due)) - Date.parse(reverseDate(a.due))
        }
    )
    return ordered;
    }

