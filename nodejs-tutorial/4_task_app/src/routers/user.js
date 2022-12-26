const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

// signup route
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// login route
router.post("/users/login", async (req, res) => {
  try {
    // findByCredentials is our custom function which we added to the User model
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    // custom, non-static, function for generating an auth token for a specific user
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// logout route
router.post("/users/logout", auth, async (req, res) => {
  try {
    // this is accessible because of auth middleware
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// logout all sessions route
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    // this is accessible because of auth middleware
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// by adding the auth middleware as the 2nd argument of this function we are registering it for specifically this route
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  // if we try to update a non-existing field it will be ignored, this is why this logic is added
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // with the new option set to true the newly updated object is returned instead of the old one
    // with run validators set to true we specify that the validation needs to be run on the request body
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    // findByIdAndUpdate bypasses mongoose middleware, so we'll be using this method instead
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // req.user is here through the auth middleware
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

// configuring multer for the file upload route
const upload = multer({
  // the destination is based on the project root
  // if we remove this the image data won't be immediatelly saved, it will be passed through to req.file
  // dest: "avatars",
  limits: {
    // validation for file size (in bytes)
    fileSize: 1000000,
  },
  // validation for file type - cb is the callback which is called, 1st param is the error, and 2nd a boolean for accepting the file upload
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file."));
    }

    cb(undefined, true);
  },
});

// file upload route with 2 middlewares (auth is first)
router.post(
  "/users/me/avatar",
  auth,
  // the argument 'avatar' is the name of the form-data field
  upload.single("avatar"),
  async (req, res) => {
    // using sharp to resize the image and convert it to png
    // image data - accessible in req.file.buffer since we didn't use `dest` in multer config
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  // this second argument is the error handler for middleware errors
  // it needs to have this exact signature so express knows what it is (all function arguments must be provided)
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// serving up images
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    // setting up response headers
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
