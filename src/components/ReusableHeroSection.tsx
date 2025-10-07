import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Images {
  src: string;
  alt?: string;
  className?: string;
}

interface ReusableHeroSectionProps {
  img: {
    primary: Images;
    secondary?: Images;
  };
  heading: string;
  bgColor?: string;
  breadcrumb: React.ReactNode;
}

function ReusableHeroSection({
  img,
  heading,
  bgColor = "bg-primary",
  breadcrumb,
}: ReusableHeroSectionProps): React.JSX.Element {
  return (
    <section className={cn("w-full bg-primary ", bgColor)}>
      <div className="container mx-auto h-full relative">
        {img.secondary && (
          <Image
            src={img.secondary.src}
            alt={img.secondary.alt || "Decorative"}
            width={500}
            height={500}
            className={cn(
              "absolute -top-10 left-0",
              img.secondary.className
            )}
          />
        )}
        <div className="relative h-full w-full">
          <div className="flex items-center justify-between gap-10 h-full w-full overflow-hidden">
            <div className="flex justify-center items-center h-full w-full">
              <div className="flex flex-col items-start mx-auto">
                <h1
                  className={cn(
                    "text-[20px] lg:text-[58px] font-aero-trial font-medium",
                    bgColor === "bg-primary" ? "text-white" : "text-zeus"
                  )}
                >
                  {heading}
                </h1>
                {breadcrumb}
              </div>
            </div>
            <div
              className={cn(
                "relative -bottom-10 lg:-bottom-20",
                img.primary.className
              )}
            >
              <Image
                src={img.primary.src}
                alt={img.primary.alt || "Decorative"}
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReusableHeroSection;
