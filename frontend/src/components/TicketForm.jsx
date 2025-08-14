import { useState,} from 'react';
import axiosInstance from '../axiosConfig';

const TicketForm = ({ ticket, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: ticket ? ticket.title : '',
    description: ticket ? ticket.description : '',
    name: ticket ? ticket.name : '',
    position: ticket ? ticket.position : '',
    email: ticket ? ticket.email : '',
    priority: ticket ? ticket.priority : 'urgent',
    status: ticket ? ticket.status : 'open',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (ticket) {
        response = await axiosInstance.put(`/api/tickets/${ticket.id}`, formData);
      } else {
        response = await axiosInstance.post('/api/tickets', formData);
      }
      console.log('Ticket API response:', response);
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('Ticket API error:', error);
      alert('Failed to submit the ticket. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">{ticket ? 'Update Ticket' : 'Create Ticket'}</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={formData.name} 
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        className="w-full mb-4 p-2 border rounded"
        required 
      />
      <input 
        type="text" 
        placeholder="Position" 
        value={formData.position} 
        onChange={(e) => setFormData({ ...formData, position: e.target.value })} 
        className="w-full mb-4 p-2 border rounded"
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
        className="w-full mb-4 p-2 border rounded"
        required 
      />
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
        value={formData.priority} 
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })} 
        className="w-full mb-4 p-2 border rounded"
        required>
          <option value="urgent">Urgent</option>
          <option value="important">Important</option>
          <option value="it-request">IT Request</option>
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {ticket ? 'Update Ticket' : 'Create Ticket'}
      </button>
    </form>
  );
};

export default TicketForm;