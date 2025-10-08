import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="bg-neutral-200 py-3 px-3.5 rounded-full">
          <Image
            src="/search not found.png"
            alt="search icon"
            width={80}
            height={80}
            className="w-20 h-20 object-contain"
            priority
          />
        </div>
        <h1 className="font-bold text-9xl text-blue-400 text-center">404</h1>
        <p className="font-semibold text-center text-3xl">Page Not Found</p>
        <Link
          href="/"
          className="bg-neutral-500 px-4 py-2 text-lg text-white rounded-xl mx-auto font-medium"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
