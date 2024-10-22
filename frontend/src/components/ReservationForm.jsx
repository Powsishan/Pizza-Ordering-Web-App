import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { addReservation } from '../services/reservationService'; 
import '../assets/styles/common.css';

const Reservation = () => {
    const [ReservationDate, setDate] = useState('');
    const [ReservationTime, setTime] = useState('');
    const [NumberOfPeople, setGuests] = useState('');
    const [ContactNumber, setContactNumber] = useState('');
    const [ContactName, setContactName] = useState('');
    const [Message, setMessage] = useState('');

    const [errors, setErrors] = useState({}); 

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
  
      const newErrors = {};
  
      // Get current date and time
      const currentDate = new Date();
      const selectedDate = new Date(ReservationDate);
      const currentTime = currentDate.toTimeString().slice(0, 5); // HH:mm format
      const selectedTime = ReservationTime;
  
      // Validate date and time
      if (!ReservationDate) {

          newErrors.ReservationDate = 'Reservation Date is required.';
      } else if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
          newErrors.ReservationDate = 'Reservation Date cannot be in the past.';
      }
  
      if (!ReservationTime) {
          newErrors.ReservationTime = 'Reservation Time is required.';
      } else if (selectedDate.toDateString() === currentDate.toDateString() && selectedTime < currentTime) {
          newErrors.ReservationTime = 'For today, the Reservation Time must be in the future.';
      }
  
      if (!ContactName.trim()) newErrors.ContactName = 'Contact Name is required.';
      if (!ContactNumber.match(/^\d{10}$/)) newErrors.ContactNumber = 'Contact Number must be 10 digits.';
      if (!NumberOfPeople || NumberOfPeople <= 0) newErrors.NumberOfPeople = 'Number of People must be greater than 0.';
  
      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
      }
  
      const reservationData = {
          CustomerName: ContactName,
          ContactNumber,
          ReservationDate,
          ReservationTime,
          NumberOfPeople: parseInt(NumberOfPeople, 10),
          Message,
      };
  
      console.log('Reservation Data:', reservationData);
  
      try {
          const response = await addReservation(reservationData);
          console.log('Reservation successfully made:', response);
  
          toast.success('Reservation successfully made!');
  
          setDate('');
          setTime('');
          setGuests('');
          setContactName('');
          setContactNumber('');
          setMessage('');
      } catch (error) {
          console.error('Error making reservation:', error);
  
          toast.error('There was an error making the reservation. Please try again.');
      }
  };
  

    return (
        <>
           
            <ToastContainer />

            <form onSubmit={handleSubmit}>
                 <div className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        id="contactName"
                        value={ContactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className={`mt-1 block w-full h-12 p-2 border ${errors.ContactName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500`}
                        required
                        placeholder="Contact Name"
                    />
                    {errors.ContactName && <p className="text-red-500 text-xs">{errors.ContactName}</p>}
                    <input
                        type="tel"
                        id="contactNumber"
                        value={ContactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className={`mt-1 block w-full h-12 p-2 border ${errors.ContactNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500`}
                        required
                        placeholder="Contact Number"
                    />
                    {errors.ContactNumber && <p className="text-red-500 text-xs">{errors.ContactNumber}</p>}
                </div>

                <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                        <input
                            type="date"
                            id="date"
                            value={ReservationDate}
                            onChange={(e) => setDate(e.target.value)}
                            className={`mt-1 block w-full h-12 p-2 border ${errors.ReservationDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500`}
                            required
                        />
                        {errors.ReservationDate && <p className="text-red-500 text-xs">{errors.ReservationDate}</p>}
                    </div>
                    <div className="flex-1">
                        <input
                            type="time"
                            id="time"
                            value={ReservationTime}
                            onChange={(e) => setTime(e.target.value)}
                            className={`mt-1 block w-full h-12 p-2 border ${errors.ReservationTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500`}
                            required
                        />
                        {errors.ReservationTime && <p className="text-red-500 text-xs">{errors.ReservationTime}</p>}
                    </div>
                    <div className="flex-1">
                        <input
                            type="number"
                            id="guests"
                            value={NumberOfPeople}
                            onChange={(e) => setGuests(e.target.value)}
                            className={`mt-1 block w-full h-12 p-2 border ${errors.NumberOfPeople ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500`}
                            required
                            min="1"
                            placeholder="Total Guests"
                        />
                        {errors.NumberOfPeople && <p className="text-red-500 text-xs">{errors.NumberOfPeople}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <textarea
                        id="message"
                        value={Message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                        placeholder="Write Message"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-[#e90028] flex items-center justify-center space-x-2 text-white px-10 md:px-4 py-5 rounded-sm font-semibold hover:bg-red-700"
                >
                    <span>Make A Reservation</span>
                    <FaArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
            </form>
        </>
    );
};

export default Reservation;
