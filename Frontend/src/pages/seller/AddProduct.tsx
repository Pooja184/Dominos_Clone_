import React, { useState,type ChangeEvent,type FormEvent } from "react";
import api from "../../axios/axiosInstance";
import { toast } from "react-toastify";

interface ProductForm {
  name: string;
  description: string;
  category: string;
  type: string;
  price: string;
  originalPrice: string;
  discount: string;
  details: string[];
  image: File | null;
}

const AddProduct: React.FC = () => {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    category: "",
    type: "veg",
    price: "",
    originalPrice: "",
    discount: "",
    details: [],
    image: null,
  });

  const [detailInput, setDetailInput] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const addDetail = () => {
    if (!detailInput.trim()) return;
    setForm({ ...form, details: [...form.details, detailInput.trim()] });
    setDetailInput("");
  };

  const removeDetail = (index: number) => {
    setForm({
      ...form,
      details: form.details.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please upload an image");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("category", form.category);
    fd.append("type", form.type);
    fd.append("price", form.price);
    fd.append("originalPrice", form.originalPrice);
    fd.append("discount", form.discount);
    fd.append("details", JSON.stringify(form.details));
    fd.append("image", form.image);

    try {
      const res = await api.post("/product/add-product", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Product added successfully!");
        setForm({
          name: "",
          description: "",
          category: "",
          type: "veg",
          price: "",
          originalPrice: "",
          discount: "",
          details: [],
          image: null,
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

return (
  <div className="w-full flex justify-center px-4 py-6">
    <div className="w-full max-w-2xl">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Product
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
      >
        {/* PRODUCT NAME */}
        <div className="mb-4">
          <label className="font-medium text-gray-700 mb-1 block text-sm">
            Product Name
          </label>
          <input
            name="name"
            className="w-full p-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            placeholder="e.g. Veg Loaded Pizza"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label className="font-medium text-gray-700 mb-1 block text-sm">
            Description
          </label>
          <textarea
            name="description"
            className="w-full p-2 border border-gray-300 rounded-lg 
            h-20 resize-none focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            placeholder="Short description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* CATEGORY + TYPE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700 mb-1 block text-sm">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            >
              <option value="">Select Category</option>
              <option value="Pizza Mania">Pizza Mania</option>
              <option value="Garlic Bread">Garlic Bread</option>
              <option value="Chicken Feast">Chicken Feast</option>
              <option value="Lunch Feast">Lunch Feast</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700 mb-1 block text-sm">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
        </div>

        {/* PRICE ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="font-medium text-gray-700 mb-1 block text-sm">
              Price (₹)
            </label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 mb-1 block text-sm">
              Original Price
            </label>
            <input
              name="originalPrice"
              value={form.originalPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 mb-1 block text-sm">
              Discount (₹)
            </label>
            <input
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-5">
          <label className="font-medium text-gray-700 mb-1 block text-sm">
            Combo Details
          </label>

          <div className="flex gap-2 mb-2">
            <input
              value={detailInput}
              onChange={(e) => setDetailInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              placeholder="e.g. Choco Lava Cake"
            />
            <button
              type="button"
              onClick={addDetail}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Add
            </button>
          </div>

          <ul className="space-y-1">
            {form.details.map((item, index) => (
              <li
                key={index}
                className="flex justify-between bg-gray-100 px-3 py-2 rounded-md text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mt-5">
          <label className="font-medium text-gray-700 mb-1 block text-sm">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleImage}
            className="w-full p-2 border border-gray-300 rounded-lg 
            bg-white focus:ring-2 focus:ring-blue-600 outline-none text-sm"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="mt-6 w-full bg-red-600 text-white py-2.5 rounded-lg 
          text-sm font-medium hover:bg-red-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
);



};

export default AddProduct;
