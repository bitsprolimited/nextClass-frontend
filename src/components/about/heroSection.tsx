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
        primary: { src: "/images/Saly-16.png" },
        secondary: { src: "/images/Saly-17.png" },
      }}
      heading="About Us"
      breadcrumb={
        <Breadcrumb>
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
