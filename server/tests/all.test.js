const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const variables = {
  userId: null,
  token: null,
  taskId: null,
  projectId: null,
};

jest.mock("nodemailer", () => {
  const originalModule = jest.requireActual("nodemailer");

  return {
    ...originalModule,
    createTransport: () => ({
      sendMail: (mailOptions, fn) => {
        fn(false, {
          accepted: [mailOptions.to],
          html: mailOptions.html,
        });
      },
    }),
  };
});

beforeAll(async () => {
  await mongoose.disconnect();
  mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe("POST /api/users", () => {
  test("It should create user and send link to email", async () => {
    const response = await supertest(app).post("/api/users").send({
      email: "turaevshokhrukh7@gmail.com",
      password: "somePassword",
      nickname: "Shoxa",
    });

    const dom = new JSDOM(response.body.html);
    const href = dom.window.document.querySelector("a").href;
    variables.userId = getParams(href).userId;
    variables.token = getParams(href).token;

    expect(response.body).toEqual(
      expect.objectContaining({
        accepted: ["turaevshokhrukh7@gmail.com"],
        html: expect.any(String),
      })
    );
  });
});

describe("GET /api/confirm-email/:userId/:token", () => {
  test("It should activate account", async () => {
    const response = await supertest(app).get(
      `/api/confirm-email/${variables.userId}/${variables.token}`
    );

    expect(response.body).toEqual({});
  });
});

describe("POST /api/sign-in", () => {
  test("It should return a user token", async () => {
    const response = await supertest(app).post("/api/sign-in").send({
      email: "turaevshokhrukh7@gmail.com",
      password: "somePassword",
    });

    variables.token = response.body.token;

    expect(response.body).toEqual({
      token: expect.any(String),
      userId: expect.any(String),
    });
  });
});

describe("GET /api/users/userId", () => {
  test("It should return a user", async () => {
    const response = await supertest(app)
      .get(`/api/users/${variables.userId}`)
      .set("Authorization", variables.token);

    expect(response.body).toEqual(
      expect.objectContaining({
        nickname: "Shoxa",
        email: "turaevshokhrukh7@gmail.com",
        active: true,
      })
    );
  });
});

describe("PUT /api/users/userId", () => {
  test("It should return the newly updated user", async () => {
    const response = await supertest(app)
      .patch(`/api/users/${variables.userId}`)
      .set("Authorization", variables.token)
      .send({
        nickname: "Shoxa (changed)",
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        nickname: "Shoxa (changed)",
      })
    );
  });
});

describe("PUT /api/users/userId", () => {
  test("It should return the newly updated user", async () => {
    const response = await supertest(app)
      .patch(`/api/users/${variables.userId}`)
      .set("Authorization", variables.token)
      .send({
        non_existant: "",
      });

    expect(response.body).not.toEqual(
      expect.objectContaining({
        nickname: "Shoxa (changed)",
      })
    );
  });
});

function getParams(url) {
  const segments = url.split("/");
  return {
    userId: segments[4],
    token: segments[5],
  };
}

const currentDate = new Date();

describe("POST /api/users/userId/tasks", () => {
  test("It should create task", async () => {
    const response = await supertest(app)
      .post(`/api/users/${variables.userId}/tasks`)
      .send({
        title: "test-title",
        startDate: currentDate,
        repeated: false,
      })
      .set("Authorization", variables.token);

    variables.taskId = response.body[0]._id;

    expect(response.body[0].repeated).toBe(false);
    expect(response.body[0].title).toBe("test-title");

    const response2 = await supertest(app)
      .post(`/api/users/${variables.userId}/tasks`)
      .send({
        title: "test-title-repeated",
        startDate: currentDate,
        repeated: true,
        interval: 1,
        iterations: 1,
      })
      .set("Authorization", variables.token);

    expect(response2.body[1].repeated).toBe(true);
    expect(response2.body[1].title).toBe("test-title-repeated");
  });
});

describe("GET /api/users/userId/tasks", () => {
  test("It should return tasks", async () => {
    const response = await supertest(app)
      .get(`/api/users/${variables.userId}/tasks`)
      .set("Authorization", variables.token);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        title: "test-title",
        repeated: false,
      })
    );
  });
});

describe("PATCH /api/users/userId/tasks/taskId", () => {
  test("It should return the newly updated task", async () => {
    const response = await supertest(app)
      .patch(`/api/users/${variables.userId}/tasks/${variables.taskId}`)
      .set("Authorization", variables.token)
      .send({
        title: "title (changed)",
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        title: "title (changed)",
      })
    );
  });
});

describe("DELETE /api/users/userId/tasks/taskId", () => {
  test("It should delete a task", async () => {
    const response = await supertest(app)
      .delete(`/api/users/${variables.userId}/tasks/${variables.taskId}`)
      .set("Authorization", variables.token);

    expect(response.body).toEqual({ _id: variables.taskId });
  });
});

describe("POST /api/users/userId/projects", () => {
  test("It should create project", async () => {
    const response = await supertest(app)
      .post(`/api/users/${variables.userId}/projects`)
      .send({
        title: "test-title-project",
      })
      .set("Authorization", variables.token);

    variables.projectId = response.body._id;

    expect(response.body.title).toBe("test-title-project");
  });
});

describe("GET /api/users/userId/projects/projectId", () => {
  test("It should return a project", async () => {
    const response = await supertest(app)
      .get(`/api/users/${variables.userId}/projects/${variables.projectId}`)
      .set("Authorization", variables.token);

    expect(response.body).toEqual(
      expect.objectContaining({
        title: "test-title-project",
      })
    );
  });
});

describe("GET /api/users/userId/projects", () => {
  test("It should return projects", async () => {
    const response = await supertest(app)
      .get(`/api/users/${variables.userId}/projects`)
      .set("Authorization", variables.token);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        title: "test-title-project",
      })
    );
  });
});

describe("PATCH /api/users/userId/projects/projectId", () => {
  test("It should return the newly updated task", async () => {
    const response = await supertest(app)
      .patch(`/api/users/${variables.userId}/projects/${variables.projectId}`)
      .set("Authorization", variables.token)
      .send({
        title: "title (changed)",
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        title: "title (changed)",
      })
    );
  });
});

describe("DELETE /api/users/userId/projects/projectId", () => {
  test("It should delete a project", async () => {
    const response = await supertest(app)
      .delete(`/api/users/${variables.userId}/projects/${variables.projectId}`)
      .set("Authorization", variables.token);

    expect(response.body).toEqual({ _id: variables.projectId });
  });
});

describe("DELETE /api/users/userId/projects/projectId", () => {
  test("It should delete a project", async () => {
    const response = await supertest(app)
      .delete(`/api/users/${variables.userId}/projects/${variables.projectId}`)
      .set("Authorization", variables.token);

    expect(response.body).not.toEqual({ _id: variables.projectId });
  });
});

describe("DELETE /api/users/userId", () => {
  test("It should delete a user", async () => {
    const response = await supertest(app)
      .delete(`/api/users/${variables.userId}`)
      .set("Authorization", variables.token);

    expect(response.body).toEqual({ _id: variables.userId });
  });
});
