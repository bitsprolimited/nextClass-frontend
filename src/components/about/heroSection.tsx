import Image from "next/image";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

function HeroSection() {
  return (
    <section className="bg-[#f3f3f3] w-full">
      <div className="container mx-auto h-full w-full relative">
        <Image
          src="/images/Saly-17.png"
          alt="Decorative"
          width={500}
          height={500}
          className="absolute -top-10 left-0"
        />
        <div className="relative h-full w-full">
          <div className="flex items-center justify-between gap-10 h-full w-full overflow-hidden">
            <div className="flex justify-center items-center h-full w-full">
              <div className="flex flex-col items-start mx-auto">
                <h1 className="text-[58px] font-medium text-zeus">About Us</h1>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-secondary">
                        About Us
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
            <div className="w-full h-full max-w-[450px] relative -bottom-20">
              <Image
                src="/images/Saly-16.png"
                alt="Decorative"
                width={700}
                height={700}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
