import React from 'react';

const PizzaCard = ({ image, name, description, price }) => {
  return (
    <div className="bg-[#faf7f2] rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4  sm:h-[280px] md:h-[330px] lg:h-[380px] w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-[150px] rounded-lg object-cover" 
      />
      
      <h2 className="text-black text-lg font-semibold">{name}</h2>

      <p className="text-gray-600 text-center text-sm">
        {description}
      </p>

      <p className="text-[#e90028] text-xl font-bold">${price}</p>
    </div>
  );
};

export default PizzaCard;
