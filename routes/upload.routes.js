const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { uploadImage } = require("../controllers/upload.controller");

router.post("/", auth, uploadImage);

module.exports = router;
