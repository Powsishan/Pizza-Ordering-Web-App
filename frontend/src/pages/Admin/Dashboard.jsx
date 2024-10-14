import React, { useState, useEffect } from 'react';
import { usePizza } from '../../context/PizzaContext';
import { getReservation } from '../../services/reservationService';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { state: { pizzas }, fetchPizzas } = usePizza();

  const fetchReservations = async () => {
    const token = localStorage.getItem('token');
    try {
      const data = await getReservation({}, token);
      setReservations(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching reservations');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  const today = new Date().toISOString().split('T')[0];

  const todaysReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.ReservationDate).toISOString().split('T')[0];
    return reservationDate === today;
  });

  const upcomingReservationsCount = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.ReservationDate).toISOString().split('T')[0];
    return reservationDate >= today; 
  }).length;
  
  const rejectedReservationsCount = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.ReservationDate).toISOString().split('T')[0];
    return reservationDate >= today && reservation.Status === 'rejected'; 
  }).length;
  
  const pendingReservations = upcomingReservationsCount - rejectedReservationsCount;
  
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* Summary Boxes */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-xl font-semibold">Total Pizza Menu</h3>
          <p className="text-4xl">{Array.isArray(pizzas) ? pizzas.length : 0}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-xl font-semibold">Upcomming & Pending Reservations</h3>
          <p className="text-4xl">{pendingReservations}</p>
        </div>
      </div>

      {/* Today's Reservations Table */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Today's Reservations</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">Contact Number</th>
              <th className="border-b p-2">Date</th>
              <th className="border-b p-2">Time</th>
              <th className="border-b p-2 text-center">Number of Guests</th>
              <th className="border-b p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {todaysReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td className="border-b p-2">{reservation.CustomerName}</td>
                <td className="border-b p-2">{reservation.ContactNumber}</td>
                <td className="border-b p-2">{new Date(reservation.ReservationDate).toISOString().split('T')[0]}</td> {/* Format date */}
                <td className="border-b p-2">{reservation.ReservationTime}</td>
                <td className="border-b p-2 text-center">{reservation.NumberOfPeople}</td>
                <td className="border-b ">
                  <span className={`inline-block px-2 py-1 rounded-full ${reservation.Status === 'rejected' ? 'bg-red-100 text-red-700' :
                    reservation.Status === 'pending' ? 'bg-gray-100 text-gray-700' :
                      reservation.Status === 'accepted' ? 'bg-green-100 text-green-700' : ''
                    }`}>
                    {reservation.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
