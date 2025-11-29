import ReusableHeroSection from "@/components/ReusableHeroSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function HeroSchedule() {
  return (
    <ReusableHeroSection
      img={{
        primary: {
          src: "/images/schedule-bottom.png",
          className: "bottom-0 lg:-bottom-0 w-[120px] md:w-[300px] lg:w-[500px]",
        },
      }}
      heading="Schedule"
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
              <BreadcrumbPage className="text-secondary">
                Schedule
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      bgColor="bg-[#f3f3f3]"
    />
  );
}

export default HeroSchedule;
