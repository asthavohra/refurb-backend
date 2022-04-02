const Firestore = require("@google-cloud/firestore");
const express = require("express");
const db = new Firestore({
  projectId: "refurb-f5219",
  keyFilename: "./firebase.json",
});
const router = express.Router();

router.post("/order", async (req, res) => {
  const orderRef = await db
    .collection("users")
    .doc(req.body.userId)
    .collection("order")
    .doc(req.body.orderId);
  const orderData = {
    amount: req.body.amount,
    createdAt: req.body.createdAt,
    basket: req.body.basket,
    currency: req.body.currency,
    paymentMethodType: req.body.paymentMethodType,
    status: req.body.status,
  };
  await orderRef.set(orderData);

  res.status(200).send(orderData);
});

module.exports = router;
