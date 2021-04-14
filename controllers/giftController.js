const { Router } = require("express");
const { User, Address, Gift } = require("../models");
const validateSession = require("../middleware/validate-session");
const { increment } = require("../models/user");
const router = Router();

// USER CREATES NEW GIFT ITEM
router.post("/create", validateSession, function (req, res) {
  const giftEntry = {
    itemType: req.body.itemType,
    name: req.body.name,
    weight: req.body.weight,
    description: req.body.description,
    giftImage: req.body.giftImage,
    userId: req.body.id,
  };
  Gift.create(giftEntry)
    .then((gift) => res.status(200).json(gift))
    .catch((err) => res.status(500).json({ error: err }));
});

// RETURN A USERS GIFTS
router.get("/mine", validateSession, function (req, res) {
  const query = {
    where: { userId: req.user.id },
    include: "email",
  };
  Gift.findAll(query)
    .then((yourGifts) => res.status(200).json(yourGifts))
    .catch((err) => res.status(500).json({ error: "Can't locate gifts" }));
});

// GET ALL GIFTS CREATED
router.get("/", function (req, res) {
  Gift.findAll()
    .then((allGifts) => res.status(200).json(allGifts))
    .catch((err) => res.status(500).json({ error: err }));
});

// UPDATE GIFT DETAILS
router.put("/update/:giftId", validateSession, function (req, res) {
  const updateGift = {
    itemType: req.body.gift.itemType,
    name: req.body.gift.name,
    weight: req.body.gift.weight,
    description: req.body.gift.description,
    giftImage: req.body.gift.giftImage,
  };
  const query = { where: { id: req.params.giftId, owner: req.user.id } };

  Gift.update(updateGift, query)
    .then((gifts) => res.status(200).json(gifts))
    .catch((err) => res.status(500).json({ error: err }));
});

// DELETE A GIFT
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };
  Gift.destroy(query)
    .then(() => res.status(200).json({ message: "This gift has been removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
