import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-[calc(100vh-100px)] flex items-center justify-center w-full",
        className
      )}
    >
      <div className="animate-pulse">
        <Image
          src="/images/Logo.png"
          alt="loader"
          className="object-contain"
          priority
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
