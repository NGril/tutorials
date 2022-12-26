const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

// setup
beforeEach(setupDatabase);

// using supertest to test endpoints
test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({ name: "Niko", email: "niko@example.com", password: "MyPass777" })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: "wrongEmail@example.com", password: "wrongPass" })
    .expect(400);
});

// testing authenticated endpoints
test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    // setting up authorization header
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

// advanced assertions
test("Should signup a new user 2", async () => {
  const response = await request(app)
    .post("/users")
    .send({ name: "Niko", email: "niko@example.com", password: "MyPass777" })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Niko",
      email: "niko@example.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("MyPass777");
});

test("Should login existing user 2", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);

  const user = await User.findById(response.body.user._id);

  expect(user.tokens[1].token).toBe(response.body.token);
});

test("Should delete account for user 2", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = User.findById(userOneId);
  expect(user).toBeNull();
});

// uploading files using supertest
test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    // first argument of attach is form field we are setting, second is the path to the file
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findOneById(userOneId);

  expect(user.avatar).toEqual(expect.any(Buffer));
});

// testing update methods
test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Jess",
    })
    .expect(200);

  const user = await User.findOneById(userOneId);
  expect(user.name).toEqual("Jess");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Philly",
    })
    .expect(400);
});
