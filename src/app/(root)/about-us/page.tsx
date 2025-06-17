import HeroSection from "@/components/about/heroSection";
import MeetTheTeam from "@/components/about/meet-the-team";
import Testimonial from "@/components/landing/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CORE_VALUES = [
  {
    title: "Trusted",
    description:
      "Every child deserves to learn in a space where they feel safe, supported, and understood. We rigorously vet our tutors, protect your privacy, and build tools that earn your trust every step of the way.",
  },
  {
    title: "Simplicity",
    description:
      "Life is complex. Learning support shouldn't be. We've designed every part of our platform to be intuitive, friendly, and friction-free—from booking a session to joining a class.",
  },
  {
    title: "Accessibility",
    description:
      "No child should be left out of quality afterschool support. We're building tools that are affordable, flexible, and welcoming—no matter your background, device, or location.",
  },
];

function AboutPage() {
  return (
    <main>
      <HeroSection />
      <section className="w-full h-full bg-[#2509790a] flex justify-center items-center py-36">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-7xl h-full w-full">
          <div
            style={{ backgroundImage: "url('/images/about-section2.png')" }}
            className="h-[570px] max-w-[460px] w-full bg-cover bg-center flex items-end justify-center"
          >
            <Button className="mb-10 bg-secondary hover:bg-primary rounded-full h-auto py-2 px-10">
              Meet Instructors
            </Button>
          </div>
          <div className="flex-1 py-[81px] bg-white max-w-[666px] relative">
            <Card className="shadow-none border-0 rounded-none justify-center items-center flex">
              <CardContent className="p-0 gap-10 flex flex-col">
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-primary">
                    WE ARE A BLEND OF PASSION AND EXPERIENCE
                  </p>
                  <h2 className="text-abbey max-w-[500px] font-medium text-[45px]/[50px]">
                    We have experienced instructors to help with students.
                  </h2>
                  <p className="max-w-[500px] text-lg text-abbey">
                    At Nextclass, we believe every child deserves access to
                    personalized, quality education beyond the classroom. We
                    connect parents with trusted, experienced tutors who offer
                    tailored afterschool lessons that fit your child&apos;s
                    unique learning style and schedule
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <h3 className="text-3xl text-primary">100+ Courses</h3>
                  <p className="max-w-[500px] text-lg text-abbey">
                    Whether it&apos;s academic support, exam prep, or
                    skill-building, we make it easy to find the right tutor — so
                    your child can grow confidently and thrive. <br />
                    Together, we&apos;re unlocking each learner&apos;s full
                    potential, one lesson at a time
                  </p>
                </div>
              </CardContent>
            </Card>
            <Image
              src="/images/shape.png"
              alt="Decorative right"
              width={100}
              height={200}
              className="absolute -top-10 -right-9"
            />
          </div>
        </div>
      </section>
      <section className="relative w-full bg-background3 pt-[140px] pb-8">
        <div className="container mx-auto flex flex-col items-start md:flex-row justify-center gap-10">
          <div className="flex-1 flex flex-row-reverse w-1/2 gap-2">
            <div className="flex flex-col gap-5">
              <h2 className="text-secondary text-[35px]/[40px]">
                Our Mission &amp; Vision
              </h2>
              <div className="flex flex-col gap-5">
                <h3 className="font-medium text-zeus text-[44px]/[50px]">
                  We believe every child deserves personalized support after
                  school.
                </h3>
                <p className="text-[#52565b] text-[15px] w-full max-w-[556px]">
                  At the heart of our mission is a simple truth: no two children
                  learn the same way. That&apos;s why we&apos;re building more
                  than just a tutoring platform—we&apos;re creating a safe,
                  encouraging space where every child gets the help they need to
                  thrive beyond the classroom.
                </p>
                <p className="text-[#52565b] text-[15px] w-full max-w-[556px]">
                  We connect families with passionate, vetted tutors who tailor
                  their lessons to each child&apos;s unique pace, interests, and
                  challenges. We&apos;re here to make learning personal, joyful,
                  and consistent—right from home.
                  <br />
                  Because when children feel seen, supported, and inspired, they
                  don&apos;t just catch up—they move ahead.
                </p>
              </div>
            </div>
            <div className="relative -bottom-8 max-w-[295px]">
              <Image
                src="/images/saly-15.png"
                alt="Student with backpack illustration"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex flex-col gap-5">
              {CORE_VALUES.map((coreValue, index) => (
                <div key={index} className="flex gap-8">
                  <div className="w-[10px] h-[10px] rounded-full flex-shrink-0 bg-secondary mt-4" />
                  <div className="flex flex-col gap-3">
                    <h3 className="font-medium text-zeus text-[22px]/[38px]">
                      {coreValue.title}
                    </h3>
                    <p className="text-[#2c241bb2] w-full max-w-[654px]">
                      {coreValue.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/tutors">
              <Button className="mt-10 bg-secondary hover:bg-primary h-auto px-10 py-4 rounded-full font-medium text-base">
                View all Tutors
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <MeetTheTeam />
      <Testimonial />
    </main>
  );
}

export default AboutPage;
