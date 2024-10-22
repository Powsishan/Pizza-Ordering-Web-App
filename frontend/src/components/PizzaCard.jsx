import React from 'react';

const PizzaCard = ({ image, name, description, price }) => {
  return (
    <div className="bg-[#faf7f2] rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4 sm:h-[350px] md:h-[430px] lg:h-[480px] w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
   <img 
  src={image} 
  alt={name} 
  className="w-[220px] h-[220px] rounded-full object-cover" 
/>

      
      <h2 className="text-black text-xl font-semibold">{name}</h2>

      <p className="text-gray-600 text-center text-lg">
        {description}
      </p>

      <p className="text-[#e90028] text-xl font-bold">${price}</p>
    </div>
  );
};

export default PizzaCard;
