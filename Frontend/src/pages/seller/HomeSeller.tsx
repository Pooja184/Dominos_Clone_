import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const HomeAdmin: FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Right side dynamic content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeAdmin;

