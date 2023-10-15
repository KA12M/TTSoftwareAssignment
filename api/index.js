const express = require("express");
const cors = require("cors");

require("dotenv").config();

require("./src/db/mongo.config");
require("./src/db/seedData");

const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  req.query.sort = req.query.sort ?? "-customID";
  next();
})

app.get("/", (req, res) => {
  res.send("server is listening...");
});

app.use("/user", require("./src/routes/user.route"));

// Server is running...
app.listen(port, async () => {
  console.log(`app listening on port: ${port}`);
});
