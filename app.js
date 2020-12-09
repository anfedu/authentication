const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// routes
app.use("/users", require("./routes/user"));

// start the server
const port = process.env.PORT || 5001;
app.listen(port);
console.log(`server runnibng on port ${port}`);
