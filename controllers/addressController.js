const { Router } = require("express");
const { Address } = require("../models");
const validateSession = require("../middleware/validate-session");
const router = Router();

// CREATE USER ADDRESS DETAILS
router.post("/create", validateSession, function (req, res) {
  console.log(req.user.id);
  const addressEntry = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    userId: req.user.id,
  };
  Address.create(addressEntry)
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(500).json({ error: err }));
});

// FIND AN OWNER TO AN ADDRESS
router.get("/get", validateSession, function (req, res) {
  const query = {
    where: { userId: req.user.id },
    include: "user",
  };
  Address.findOne(query)
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(500).json({ error: err }));
});

// TODO -- ADD ADDRESS UPDATE ABILITY

module.exports = router;
