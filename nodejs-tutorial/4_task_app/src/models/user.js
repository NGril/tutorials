const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      // before using the unique property we need to recreate the db so that the index gets created
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password") || value.length < 7) {
          throw new Error("Invalid password");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number!");
        }
      },
    },
    // storing tokens
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    // storing binary data for images
    avatar: {
      type: Buffer,
    },
  },
  {
    // with this we are automatically adding createdAt and updatedAt timestamp fields to our db model which are managed automatically
    timestamps: true,
  }
);

// this is not actually stored in the db
// it's just a way for mongoose to figure out the relationship between different collections
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// this is a built in serialization method which we are changing to hide private data
// we could've also created a new method, but then we'd have to call it everywhere within user routes
userSchema.methods.toJSON = function () {
  const user = this;
  // mongoose method to return raw profile data without mongoose data
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

// password hashing middleware
// first argument is the name of the event, second is the function which is ran - note that it is not defined as an arrow function on purpose - we want to bind the `this` variable
// check docs for more details
userSchema.pre("save", async function (next) {
  const user = this;

  // this will be true if the password has been changed (PATCH), or a new one was created (POST)
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // next is a function which needs to be called to register that the middleware operations are over
  next();
});

// middleware for automatically deleting all tasks of a given user when the user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

// creating a custom reusable static method for finding by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login!");
  }

  return user;
};

// creating a custom reusable method for generating a user token
// note that it's not an arrow function since we'll be using the `this` variable
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // 2nd param is the token secret, it should be an env var
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  // saving the token to the db
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
