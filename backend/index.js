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
    res.status(400).json({ message: "Project not saved", isSave: false });
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
