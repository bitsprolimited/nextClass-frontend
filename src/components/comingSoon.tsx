"use client";

import Image from "next/image";

export default function ComingSoon() {
  return (
    <section className="relative w-60% mt-6 bg-[#FFA300] text-white overflow-hidden py-20 px-6 md:px-20">
      {/* Top‐right decorative graphic */}
      <div className="hidden md:block absolute top-16 right-16 transform translate-x-1/4 -translate-y-1/4 z-0">
        <Image
          src="/DecorativeTop.png"
          alt="Decorative top right"
          width={149}
          height={248}
          className="opacity-90"
        />
      </div>

      {/* Bottom‐left decorative graphic */}
      <div className="hidden md:block absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 z-0">
        <Image
          src="/DecorativeBottom.png"
          alt="Decorative bottom left"
          width={180}
          height={180}
          className="opacity-90"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mt-4">
        {/* Subtitle */}
        <p className="text-sm uppercase tracking-widest mb-4 text-blue-800 font-semibold">
          Mobile App Coming Soon…
        </p>

        {/* Main Heading */}
        <h2 className="text-2xl md:text-5xl font-semibold leading-tight mb-8">
          Mobile app will be available soon to access coaching anytime.
        </h2>

        {/* Store Badges */}
        <div className="flex gap-4 justify-center mt-8">
          <div className="w-[180px] h-[65px] bg-white rounded-lg shadow-lg flex items-center justify-center">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Play Store.png"
                alt="Get it on Google Play"
                width={150}
                height={45}
                className="object-contain"
              />
            </a>
          </div>

          <div className="w-[180px] h-[65px] bg-white rounded-lg shadow-md flex items-center justify-center">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src="/App Store.png"
                alt="Get it on Google Play"
                width={150}
                height={45}
                className="object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
