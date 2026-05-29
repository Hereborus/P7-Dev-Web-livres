require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const http = require("http");

const server = http.createServer((req, res) => {
    res.end("rep");
});
server.listen(process.env.PORT || 3000);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connexion à MongoDB réussie !");
        app.listen(process.env.PORT || 4000, () => {
            console.log(
                `Serveur lancé sur le port ${process.env.PORT || 4000}`,
            );
        });
    })
    .catch((error) => console.log("Connexion à MongoDB échouée !", error));
