const priorities = ["low", "normal", "important"];
import { saveProjects } from "./storage";

export default function renderTask(task, project, form, dialog, allProjects) {
  task_container.replaceChildren();

  task.forEach((todo) => {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");

    const left = document.createElement("div");

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = todo.title;

    const meta = document.createElement("div");
    meta.classList.add("meta");
    meta.textContent = `${todo.description || ""} — due: ${todo.dueDate.toDateString()}`;

    const priority = document.createElement("span");
    priority.classList.add("priority", todo.priority);
    priority.textContent = todo.priority;

    priority.addEventListener("click", () => {
      let idx = priorities.indexOf(todo.priority);
      todo.priority = priorities[(idx + 1) % priorities.length];
      saveProjects(allProjects); // ✅ persist change
      renderTask(project.tasks, project, form, dialog, allProjects);
    });

    left.appendChild(title);
    left.appendChild(meta);
    left.appendChild(priority);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "delete";

    deleteBtn.addEventListener("click", () => {
      project.tasks = project.tasks.filter((t) => t.id !== todo.id);
      saveProjects(allProjects); // ✅ persist deletion
      renderTask(project.tasks, project, form, dialog, allProjects);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", () => {
      form.title.value = todo.title;
      form.description.value = todo.description;
      form.dueDate.value = todo.dueDate.toISOString().split("T")[0];
      form.priority.value = todo.priority;

      form.dataset.editingId = todo.id;
      dialog.showModal();
    });

    const right = document.createElement("div");
    right.appendChild(editBtn);
    right.appendChild(deleteBtn);

    taskEl.appendChild(left);
    taskEl.appendChild(right);

    task_container.appendChild(taskEl);
  });
}
