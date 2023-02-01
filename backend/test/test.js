const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const assert = require("assert");
const request = require("supertest");
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

const Project = require("../models/Project");

//Testing User

//Signup
describe("postUser", () => {
  it("should return a 400 status if email already exists", (done) => {
    chai
      .request(server)
      .post("/api/user")
      .send({ email: "santhusha@gmail.com", password: "12345678" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Email already exists");
        done();
      });
  });

  it("should return a 201 status and the new user if email does not exist", (done) => {
    chai
      .request(server)
      .post("/api/user")
      .send({ email: "newuser@gmail.com", password: "12345678" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.user.email).to.equal("newuser@gmail.com");
        done();
      });
  });

  it("should return a 400 status if an error occurs", (done) => {
    chai
      .request(server)
      .post("/api/user")
      .send({ email: "", password: "12345678" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.exist;
        done();
      });
  });
});

//Login
describe("userLogin", () => {
  it("should return 404 if the user does not exist", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .send({ email: "falseemail@gmail.com", password: "12345678" })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User not found");
        done();
      });
  });

  it("should return 401 if the password is incorrect", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .send({ email: "santhusha@gmail.com", password: "123" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Incorrect password");
        done();
      });
  });

  it("should return 200 and the user ID if the login is successful", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .send({ email: "santhusha@gmail.com", password: "12345678" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Logged in successfully");
        res.body.should.have.property("userId");
        done();
      });
  });
});

//Testing Prooject

//New Project
describe("Post Project", () => {
  beforeEach(async () => {
    await Project.deleteMany({});
  });

  it("Should post a project", (done) => {
    const project = {
      title: "Project 1",
      description: "Test project",
      admin: "63d000b4179712475ee2974b",
      members: ["63d0bb58e548abace96c546a", "63d0bb88e548abace96c546e"],
    };
    chai
      .request(server)
      .post("/api/projects")
      .send(project)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("success");
        done();
      });
  });
});

//Get Project
describe("Get project by admin", () => {
  it("should return an array of projects for a given admin", (done) => {
    chai
      .request(server)
      .get("/api/projects/admin/63d000b4179712475ee2974b")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should return a 404 error if no projects are found for the admin", (done) => {
    chai
      .request(server)
      .get("/api/projects/admin/456")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("No projects found");
        done();
      });
  });

  it("should return a 400 error if there is an error in the request", (done) => {
    chai
      .request(server)
      .get("/api/projects/admin/invalid")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  });
});

//Delete Project
describe("deleteProject", () => {
  it("should delete a project by id", async () => {
    const res = await chai
      .request(server)
      .delete(`/api/projects/63d54199bc506964212a48c1`);
    expect(res).to.have.status(200);
    expect(res.body)
      .to.have.property("message")
      .eq("Project deleted successfully");
  });

  it("should return a 404 error if the project id is not found", async () => {
    const res = await chai
      .request(app)
      .delete("/api/projects/123456789012345678901234");
    expect(res).to.have.status(404);
    expect(res.body).to.have.property("message").eq("Project not found");
  });
});

//Testing Task

//New Task
describe("Post a task", () => {
  it("should create a new task", (done) => {
    request(server)
      .post("/api/tasks")
      .send({
        title: "Test task",
        description: "Test description",
        status: "To Do",
        projectId: "12345663d541cbbc506964212a48c7",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.message, "Project saved successfully!");
        done();
      });
  });
});

//Get Tasks
describe("GET /tasks", function () {
  it("should get all tasks for a project", function (done) {
    request(app)
      .get("api/tasks/63d541cbbc506964212a48c7")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.equal(res.body.message, "No tasks found");
        done();
      });
  });
});
