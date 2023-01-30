const User = require("../models/User");

const bcrypt = require("bcrypt");

async function postUser(req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      const newUser = await user.save();
      res.status(201).json({ user: newUser, userId: newUser._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = postUser;
