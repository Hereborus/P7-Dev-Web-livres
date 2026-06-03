const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        res.status(201).json({ message: "livre cree" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, { ...req.body });
        res.status(200).json({ message: "livre modifier" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "livre suprimer" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
