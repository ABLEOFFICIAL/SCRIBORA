"use client";
import React from "react";

export default function DeleteModal({ onClose, onConfirm }) {
  //   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Confirm Logout
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
