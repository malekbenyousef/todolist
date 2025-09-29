// DOM related stuff
import { saveProjects, loadProjects } from "./storage.js";
import "./style.css";
import Todo from "./todo.js";
import Project from "./project.js";
import renderTask from "./rendering.js";

let allProjects = loadProjects();
let activeProject = allProjects[0] || null;
let dialog = document.querySelector("dialog");
let form = document.querySelector("#todo-form");

if (allProjects.length === 0) {
  let project1 = new Project("first project");
  let newInstance = new Todo(
    "hello",
    "this is your first todo",
    new Date(),
    "important"
  );
  project1.createTask(newInstance);
  allProjects.push(project1);
  activeProject = project1;
  saveProjects(allProjects);
}

// rendering projects
let project_container = document.querySelector("#project-container");
let add_project = document.querySelector("#add-project");

renderProject(allProjects);

add_project.addEventListener("click", () => {
  const name = prompt("project name :");
  if (!name) return;
  const project = new Project(name);
  allProjects.push(project);

  renderProject(allProjects);
  renderTask(activeProject.tasks, activeProject, form, dialog, allProjects);
});

function renderProject(allprojects) {
  project_container.replaceChildren();

  allprojects.forEach((project) => {
    let div = document.createElement("div");

    div.textContent = project.name;

    div.addEventListener("click", () => {
      activeProject = project;
      renderTask(activeProject.tasks, activeProject, form, dialog, allProjects);
    });

    project_container.appendChild(div);

    const deleteProject = document.createElement("button");
    deleteProject.classList.add("delete-btn");
    deleteProject.textContent = "delete project";

    deleteProject.addEventListener("click", (e) => {
      e.stopPropagation();
      allProjects = allProjects.filter((t) => t.id !== project.id);
      if (activeProject && activeProject.id == project.id) {
        activeProject = null;
      }
      renderProject(allProjects);
      saveProjects(allProjects);
    });

    div.appendChild(deleteProject);
  });

  saveProjects(allProjects);
}

// rendering tasks
renderTask(
  activeProject ? activeProject.tasks : [],
  activeProject,
  form,
  dialog,
  allProjects
);

let task1 = document.querySelector("#add-task");
task1.addEventListener("click", () => {
  form.reset();
  delete form.dataset.editingId;
  dialog.showModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (activeProject == null) {
    alert("please add a project first");
    dialog.close();
    return;
  }

  let formData = new FormData(form);
  let title = formData.get("title");
  let description = formData.get("description");
  let dueDate = formData.get("dueDate");
  let priority = formData.get("priority");

  const editingId = form.dataset.editingId;

  if (editingId) {
    let todo = activeProject.tasks.find((t) => t.id === editingId);
    if (todo) {
      todo.title = title;
      todo.description = description;
      todo.dueDate = new Date(dueDate);
      todo.priority = priority;
    }
    delete form.dataset.editingId;
  } else {
    let todo = new Todo(title, description, new Date(dueDate), priority);
    activeProject.createTask(todo);
  }

  renderTask(activeProject.tasks, activeProject, form, dialog, allProjects);
  saveProjects(allProjects);
  dialog.close();
});
