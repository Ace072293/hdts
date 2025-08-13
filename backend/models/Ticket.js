const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  priority: { type: String, enum: ['urgent', 'important', 'it-request'], required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);