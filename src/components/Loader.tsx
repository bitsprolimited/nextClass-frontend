import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center w-full">
      <div>
        <Image
          src="/images/Logo.png"
          alt="loader"
          className="animate-pulse"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
