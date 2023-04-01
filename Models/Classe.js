const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema({
  classeName: { type: String, required: true },
  level_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
    required: true,
  },

  created_at: { type: Date, default: Date.now },
});

const Classe = mongoose.model("Classe", classeSchema);

module.exports = Classe;
