const Project = require("../models/Project");

async function postProject(req, res) {
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
}

module.exports = postProject;
