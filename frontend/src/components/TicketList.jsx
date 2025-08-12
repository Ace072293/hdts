import React from 'react';

const TicketList = ({ tickets }) => {
  return (
    <div className="ticket-list">
      <h2 className="text-xl font-bold mb-4">Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id} className="border p-4 mb-2 rounded">
            <h3 className="font-semibold">{ticket.title}</h3>
            <p>Status: {ticket.status}</p>
            <p>Created by: {ticket.createdBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;