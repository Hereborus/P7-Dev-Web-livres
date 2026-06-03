const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const fs = require("fs");
const path = require("path");

app.get("/api/books", (req, res) => {
    const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../public/data/data.json")),
    );
    const books = data.map(({ id, ...rest }) => ({ _id: id, ...rest }));
    res.status(200).json(books);
});

app.use(express.json());

app.post("/api/books", (req, res) => {
    const filePath = path.join(__dirname, "../public/data/data.json");
    const data = JSON.parse(fs.readFileSync(filePath));
    const newBook = {
        id: String(Date.now()),
        ...req.body,
    };
    data.push(newBook);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json({ ...newBook, _id: newBook.id });
});
module.exports = app;
