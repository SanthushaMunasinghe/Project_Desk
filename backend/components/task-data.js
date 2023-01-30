const Task = require("../models/Task");

async function getTasks(req, res) {
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
}

module.exports = getTasks;
