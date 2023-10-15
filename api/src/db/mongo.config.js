const mongoose = require("mongoose"); 

const mongoString = process.env.DB_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "TTSoftwareAssignmentDB"
});

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

module.exports.database = database;