import React, { useState, useEffect } from 'react';
import { usePizza } from '../context/PizzaContext';

const SearchModal = ({ isOpen, onClose }) => {
    const { state, fetchPizzas } = usePizza();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPizzas, setFilteredPizzas] = useState([]);

    useEffect(() => {

        const filtered = state.pizzas.filter(pizza =>
            pizza.Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPizzas(filtered);
    }, [searchTerm, state.pizzas]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        isOpen && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#010f1c] bg-opacity-80"
                onClick={handleBackdropClick}
            >
                <div className="bg-[#010f1c] rounded-lg shadow-lg p-6 w-2/4">
                    <h2 className="text-2xl font-bold mb-4 text-center text-[#e90028]">Search Pizzas</h2>
                    <input
                        type="text"
                        placeholder="Search for a pizza..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#e90028]"
                    />

                    <div className="mt-4">
                        {searchTerm && filteredPizzas.length > 0 ? (
                            <ul className="max-h-48 overflow-y-auto">
                                {filteredPizzas.map((pizza) => (
                                    <li key={pizza.id} className="py-1 hover:bg-[#f0f0f0] bg-white  transition duration-200 ease-in-out">
                                        {pizza.Name}
                                    </li>
                                ))}
                            </ul>
                        ) : searchTerm ? (
                            <p className="text-center text-gray-600">No results found</p>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    );
};

export default SearchModal;
