import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import TicketList from '../components/TicketList';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/api/tickets');
        setTickets(response.data);
      } catch (error) {
        alert('Failed to fetch tickets. Please try again later.');
      }
    };

    fetchTickets();
  }, []);

  const handleTicketClick = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <TicketList tickets={tickets} onTicketClick={handleTicketClick} />
    </div>
  );
};

export default Dashboard;