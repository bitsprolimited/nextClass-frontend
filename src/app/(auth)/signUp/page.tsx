import ReusableHeroSection from "@/components/ReusableHeroSection";
import ParentSignupForm from "./parentSignup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <ReusableHeroSection
        img={{
          secondary: {
            src: "/images/signup-Saly-17.png",
            className: "top-0 left-0 w-[240px]",
          },
          primary: {
            src: "/images/signup-Saly-16.png",
            className: "bottom-0",
          },
        }}
        heading="Create your Account"
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
                  Register
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        bgColor="bg-[#f3f3f3]"
      />
      <ParentSignupForm />
    </main>
  );
}

export default Login;
