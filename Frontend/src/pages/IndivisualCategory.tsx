import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/axiosInstance";
import PizzaCard from "../components/PizzaCard";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  crust: string;
  isVeg: boolean;
  category: string;
}

const CategoryProducts: React.FC = () => {
  const { category } = useParams(); // get category from URL
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  category?.toLowerCase();
  // console.log(category)
  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        const res = await api.get(`/product/get-products/${category}`);
        console.log(res.data)
        setProducts(res.data.products);
      } catch (err) {
        console.log("Fetch category products error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);
// console.log(products)
  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="p-6 bg-[#F5EFE6] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">{category}</h2>

      <div className="flex flex-col gap-6">
        {products.length === 0 && (
          <p className="text-center text-gray-600">No products found.</p>
        )}

        {products.map((p) => (
          <PizzaCard
            key={p._id}
            image={p.image}
            name={p.name}
            description={p.description}
            price={p.price}
            crust={p.crust}
            isVeg={p.isVeg}
            onAdd={() => console.log("Add >", p)}
            onCustomize={() => console.log("Customize >", p)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
