const Task = require("../models/Task");

async function postTask(req, res) {
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
}

module.exports = postTask;
