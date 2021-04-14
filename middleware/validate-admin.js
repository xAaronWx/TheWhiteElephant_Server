const validateAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  } else {
    return res.status(500).send("You are not an admin");
  }
};

module.exports = validateAdmin;
// validateAdmin must run AFTER validateSession
