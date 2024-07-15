const express = require("express");
const router = express.Router();

const imageController = require("../controllers/ImageController");

const AuthUtils = require("../utils/authUtils");

router.post("/", AuthUtils.authenticateToken, imageController.addImage);

module.exports = router;
