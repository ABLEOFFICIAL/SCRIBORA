// import React from "react";
// import AdminDashboard from "./AdminDashboard";

// export default function Admin() {
//   return (
//     <div>
//       <AdminDashboard />
//     </div>
//   );
// }
// ==================== 4. src/app/(admin)/admin/page.js ====================

"use client";
import { useSelector } from "react-redux";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminDashboardPage() {
  const { admin } = useSelector((state) => state.auth);

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
