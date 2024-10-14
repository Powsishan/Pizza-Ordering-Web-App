//created for testing 

import React, { useContext, useEffect } from 'react';
import { usePizza } from '../context/PizzaContext';

const PizzaList = () => {
  const { state, fetchPizzas } = usePizza();
  const { pizzas, loading, error } = state;

  useEffect(() => {
    fetchPizzas(); 
  }, [fetchPizzas]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Pizza List</h1>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.id}>
            <h2>{pizza.Name}</h2>
            <p>{pizza.Description}</p>
            <p>Price: ${pizza.Price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
