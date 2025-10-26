"use client";

import { tutors } from "@/lib/constants";
import { SearchX } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "../ui/empty";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export type Tutor = {
  id: number;
  name: string;
  price: string;
  course: string;
  image: string;
  duration: string;
  lectures: string;
};

function FeaturedTutorCard({ tutor }: { tutor: Tutor }): React.JSX.Element {
  return (
    <Card className="group border-none shrink-0 lg:shadow-none w-full max-w-[317px] rounded-[15px] lg:rounded-none shadow-[0px_2px_4px_#00000040] pb-4 lg:pb-0">
      <CardContent className="p-0 w-full flex flex-col">
        <div className="relative">
          <div className="w-full h-[300px]">
            <Image
              src={tutor.image}
              alt={tutor.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary border-2 border-[#f8f6f4] text-center text-white">
            <span className="font-bold text-xl">{tutor.price}</span>
            <span className="text-sm">per hour</span>
          </div>
        </div>
        <div className="mt-12 px-[30px]">
          <div className="flex items-center">
            <span className="text-sm text-[#9b9ea1]">By:</span>
            <span className="text-zeus ml-2 group-hover:text-secondary ease-in-out transition-all">
              {tutor.name}
            </span>
          </div>

          <h3 className="mt-2 font-medium text-2xl text-zeus group-hover:text-secondary ease-in-out transition-all">
            {tutor.course}
          </h3>

          <div className="flex items-center gap-4 mt-4 text-[#ffa300] group-hover:text-zeus ease-in-out transition-all w-full">
            <span>{tutor.duration}</span>
            <div className="w-1 h-1 rounded-full bg-[#0a4d3c]" />
            <span>{tutor.lectures} Lectures</span>
          </div>
        </div>

        {/* Hidden on mobile, visible from md+ */}
        <Button className="hidden md:inline-flex text-xl h-auto py-4 px-10 rounded-full bg-secondary hover:bg-primary mx-auto mt-10 max-w-[270px] w-full">
          Book Class
        </Button>
      </CardContent>
    </Card>
  );
}

function RecentlyCalledTutors(): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const cardWidth =
        scrollEl.firstElementChild instanceof HTMLElement
          ? scrollEl.firstElementChild.offsetWidth + 24 // gap-6 = 1.5rem = 24px
          : 0;
      const scrollLeft = scrollEl.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center py-4 lg:py-14 px-4 font-montserrat">
      <div className="flex flex-col max-w-7xl items-start mx-auto gap-7 lg:gap-14 w-full">
        <h2 className="text-zeus text-base font-aero-trial md:text-5xl font-medium">
          You recently Called:
        </h2>

        <div className="w-full">
          <ScrollArea ref={scrollRef}>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 px-1 overflow-x-auto md:overflow-visible scroll-smooth scrollbar-hide">
              {tutors.length > 0 ? (
                tutors.map((tutor, i) => (
                  <FeaturedTutorCard key={i} tutor={tutor} />
                ))
              ) : (
                <Empty className="">
                  <EmptyHeader>
                    <EmptyMedia variant="icon" className="bg-transparent">
                      <SearchX />
                    </EmptyMedia>
                    <EmptyTitle>No Tutors</EmptyTitle>
                    <EmptyDescription>
                      You haven&apos;t called any tutors yet
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Pagination Dots (only visible on mobile) */}
        {tutors.length > 0 && <div className="flex justify-center gap-2 mt-4 md:hidden w-full">
          {tutors.map((_, index) => (
            <span
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-4 bg-secondary" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>}

        {/* View More button (only visible on mobile) */}
        <div className="flex justify-center w-full md:hidden">
          <button className="bg-secondary px-12 py-3 rounded-full text-white font-semibold">
            View More Tutors
          </button>
        </div>
      </div>
    </section>
  );
}

export default RecentlyCalledTutors;
