const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'open' },
  // Add other fields as needed
});

module.exports = mongoose.model('Ticket', ticketSchema);