import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/tickets/${id}`);
        setTicket(response.data);
      } catch (err) {
        setError('Failed to fetch ticket details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Ticket Details</h1>
      <div className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-semibold">Subject: {ticket.subject}</h2>
        <p className="mt-2"><strong>Status:</strong> {ticket.status}</p>
        <p className="mt-2"><strong>Description:</strong> {ticket.description}</p>
        <h3 className="mt-4 font-semibold">Comments:</h3>
        <ul className="list-disc pl-5">
          {ticket.comments.map((comment, index) => (
            <li key={index} className="mt-1">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketDetails;