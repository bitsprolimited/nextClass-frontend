import ReusableHeroSection from "@/components/ReusableHeroSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function HeroForgot() {
  return (
    <ReusableHeroSection
      img={{
        secondary: {
          src: "/images/Saly-17-login.png",
          className: "top-0 left-0 w-24 lg:w-[240px] h-[54px] lg:h-auto",
        },
        primary: {
          src: "/images/Saly-16-login.png",
          className:
            "bottom-0 lg:bottom-0 w-[97px] h-[97px] lg:w-[500px] lg:h-auto",
        },
      }}
      heading="Forgot Password"
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator
              aria-hidden="true"
              className="px-1 text-gray-500"
            >
              {"//"}
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/"> Login</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator
              aria-hidden="true"
              className="px-1 text-gray-500"
            >
              {"//"}
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-secondary">
                Forgot Password
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      bgColor="bg-[#f3f3f3]"
    />
  );
}

export default HeroForgot;
