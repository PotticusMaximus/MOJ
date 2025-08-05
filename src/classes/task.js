const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();

class Task {
    constructor(title, desc, status, due){
    this.title = title;
    this.desc = desc | title;
    this.status = status;
    this.due = due;
    this.id = uuidv4();
    }

    setTitle(title){
        this.title = title;
    }

    setDesc(desc){
        this.desc = desc;
    }

    setStatus(status){
        this.status = status;
    }

    getTask(){
        return `Task: ${this.id} \n${this.title}\n${this.desc}\n${this.status}`
    }

}

module.exports = {
    Task
}
