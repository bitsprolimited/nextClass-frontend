import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

function AboutSection(): React.JSX.Element {
  return (
    <section className="w-full h-full bg-[#2509790a] flex justify-center items-center py-36 px-4 sm:px-0">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-7xl h-full w-full">
        <div
          style={{ backgroundImage: "url('/images/about-section.png')" }}
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
                  We believe strongly that there&apos;s a tutor for every
                  student.
                </h2>
                <p className="max-w-[500px] text-lg text-abbey">
                  At Nextclass, we believe every child deserves access to
                  personalized, quality education beyond the classroom. We
                  connect parents with trusted, experienced tutors who offer
                  tailored afterschool lessons that fit your child&apos;s unique
                  learning style and schedule
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
            className="absolute top-0 right-0 md:-top-10 md:-right-9"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
