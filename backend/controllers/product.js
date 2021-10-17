const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title).toLowerCase();
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subCategories")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    return res.status(400).send("Product deletion failed");
  }
};

exports.readProduct = async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subCategories")
    .exec();
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const { title } = req.body;
  try {
    const newProd = req.body;
    newProd.slug = slugify(title).toLowerCase();
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      { ...newProd },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({
      err: "Update product failed",
    });
  }
};
//WITHOUT PAGINATION
// exports.listCountProductsSort = async (req, res) => {
//   try {
//     const { sort, order, count } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subCategories")
//       .sort([[sort, order]])
//       .limit(count)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     res.status(400).json({
//       err: "List Products Sort failed ",
//     });
//   }
// };

//WITH PAGINATION
exports.listCountProductsSort = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subCategories")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (err) {
    res.status(400).json({
      err: "List Products Sort failed ",
    });
  }
};

exports.getTotalCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json({ total });
};

exports.addRating = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const product = await Product.findById(req.params.productId).exec();
  const { star } = req.body;
  let existingRatingObject = product.ratings.find(
    (element) => element.postedBy.toString() === user._id.toString()
  );
  if (!existingRatingObject) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("NEW RATING: ", ratingAdded);
    res.json(ratingAdded);
  }
  const ratingUpdated = await Product.updateOne(
    {
      ratings: { $elemMatch: existingRatingObject },
    },
    { $set: { "ratings.$.star": star } },
    { new: true }
  ).exec();
  console.log("UPDATED RATING: ", ratingUpdated);
  res.json(ratingUpdated);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};
