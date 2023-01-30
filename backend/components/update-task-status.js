const Task = require("../models/Task");

async function updateTaskStatus(req, res) {
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
}

module.exports = updateTaskStatus;
