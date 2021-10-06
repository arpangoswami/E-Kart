const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 220,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      maxlength: 220,
    },
    description: {
      type: String,
      unique: true,
      maxlength: 2000,
      required: true,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subCategories: [
      {
        type: ObjectId,
        ref: "SubCategory",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: [
        "Apple",
        "Samsung",
        "Microsoft",
        "Lenovo",
        "ASUS",
        "HP",
        "Panasonic",
        "Acer",
        "Dell",
        "MSI",
      ],
    },
    // ratings: [
    //     {
    //         star: Number,
    //         postedBy: {
    //             type: ObjectId,
    //             ref: "User"
    //         }
    //     }
    // ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
