const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://projectdeskuser:7EdutEfccv8kumRM@projectdeskcluster.zyhbnzy.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
