import React from "react";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="flex flex-col items-center justify-center gap-5 ">
        <img
          src="/search not found.png"
          alt="search icon"
          className="w-20 bg-neutral-200 py-3 px-3.5 rounded-full"
        />
        <h1 className="font-bold text-9xl text-blue-400 text-center">404</h1>
        <p className="font-semibold text-center text-3xl ">Page Not Found</p>
        <a
          href="/"
          className="bg-neutral-500 px-4 py-2 text-lg text-white rounded-xl mx-auto font-medium"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
