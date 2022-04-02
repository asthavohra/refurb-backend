const app = require("./app");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
var dir = path.join(__dirname, "public");
app.use(express.static(dir));

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
