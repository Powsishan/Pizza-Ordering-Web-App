import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PizzaProvider, usePizza } from './context/PizzaContext';
import PizzaCard from './components/PizzaCard'; 
import Home from './pages/Home';
import AdminPanel from './pages/Admin/AdminPanel';
import Login from './pages/Admin/Login';
import SearchModal from './components/SearchModel';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <PizzaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizzaCard" element={<PizzaCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminPannel" element={<AdminPanel />} />
          <Route path="/Search" element={<SearchModal />} />


        </Routes>
      </Router>
    </PizzaProvider>
  );
};

export default App;
