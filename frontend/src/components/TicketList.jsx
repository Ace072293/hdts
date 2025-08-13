import React from 'react';
import { useAuth } from '../context/AuthContext';

const statusLabels = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
};

const priorityLabels = {
  urgent: 'Urgent',
  important: 'Important',
  'it-request': 'IT Request',
};

const TicketList = ({ tickets, onDelete }) => {
  const { user } = useAuth();

  if (!tickets.length) {
    return <div className="text-gray-500">No tickets found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Created By</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, idx) => (
            <tr key={ticket._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2 font-semibold">{ticket.title}</td>
              <td className="px-4 py-2">{statusLabels[ticket.status] || ticket.status}</td>
              <td className="px-4 py-2">{priorityLabels[ticket.priority] || ticket.priority}</td>
              <td className="px-4 py-2">{ticket.name || ticket.createdBy}</td>
              <td className="px-4 py-2">
                {user && (user.role === 'administrator' || user.role === 'tech_support' || ticket.createdBy === user.id) && (
                  <button
                    onClick={() => onDelete(ticket._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;