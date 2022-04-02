const app = require("./app");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
const dir = path.join(__dirname, "public");
app.use(express.static(dir));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
