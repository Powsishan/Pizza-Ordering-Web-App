import axios from 'axios';

const API_URL = 'http://localhost:4001/piz';

// Get all pizzas (Public route)
export const getPizzas = async () => {
  try {
    const response = await axios.get(`${API_URL}/pizzas`);
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    throw error;
  }
};

// Add a pizza (Admin protected route)
export const addPizza = async (pizzaData) => {
  const token = localStorage.getItem('token'); // Get the token from local storage

  const formData = new FormData();
  formData.append('Image', pizzaData.Image); // Append the image file to FormData
  formData.append('Name', pizzaData.Name);
  formData.append('Description', pizzaData.Description);
  formData.append('Price', pizzaData.Price);

  // Log the formData content to check what is being sent
  console.log('FormData contents:');
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
      const response = await axios.post(`${API_URL}/addpizza`, formData, {
          headers: {
              'Authorization': `Bearer ${token}`, // Set the token in the Authorization header
              'Content-Type': 'multipart/form-data', // Set the content type for FormData
          },
      });
      return response.data;
  } catch (error) {
      throw error.response.data; 
  }
};

// Update a pizza (Admin protected route)
export const updatePizza = async (pizzaId, updatedData, token) => {
  const formData = new FormData();
  formData.append('Name', updatedData.Name);
  formData.append('Description', updatedData.Description);
  formData.append('Price', updatedData.Price);
  


  if (updatedData.Image instanceof File) { // Ensure it's a file
    formData.append('Image', updatedData.Image); // Append image if exists
}


  try {
      const response = await axios.put(`${API_URL}/updatepizza/${pizzaId}`, formData, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data', // Set the content type for FormData
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error updating pizza:', error);
      throw error;
  }
};


// Delete a pizza (Admin protected route)
export const deletePizza = async (pizzaId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/delpizza/${pizzaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting pizza:', error);
    throw error;
  }
};
