const SubCategory = require("../models/subCategory");
const Product = require("../models/product");
const slugify = require("slugify");
exports.createSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(
      await new SubCategory({
        name: name,
        parent: parent,
        slug: slugify(name).toLowerCase(),
      }).save()
    );
  } catch (err) {
    res.status(400).json({
      error: `Create SubCategory failed backend ${err}`,
    });
  }
};

exports.readSubCategory = async (req, res) => {
  let subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
  let products = await Product.find({ subCategories: subCategory })
    .populate("subCategories")
    .exec();
  res.json({ subCategory, products });
};

exports.updateSubCategory = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name).toLowerCase() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    let deletedCategory = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedCategory);
  } catch (err) {
    res.status(400).send("Delete Category failed");
  }
};

exports.getAllSubCategories = async (req, res) =>
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());
