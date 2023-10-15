const { database } = require("./mongo.config");
const User = require("../models/user.model");

database.once("open", async () => {
  const users = require("./Users.json");

  try {
    const count = await User.countDocuments();
    if (count == 0) {
      await User.create(users["users"]);
      console.log(`Added Users: ${JSON.stringify(users)}`);
    } else {
      console.log(`Data already.`);
    }
  } catch (error) {
    console.error("Error inserting seed data:", error);
    database.close();
  }
});
