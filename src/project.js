export default class Project{
constructor(name, id = crypto.randomUUID()){
this.name = name;
this.id = id
this.tasks = [];
}
createTask(todo){
    this.tasks.push(todo)

}
}
