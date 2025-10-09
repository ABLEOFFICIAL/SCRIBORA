"use client";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";

function HoverDropDown({ label, items, className, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size to toggle between hover and click
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typically the md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle click for mobile
  const handleClick = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
    >
      {/* Button / Label */}
      <div className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded">
        <span>{label}</span>
        <ChevronDown className="size-4" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul className="fixed left-auto font-normal rounded shadow-md w-40 bg-white border border-gray-200 z-[1000]">
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(item);
                setIsOpen(false);
              }}
              className="hover:bg-neutral-200 text-neutral-800 px-3 py-2 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HoverDropDown;
