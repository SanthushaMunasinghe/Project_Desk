const Chat = require("../models/Chat");

async function postMessage(req, res) {
  try {
    const chat = new Chat({
      projectId: req.body.projectId,
      chats: [{ message: req.body.message, userId: req.body.userId }],
    });

    await chat.save();
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = postMessage;
