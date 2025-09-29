export default class Todo {
    constructor(title, description, dueDate, priority, id = crypto.randomUUID(), isFinished = false){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
        this.isFinished = isFinished;

    }

}



