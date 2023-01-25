const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
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

//Get User email by email
app.get("/api/users/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ email: user.email });
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

//Server Setup
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
