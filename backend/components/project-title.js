const Project = require("../models/Project");

async function getProjectTitle(req, res) {
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
}

module.exports = getProjectTitle;
