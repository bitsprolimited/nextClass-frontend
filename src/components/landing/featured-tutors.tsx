"use client";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { useTutors } from "@/hooks/useTutors";
import { Button } from "../ui/button";

import { Teacher } from "@/types";

function FeaturedTutorCard({ tutor }: { tutor: Teacher }): React.JSX.Element {
  return (
    <Card className="group border-none shadow-none w-full max-w-[360px]">
      <CardContent className="p-0">
        <div className="relative">
          <div className="w-full h-[300px]">
            <Image
              src={tutor.profilePicture || "/images/tutor-1.png"}
              alt={tutor.fullName}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary border-2 border-[#f8f6f4] text-center text-white">
            <span className="font-bold text-xl">${tutor.hourlyRate}</span>
            <span className="text-sm">per hour</span>
          </div>
        </div>
        <div className="mt-12 px-[30px]">
          <div className="flex items-center">
            <span className="text-sm text-[#9b9ea1]">By:</span>
            <span className="text-zeus ml-2 group-hover:text-secondary ease-in-out transition-all">
              {tutor.fullName}
            </span>
          </div>

          <h3 className="mt-2 font-medium text-2xl text-zeus group-hover:text-secondary ease-in-out transition-all">
            {tutor.subjects?.join(", ")}
          </h3>

          <div className="flex items-center gap-4 mt-4 text-[#ffa300] group-hover:text-zeus ease-in-out transition-all w-full">
            <span>{tutor.experience} yrs exp</span>
            <div className="w-1 h-1 rounded-full bg-[#0a4d3c]" />
            <span>{tutor.qualifications?.length} Qualifications</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeaturedTutors(): React.JSX.Element {
  const { data, isLoading, error } = useTutors();

  return (
    <section className="flex flex-col justify-center items-center py-14 px-4">
      <div className="flex flex-col max-w-7xl items-center mx-auto gap-14">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative">
            <Image
              width={100}
              height={100}
              src="/images/book-img.png"
              alt=""
              className="place-self-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <p className="text-primary text-sm font-semibold uppercase mb-2">
              100+ courses available
            </p>
            <h2 className="text-zeus text-5xl font-medium ">
              Checkout Featured Tutors{" "}
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-start gap-12 w-full">
          <h2 className="font-medium text-zeus text-3xl underline">Tutors</h2>
          {isLoading && <div>Loading tutors...</div>}
          {error && <div>Failed to load tutors.</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data?.teacherResponse?.teachers?.map((tutor) => (
              <FeaturedTutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </div>
        <Button className="text-xl h-auto py-4 px-10 rounded-full bg-secondary hover:bg-primary">
          View All Tutors
        </Button>
      </div>
    </section>
  );
}

export default FeaturedTutors;
