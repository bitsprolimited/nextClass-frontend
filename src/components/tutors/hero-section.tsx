import React from "react";
import ReusableHeroSection from "../ReusableHeroSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

function HeroSection(): React.JSX.Element {
  return (
    <ReusableHeroSection
      img={{
        primary: { src: "/images/tutor-saly-16.png" },
        secondary: {
          src: "/images/tutor-saly-17.png",
          className: "top-0 -left-20 w-full max-w-[400px]",
        },
      }}
      heading="All Tutors"
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{"//"}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-secondary">
                All Tutors
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      bgColor="bg-[#f3f3f3]"
    />
  );
}

export default HeroSection;
