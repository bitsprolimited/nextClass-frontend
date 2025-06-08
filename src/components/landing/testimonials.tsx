"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="relative w-full bg-[#0027A5] text-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Decorative Left Image */}
      <div className="hidden md:block absolute top-20 left-15 transform -translate-x-1/2 -translate-y-1/2 z-0">
        {/* Uncomment if decor-left.png is ready */}
        <Image
          src="/images/decor-left.png"
          alt="Decorative left"
          width={200}
          height={200}
          className="rotate-45"
        />
      </div>

      {/* Decorative Right Image */}
      <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 z-0">
        <Image
          src="/images/decor.png"
          alt="Decorative right"
          width={100}
          height={200}
        />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-widest text-orange-500 mb-2">
          Happy Students
        </p>
        <h2 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">
          What Client Say About Us
        </h2>
      </div>

      {/* Testimonial Card */}
      <div className="relative max-w-2xl mx-auto p-6 text-center bg-transparent">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <Image
            src="/images/Author.png"
            alt="Pollock Austin"
            fill
            className="rounded-full object-cover"
          />
          <Image
            src="/images/quote.png"
            alt="Quote"
            width={40}
            height={40}
            className="absolute -bottom-4 right-3"
          />
        </div>

        <p className="text-lg leading-relaxed text-white/90 mb-6">
          “Lorem Ipsum is simply dummy text of the printing typesetting industry
          has been the industry&#39;s standard dummy text ever since the 1500s when
          unknown printer took a galley of type and scrambled it to.”
        </p>

        <h3 className="text-xl font-semibold">Pollock Austin</h3>
        <p className="text-sm uppercase tracking-wide text-orange-500 mt-1">
          Designer, Mother of 4
        </p>
      </div>

      {/* Arrows */}
      <div className="relative z-10 max-w-2xl mx-auto mt-10 flex justify-end gap-4">
        <button
          aria-label="Previous testimonial"
          className="w-10 h-10 flex items-center justify-center bg-[#FFA300] text-white rounded-full hover:bg-yellow-500 transition"
        >
          <FaArrowLeft />
        </button>
        <button
          aria-label="Next testimonial"
          className="w-10 h-10 flex items-center justify-center bg-[#FFA300] text-white rounded-full hover:bg-yellow-500 transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
