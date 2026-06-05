const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", bookController.getAllBooks);
router.get("/bestrating", bookController.getBestRating);
router.post("/", auth, multer, bookController.createBook);
router.get("/:id", bookController.getBookById);
router.put("/:id", auth, multer, bookController.updateBook);
router.post("/:id/rating", auth, bookController.rateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
