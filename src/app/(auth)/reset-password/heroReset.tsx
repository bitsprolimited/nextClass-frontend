import ReusableHeroSection from "@/components/ReusableHeroSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

function HeroReset() {
  return (
    <ReusableHeroSection
      img={{
        primary: {
          src: "/images/Saly-16-login.png",
          className: "bottom-0",
        },
        secondary: {
          src: "/images/Saly-17-login.png",
          className: "top-0 left-0 w-[240px]",
        },
      }}
      heading="Reset Password"
      breadcrumb={
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
      }
      bgColor="bg-[#f3f3f3]"
    />
  );
}

export default HeroReset;
