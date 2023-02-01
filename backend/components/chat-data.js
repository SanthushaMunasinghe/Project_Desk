const Chat = require("../models/Chat");

async function getChatsByProjectId(req, res) {
  try {
    const chats = await Chat.find({ projectId: req.params.projectId });
    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getChatsByProjectId;
