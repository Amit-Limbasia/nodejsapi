// Express is for building the Rest apis
const express = require("express");

//cors provides Express middleware to enable CORS with various options.
const cors = require("cors");
//db connection

const db = require("./app/models");
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
