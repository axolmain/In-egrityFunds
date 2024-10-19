"use client";

import React from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface CustomArrowProps {
  onClick?: () => void;
  direction: "left" | "right";
}

const CustomArrow: React.FC<CustomArrowProps> = ({ onClick, direction }) => {
  return (
    <div
      className={`absolute cursor-pointer transition-transform duration-300 md:flex ${
        direction === "left"
          ? "left-[49%] -translate-x-full transform"
          : "right-[49%] translate-x-full transform"
      }`}
      style={{ bottom: "-10px" }} // Lower position, closer to the bottom of the container
      onClick={onClick}
    >
      {direction === "left" ? (
        <FaArrowLeftLong className="h-5 w-8 text-gray-500 transition-transform duration-300 ease-in-out md:hover:scale-125 md:hover:text-gray-700" />
      ) : (
        <FaArrowRightLong className="h-5 w-8 text-gray-500 transition-transform duration-300 ease-in-out md:hover:scale-125 md:hover:text-gray-700" />
      )}
    </div>
  );
};

export default CustomArrow;
