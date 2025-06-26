import React from "react";

const Loader = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-10 w-full">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <span className="text-blue-600 font-semibold text-lg">{text}</span>
  </div>
);

export default Loader; 