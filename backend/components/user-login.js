const User = require("../models/User");

const bcrypt = require("bcrypt");

//User Login
async function userLogin(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isPasswordCorrect = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Incorrect password" });
      } else {
        // create a JWT token here and send it as a response
        res
          .status(200)
          .json({ message: "Logged in successfully", userId: user._id });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = userLogin;
