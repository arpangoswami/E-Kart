const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true,
    },
    role: {
        type: String,
        default: "subscriber",
    },
    //cart: [{type: ObjectId, ref: "Product"}],
    //wishlist: [{type: ObjectId, ref: "Product"}],
    address: String,
},{timestamps: true});

module.exports = mongoose.model("User",userSchema);