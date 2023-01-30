const User = require("../models/User");

async function getUserEmail(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ email: user.email });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getUserEmail;
