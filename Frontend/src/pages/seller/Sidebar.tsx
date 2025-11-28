import  {type FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdFastfood,
  MdLocalOffer,
  MdLogout,
  MdMenu,
  MdClose,
  MdPerson,
  MdRestaurantMenu,
} from "react-icons/md";
import api from "../../axios/axiosInstance";
import { logoutUser } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);

  
  const handleLogout = async () => {
     await api.post(
       "/auth/logout",
       {},
       { withCredentials: true }
     );
     dispatch(logoutUser());
     navigate("/");
     window.location.reload();
   };

  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-white transition font-medium";

  const activeLink = "bg-blue-800 shadow-md";
  const inactiveLink = "hover:bg-blue-700/60";

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-700 text-white rounded-lg"
      >
        {open ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-blue-900 text-white flex flex-col p-6 transition-transform duration-300 shadow-xl z-40 
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Admin Header */}
        <div className="flex items-center gap-3 mb-10 border-b border-blue-700 pb-4">
          <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
            <MdPerson size={26} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Seller Panel</h2>
            <p className="text-blue-200 text-sm">Manage Store</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">

          <NavLink
            to="/seller/dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdDashboard size={22} />
            Dashboard
          </NavLink>

          <NavLink
            to="/seller/products"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdRestaurantMenu size={22} />
            My Products
          </NavLink>

          <NavLink
            to="/seller-dashboard/add-product"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdFastfood size={22} />
            Add Product
          </NavLink>

          <NavLink
            to="/seller/offers"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdLocalOffer size={22} />
            Offers
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          <MdLogout size={22} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
