import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaPizzaSlice, FaCalendarAlt, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './Dashboard';
import ManagePizza from './ManagePizza';
import ManageReservation from './ManageReservation';
import EndReservation from './EndReservation';
import { usePizza } from '../../context/PizzaContext';
import SearchModal from '../../components/SearchModel'; 


const AdminPanel = () => {
  const { fetchPizzas } = usePizza();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    const message = localStorage.getItem('loginMessage');
    
    if (message) {

      toast.success(message);
      localStorage.removeItem('loginMessage'); 
    }
    
    if (!localStorage.getItem('token')) {
      navigate('/login'); 
    }
  }, [navigate]);

  useEffect(() => {
    fetchPizzas();
}, [fetchPizzas]);


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); 
    toast.info('Logged out successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-semibold">Admin Panel</div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    
                    <FaSearch onClick={() => setSearchModalOpen(true)}   className="text-2xl hover:text-gray-300  absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded flex items-center space-x-2"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/5 bg-gray-800 text-white flex flex-col py-6 space-y-6">
          <button
            className={`w-full flex items-center space-x-2 px-4 py-3 hover:bg-red-500 ${activeSection === 'dashboard' ? 'bg-red-500' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <FaTachometerAlt className="text-lg" />
            <span>Dashboard</span>
          </button>

          <button
            className={`w-full flex items-center space-x-2 px-4 py-3 hover:bg-red-500 ${activeSection === 'pizza' ? 'bg-red-500' : ''}`}
            onClick={() => setActiveSection('pizza')}
          >
            <FaPizzaSlice className="text-lg" />
            <span>Manage Pizza</span>
          </button>

          <button
            className={`w-full flex items-center space-x-2 px-4 py-3 hover:bg-red-500 ${activeSection === 'reservations' ? 'bg-red-500' : ''}`}
            onClick={() => setActiveSection('reservations')}
          >
            <FaCalendarAlt className="text-lg" />
            <span>Manage Reservations</span>
          </button>
          <button
            className={`w-full flex items-center space-x-2 px-4 py-3 hover:bg-red-500 ${activeSection === 'endreservations' ? 'bg-red-500' : ''}`}
            onClick={() => setActiveSection('endreservations')}
          >
            <FaCalendarAlt className="text-lg" />
            <span>End Reservations</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="w-full p-10 bg-gray-100">
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'pizza' && <ManagePizza />}
          {activeSection === 'reservations' && <ManageReservation />}
          {activeSection === 'endreservations' && <EndReservation />}

        </main>
      </div>
      <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setSearchModalOpen(false)}
            />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default AdminPanel;
