const express = require("express");
const app = express();
const port = 3001;
const mdb = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(cors());
const Signup = require("./models/signupSchema");
const Project = require("./models/projectSchema");

app.get("/", (req, res) => {
  res.send("<h1>welcome to backend</h1>");
});

app.listen(port, () => {
  console.log("server started successfully");
});

mdb
  .connect("mongodb+srv://sjit:sjit@signup.bgwqz.mongodb.net")
  .then(() => {
    console.log("MDB connection Successful");
  })
  .catch(() => {
    console.log("Check your connection string");
  });
app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, phoneNumber, password, email } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newSignup = new Signup({
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phoneNumber,
      password: hashedpassword,
      email: email,
    });

    newSignup.save();
    console.log("Signup succesful");
    res.status(201).json({ message: "Signup successful", isSignup: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Signup unsuccesful", isSignup: false });
  }
});

app.get("/getsignupdet", async (req, res) => {
  const signup = await Signup.find();
  console.log(signup);
  res.send("signup details fetched");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Signup.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) {
      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      console.log(isValidPassword);
      if (isValidPassword) {
        res.status(201).json({ message: "Login successful", isLogin: true });
      } else {
        res.status(201).json({ message: "incorrect password", isLogin: false });
      }
    } else {
      res
        .send(400)
        .json({ message: "User not found, Sign up first", isLogin: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Login Error Check your code", isLogin: false });
  }
  });

  //save project in db
  app.post("/project", async (req, res) => {
    try {
    console.log(req.body);
    const { title, description, status, deadline, tasks } = req.body;
    const newProject = Project({
      title: title,
      description: description,
      status: status,
      deadline: deadline,
      tasks:tasks
    });
    newProject.save();
    console.log("project saved succesful");
    res.status(201).json({ message: "Project saved successfully", isSave: true });
    } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in saving project", isSave: false });
    }
    
  });
  app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
});
/*
//updating project 
app.put("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating project" });
  }
});*/
/*
//add task
app.put("/projects/:id/add-task", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, assignedTo, status } = req.body;

    // Find the project by ID and update its tasks array
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $push: { tasks: { name, assignedTo, status } } }, // Add the new task
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, message: "Task added successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding task" });
  }
});

// Add a task to a specific project
app.post("/projects/:projectId/tasks", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, assignedTo, status } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Create new task object
    const newTask = { title, assignedTo, status };

    // Add task to project
    project.tasks.push(newTask);

    // Save updated project
    await project.save();

    res.json({ success: true, task: newTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//delete task
app.delete("/projects/:projectId/tasks/:taskId", async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    console.log("Before Deletion:", project.tasks);
    // Remove task by filtering out the given taskId
    project.tasks = project.tasks.filter(task => task._id.toString() !== taskId.toString());

    
    await project.save();
    console.log("After Deletion:", project.tasks);
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
*/
//adding tasks
app.put("/project/:id/tasks", async (req, res) => {
  const { id } = req.params;
  const { title, status, assignedTo } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $push: { tasks: { title, status, assignedTo } } },
      { new: true } // Returns the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Task added successfully", updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding task", error });
  }
});
//updating task
app.put("/project/:id/task/:taskId", async (req, res) => {
  const { id, taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, "tasks._id": taskId }, // Match the specific task
      { $set: { "tasks.$.status": status } }, // Update only that task's status
      { new: true } // Return updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project or task not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Error updating task status", error });
  }
});

//deleting task
app.delete("/project/:projectId/tasks/:taskId", async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project or task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task", error });
  }
});

//Edit Project Details
app.put("/project/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status, deadline } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, status, deadline },
      { new: true } // Returns the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating project", error });
  }
});

//deleting project
app.delete("/project/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully", deletedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting project", error });
  }
});

