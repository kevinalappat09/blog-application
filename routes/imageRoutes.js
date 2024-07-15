const express = require("express");
const router = express.Router();
const multer  = require("multer");
const path = require("path");

const imageController = require("../controllers/ImageController");
const AuthUtils = require("../utils/authUtils");

const upload = multer({dest:"./temp"});

router.post("/", AuthUtils.authenticateToken, upload.single("image"), imageController.addImage);

module.exports = router;
