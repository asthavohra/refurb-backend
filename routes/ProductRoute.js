const express = require("express");
const Firebase = require("../service/FirebaseService");

const router = express.Router();

router.get("/products", async (req, res) => {
  const allProducts = await Firebase.getDB().collection("products").get();
  let products = [];
  try {
    console.log("*************GET ALL PRODUCT*************");
    allProducts.forEach((product) => {
      let tempProduct = product.data();
      delete tempProduct["search"];
      tempProduct["id"] = product.id;
      products.push(tempProduct);
    });

    res.status(200).json(products);
  } catch (e) {
    res
      .status(500)
      .json({ error: "Unable to fetch all products, please try again" });
  }
});

router.get("/products/search", async (req, res) => {
  const name = req.query.name;
  if (name === "" || name === null) {
    return res.status(400).send({ error: "search term cannot be empty" });
  }
  console.log("*************SEARCH PRODUCT*************", name);
  const searchTerm = name.split(" ");
  const searchedProducts = await db
    .collection("products")
    .where("search", "array-contains-any", searchTerm)
    .get();
  let products = [];
  try {
    await searchedProducts.forEach((product) => {
      let tempProduct = product.data();
      delete tempProduct["search"];
      tempProduct["id"] = product.id;
      products.push(tempProduct);
    });
    res.status(200).json(products);
  } catch (e) {}
});
module.exports = router;
