const express = require("express");
const app = express();
const cors = require("cors");
//Route imported here

const product = require("./routes/ProductRoute");
const payment = require("./routes/PaymentRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const cart = require("./routes/CartRoute");

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  let apiKey = req.headers["x-api-key"];
  if (!apiKey && apiKey === process.env.API_KEY) {
    return res.status(401).json({ error: "No credentials sent!" });
  }
  next();
});
app.use("/api/v1/", product);
app.use("/api/v1/", payment);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1/", cart);
module.exports = app;
