const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");
const User = sequelize.define("User", {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
// connect()

async function testDb() {
  try {
    await User.sync(); //use migration during sync
    const jane = await User.create({
      username: "janedoe",
      birthday: new Date(1980, 6, 20),
    });

    const users = await User.findAll();
    console.log("users", users);
  } catch (error) {
    console.log("Error in sql db config ", error);
  }
}

testDb();
