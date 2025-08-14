import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <h1 className="text-white text-2xl">Help Desk Ticketing System</h1>
        <div>
        {user ? (
          <>
            {/* Employees: Only show Create Ticket and Tickets */}
            {user.role === 'employee' ? (
              <>
                <Link to="/create-ticket" className="text-white mx-4">Create Ticket</Link>
                <Link to="/tickets" className="text-white mx-4">Tickets</Link>
              </>
            ) : (
              <>
                <Link to="/tickets" className="text-white mx-4">Tickets</Link>
                <Link to="/create-ticket" className="text-white mx-4">Create Ticket</Link>
                {/* <Link to="/dashboard" className="text-white mx-4">Dashboard</Link> */}
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;