const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Configuration de CORS pour accepter les requêtes de tous les domaines
const corsOptions = {
  origin: "*",
  credentials: true, // autoriser l'utilisation des cookies entre domaines (Access-Control-Allow-Credentials)
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static("public"));

// Connexion à la base de données MongoDB
const url = "mongodb://localhost:27017/pfe";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Analyse les corps de requête JSON
app.use(express.json());

// Définit les routes de l'application
require("./routes")(app);

// Lance l'application sur le port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
