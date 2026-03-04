import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-900">BoatID</span>
          </Link>

          <nav className="flex space-x-8">
            <Link to="/documents" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Documents
            </Link>
            <Link to="/service" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Service Log
            </Link>
            <Link to="/reminders" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Reminders
            </Link>
            <Link to="/costs" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Costs
            </Link>
          </nav>

          <button
            onClick={handleSignOut}
            className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};
