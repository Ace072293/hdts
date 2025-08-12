const Ticket = require('../models/Ticket');

exports.getTickets = async (req, res) => {

const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 6;

  try {
    const tickets = await Ticket.find();
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Ticket.countDocuments();

    res.json({
        tickets,
        total,
        page,
        totalPages: Math.ceil(total / limit),
     });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create ticket' });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update ticket' });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete ticket' });
  }
};
