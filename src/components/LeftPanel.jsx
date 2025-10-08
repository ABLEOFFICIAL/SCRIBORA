"use client";
import { setShowAdminSidebar } from "@/store/contextSlice";
import { PanelLeft } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

export default function LeftPanel() {
  const dispatch = useDispatch();
  return (
    <div>
      <PanelLeft
        className="bg-white"
        onClick={() => dispatch(setShowAdminSidebar())}
      />
    </div>
  );
}
