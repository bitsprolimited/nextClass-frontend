"use client";

import Image from "next/image";

export default function ComingSoon() {
  return (
    <section className="relative w-60% mt-6 bg-[#FFA300] text-white overflow-hidden py-20 px-6 md:px-20">
      {/* Top‐right decorative graphic */}
      <div className="hidden md:block absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 z-0">
        <Image
          src="/decor-top-right.png"
          alt="Decorative top right"
          width={240}
          height={160}
          className="opacity-90"
        />
      </div>

      {/* Bottom‐left decorative graphic */}
      <div className="hidden md:block absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 z-0">
        <Image
          src="/decor-bottom-left.png"
          alt="Decorative bottom left"
          width={180}
          height={180}
          className="opacity-90"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Subtitle */}
        <p className="text-sm uppercase tracking-widest mb-4 text-blue-800 font-semibold">
          Mobile App Coming Soon…
        </p>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-8">
          Mobile app will be available soon to access coaching anytime.
        </h2>

        {/* Store Badges */}
        <div className="flex gap-4 justify-center mt-8">
          <a href="#" target="_blank">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              height="60px"
            />
          </a>
          <a href="#" target="_blank">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              height="60px"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
