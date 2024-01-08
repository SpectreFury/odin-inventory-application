require("dotenv").config();

const mongoose = require("mongoose");
const CategoryModel = require("./models/category");
const ItemModel = require("./models/item");

mongoose.connect(process.env.MONGODB_URI);

const items = [];
const categories = [];

const categoryCreate = async (index, name, description) => {
  const categoryDetails = {
    name,
    description,
  };

  const category = new CategoryModel(categoryDetails);
  await category.save();

  categories[index] = category;
  console.log(`Added category ${name}`);
};

const itemCreate = async (
  index,
  name,
  description,
  price,
  stocks,
  category
) => {
  const itemDetails = {
    name,
    description,
    price,
    stocks,
    category,
  };

  const item = new ItemModel(itemDetails);
  console.log(item);
  await item.save();

  items[index] = item;
  console.log(`Added Item ${name}`);
};

const populateDB = async () => {
  try {
    await Promise.all([
      categoryCreate(
        0,
        "Keyboards",
        "A device that is used to operate computers"
      ),
      categoryCreate(1, "Mouse", "A device which is used to operate the GUI"),
      categoryCreate(2, "CPU", "The brain of the computer"),
      categoryCreate(3, "GPU", "A device used to display graphics"),
      categoryCreate(4, "Storage", "It is used to store data on the PC"),
      categoryCreate(
        5,
        "Power Supply",
        "It is used to power all the components"
      ),
    ]);
    await itemCreate(
      0,
      "Intel 12900K",
      "A cpu that is really good at gaming",
      20000,
      10,
      categories[2]
    );
  } catch (error) {
    console.log("populateDB error", error);
  }
};

populateDB();

console.log("Database updated");
