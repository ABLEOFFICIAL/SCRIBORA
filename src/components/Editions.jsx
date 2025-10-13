"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { filterByCountry, setSelectedCountry } from "@/store/contextSlice";

export default function Editions({
  colour = "white",
  className,
  dropDownClass = "w-[180px]",
}) {
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.context.selectedCountry);

  const handleCountryChange = (value) => {
    dispatch(setSelectedCountry(value));
    dispatch(filterByCountry(value));
  };

  return (
    <div
      className={`flex ${className} items-center space-x-2 text-${colour} relative z-[1000]`}
    >
      <span>Editions:</span>
      <Select value={selectedCountry} onValueChange={handleCountryChange}>
        <SelectTrigger
          className={`${dropDownClass} border focus:outline-none focus-visible:ring-ring/50`}
          data-sidebar-element="true"
        >
          <SelectValue placeholder="Select an edition" />
        </SelectTrigger>
        <SelectContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          position="popper"
          sideOffset={4}
          className="z-[9999]"
          data-sidebar-element="true"
        >
          <SelectItem value="all">🌍 All Countries</SelectItem>
          <SelectItem value="canada">🇨🇦 Canada</SelectItem>
          <SelectItem value="usa">🇱🇷 USA</SelectItem>
          <SelectItem value="nigeria">🇳🇬 Nigeria</SelectItem>
          <SelectItem value="uk">🇬🇧 UK</SelectItem>
          <SelectItem value="germany">🇩🇪 Germany</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
