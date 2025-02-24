import React from 'react'
import { useState } from 'react';
import "./Projects.css"

const Projects = () => {
    const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project Management Dashboard",
      description: "A MERN stack application to manage projects, tasks, and teams.",
      status: "In Progress",
      deadline: "2025-03-10",
      tasks: [
        { id: 101, title: "Setup Database", status: "Completed" },
        { id: 102, title: "Build UI Components", status: "In Progress" },
        { id: 103, title: "Integrate Backend", status: "Pending" },
      ],
    },
    {
      id: 2,
      title: "Dyslexia Assist App",
      description: "An AI-powered application to assist dyslexic users with reading.",
      status: "Pending",
      deadline: "2025-04-01",
      tasks: [
        { id: 201, title: "Collect Dataset", status: "Completed" },
        { id: 202, title: "Train Model", status: "Pending" },
      ],
    },
  ]);

  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
  });

  // Toggle project details view
  const toggleProjectDetails = (projectId) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  // Start editing a project
  const handleEditProject = (project) => {
    setEditingProject(project.id);
    setProjectData(project);
  };

  // Handle input changes for project updates
  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  // Update project details
  const updateProject = (e) => {
    e.preventDefault();
    setProjects(
      projects.map((p) =>
        p.id === editingProject ? { ...p, ...projectData } : p
      )
    );
    setEditingProject(null);
  };

  // Add a new task to a project
  const addTask = (projectId) => {
    if (!newTask.trim()) return;
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: [...p.tasks, { id: Date.now(), title: newTask, status: "Pending" }],
            }
          : p
      )
    );
    setNewTask("");
  };

  // Update task status
  const updateTaskStatus = (projectId, taskId, newStatus) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
              ),
            }
          : p
      )
    );
  };

  // Delete a task
  const deleteTask = (projectId, taskId) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.filter((task) => task.id !== taskId),
            }
          : p
      )
    );
  };

  // Get status styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "In Progress":
        return "status-inprogress";
      case "Completed":
        return "status-completed";
      default:
        return "";
    }
  };
  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-grid">
        {projects.map((project) =>
          editingProject === project.id ? (
            <div key={project.id} className="project-card">
              <h3>Edit Project</h3>
              <form className="edit-form" onSubmit={updateProject}>
                <input
                  type="text"
                  name="title"
                  value={projectData.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  required
                />
                <select
                  name="status"
                  value={projectData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <input
                  type="date"
                  name="deadline"
                  value={projectData.deadline}
                  onChange={handleChange}
                  required
                />
                <div className="edit-buttons">
                  <button type="submit">Save Changes</button>
                  <button type="button" className="cancel-btn" onClick={() => setEditingProject(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div key={project.id} className="project-card">
              <h3 onClick={() => toggleProjectDetails(project.id)}>{project.title}</h3>
              <p>{project.description}</p>
              <p className={`status ${getStatusClass(project.status)}`}>{project.status}</p>
              <p><strong>Deadline:</strong> {project.deadline}</p>
              <button onClick={() => handleEditProject(project)}>Edit Project</button>

              {selectedProject === project.id && (
                <div className="tasks-section">
                  <h4>Tasks</h4>
                  {project.tasks.map((task) => (
                    <div key={task.id} className="task-item">
                      <p className={`task-status ${getStatusClass(task.status)}`}>
                        {task.title}
                      </p>
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(project.id, task.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button className="delete-btn" onClick={() => deleteTask(project.id, task.id)}>Delete</button>
                    </div>
                  ))}

                  <div className="add-task">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="New Task"
                    />
                    <button onClick={() => addTask(project.id)}>Add Task</button>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Projects;