import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import TicketList from '../components/TicketList';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/api/tickets');
        setTickets(response.data);
      } catch (err) {
        setError('Failed to fetch tickets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Tickets</h1>
      <TicketList tickets={tickets} />
    </div>
  );
};

export default Tickets;