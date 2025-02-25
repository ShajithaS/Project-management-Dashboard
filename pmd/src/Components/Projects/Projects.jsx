import React from "react";
import { useState } from "react";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project Management Dashboard",
      description:
        "A MERN stack application to manage projects, tasks, and teams.",
      status: "In Progress",
      deadline: "2025-03-10",
      tasks: [
        { id: 101, title: "Setup Database", status: "Completed",assignedTo: "Alice"},
        { id: 102, title: "Build UI Components", status: "In Progress",assignedTo: "Alice" },
        { id: 103, title: "Integrate Backend", status: "Pending",assignedTo: "Alice" },
      ],
    },
    {
      id: 2,
      title: "Dyslexia Assist App",
      description:
        "An AI-powered application to assist dyslexic users with reading.",
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
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
  });
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
  });
  const deleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };
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
  const [newTask, setNewTask] = useState("");
  const [assignedMember, setAssignedMember] = useState("");

  // Add a new task to a project
  const addTask = (projectId) => {
    if (!newTask.trim() || !assignedMember.trim()) return;
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: [
                ...p.tasks,
                { id: Date.now(), title: newTask, status: "Pending",assignedTo: assignedMember,},
              ],
            }
          : p
      )
    );
    setNewTask("");
    setAssignedMember("");
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
  const handleNewProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };
  const addNewProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) return;
    setProjects([...projects, { id: Date.now(), ...newProject, tasks: [] }]);
    setNewProject({
      title: "",
      description: "",
      status: "Pending",
      deadline: "",
    });
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-grid">
        <div className="add-project-section">
          <h3>Add New Project</h3>
          <form className="add-project-form" onSubmit={addNewProject}>
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleNewProjectChange}
              placeholder="Project Title"
              required
            />
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleNewProjectChange}
              placeholder="Project Description"
              required
            />
            <select
              name="status"
              value={newProject.status}
              onChange={handleNewProjectChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="date"
              name="deadline"
              value={newProject.deadline}
              onChange={handleNewProjectChange}
              required
            />
            <button type="submit">Add Project</button>
          </form>
        </div>
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
                <br />
                <textarea
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  required
                />
                <br />
                <select
                  name="status"
                  value={projectData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <br />
                <input
                  type="date"
                  name="deadline"
                  value={projectData.deadline}
                  onChange={handleChange}
                  required
                />
                <br />
                <div className="edit-buttons">
                  <button type="submit">Save Changes</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setEditingProject(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div key={project.id} className="project-card">
              <h3 onClick={() => toggleProjectDetails(project.id)}>
                {project.title}
              </h3>
              <p>{project.description}</p>
              <p className={`status ${getStatusClass(project.status)}`}>
                {project.status}
              </p>
              <p>
                <strong>Deadline:</strong> {project.deadline}
              </p>
              <div className="project-card-button">
                <button onClick={() => handleEditProject(project)}>
                  Edit Project
                </button>
                <button
                  className="delete-project-btn"
                  onClick={() => deleteProject(project.id)}
                >
                  Delete Project
                </button>
              </div>

              {selectedProject === project.id && (
                <div className="tasks-section">
                  <h4>Tasks</h4>
                  {project.tasks.map((task) => (
                    <div key={task.id} className="task-item">
                      <p
                        className={`task-status ${getStatusClass(task.status)}`}
                      >
                        {task.title}
                      </p>
                      <p><strong>Assigned to:</strong> {task.assignedTo}</p>
                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(project.id, task.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(project.id, task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}

                  <div className="add-task">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="New Task"
                    />
                    <input
                      type="text"
                      value={assignedMember}
                      onChange={(e) => setAssignedMember(e.target.value)}
                      placeholder="Assign to (Member Name)"
                    />
                    <button onClick={() => addTask(project.id)}>
                      Add Task
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Projects;
