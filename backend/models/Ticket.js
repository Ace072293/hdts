const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'open' },
});

module.exports = mongoose.model('Ticket', ticketSchema);