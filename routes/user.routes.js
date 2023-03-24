const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

/**
 * @route           POST /user/signin
 * @description     Login with email and password
 */
router.post("/signin", (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error || !user) {
      res.status(500).json({ message: info.message });
    } else {
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET_KEY);
      res.status(200).json({ data: user, token });
    }
  })(req, res, next);
});

/**
 * @route         POST /user/create
 * @description   Insert a user record
 */
router.post("/create", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(500).json({ message: "User already registered" });
  }
  new User(req.body)
    .save()
    .then((doc) => {
      if (!doc) return Promise.reject(new Error("Couldn't create User"));
      res.status(200).json({ data: doc, message: "User added successfully" });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});
module.exports = router;
