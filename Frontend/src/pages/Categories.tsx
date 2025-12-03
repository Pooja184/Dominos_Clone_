import React, { useEffect, useState } from "react";
import api from "../axios/axiosInstance";
import type { ICategory } from "../types/category";
import { useNavigate } from "react-router-dom";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const navigate=useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/product/get-categories");
        setCategories(res.data.categories);
      } catch (err) {
        console.log("Category Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-28 flex justify-center items-center text-xl">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="px-6 py-2">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        What are you craving for?
      </h2>

      {/* Domino’s Style Horizontal Category Bar */}
      <div className="flex gap-6 overflow-x-auto py-3 no-scrollbar">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex flex-col items-center min-w-[110px]"
          >
            <div onClick={()=>navigate(`/category/${cat.name}`)} className="relative">
              {/* Yellow tag
              {cat.tag && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-semibold text-[10px] px-2 py-[2px] rounded-full shadow">
                  {cat.tag}
                </span>
              )} */}

              {/* Round image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-md"
              />
            </div>

            {/* Name */}
            <p className="mt-2 text-sm font-medium text-gray-700 text-center">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
