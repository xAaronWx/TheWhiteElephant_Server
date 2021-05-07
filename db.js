const Sequelize = require("sequelize");

// HOSTED METHOD----------
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  // COMMENT BELOW TO TEST LOCALLY
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// LOCAL METHOD---------------
// const sequelize = new Sequelize("TheWhiteElephant", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });

sequelize.authenticate().then(
  function () {
    console.log("Connected to The WHite Elephant database");
  },
  function (err) {
    console.log("err");
  }
);

module.exports = sequelize;
