const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const Chat = require("./models/Chat");
const Task = require("./models/Task");

const newUser = require("./components/post-user");
const userLogin = require("./components/user-login");
const userEmail = require("./components/user-email");
const userData = require("./components/user-data");

const newProject = require("./components/post-project");
const projectTitle = require("./components/project-title");
const adminProjectData = require("./components/admin-project-data");
const memberProjectData = require("./components/member-project-data");
const projectData = require("./components/project-data");
const deleteProject = require("./components/delete-project");

const newTask = require("./components/post-task");
const taskData = require("./components/task-data");
const updateTaskStatus = require("./components/update-task-status");
const deleteTask = require("./components/delete-task");

const newMessage = require("./components/post-message");
const chatData = require("./components/chat-data");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());
// const server = require("http").Server(app);
const socketio = require("socket.io");

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

// io.on("connection", (socket) => {
//   console.log("A user connected");
// });

//Server Setup
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (data) => {
    console.log(`Received message: ${data.message} from user: ${data.userId}`);
    const newChat = new Chat({
      message: data.message,
      userId: data.userId,
    });

    newChat.save((err, chat) => {
      if (err) {
        console.error(err);
        return;
      }

      io.emit("receivedMessage", chat);
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
//Get User email by id
app.get("/api/users/:id", userEmail);

//Get User email amd id by email
app.get("/api/users/email/:email", userData);

//Get Project Title by Title
app.get("/api/projects/title/:title", projectTitle);

//Get Project By Admin Id
app.get("/api/projects/admin/:userId", adminProjectData);

//Get Task By Project Id
app.get("/api/tasks/:projectId", taskData);

//Update Task Status
app.put("/api/task/:id", updateTaskStatus);

//Get Projects by UserId where UserId included in members
app.get("/api/projects/:userId", memberProjectData);

//Get Project By Id
app.get("/api/project/:id", projectData);

//Get Chat By Id
app.get("/api/message/:id", chatData);

// //User Login
app.post("/api/login", userLogin);

//Add new user
app.post("/api/users", newUser);

//Add New Project
app.post("/api/projects", newProject);

//Add Task
app.post("/api/task", newTask);

//Add Message
app.post("/api/message", newMessage);

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
app.delete("/api/projects/:id", deleteProject);

//Delete Task
app.delete("/api/tasks/:id", deleteTask);
