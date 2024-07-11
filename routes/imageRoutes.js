const express = require("express");
const router = express.Router();

const imageController = require("../controllers/ImageController");

router.post("/", AuthUtils.authenticateToken, imageController.addImage);

module.exports = router;
