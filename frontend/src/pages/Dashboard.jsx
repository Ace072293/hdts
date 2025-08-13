import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const statusLabels = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
};

const statusColors = {
  open: 'bg-green-100 text-green-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-gray-200 text-gray-700',
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/api/tickets');
        setTickets(response.data?.tickets || response.data || []);
      } catch (error) {
        alert('Failed to fetch tickets. Please try again later.');
        setTickets([]);
      }
    };
    fetchTickets();
  }, []);

  // Pie chart data
  const getStatusCounts = (tickets) => {
    const counts = { open: 0, in_progress: 0, closed: 0 };
    tickets.forEach(ticket => {
      if (counts[ticket.status] !== undefined) counts[ticket.status]++;
    });
    return counts;
  };

  const statusCounts = getStatusCounts(tickets);
  const pieData = {
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [
      {
        data: [statusCounts.open, statusCounts.in_progress, statusCounts.closed],
        backgroundColor: ['#34d399', '#fbbf24', '#a1a1aa'],
        borderWidth: 1,
      },
    ],
  };

  // Sort tickets newest to oldest
  const sortedTickets = [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Dashboard</h1>

      {/* Pie Chart */}
      <div className="max-w-xs mx-auto mb-10">
        <Pie data={pieData} />
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-green-600">Open</span>
          <span className="text-yellow-600">In Progress</span>
          <span className="text-gray-600">Closed</span>
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Recent Tickets</h2>
        <ul>
          {sortedTickets.length === 0 && (
            <li className="text-gray-500">No tickets found.</li>
          )}
          {sortedTickets.map(ticket => (
            <li key={ticket._id} className="flex items-center justify-between border-b last:border-b-0 py-3">
              <div>
                <button
                  className="font-medium text-indigo-700 hover:underline text-left"
                  onClick={() => navigate(`/tickets/${ticket._id}`)}
                  style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                >
                  {typeof ticket.title === 'string' ? ticket.title : '[Invalid Title]'}
                </button>
                <div className="text-gray-500 text-sm">
                  {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : ''}
                </div>
              </div>
              <span className={`ml-4 px-3 py-1 text-sm rounded-full ${statusColors[ticket.status] || 'bg-gray-200 text-gray-700'}`}>
                {statusLabels[ticket.status] || (typeof ticket.status === 'string' ? ticket.status : '[Invalid Status]')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;