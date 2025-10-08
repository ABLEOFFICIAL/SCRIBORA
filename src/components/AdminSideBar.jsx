"use client";
import {
  LayoutDashboard,
  Shield,
  ShieldUser,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const AdminSideBar = () => {
  const [sidelink, setSideLink] = React.useState("Dashboard");
  const showAdminSidebar = useSelector(
    (state) => state.context.showAdminSidebar
  );
  return (
    <div className="w-auto min-h-screen bg-neutral-100 transition">
      <div className="flex items-center gap-3 p-4">
        <Shield />{" "}
        {showAdminSidebar && (
          <div className="w-32">
            <h2 className="text-lg font-bold leading-4">Scribora</h2>
            <p className="font-medium text-sm">Blogs int.</p>
          </div>
        )}
      </div>
      <div className="">
        {showAdminSidebar && <h4 className="px-4">Overview</h4>}
        <div className="flex flex-col gap-3 mt-2 text-gray-700">
          {[
            { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
            { name: "Products", icon: <ShoppingBasket size={20} /> },
            { name: "Profile", icon: <ShieldUser size={20} /> },
          ].map((link, idx) => (
            <span
              key={idx}
              className={`flex items-center gap-1 px-4 cursor-pointer ${
                sidelink === link.name
                  ? "bg-neutral-600 text-white py-2 rounded font-medium"
                  : ""
              }`}
              onClick={() => setSideLink(link.name)}
            >
              {link.icon} {showAdminSidebar && <p>{link.name}</p>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
