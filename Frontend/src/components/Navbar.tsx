import React, { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import ProfileMenu from "./ProfileIcon";

const Navbar: React.FC = () => {
  const [active, setActive] = useState("delivery");

  const tabs = [
    { id: "delivery", title: "Delivery", subtitle: "Now" },
    { id: "takeaway", title: "Takeaway", subtitle: "Select Store" },
    { id: "dinein", title: "Dine-in", subtitle: "Select Store" },
  ];

  return (
    <div className="w-full bg-white shadow-sm">
      {/* TOP HEADER */}
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Location */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <HiOutlineLocationMarker className="text-xl text-red-600" />
            <p className="font-semibold text-red-700">Dombivli</p>
            <FiChevronDown className="text-lg text-gray-600" />
          </div>
          <p className="text-xs text-gray-500">Dombivli, Kalyan, Thane</p>
        </div>

        {/* Profile */}
       <div className="flex items-center gap-3">
  <ProfileMenu/>
</div>

      </div>

      {/* DELIVERY TYPE TABS */}
      <div className="w-full bg-white px-3 py-4">
        <div className="grid grid-cols-3 border rounded-lg overflow-hidden">

          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`
                flex flex-col items-center py-3 cursor-pointer 
                transition-all duration-200
                ${
                  active === tab.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }
              `}
            >
              <p
                className={`font-semibold ${
                  active !== tab.id ? "text-gray-700" : "text-white"
                }`}
              >
                {tab.title}
              </p>

              <p
                className={`text-xs ${
                  active !== tab.id ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {tab.subtitle}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
