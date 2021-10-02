const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const slugify = require("slugify");
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name: name,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(category);
  } catch (err) {
    res.status(400).json({
      error: `Create category failed backend ${err}`,
    });
  }
};

exports.readCategory = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name).toLowerCase() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedCategory);
  } catch (err) {
    res.status(400).send("Delete Category failed");
  }
};

exports.getAllCategories = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.getAllChildSubCategories = (req, res) => {
  SubCategory.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) {
      console.log("CHILD SUB ERR: ", err);
    }
    res.json(subs);
  });
};
