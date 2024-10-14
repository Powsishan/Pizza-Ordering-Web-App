import React, { createContext, useContext, useReducer,useCallback } from 'react';
import { getPizzas } from '../services/pizzaService';

const PizzaContext = createContext();

const initialState = {
    pizzas: [],
    loading: false,
    error: null,
};

const pizzaReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PIZZAS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_PIZZAS_SUCCESS':
            return { ...state, loading: false, pizzas: action.payload };
        case 'FETCH_PIZZAS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const PizzaProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pizzaReducer, initialState);

    const fetchPizzas = useCallback(async () => {
        dispatch({ type: 'FETCH_PIZZAS_REQUEST' });
        try {
            const pizzas = await getPizzas();
            dispatch({ type: 'FETCH_PIZZAS_SUCCESS', payload: pizzas });
        } catch (error) {
            dispatch({ type: 'FETCH_PIZZAS_FAILURE', payload: error.message });
        }
    }, []);

    return (
        <PizzaContext.Provider value={{ state, fetchPizzas }}>
            {children}
        </PizzaContext.Provider>
    );

};

const usePizza = () => {
    return useContext(PizzaContext);
};

export { PizzaProvider, usePizza };
