"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const testimonials = [
  {
    name: "Pollock Austin",
    title: "Designer, Mother of 4",
    message:
      "NextClass has really my children to be able to prioritise his time better via their scheduling and prompt classes. the tutors are also very friendly and impactful. I must say that overall, NextClass has been of immense benefit to my children. Cheers guys!!",
    image: "/Author.png",
  },
  {
    name: "Samuel Obasi",
    title: "Product Designer",
    message:
      "“This platform gave me clarity and confidence. The experience was smooth and rewarding. Highly recommended!”",
    image: "/Author.png",
  },
  {
    name: "Chidinma Glory",
    title: "Frontend Developer",
    message:
      "“The mentorship sessions were a turning point for me. I feel more equipped to take on tech challenges now.”",
    image: "/Author.png",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const { name, title, message, image } = testimonials[currentIndex];

  return (
    <section className="relative w-full bg-[#0027A5] text-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Decorative Left Image */}
      <div className="hidden md:block absolute top-20 left-15 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <Image
          src="/decor-left.png"
          alt="Decorative left"
          width={200}
          height={200}
          className="rotate-45"
        />
      </div>

      {/* Decorative Right Image */}
      <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 z-0">
        <Image
          src="/decor.png"
          alt="Decorative right"
          width={100}
          height={200}
        />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
        <Image
          width={100}
          height={100}
          src="/book-img.png"
          alt=""
          className="place-self-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <p className="text-sm uppercase tracking-widest text-orange-500 mb-2">
          Happy Students
        </p>
        <h2 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">
          What Client Say About Us
        </h2>
      </div>

      {/* Testimonial Card */}
      <div className="relative max-w-2xl mx-auto p-6 text-center bg-transparent transition-all duration-500">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
          <Image
            src="/quote.png"
            alt="Quote"
            width={40}
            height={40}
            className="absolute -bottom-4 right-3"
          />
        </div>

        <p className="text-lg leading-relaxed text-white/90 mb-6">{message}</p>

        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm uppercase tracking-wide text-orange-500 mt-1">
          {title}
        </p>
      </div>

      {/* Arrows */}
      <div className="relative z-10 max-w-2xl mx-auto mt-10 flex justify-end gap-4">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="w-10 h-10 flex items-center justify-center bg-[#FFA300] text-white rounded-full hover:bg-yellow-500 transition"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="w-10 h-10 flex items-center justify-center bg-[#FFA300] text-white rounded-full hover:bg-yellow-500 transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
