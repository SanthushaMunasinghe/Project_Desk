const User = require("../models/User");

async function getUserData(req, res) {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res
        .status(404)
        .json({ message: "User not found", error: "User not found" });
    } else {
      res.status(200).json({ email: user.email, id: user._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getUserData;
