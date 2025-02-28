import React from "react";
import { useState, useEffect } from "react";
import "./Projects.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "../Navbar/Navbar";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
    id: 1,
    title: "Healthcare App",
    description:
      "A mobile app for booking doctor appointments and managing health records.",
    status: "Completed",
    deadline: "2025-02-20",
    tasks: [
      { id: 401, title: "Build Mobile UI", status: "Completed", assignedTo: "Mia" },
      { id: 402, title: "Setup Firebase Backend", status: "Completed", assignedTo: "Liam" },
      { id: 403, title: "Deploy on App Store", status: "Completed", assignedTo: "Noah" },
    ],
  },
    {
      id: 2,
      title: "Project Management Dashboard",
      description:
        "A MERN stack application to manage projects, tasks, and teams.",
      status: "In Progress",
      deadline: "2025-03-02",
      tasks: [
        {
          id: 101,
          title: "Setup Database",
          status: "Completed",
          assignedTo: "John",
        },
        {
          id: 102,
          title: "Build UI Components",
          status: "In Progress",
          assignedTo: "Ben",
        },
        {
          id: 103,
          title: "Integrate Backend",
          status: "Pending",
          assignedTo: "Lia",
        },
      ],
    },
    {
      id: 3,
      title: "Dyslexia Assist App",
      description:
        "An AI-powered application to assist dyslexic users with reading.",
      status: "Pending",
      deadline: "2025-04-01",
      tasks: [
        {
          id: 201,
          title: "Collect Dataset",
          status: "Pending",
          assignedTo: "Amanda",
        },
        {
          id: 202,
          title: "Train Model",
          status: "Pending",
          assignedTo: "Claura",
        },
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
                {
                  id: Date.now(),
                  title: newTask,
                  status: "Pending",
                  assignedTo: assignedMember,
                },
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
  const totalCompleted = projects.filter(
    (p) => p.status === "Completed"
  ).length;
  const totalInProgress = projects.filter(
    (p) => p.status === "In Progress"
  ).length;
  const totalPending = projects.filter((p) => p.status === "Pending").length;
  const today = new Date();
  //Task completion percentage
  const getTaskCompletion = (tasks) => {
    if (tasks.length === 0) return 0; // If no tasks, completion is 0%
    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    return Math.round((completedTasks / tasks.length) * 100); // Calculate percentage
  };

  // Check upcoming deadlines (projects due within the next 7 days)
  const upcomingDeadlines = projects.filter((p) => {
    const deadlineDate = new Date(p.deadline);
    const timeDiff = deadlineDate - today;
    const daysRemaining = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return daysRemaining > 0 && daysRemaining <= 7;
  }).length;

  //barchart for project status
  const projectStatusData = [
    { name: "Completed", count: totalCompleted },
    { name: "In Progress", count: totalInProgress },
    { name: "Pending", count: totalPending },
  ];

  //to search project
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  {
    filteredProjects.map((project) => (
      <div key={project.id} className="project-card">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    ));
  }

  //piechart for total vs completed
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;
  const remainingProjects = totalProjects - completedProjects;
  const projectCompletionData = [
    { name: "Completed Projects", value: completedProjects },
    { name: "Remaining Projects", value: remainingProjects },
  ];

  // Colors for Pie Chart
  const COLORS = ["#28a745", "#dc3545"];
  
  return (
    <div className="projects-container">
      <Navbar />
      <div id="dash">
        <h2 className="dash-title">Project Status Overview</h2>
        <div className="project-summary">
          <div className="summary-box completed">
            ✅ Completed: {totalCompleted}
          </div>
          <div className="summary-box in-progress">
            🚀 In Progress: {totalInProgress}
          </div>
          <div className="summary-box pending">⏳ Pending: {totalPending}</div>
          <div className="summary-box pending">
            ⏰ Upcoming Deadlines (Next 7 Days): {upcomingDeadlines}
          </div>
        </div>

        <div className="graph">
          <div className="chart-container">
            <BarChart width={400} height={300} data={projectStatusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </div>
          <PieChart width={300} height={300}>
            <Pie
              data={projectCompletionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {projectCompletionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <hr />
      <div id="myprojects">
        <h2 className="projects-title">My Projects</h2>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <ul>
          <li>
            ✅ Click on a Project Title to toggle the details of that project.
          </li>
          <li>✅ Show Task Information under the selected project.</li>
          <li>✅ Add task, delete task, assign members and change the status of task</li>
          <li>✅ Colour of task changes according to status of task</li>
          <li>✅ Include Progress Percentage for task completion.</li>
        </ul>
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
          {filteredProjects.map((project) =>
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
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${getTaskCompletion(project.tasks)}%`,
                        }}
                      ></div>
                    </div>
                    <p className="progress-text">
                      {getTaskCompletion(project.tasks)}% Completed
                    </p>
                    <div className="task-row">
                      <div>
                        <h4>Task</h4>
                      </div>
                      <div>
                        <h4>Assignee</h4>
                      </div>
                      <div>
                        <h4>Status</h4>
                      </div>
                      <div>
                        <h4>Delete</h4>
                      </div>
                    </div>
                    {project.tasks.map((task) => (
                      <div key={task.id} className="task-item">
                        <p
                          className={`task-status ${getStatusClass(
                            task.status
                          )}`}
                        >
                          {task.title}
                        </p>
                        <p>{task.assignedTo}</p>
                        <select
                          value={task.status}
                          onChange={(e) =>
                            updateTaskStatus(
                              project.id,
                              task.id,
                              e.target.value
                            )
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
                          🗑
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
    </div>
  );
};

export default Projects;
