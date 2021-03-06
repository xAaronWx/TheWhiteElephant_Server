const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

// CREATE A NEW USER
const router = Router();
router.post("/create", function (req, res) {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 15),
    role: "user",
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      res.json({
        email: user.email,
        message: "User Successfully Created",
        sessionToken: token,
        role: user.role,
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

// LOGIN USER
router.post("/login", function (req, res) {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 }
              );
              res.status(200).json({
                email: user.email,
                message: "User Successfully Logged in!",
                sessionToken: token,
                role: user.role,
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          }
        );
      } else {
        res.status(500).json({ error: "User does not exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// DELETE A USER
router.delete(
  "/delete/:userId",
  validateSession,
  validateAdmin,
  function (req, res) {
    const query = { where: { id: req.params.userId } };

    User.destroy(query)
      .then(() =>
        res.status(200).json({ message: "The user has been deleted" })
      )
      .catch((err) =>
        res
          .status(500)
          .json({ error: err, message: "Houston we have a problem" })
      );
  }
);

module.exports = router;
