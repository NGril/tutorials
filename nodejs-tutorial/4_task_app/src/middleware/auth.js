const jwt = require("jsonwebtoken");
const User = require("../models/user");

// auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // we have to use the same secret that we used to generate the token
    // this decodes the token and verifies if the signature is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    // with this route handlers will have access to this info
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
