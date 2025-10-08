"use client";
import { setShowAdminSidebar } from "@/store/contextSlice";
import { PanelLeft } from "lucide-react";
import React from "react";
import Input from "./Input";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";

export default function AdminHeader() {
  const dispatch = useDispatch();

  return (
    <div className="mt-3 flex items-center justify-between">
      <div className="flex items-center gap-3 p-4">
        <PanelLeft
          className="bg-white"
          onClick={() => dispatch(setShowAdminSidebar())}
        />
        <h5>Overview / Dashboard</h5>
      </div>
      <div>
        <div className="relative">
          <Input
            className={"border border-neutral-500 pl-10"}
            placeholder={"Search..."}
          />
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10">
            <Search className="" />
          </span>
        </div>
      </div>
    </div>
  );
}
