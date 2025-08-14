import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const RECOMMENDATIONS = [
  'hardware repair',
  'hardware installation',
  'network connection',
  'preventive maintenance',
  'software development',
  'software maintenance',
  'software installation',
  'others'
];

const TicketAdminDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [assessment, setAssessment] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [targetDate, setTargetDate] = useState('');
  const [actionsTaken, setActionsTaken] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [completedAt, setCompletedAt] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      const res = await axiosInstance.get(`/api/tickets/${id}`);
      setTicket(res.data);
    };
    fetchTicket();
  }, [id]);

  const handleRecommendationChange = (rec) => {
    setRecommendations(prev =>
      prev.includes(rec)
        ? prev.filter(r => r !== rec)
        : [...prev, rec]
    );
  };

  const handleComplete = async () => {
    const now = new Date().toISOString();
    setCompletedAt(now);
    await axiosInstance.put(`/api/tickets/${id}`, {
      assessment,
      recommendations,
      targetDate,
      actionsTaken,
      taskStatus,
      completedAt: now,
      status: 'closed'
    });
    navigate('/tickets');
  };

  if (!ticket) return <div>Loading...</div>;

  // Only tech_support and admin can access
  if (!['tech_support', 'administrator'].includes(user.role)) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Ticket Details</h1>
      <div className="mb-4">
        <strong>Title:</strong> {ticket.title}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {ticket.description}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Assessment</label>
        <textarea
          className="w-full border rounded p-2"
          value={assessment}
          onChange={e => setAssessment(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Recommendations</label>
        <div className="flex flex-wrap gap-4">
          {RECOMMENDATIONS.map(rec => (
            <label key={rec} className="flex items-center">
              <input
                type="checkbox"
                checked={recommendations.includes(rec)}
                onChange={() => handleRecommendationChange(rec)}
                className="mr-2"
              />
              {rec}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Target Date of Completion</label>
        <input
          type="date"
          className="border rounded p-2"
          value={targetDate}
          onChange={e => setTargetDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Actions Taken</label>
        <textarea
          className="w-full border rounded p-2"
          value={actionsTaken}
          onChange={e => setActionsTaken(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Task Status</label>
        <label className="mr-4">
          <input
            type="radio"
            name="taskStatus"
            value="completed"
            checked={taskStatus === 'completed'}
            onChange={() => setTaskStatus('completed')}
            className="mr-2"
          />
          Completed/Functional/Working
        </label>
        <label>
          <input
            type="radio"
            name="taskStatus"
            value="not_completed"
            checked={taskStatus === 'not_completed'}
            onChange={() => setTaskStatus('not_completed')}
            className="mr-2"
          />
          Task Cannot Be Completed
        </label>
      </div>
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-800"
        onClick={handleComplete}
      >
        Complete
      </button>
      {completedAt && (
        <div className="mt-4 text-green-700">
          Completed at: {new Date(completedAt).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default TicketAdminDetails;