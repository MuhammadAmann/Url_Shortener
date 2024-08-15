const express = require("express");
const { connectMongoDb } = require("./connect");
const urlRouter = require("./routes/index.js");
const path = require("path");
const fs = require("fs");
const urlModel = require("./models/index.js");
const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(
  console.log("MongoDb Connected!")
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/ejs", async (req, res) => {
  const Urls = await urlModel.find({});

  return res.render("home");
});

app.use(express.json());

app.use("/url", urlRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
