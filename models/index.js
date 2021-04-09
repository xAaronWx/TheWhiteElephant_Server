const User = require("./user");
const Address = require("./address");
const Gift = require("./gift");

// Setup Associations
User.hasOne(Address);
Address.belongsTo(User);

User.hasMany(Gift);
Gift.belongsTo(User);

module.exports = {
  User,
  Address,
  Gift,
};
