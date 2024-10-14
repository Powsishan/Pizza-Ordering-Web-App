import axios from 'axios';


const API_URL = 'http://localhost:4001/piz';

// Add a new reservation 
export const addReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_URL}/makereservation`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error making reservation:', error);
    throw error;
  }
};


// Get all  reservation (Admin protected route)
export const getReservation = async (reservationData, token) => {
  try {
    const response = await axios.post(`${API_URL}/reservation`, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation:', error);
    throw error;
  }
};

// Update reservation (User protected route)
export const updateReservation = async (reservationId, updatedData, token) => {
  try {
    const response = await axios.put(`${API_URL}/updatereservations/${reservationId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
};

// Update reservation status (Admin protected route)
export const updateReservationStatus = async (reservationId, status, token) => {
  try {
    const response = await axios.put(`${API_URL}/updatereservations/status/${reservationId}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating reservation status:', error);
    throw error;
  }
};
