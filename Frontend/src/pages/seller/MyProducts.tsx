import React, { useEffect, useState } from "react";
import api from "../../axios/axiosInstance";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string; // image URL from backend
}

const MyProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/my-products", {
        withCredentials: true,
      });
    //   console.log(res.data)
      setProducts(res.data.products || []);
    } catch (error: any) {
      toast.error("Failed to load products");
    }
  };

  // Delete Product
  const deleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/product/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Product deleted");
        setProducts(products.filter((p) => p._id !== id));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        All Products List
      </h1>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-12 bg-gray-100 py-3 px-4 font-semibold text-gray-700 text-sm">
          <div className="col-span-2">Image</div>
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* TABLE ROWS */}
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-12 items-center py-3 px-4 border-b hover:bg-gray-50 transition"
          >
            {/* IMAGE */}
            <div className="col-span-2">
              <img
                src={product.image}
                alt={product.name}
                className="h-14 w-14 object-cover rounded-lg border"
              />
            </div>

            {/* NAME */}
            <div className="col-span-4 text-gray-800 font-medium">
              {product.name}
            </div>

            {/* CATEGORY */}
            <div className="col-span-3 text-gray-600">{product.category}</div>

            {/* PRICE */}
            <div className="col-span-2 text-gray-800 font-semibold">
              ₹{product.price}
            </div>

            {/* DELETE ACTION */}
            <div className="col-span-1 flex justify-end pr-2">
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-600 font-bold text-lg hover:text-red-800"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-center py-6 text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
