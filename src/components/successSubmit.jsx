import { CircleCheck } from "lucide-react";
import React from "react";

export default function successSubmit({
  text = "Email successfully submitted!",
}) {
  return (
    <div className="fixed top-10 right-0 inset-0 bg-black/20 flex justify-center h-screen w-screen z-50">
      <div className="bg-white h-20 p-10 rounded-lg w-full mx-5 sm:mx-20 md:mx-40 lg:mx-60 xl:mx-80 2xl:mx-96 mt-5 lg:mt-16 flex justify-center items-center shadow-lg">
        <p className=" font-medium flex items-center gap-2">
          {text}
          <CircleCheck className="text-green-600" />
        </p>
      </div>
    </div>
  );
}
