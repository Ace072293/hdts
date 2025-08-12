import { useState,} from 'react';
import axiosInstance from '../axiosConfig';

const TicketForm = ({ ticket, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: ticket ? ticket.title : '',
    description: ticket ? ticket.description : '',
    status: ticket ? ticket.status : 'Open',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ticket) {
        await axiosInstance.put(`/api/tickets/${ticket.id}`, formData);
      } else {
        await axiosInstance.post('/api/tickets', formData);
      }
      onSubmit();
    } catch (error) {
      alert('Failed to submit the ticket. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">{ticket ? 'Update Ticket' : 'Create Ticket'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Ticket Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Ticket Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {ticket ? 'Update Ticket' : 'Create Ticket'}
      </button>
    </form>
  );
};

export default TicketForm;