// src/components/Loading.jsx
import React from 'react';
import { GridLoader } from 'react-spinners';
import '../assets/styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <GridLoader color="#e90028" size={30} />
     
    </div>
  );
};

export default Loading;
