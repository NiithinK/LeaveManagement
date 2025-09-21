import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <ClipLoader color="#3b82f6" size={50} />
      <p className="mt-4 text-gray-700 font-semibold">Loading...</p>
    </div>
  );
}
