const Project = require("../models/Project");

async function deleteProject(req, res) {
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
}

module.exports = deleteProject;
