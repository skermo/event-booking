"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = ({ slides, autoPlayInterval = 6000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full shrink-0 relative h-96">
            <Image
              src={slide.images[0].url}
              alt={slide.title}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white p-5 max-w-1/3">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="truncate">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded text-lg"
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded text-lg"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
