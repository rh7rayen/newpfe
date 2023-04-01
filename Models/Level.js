// Classe Schema
const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  levelName: { type: String, required: true },
  year: { type: String, required: true },

  
});

const Level = mongoose.model("level", levelSchema);

module.exports = Level;
