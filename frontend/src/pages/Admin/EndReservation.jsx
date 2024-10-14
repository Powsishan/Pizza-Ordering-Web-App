import React, { useState, useEffect } from 'react';
import { getReservation, updateReservationStatus } from '../../services/reservationService'; 
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const EndeReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [sortOrder, setSortOrder] = useState('accepted');

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

  const updateStatus = async (_id, newStatus) => { 
    const token = localStorage.getItem('token');
    try {
      await updateReservationStatus(_id, newStatus, token); 
      setReservations(
        reservations.map((reservation) =>
          reservation._id === _id 
            ? { ...reservation, Status: newStatus }
            : reservation
        )
      );
    } catch (error) {
      setError('Error updating reservation status');
    }
  };


  const handleSort = () => {
    const newOrder = sortOrder === 'accepted' ? 'pending' : sortOrder === 'pending' ? 'rejected' : 'accepted';
    setSortOrder(newOrder);
  };

  const today = new Date().toISOString().split('T')[0]; 


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };


  const filteredReservations = reservations
    .filter(reservation =>
      reservation.Status !== 'finished' &&
      reservation.ReservationDate <= today 
    )
    .sort((a, b) => {
      const order = sortOrder === 'accepted' ? ['accepted', 'pending', 'rejected'] :
        sortOrder === 'pending' ? ['pending', 'accepted', 'rejected'] :
          ['rejected', 'accepted', 'pending'];
      return order.indexOf(a.Status) - order.indexOf(b.Status);
    });

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <h2 className="text-3xl mb-4">Ended Reservations</h2>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Customer Name</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Reservation Date</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Reservation Time</th>

            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Number of People</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Contact Number</th>
            <th
              className="py-2 px-4 bg-gray-200 text-gray-600 font-bold cursor-pointer flex items-center"
              onClick={handleSort} 
            >
              Status
              {sortOrder === 'accepted' && <i className="fas fa-sort-up ml-2"></i>}
              {sortOrder === 'pending' && <i className="fas fa-sort ml-2"></i>}
              {sortOrder === 'rejected' && <i className="fas fa-sort-down ml-2"></i>}
            </th>

          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation.id} className="border-b">
              <td className="py-2 px-4 ">{reservation.CustomerName}</td>
              <td className="py-2 px-4 text-center">{formatDate(reservation.ReservationDate)}</td> 
              <td className="py-2 px-4 text-center">{reservation.ReservationTime}</td>

              <td className="py-2 px-4 text-center">{reservation.NumberOfPeople}</td>
              <td className="py-2 px-4 text-center">{reservation.ContactNumber}</td>
              <td className="py-2 px-4 text-center">
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
  );
};

export default EndeReservation;
