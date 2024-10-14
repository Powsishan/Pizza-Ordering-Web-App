import { usePizza } from '../../context/PizzaContext';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { addPizza, updatePizza, deletePizza } from '../../services/pizzaService';

const ManagePizza = () => {
    const { state, fetchPizzas } = usePizza();
    const { pizzas, loading, error } = state;

    const [newPizza, setNewPizza] = useState({ Name: '', Price: '', Description: '', Image: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPizzaId, setEditingPizzaId] = useState(null);


    useEffect(() => {
        fetchPizzas();
    }, [fetchPizzas]);

    const openModal = (pizza = null) => {
        if (pizza) {
            setNewPizza({ Name: pizza.Name, Price: pizza.Price, Description: pizza.Description, Image: pizza.Image });
            setEditingPizzaId(pizza._id);
        } else {
            setNewPizza({ Name: '', Price: '', Description: '', Image: '' });
            setEditingPizzaId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    if (loading) return <Loading />;
    if (error) return <Error />;

    const token = localStorage.getItem('token'); 


    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e90028',
            cancelButtonColor: '#535361',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });



        if (result.isConfirmed) {
            try {
                await deletePizza(id, token);
                toast.success('Pizza deleted successfully!');
    
                setTimeout(() => {
                    fetchPizzas();
                }, 1000); 
            } catch (error) {
                console.error('Error deleting pizza:', error);
                toast.error('Failed to delete pizza.');
            }
        } else {
            toast.info('Pizza deletion canceled.');
        }
    };

    const handleSubmit = async () => {
        const validationErrors = validatePizza(newPizza);
        if (validationErrors) {
            validationErrors.forEach((error) => {
                toast.error(error);
            });
            return;
        }

        try {
            if (editingPizzaId) {
                console.log('Payload to update:', newPizza);

                await updatePizza(editingPizzaId, newPizza, token);

                toast.success('Pizza updated successfully!');
            } else {

                await addPizza(newPizza);
                toast.success('Pizza added successfully!');

                console.log('succes ')
            }
           
            closeModal();

            setTimeout(() => {
                fetchPizzas(); 
              }, 1000);
        } catch (error) {
            toast.error('Failed to save pizza.');
        }
    };


    const validatePizza = (pizza) => {
        const errors = [];
        if (!pizza.Name || pizza.Name.length < 3 || pizza.Name.length > 100) {
            errors.push("Name must be between 3 and 100 characters.");
        }
        if (!pizza.Description || pizza.Description.length < 10 || pizza.Description.length > 500) {
            errors.push("Description must be between 10 and 500 characters.");
        }
        if (typeof pizza.Price !== 'number' || pizza.Price < 0) {

            errors.push("Price must be a positive number.");
        }
        return errors.length > 0 ? errors : null;
    };

    return (
        <div className="p-4">
            <ToastContainer /> 
            <h2 className="text-3xl font-semibold mb-4">Manage Pizza</h2>

            <div className="flex justify-end mb-6">
                <button onClick={() => openModal()} className="bg-[#e90028] hover:bg-red-700 text-white py-2 px-4 rounded">
                    Add New Pizza
                </button>
            </div>

            {/* Pizza Table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-2 px-4 border-b">Pizza Name</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Image</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pizzas.map((pizza) => (
                                <tr key={pizza.id} className="border-b">
                                    <td className="py-2 px-4">{pizza.Name}</td>
                                    <td className="py-2 px-4">${pizza.Price}</td>
                                    <td className="py-2 px-4">{pizza.Description}</td>
                                    <td className="py-2 px-4">
                                        <img src={pizza.Image} alt={pizza.Name} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="justify-normal py-2 px-4 flex space-x-2">
                                        <button onClick={() => openModal(pizza)} className="text-black text-3xl">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(pizza._id)} className="text-[#e90028] text-2xl">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Popup for Adding/Editing Pizza */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-8 w-3/4"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <h3 className="text-3xl font-semibold mb-4 text-start">{editingPizzaId ? 'Edit Pizza' : 'Add New Pizza'}</h3>

                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <input
                                        className="border w-full p-2 rounded"
                                        type="text"
                                        placeholder="Pizza Name"
                                        value={newPizza.Name}
                                        onChange={(e) => setNewPizza({ ...newPizza, Name: e.target.value })}
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        className="border w-full p-2 rounded"
                                        type="number"
                                        placeholder="Price"
                                        value={newPizza.Price}
                                        onChange={(e) => setNewPizza({ ...newPizza, Price: Number(e.target.value) })} // Convert to number
                                    />

                                </div>
                            </div>
                            <input
                                className="border w-full p-2 rounded"
                                type="file"
                                placeholder="Image URL"

                                onChange={(e) => {
                                    console.log(e.target.files[0]); 
                                    setNewPizza({ ...newPizza, Image: e.target.files[0] });
                                }} />
                            <textarea
                                className="border w-full h-[20vh] p-2 rounded"
                                placeholder="Description"
                                value={newPizza.Description}
                                onChange={(e) => setNewPizza({ ...newPizza, Description: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end space-x-2 mt-6">
                            <button onClick={closeModal} className="bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded">
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit} 
                                className="bg-[#e90028] hover:bg-red-700 text-white py-2 px-4 rounded"
                            >
                                {editingPizzaId ? 'Update Pizza' : 'Add Pizza'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePizza;
