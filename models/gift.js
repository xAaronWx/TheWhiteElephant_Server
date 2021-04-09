const { DataTypes } = require("sequelize");
const db = require("../db");

const Gift = db.define("gift", {
  itemType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  giftImage: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

module.exports = Gift;
