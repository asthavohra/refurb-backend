const express = require("express");
const router = express.Router();
const Firebase = require("../service/FirebaseService");

router.post("/order", async (req, res) => {
  const orderRef = await Firebase.getDB()
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
