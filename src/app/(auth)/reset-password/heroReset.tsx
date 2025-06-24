import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import React from "react";

function HeroReset() {
  return (
    <section className="bg-[#f3f3f3] w-full">
      <div className="container mx-auto h-full w-full relative">
        <Image
          src="/images/Saly-17-login.png"
          alt="Decorative"
          width={246}
          height={222}
          className="absolute top-4 left-0"
        />
        <div className="relative h-full w-full">
          <div className="flex items-center justify-between gap-10 h-full w-full overflow-hidden">
            <div className="flex justify-center items-center h-full w-full">
              <div className="flex flex-col items-start mx-auto">
                <h1 className="text-[58px] font-medium text-zeus">
                  Reset Password
                </h1>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <span aria-hidden="true" className="px-2 text-gray-500">
                      {"//"}
                    </span>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/"> Login</BreadcrumbLink>
                    </BreadcrumbItem>
                    <span aria-hidden="true" className="px-2 text-gray-500">
                      {"//"}
                    </span>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-secondary">
                        Reset Password
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
            <div className="w-full h-full max-w-[450px] relative -bottom-15">
              <Image
                src="/images/Saly-16-login.png"
                alt="Decorative"
                width={499}
                height={544}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroReset;
