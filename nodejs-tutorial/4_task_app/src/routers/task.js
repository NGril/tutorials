const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// this route also shows how we can use filtering, sorting and pagination
// filtering, e.g. GET /tasks?completed=true
// pagination, e.g. GET /tasks?limit=10&skip=20
// sorting, e.g. GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  // filtering
  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  // sorting
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // data fetching - approach 1
    // const tasks = await Task.find({ owner: req.user._id });
    // res.send(tasks);

    // data fetching - approach 2
    await req.user
      .populate({
        path: "tasks",
        // filtering options
        match,
        // pagination & sorting options, mongoose has these options built in
        options: {
          // pagination
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          // sorting
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // with the new option set to true the newly updated object is returned instead of the old one
    // with run validators set to true we specify that the validation needs to be run on the request body
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    // findByIdAndUpdate bypasses mongoose middleware, so we'll be using this method instead
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
