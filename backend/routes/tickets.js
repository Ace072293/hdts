const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket'); // Adjust path if needed

// GET /api/tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
router.post('/create', (req, res) => {
    res.send('Ticket created');
});

router.get('/list', (req, res) => {
    res.send('List of tickets');
});

router.get('/:id', (req, res) => {
    res.send(`Details for ticket ${req.params.id}`);
});

module.exports = router;