"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import TutorSignupForm from "./tutorSignupForm";
import ReusableHeroSection from "@/components/ReusableHeroSection";
// import PasswordMeter from "./PasswordMeter";

function SignUp() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <ReusableHeroSection
        img={{
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
                <BreadcrumbLink className="text-white" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <span aria-hidden="true" className="px-1 text-white">
                {"//"}
              </span>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-secondary">
                  Register
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <TutorSignupForm />
    </main>
  );
}

export default SignUp;
