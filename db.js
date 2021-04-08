const Sequelize = require("sequelize");
const sequelize = new Sequelize("TheWhiteElephant", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to The WHite Elephant database");
  },
  function (err) {
    console.log("err");
  }
);

module.exports = sequelize;
