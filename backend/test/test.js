const chai = require("chai");
const expect = chai.expect;

const app = require("express")();
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
// const io = require('socket.io');

// Configure Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Configure Multer
const upload = multer();

// Load environment variables from .env file
dotenv.config();

// Server setup
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

describe("Simple arithmetic", () => {
  it("2 + 2 should equal 4", () => {
    const result = 2 + 2;
    expect(result).to.equal(4);
  });
});
