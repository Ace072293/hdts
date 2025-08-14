import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import TicketList from '../components/TicketList';
import { useAuth } from '../context/AuthContext';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/tickets');
      setTickets(response.data);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/tickets/${id}`);
      setTickets(tickets.filter(ticket => ticket._id !== id));
    } catch (err) {
      setError('Failed to delete ticket.');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axiosInstance.put(`/api/tickets/${id}`, { status });
      setTickets(tickets.map(ticket => ticket._id === id ? response.data : ticket));
    } catch (err) {
      setError('Failed to update ticket status.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6 bg-white shadow-2xl rounded-2xl">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700 tracking-tight drop-shadow">
        {user && (user.role === 'administrator' || user.role === 'tech_support') ? 'Lodged Tickets' : 'My Tickets'}
      </h1>
      {loading && <div className="text-center text-lg text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      <TicketList
        tickets={tickets}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        showStatusControl={user?.role !== 'employee'}
      />
    </div>
  );
};

export default Tickets;