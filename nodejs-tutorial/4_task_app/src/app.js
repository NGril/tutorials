// APP DEFINITION - in a separate from index.js where we are running the app for testing purposes
const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// this is used to automatically parse incoming json into an object which we can use
app.use(express.json());

// with this we are registering routes from another file to our application
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
