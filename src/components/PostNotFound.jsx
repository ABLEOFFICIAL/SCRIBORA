import React from "react";

export default function PostNotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[40vh] w-4/5 mx-auto bg-white rounded-md shadow-md">
      <div className="bg-neutral-50 p-7 rounded-full">
        <img src="/Observe Icons.svg" alt="search" className=" w-28" />
      </div>
      <h2 className="text-2xl font-semibold mb-4">No Posts Found</h2>
      <p className="text-gray-600">
        Sorry, there are no posts available at the moment.
      </p>
    </div>
  );
}
