const express = require("express");
const router = express.Router();
const filesystem = require("fs");
const stripeFile = filesystem.readFileSync("./stripe.json");
const stripeData = JSON.parse(stripeFile);

const stripe = require("stripe")(stripeData.secretKey);

router.post("/payment", async (request, response) => {
  const total = request.body.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "gbp",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports = router;
