const Project = require("../models/Project");

async function getProjectByAdmin(req, res) {
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
}

module.exports = getProjectByAdmin;
