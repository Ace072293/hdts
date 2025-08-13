const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  priority: { type: String, enum: ['urgent', 'important', 'it-request'], required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'in_progress', 'closed'], default: 'open' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessment: { type: String },
    recommendations: [{ type: String }],
    targetDate: { type: Date },
    actionsTaken: { type: String },
    taskStatus: { type: String },
    completedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);