const Book = require("../models/Book");
const fs = require("fs");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const bookParse = JSON.parse(req.body.book);
        delete bookParse._id;
        delete bookParse.userId;
        const book = new Book({
            ...bookParse,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        });
        await book.save();
        res.status(201).json({ message: "livre cree" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const bookParse = req.file
            ? {
                  ...JSON.parse(req.body.book),
                  imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
              }
            : { ...req.body };

        delete bookParse.userId;

        const book = await Book.findById(req.params.id);
        if (book.userId.toString() !== req.auth.userId) {
            return res.status(401).json({ message: "Non autorisé" });
        }

        await Book.findByIdAndUpdate(req.params.id, {
            ...bookParse,
            _id: req.params.id,
        });
        res.status(200).json({ message: "livre modifié" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getBestRating = async (req, res) => {
    try {
        const books = await Book.find().sort({ averageRating: -1 }).limit(3);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.rateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book.ratings.find((rating) => rating.userId === req.auth.userId)) {
            return res.status(400).json({ message: "Déjà noté" });
        }
        book.ratings.push({ userId: req.auth.userId, grade: req.body.rating });
        book.averageRating =
            book.ratings.reduce((sum, rating) => sum + rating.grade, 0) /
            book.ratings.length;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {
            new: true,
        });
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book.userId.toString() !== req.auth.userId) {
            res.status(401).json({ message: "Non autorisé" });
        } else {
            const filename = book.imageUrl.split("/images/")[1];
            await fs.promises.unlink(`images/${filename}`);
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "livre suprimer" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
