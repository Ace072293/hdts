import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [techSupports, setTechSupports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchTickets();
    fetchTechSupports();
    // eslint-disable-next-line
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/tickets');
      setTickets(response.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechSupports = async () => {
    // Fetch all tech support users
    const response = await axiosInstance.get('/api/users?role=tech_support');
    setTechSupports(response.data);
  };

  const handleAssign = async (ticketId, techSupportId) => {
    await axiosInstance.put(`/api/tickets/${ticketId}/assign`, { techSupportId });
    fetchTickets();
  };

  if (user.role !== 'administrator') return <div>Not authorized</div>;

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6 bg-white shadow-2xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">All Tickets</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Assign</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id} className="border-b">
                <td className="px-4 py-2">{ticket.title}</td>
                <td className="px-4 py-2">{ticket.status}</td>
                <td className="px-4 py-2">{ticket.assignedTo?.name || 'Unassigned'}</td>
                <td className="px-4 py-2">
                  <select
                    value={ticket.assignedTo || ''}
                    onChange={e => handleAssign(ticket._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="">Assign to...</option>
                    {techSupports.map(ts => (
                      <option key={ts._id} value={ts._id}>{ts.name}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTickets;