import React from "react";

export default function Input({
  type = "text",
  name,
  placeholder,
  className,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-72 rounded-lg h-12 ${className} focus:outline-none`}
    />
  );
}
