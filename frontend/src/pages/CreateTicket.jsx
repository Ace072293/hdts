import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketForm from '../components/TicketForm';
import axiosInstance from '../axiosConfig';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    name: '',
    position: '',
    email: '',
    priority: 'urgent', // default value
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await axiosInstance.post('/api/tickets', data);
      navigate('/tickets');
    } catch (error) {
      alert('Failed to create ticket. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Ticket</h1>
      <TicketForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTicket;