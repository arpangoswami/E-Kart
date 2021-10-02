const express = require("express");

const router = express.Router();

//middlewares
const {
  authenticationCheck,
  isAdmin,
} = require("../middlewares/authentication");

//controllers
const { uploadImage, removeImage } = require("../controllers/cloudinary");

router.post("/upload-images", authenticationCheck, isAdmin, uploadImage);
router.post("/remove-image", authenticationCheck, isAdmin, removeImage);

module.exports = router;
