import React from "react";
import LeftPanel from "./LeftPanel";
import AdminHeader from "./AdminHeader";
import AdminMain from "./AdminMain";

export default function AdminDashboard() {
  return (
    <div className=" bg-white min-h-screen w-[80vw] px-5">
      {/* <LeftPanel /> */}
      <AdminHeader />
      <AdminMain />
    </div>
  );
}
