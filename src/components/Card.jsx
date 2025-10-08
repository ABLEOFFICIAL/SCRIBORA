import React from "react";

export default function Card({ children }) {
  return (
    <div className="rounded p-4  bg-blue-50 shadow-md flex gap-3">
      {children}
    </div>
  );
}
