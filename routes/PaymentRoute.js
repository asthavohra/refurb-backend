const express = require("express");
const router = express.Router();

router.post("/payment", async (request, response) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
