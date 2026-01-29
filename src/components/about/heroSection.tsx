import ReusableHeroSection from "../ReusableHeroSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";

function HeroSection() {
  return (
    <ReusableHeroSection
      img={{
        primary: { src: "/images/Saly-16.png", className: "w-[155px] h-[155px] lg:w-[469px] lg:h-auto" },
        secondary: { src: "/images/Saly-17.png", className: "w-24 h-[54px] lg:w-[350px] lg:h-auto -top-2 lg:-top-16 left-0" },
      }}
      heading="About Us"
      breadcrumb={
        <Breadcrumb className="text-sm lg:text-base">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <span aria-hidden="true" className="px-1 text-gray-500">
              {"//"}
            </span>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-secondary">
                About Us
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
