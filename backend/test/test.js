const chai = require("chai");
const expect = chai.expect;

const express = require("express");

const app = express();
app.use(express.json());

//Server Setup
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// describe("Simple arithmetic", () => {
//   it("2 + 2 should equal 4", () => {
//     const result = 2 + 2;
//     expect(result).to.equal(4);
//   });
// });
