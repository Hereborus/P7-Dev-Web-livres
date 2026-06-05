const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const booksRoute = require("./routes/book.js");
const userRouter = require("./routes/user.js");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(
        "mongodb+srv://baumardalexis989_db_user:dAxHTMq6PxuAL2V7@cluster0.vgiem7d.mongodb.net/grimoire",
    )
    .then(() => console.log("Connecté à MongoDB Atlas"))
    .catch((err) => console.error("Erreur de connexion MongoDB :", err));

app.use("/api/books", booksRoute);
app.use("/api/auth", userRouter);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
