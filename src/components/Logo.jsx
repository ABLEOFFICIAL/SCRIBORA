import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="font-bold text-xl md:text-3xl space-x-4 text-white">
        Scribora
      </div>
    </Link>
  );
}
