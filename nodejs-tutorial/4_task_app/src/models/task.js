const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // this field is used as a foreign key (connecting users and tasks)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // this field explicitly tells monoose that this is a foreign key
      // with it we get access to the entire User model whenever we have access to a certain task
      // this is done using the populate method, check it in routes/docs :)
      ref: "User",
    },
  },
  {
    // with this we are automatically adding createdAt and updatedAt timestamp fields to our db model which are managed automatically
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
