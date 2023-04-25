const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  calendarId: { type: mongoose.Types.ObjectId, required: false }
});

module.exports = mongoose.model("events", eventSchema);
