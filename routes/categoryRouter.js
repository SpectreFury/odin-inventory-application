const express = require("express");
const router = express.Router();
const categoryModel = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.render("categories", { categories });
  } catch (error) {
    console.log(error);
  }
});

router.get("/add", (req, res) => {
  res.render("categoriesForm");
});

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    await categoryModel.create({ name, description });
    res.redirect("/category");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
