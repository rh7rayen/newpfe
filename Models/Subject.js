const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  id_classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: true,
  },

  created_at: { type: Date, default: Date.now },
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
