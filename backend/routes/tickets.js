const express = require('express');
const router = express.Router();

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