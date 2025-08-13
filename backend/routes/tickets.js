const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { authenticateToken, authorizeRoles } = require('../middleware/authmiddle');

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  
      // Allow admins and tech_support to delete any ticket
      if (['administrator', 'tech_support'].includes(req.user.role)) {
        await ticket.deleteOne();
        return res.json({ message: 'Ticket deleted' });
      }
  
      // Allow employees to delete only their own tickets
      if (req.user.role === 'employee' && ticket.createdBy.toString() === req.user.id) {
        await ticket.deleteOne();
        return res.json({ message: 'Ticket deleted' });
      }
  
      return res.status(403).json({ error: 'Not authorized to delete this ticket' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete ticket' });
    }
  });

// All authenticated users can create tickets
router.post('/', authenticateToken, async (req, res) => {
  try {
    const ticket = new Ticket({
        ...req.body,
        createdBy: req.user.id, // Set creator from JWT
      });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create ticket', details: err.message });
  }
});

// Get all tickets (filtered for employees)
router.get('/', authenticateToken, async (req, res) => {
    try {
      let query = {};
      if (req.user.role === 'employee') {
        query.createdBy = req.user.id;
      }
      const tickets = await Ticket.find(query);
      res.json(tickets);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get a single ticket by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;