import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { tutors } from "@/lib/constants";
import { Button } from "../ui/button";

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
    <Card className="group border-none shadow-none w-full max-w-[360px]">
      <CardContent className="p-0">
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
      </CardContent>
    </Card>
  );
}

function RecentlyCalledTutors(): React.JSX.Element {
  return (
    <section className="flex flex-col justify-center items-center py-14 px-4">
      <div className="flex flex-col max-w-7xl items-start mx-auto gap-14">
        <h2 className="text-zeus text-5xl font-medium ">
          You recently Called:{" "}
        </h2>

        <div className="flex flex-col items-start gap-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {tutors.map((tutor) => (
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

export default RecentlyCalledTutors;
