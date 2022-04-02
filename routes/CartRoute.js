const Firestore = require("@google-cloud/firestore");
const express = require("express");
const db = new Firestore({
  projectId: "refurb-f5219",
  keyFilename: "./firebase.json",
});
const router = express.Router();

router.post("/cart/add", async (req, res) => {
  if (!req.body || !req.body.item || !req.body.userId) {
    return res.status(400).send({ error: "Invalid request" });
  }
  //check if user exists
  const user = await db.collection("users").doc(req.body.userId).get();
  if (!user.data()) {
    return res.status(400).send({ error: "Invalid request" });
  }
  const item = req.body.item;
  const cartItem = {
    id: item.id,
    title: item.title,
    image: item.image,
    price: item.price,
    rating: item.rating,
    count: 1,
  };
  const currentCart = await db
    .collection("users")
    .doc(req.body.userId)
    .collection("cart")
    .doc("current")
    .get();
  //check if current cart has any item or not
  if (!currentCart.data()) {
    //add the item as it is
    const response = await db
      .collection("users")
      .doc(req.body.userId)
      .collection("cart")
      .doc("current")
      .set({
        items: [cartItem],
      });
    return res.status(200).send({ items: [cartItem] });
  } else {
    //check if any of the item is matching , if yes then update the count
    let existingItems = currentCart.data();
    let existingItemIndex = existingItems.items.findIndex(
      (existingItem) => existingItem.id === item.id
    );
    if (existingItemIndex > -1) {
      let existingItem = existingItems.items.find(
        (existingItem) => existingItem.id === item.id
      );
      existingItem.count++;
      existingItems.items[existingItemIndex] = existingItem;
    } else {
      existingItems.items.push(cartItem);
    }
    await db
      .collection("users")
      .doc(req.body.userId)
      .collection("cart")
      .doc("current")
      .update({
        items: existingItems.items,
      });
    return res.status(200).send({ items: [cartItem] });
  }
});

router.delete("/cart/item", async (req, res) => {
  console.log("************REMOVE CART ITEMS************ ");
  if (!req.body || !req.body.itemId || !req.body.userId) {
    return res.status(400).send({ error: "Invalid request" });
  }
  //check if user exists
  const user = await db.collection("users").doc(req.body.userId).get();
  if (!user.data()) {
    return res.status(400).send({ error: "Invalid request" });
  }
  const itemId = req.body.itemId;

  const currentCart = await db
    .collection("users")
    .doc(req.body.userId)
    .collection("cart")
    .doc("current")
    .get();
  //check if current cart has any item or not
  if (!currentCart.data()) {
    //add the item as it is
    return res.status(400).send({ error: "Cart is empty" });
  } else {
    //check if any of the item is matching , if yes then update the count
    let existingItems = currentCart.data();
    let existingItemIndex = existingItems.items.findIndex(
      (existingItem) => existingItem.id === itemId
    );
    if (existingItemIndex > -1) {
      let existingItem = existingItems.items.find(
        (existingItem) => existingItem.id === itemId
      );
      existingItem.count--;
      existingItems.items[existingItemIndex] = existingItem;
      await db
        .collection("users")
        .doc(req.body.userId)
        .collection("cart")
        .doc("current")
        .update({
          items: existingItems.items,
        });
      return res.status(200).send({ status: "success" });
    } else {
      return res.status(400).send({ error: "Item doesnt exist in cart" });
    }
  }
});

module.exports = router;
