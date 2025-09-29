import Project from "./project.js"
import Todo from "./todo.js"
// storage.js
export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
  const data = localStorage.getItem("projects");
  if (!data) return [];

  try {
    let parsed = JSON.parse(data);

    // Rebuild with Project and Todo class instances
    return parsed.map((p) => {
      const project = new Project(p.name, p.id);
      project.tasks = p.tasks.map(
        (t) =>
          new Todo(
            t.title,
            t.description,
            new Date(t.dueDate),
            t.priority,
            t.id,
            t.isFinished
          )
      );
      return project;
    });
  } catch (err) {
    console.error("Failed to parse projects:", err);
    return [];
  }
}
