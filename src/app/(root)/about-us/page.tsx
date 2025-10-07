import HeroSection from "@/components/about/heroSection";
import MeetTheTeam from "@/components/about/meet-the-team";
import Testimonial from "@/components/landing/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CORE_VALUES = [
  {
    title: "Trust",
    description:
      "Every child deserves to learn in a space where they feel safe, supported, and understood. We rigorously vet our tutors, protect your privacy, and build tools that earn your trust every step of the way.",
  },
  {
    title: "Flexibility",
    description:
      "Book sessions when it works for you -no long-term commitments or confusing contracts. Life is complex. Learning support shouldn't be. We’ve designed every part of our platform to be intuitive and friendly —from booking a session to joining a class.",
  },
  {
    title: "Transparency",
    description:
      "View teacher profiles, experience, availability, and parent reviews—all before you book. We’re building tools that help you to articulate all your learning data—no matter your background, device, or location.",
  },
];

function AboutPage() {
  return (
    <main>
      <HeroSection />
      <section className="w-full h-full bg-[#2509790a] flex justify-center items-center py-10 lg:py-36">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl h-full w-full">
          <div
            style={{ backgroundImage: "url('/images/about-section2.png')" }}
            className="h-[415px] lg:h-[570px] max-w-[300px] lg:max-w-[460px] w-full bg-cover bg-center flex items-end justify-center"
          >
            <Button className="mb-10 bg-secondary hover:bg-primary rounded-full h-auto py-2 px-10">
              <Link href="/tutors">Meet Instructors</Link>
            </Button>
          </div>
          <div className="flex-1 py-10 lg:py-[81px] bg-white w-full max-w-[666px] relative">
            <Card className="shadow-none border-0 rounded-none justify-center items-center flex">
              <CardContent className="p-4 lg:p-0 gap-5 lg:gap-10 flex flex-col">
                <div className="flex flex-col gap-2 lg:gap-5">
                  <p className="text-sm text-primary">
                    WE PRIORITISE PASSION AND EXCELLENCE
                  </p>
                  <h2 className="text-[#2c241b] font-aero-trial w-full max-w-[500px] font-medium text-2xl lg:text-[45px]/[50px] ">
                    A Platform Built by Parents, for Parents
                  </h2>
                  <p className="max-w-[500px] w-full text-sm lg:text-lg text-abbey">
                    Nextclass is not just another tutoring app. NextClass
                    combines live video learning, AI-powered note-taking,
                    inappropriate content detection, and a collaborative digital
                    whiteboard—all in one platform so learning can be engaging,
                    interactive, and safe.
                  </p>
                  <p className="max-w-[500px] w-full text-sm lg:text-lg text-abbey">
                    And as a parent myself, I&apos;ve built this with one key
                    value in mind: Your child&apos;s learning journey should
                    feel personal.
                  </p>
                </div>
                <div className="flex flex-col gap-2 lg:gap-5">
                  <h3 className="font-aero-trial w-full text-xl lg:text-3xl text-primary">
                    The Heart Behind It All
                  </h3>
                  <p className="max-w-[500px] w-full text-sm lg:text-lg text-abbey">
                    At the end of the day, NextClass is more than technology;
                    it&apos;s about helping parents like me (and you) give our
                    kids the support they need to succeed.
                  </p>
                  <p className="max-w-[500px] w-full text-sm lg:text-lg text-abbey">
                    Thank you for being part of this journey.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Image
              src="/images/shape.png"
              alt="Decorative right"
              width={100}
              height={200}
              className="absolute size-10 lg:size-auto top-10 right-5 lg:-top-10 lg:-right-9"
            />
          </div>
        </div>
      </section>
      <section className="relative w-full bg-background3 pt-10 lg:pt-[140px] pb-8 px-4 sm:px-0">
        <div className="container mx-auto flex flex-col items-start lg:flex-row justify-center gap-10">
          <div className="flex-1 flex sm:flex-row-reverse flex-col lg:w-1/2 w-full gap-4">
            <div className="flex flex-col gap-2.5 lg:gap-5 w-full">
              <h2 className="text-secondary font-aero-trial text-sm lg:text-2xl">
                Our Mission &amp; Vision
              </h2>
              <div className="flex flex-col gap-3 lg:gap-5 w-full">
                <h3 className="font-medium text-zeus text-xl lg:text-3xl font-aero-trial">
                  Making it easy, safe, and effective for parents to connect
                  with trusted, high-quality educators anytime, anywhere.
                </h3>
                <h3 className="font-aero-trial w-full text-xl lg:text-3xl text-primary">
                  The Heart Behind It All
                </h3>
                <p className="text-[#52565b] text-[15px] w-full max-w-[556px]">
                  As a parent, I&apos;ve always valued education but it
                  wasn&apos;t until I tried to find a teacher for my 14-year-old
                  daughter that I realized how difficult and frustrating the
                  process could be. I wanted someone qualified, engaging, and
                  trustworthy. Someone who could connect with her, teach her at
                  her pace, and help her grow not just academically, but
                  personally.
                </p>
                <p className="text-[#52565b] text-[15px] w-full max-w-[556px]">
                  But what I found instead was a scattered mess of directories,
                  outdated listings, and generic tutoring platforms that
                  didn&apos;t feel personal or trustworthy. It felt like I was
                  searching in the dark.
                  <br />
                  That experience became the spark behind{" "}
                  <span className="font-bold text-secondary">NextClass</span>.
                </p>
              </div>
            </div>
            <div className="relative w-full max-w-[190px] lg:max-w-[295px] mx-auto">
              <Image
                src="/images/saly-15.png"
                alt="Student with backpack illustration"
                width={600}
                height={600}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col max-w-[500px] w-full">
            <div className="flex flex-col gap-5">
              {CORE_VALUES.map((coreValue, index) => (
                <div key={index} className="flex gap-8">
                  <div className="w-[10px] h-[10px] rounded-full shrink-0 bg-secondary mt-4" />
                  <div className="flex flex-col gap-3">
                    <h3 className="font-medium text-zeus font-montserrat text-[22px]/[38px]">
                      {coreValue.title}
                    </h3>
                    <p className="text-[#2c241bb2] text-sm lg:text-base w-full max-w-[654px]">
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
