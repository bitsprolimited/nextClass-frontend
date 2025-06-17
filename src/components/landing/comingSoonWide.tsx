"use client";

import Image from "next/image";

export default function ComingSoonWide() {
  return (
    <section className="relative w-full flex items-center bg-[#FFA300] text-white overflow-hidden py-20 px-6 md:px-20">
      {/* Top‐right decorative graphic */}
      <div className="hidden md:block absolute top-[-20] right-10 z-0">
        <Image
          src="/DecorativeTop.png"
          alt="Decorative top right"
          width={149}
          height={248}
          className="opacity-90"
        />
      </div>

      {/* Bottom‐left decorative graphic */}
      <div className="hidden md:block absolute bottom-[-20] left-10 z-0">
        <Image
          src="/DecorativeBottom.png"
          alt="Decorative bottom left"
          width={189}
          height={280}
          className="opacity-90"
        />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-16">
        {/* Text content */}
        <div className="md:ml-28 max-w-2xl">
          <p className="text-sm uppercase tracking-widest mb-4 text-blue-800 font-semibold">
            Mobile App Coming Soon…
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold font-serif leading-tight tracking-tight">
            Mobile app will be available soon to access coaching anytime.
          </h2>
        </div>

        {/* Store Badges */}
        <div className="flex flex-col md:flex-row gap-4 md:mt-12">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[180px] h-[65px] bg-white rounded-lg shadow-lg flex items-center justify-center"
          >
            <Image
              src="/Play Store.png"
              alt="Get it on Google Play"
              width={150}
              height={45}
              className="object-contain"
            />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[180px] h-[65px] bg-white rounded-lg shadow-md flex items-center justify-center"
          >
            <Image
              src="/App Store.png"
              alt="Download on the App Store"
              width={150}
              height={45}
              className="object-contain"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
