const express = require("express");
const router = express.Router();
const itemModel = require("../models/item");
const categoryModel = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const items = await itemModel.find({}).populate("category");
    res.render("items", { items });
  } catch (error) {
    console.log(error);
  }
});

router.get("/add", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.render("itemsForm", { categories });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, stocks, category } = req.body;
    await itemModel.create({
      name,
      description,
      price,
      stocks,
      category,
    });
    res.redirect("/item");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
