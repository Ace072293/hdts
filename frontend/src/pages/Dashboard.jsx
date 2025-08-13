import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const limit = 6; // Number of tickets per page

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get(`/api/tickets?page=${page}&limit=${limit}`);
        setTickets(response.data?.tickets || []); // Ensure it's always an array
        setTotalPages(response.data?.totalPages || 1);
      } catch (error) {
        alert('Failed to fetch tickets. Please try again later.');
        setTickets([]); // Fallback to empty array
      }
    };
  
    fetchTickets();
  }, [page]);  

  const handleTicketClick = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            onClick={() => handleTicketClick(ticket._id)}
            className="cursor-pointer bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{ticket.title}</h2>
            <p className="text-gray-600 mb-4">{ticket.description}</p>
            <span className={`inline-block px-3 py-1 text-sm rounded-full ${
              ticket.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
            }`}>
              {ticket.status}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700 font-medium">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
