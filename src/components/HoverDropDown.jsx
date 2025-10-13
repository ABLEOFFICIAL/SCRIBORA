"use client";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

function HoverDropDown({ label, items, className, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close dropdown on scroll (mobile only)
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isMobile, isOpen]);

  const handleClick = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    }
  };

  const getDropdownPosition = () => {
    if (isMobile && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 160;
      const viewportWidth = window.innerWidth;
      let left = rect.left;

      if (left + dropdownWidth > viewportWidth) {
        left = viewportWidth - dropdownWidth - 10;
      }

      return {
        top: `${rect.bottom + 4}px`,
        left: `${left}px`,
      };
    }
    return {};
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
      ref={buttonRef}
    >
      <div className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded">
        <span>{label}</span>
        <ChevronDown className="size-4" />
      </div>

      {isOpen && (
        <ul
          className={`${
            isMobile ? "fixed" : "absolute"
          } mt-1 font-normal rounded shadow-lg w-40 bg-white border border-gray-200 z-[3000]`}
          style={getDropdownPosition()}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(item);
                setIsOpen(false);
              }}
              className="hover:bg-neutral-200 text-neutral-800 px-3 py-2 cursor-pointer first:rounded-t last:rounded-b"
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
