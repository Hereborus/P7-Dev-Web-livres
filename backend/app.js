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

module.exports = app;
