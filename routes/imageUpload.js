const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.post('/', upload.single('image'), imageController.uploadImage);
module.exports = router;

