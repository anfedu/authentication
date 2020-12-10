const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:8080/users", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("iki res");
  })
  .catch((err) => console.log(err, "iki err"));

const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// routes
app.use("/users", require("./routes/user"));

// start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
