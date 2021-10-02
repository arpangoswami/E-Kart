const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();
//database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log(`ERROR AT DATABASE CONNECTION ${err}`));

//middlewares
app.use(morgan("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(cors());

//routes middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
