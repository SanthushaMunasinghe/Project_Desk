const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = express();
app.use(express.json());

//DB Connect
const dbLink = process.env.DB_LINK;

const connectDB = async () => {
  try {
    await mongoose.connect(dbLink, {
      dbName: "projectdeskdb",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.taskId + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Server is running");
});

//Get User email by id
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ email: user.email });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get User email amd id by email
app.get("/api/users/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res
        .status(404)
        .json({ message: "User not found", error: "User not found" });
    } else {
      res.status(200).json({ email: user.email, id: user._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get Project Title by Title
app.get("/api/projects/title/:title", async (req, res) => {
  const { title } = req.params;

  // Check if project title already exists
  const existingProject = await Project.findOne({ title });
  if (existingProject) {
    return res
      .status(400)
      .json({ error: "Project with that title already exists" });
  } else {
    res.status(200).json({ message: "Successful!" });
  }
});

//Get Project By Admin Id
app.get("/api/projects/admin/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ admin: req.params.userId });
    if (!projects) {
      res.status(404).json({ message: "No projects found" });
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get Task By Project Id
app.get("/api/tasks/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    if (!tasks) {
      res.status(404).json({ message: "No tasks found" });
    } else {
      res.status(200).json(tasks);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update Task Status
app.put("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    task.status = req.body.status;
    await task.save();
    res.status(200).json({ message: "Task status updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get Projects by UserId where UserId included in members
app.get("/api/projects/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ members: req.params.userId });
    if (!projects) {
      res.status(404).json({ message: "No projects found" });
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get Project By Id
app.get("/api/project/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      res
        .status(200)
        .json({ id: project.id, title: project.title, admin: project.admin });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//User Login
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isPasswordCorrect = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Incorrect password" });
      } else {
        // create a JWT token here and send it as a response
        res
          .status(200)
          .json({ message: "Logged in successfully", userId: user._id });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Add new user
app.post("/api/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      const newUser = await user.save();
      res.status(201).json({ user: newUser, userId: newUser._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Add New Project
app.post("/api/projects", async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      admin: req.body.admin,
      members: req.body.members,
    });
    await project.save();
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Add Task
app.post("/api/task", async (req, res) => {
  const { title, description, file, status, projectId } = req.body;

  // Check if task title already exists
  const existingProject = await Task.findOne({ title });
  if (existingProject) {
    return res
      .status(400)
      .json({ error: "Project with that title already exists" });
  } else {
    const newProject = new Task({
      title,
      description,
      file,
      status,
      projectId,
    });
    await newProject.save();
    res.status(201).json({ message: "Project saved successfully!" });
  }
});

//Upload Task File
app.post("/api/task/upload", upload.single("file"), async (req, res) => {
  try {
    const taskId = req.body.taskId;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.file = req.file.path;
    task.status = "In Review";
    await task.save();

    res
      .status(200)
      .json({ message: "File uploaded successfully", file: task.file });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
});

//Download task file
app.get("/api/task/download/:fileName", async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, "assets", fileName);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Error downloading file", error });
  }
});

//Delete Project
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      res.status(200).json({ message: "Project deleted successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete Task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Server Setup
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
