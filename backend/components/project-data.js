const Project = require("../models/Project");

async function getProjectData(req, res) {
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
}

module.exports = getProjectData;
