const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const auth = require("auth");

router.get("/", bookController.getAllBooks);
router.post("/", auth, bookController.createBook);
router.get("/:id", bookController.getBookById);
router.put("/:id", auth, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
