import Link from "next/link";
import React from "react";

export default function Card({ children, href }) {
  return (
    <Link href={href} className="rounded p-4  bg-blue-50 shadow-md flex gap-3">
      {children}
    </Link>
  );
}
