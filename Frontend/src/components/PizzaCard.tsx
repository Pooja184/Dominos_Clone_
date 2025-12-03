import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import type { IPizzaCard } from "../types/pizzaCard";



const PizzaCard: React.FC<IPizzaCard> = ({
  image,
  name,
  description,
  price,
  crust,
  isVeg = true,
  onAdd,
  onCustomize,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xl mx-auto mb-6">

      {/* Product Image + Customise Button */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover"
        />

        {/* Customise Button */}
        <button
          onClick={onCustomize}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-black flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded shadow hover:bg-white transition"
        >
          Customise
          <MdKeyboardArrowRight size={18} />
        </button>
      </div>

      {/* Bottom Content */}
      <div className="p-4">
        
        {/* Title + Veg/Non-Veg Icon */}
        <div className="flex items-center gap-2">
          {/* Veg/Non-veg dot */}
          <span
            className={`w-4 h-4 border border-gray-700 flex items-center justify-center rounded-sm`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-sm ${
                isVeg ? "bg-green-600" : "bg-red-600"
              }`}
            ></span>
          </span>

          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-1">{description}</p>

        {/* Price + Add Button */}
        <div className="flex justify-between items-center mt-4">

          {/* Price + Crust */}
          <div>
            <p className="text-xl font-bold flex items-center gap-1">
              <FaRupeeSign size={16} /> {price}
            </p>

            {/* Crust + Arrow */}
            <p className="text-sm text-gray-500 flex items-center gap-1">
              {crust} <MdKeyboardArrowRight size={18} />
            </p>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={onAdd}
            className="bg-[#e31837] flex items-center gap-2 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Add
            <AiOutlinePlus size={18} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
