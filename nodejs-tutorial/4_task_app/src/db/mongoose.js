const mongoose = require("mongoose");

// connecting to the db using mongoose
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
