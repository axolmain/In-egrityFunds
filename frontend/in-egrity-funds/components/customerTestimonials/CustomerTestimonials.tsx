"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "./TestimonialsData";
import CustomArrow from "./CustomArrow";

const CustomerTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "28%", // Larger screens
    slidesToShow: 1,
    speed: 800,
    slidesToScroll: 1,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentIndex(newIndex);
    },
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "20%", // Adjust padding for medium screens
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "15%", // Adjust padding for tablets
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Smaller mobile screens
        settings: {
          centerPadding: "0%", // No padding for smallest screens
          slidesToShow: 1, // Show only one card
          slidesToScroll: 1,
          centerMode: false, // Disable center mode for smallest screens
          scale: 1, // No scaling on smaller screens
          translateY: 0, // No translation on smaller screens
        },
      },
    ],
  };

  return (
    <div className="relative mt-12 flex w-full flex-col items-center overflow-hidden py-12">
      <h2 className="mb-8 bg-gradient-to-r from-primary to-blue-500 bg-clip-text px-4 text-center text-3xl font-black text-transparent saturate-150 sm:text-4xl md:mb-16 xl:text-5xl">
        What Our Customers Say
      </h2>

      <div className="min-h-[300px] w-full">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`px-4 py-4 md:py-10 ${
                index === currentIndex
                  ? "md:translate-y-[-20px] md:scale-105 md:transform"
                  : ""
              }`}
            >
              <div
                className={`relative rounded-3xl p-10 transition-all delay-0 duration-100 ease-in-out md:p-12 lg:p-14 ${
                  index === currentIndex
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-gray-400"
                } ${
                  index === currentIndex ? "rounded-2xl" : ""
                } box-border flex min-h-[250px] origin-top flex-col justify-center overflow-visible`}
              >
                <blockquote className="whitespace-normal">
                  <p
                    className={`mb-4 text-sm font-normal lg:text-xl xl:text-2xl ${
                      index !== currentIndex ? "text-gray-300" : ""
                    }`}
                  >
                    {testimonial.content}
                  </p>
                </blockquote>
                {index === currentIndex && (
                  <div
                    className="absolute left-1/2 h-0 w-0 -translate-x-1/2 transform"
                    style={{
                      bottom: "-8px",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: `10px solid hsl(var(--primary))`, // Use the --primary variable for the triangle color
                    }}
                  ></div>
                )}
              </div>
              <div
                className={`mt-10 pl-1 text-center text-sm font-normal lg:text-xl xl:text-2xl ${
                  index === currentIndex ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {testimonial.location}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
