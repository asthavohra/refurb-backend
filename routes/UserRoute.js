const Firebase = require("../service/FirebaseService");
const express = require("express");
const router = express.Router();

router.post("/user", async (req, res) => {
  const userRef = await Firebase.getDB().collection("users").doc(req.body.uid);
  const user = await userRef.get();
  if (!user.exists) {
    await userRef.set({
      email: req.body.email,
      createdAt: req.body.createdAt,
      name: req.body.name,
    });
  }
  res.status(201).send({ userId: req.body.id });
});

router.get("/user/:userId/orders", async (req, res) => {
  let allOrdersData = [];
  const userRef = await Firebase.getDB()
    .collection("users")
    .doc(req.params.userId)
    .collection("order")
    .orderBy("createdAt", "desc")
    .get();

  userRef.docs.map((order) => {
    let orderData = {
      id: order.id,
      data: order.data(),
    };
    allOrdersData.push(orderData);
  });
  res.status(200).send(allOrdersData);
});

router.get("/user/:userId/cart", async (req, res) => {
  const userId = req.params.userId;
  //check if user exists
  const user = await Firebase.getDB().collection("users").doc(userId).get();
  if (!user.data()) {
    return res.status(400).send({ error: "Invalid request" });
  }
  console.log("************GET USER CART************ ");
  try {
    const currentCart = await Firebase.getDB()
      .collection("users")
      .doc(userId)
      .collection("cart")
      .doc("current")
      .get();
    let cartItems = [];
    if (currentCart.data()) {
      currentCart.data().items.forEach((item) => {
        let count = item.count;
        let currentItem = item;
        delete currentItem.count;
        while (count > 0) {
          cartItems.push(currentItem);
          count--;
        }
      });
    }
    return res.status(200).send({ items: cartItems });
  } catch (e) {
    console.error("Cart is empty, returning empty response, error:", e.message);
    return res.status(200).send({ items: [] });
  }
});

module.exports = router;
