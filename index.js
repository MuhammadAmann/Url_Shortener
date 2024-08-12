const express = require("express");
const { connectMongoDb } = require("./connect");
const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/employees").then(
  console.log("MongoDb Connected!")
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
