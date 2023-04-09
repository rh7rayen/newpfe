const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 5000,
  },
  photo: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true, // Make sure that each email is unique
  },
  place: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  price: {
    type: Number,
    default: null,
  },
  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
