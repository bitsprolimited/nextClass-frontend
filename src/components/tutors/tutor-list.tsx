"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTutors } from "@/hooks/useTutors";
import { cn } from "@/lib/utils";
import { Teacher } from "@/types";
import {
  BookOpen,
  DollarSign,
  Filter,
  Search,
  Star,
  Watch,
} from "lucide-react";
import React from "react";
import ErrorComponent from "../ErrorComponent";
import Loader from "../Loader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Rating } from "../ui/rating";

const FILTERS = [
  {
    label: "Age",
    value: "all",
  },
  {
    label: "Grade",
    value: "maths",
  },
  {
    label: "Subjects",
    value: "physics",
  },
  {
    label: "Schedule",
    value: "chemistry",
  },
  {
    label: "Cost",
    value: "chemistry",
  },
];

type Tutor = {
  name: string;
  rating: number;
  image: string;
  reviewCount: number;
  badges: { text: string; color: string }[];
  details: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    color?: string;
  }[];
};

function TutorCard({ tutorData }: { tutorData: Tutor }): React.JSX.Element {
  return (
    <Card className="relative w-full max-w-[400px] bg-white rounded-[10px] p-0 border-none">
      {/* ==== MOBILE VERSION ==== */}
      <div className="flex flex-col md:hidden">
        {/* Avatar + Name + Rating */}
        <div className="flex gap-3 items-center p-4">
          <Avatar className="w-[60px] h-[60px] shadow-[0px_4px_4px_#00000040]">
            <AvatarImage src={tutorData.image} />
            <AvatarFallback>{tutorData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-zeus">🇳🇬</span>
              <h2 className="font-medium text-base text-zeus">
                {tutorData.name}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-zeus text-xs font-medium">
                {tutorData.rating}
              </p>
              <Rating value={Number(tutorData.rating)} readOnly />
              <p className="opacity-50 text-zeus text-xs">
                ({tutorData.reviewCount})
              </p>
            </div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 py-2">
              {tutorData.badges.map((badge, index) => (
                <Badge key={index} className={`${badge.color} text-xs`}>
                  {badge.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Details in gray container */}
        <div className="bg-[#f5f4f8] px-4 py-3 w-full">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {tutorData.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm min-w-[45%]"
              >
                <detail.icon className="w-4 h-4 shrink-0" />
                <p className={cn(detail.color, "font-medium break-words")}>
                  {detail.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons in blue footer */}
        <div className="bg-[#002b9a] flex justify-center gap-2 px-4 py-4">
          <Button className="w-1/2 h-auto bg-white text-secondary hover:bg-gray-100">
            View Full Profile
          </Button>
          <Button className="w-1/2 h-auto border border-white text-white bg-transparent hover:bg-white hover:text-secondary">
            Schedule a Meeting
          </Button>
        </div>
      </div>

      {/* ==== DESKTOP VERSION ==== */}
      <div className="hidden md:block w-full">
        <CardContent className="flex flex-col gap-4 mt-4 pt-10 group hover:bg-primary w-full rounded-[10px]">
          {/* Avatar */}
          <div className="w-[120px] h-[120px] mx-auto absolute left-1/2 -top-[60px] -translate-x-1/2">
            <Avatar className="w-full h-full shadow-[0px_4px_4px_#00000040]">
              <AvatarImage src={tutorData.image} />
              <AvatarFallback>{tutorData.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Name + Rating */}
          <div className="flex flex-col items-center gap-2 mt-16">
            <div className="flex items-center gap-2">
              <span className="font-medium text-2xl text-zeus">🇳🇬</span>
              <h2 className="capitalize font-medium text-2xl text-zeus group-hover:text-white">
                {tutorData.name}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-zeus text-[10px] font-medium group-hover:text-gray-200">
                {tutorData.rating}
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="fill-yellow-500 text-yellow-500 w-3 h-3"
                  />
                ))}
              </div>
              <p className="opacity-50 text-zeus text-[10px] group-hover:text-gray-200">
                ({tutorData.reviewCount})
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex justify-between flex-wrap gap-2">
            {tutorData.badges.map((badge, index) => (
              <Badge
                key={index}
                className={`${badge.color} text-xs group-hover:bg-white`}
              >
                {badge.text}
              </Badge>
            ))}
          </div>

          <div className="relative w-full">
            {/* Details */}
            <div className="transition-opacity duration-300 group-hover:opacity-0">
              <ul className="flex flex-wrap justify-between gap-[8px_20px] w-full">
                {tutorData.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <detail.icon className="w-4 h-4" />
                    <p className={cn(detail.color, "font-medium")}>
                      {detail.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hover Buttons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex justify-center gap-2">
              <Button className="h-auto bg-secondary hover:text-secondary hover:bg-white border-secondary border-2">
                View Profile
              </Button>
              <Button className="h-auto hover:bg-secondary text-secondary hover:text-white bg-white border-secondary border-2">
                Schedule a Meeting
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function TutorList(): React.JSX.Element {
  const { data, isLoading, error } = useTutors();

  const mapTeacherToTutor = (teacher: Teacher) => ({
    name: teacher.fullName,
    rating: teacher.rating,
    reviewCount: teacher.ratingCount,
    image: teacher.profilePicture || "",
    badges: [
      {
        text: teacher.grades[0],
        color: "bg-green-100 text-green-800",
      },
      {
        text: `${teacher.experience}+ yrs`,
        color: "bg-blue-100 text-blue-800",
      },
      {
        text: `${teacher.subjects?.length} subjects`,
        color: "text-[#ff9d4c] bg-[#ff9d4c4c]",
      },
    ],
    details: [
      {
        icon: Star,
        text: `${teacher.rating} rating`,
      },
      {
        icon: Star,
        text: `${teacher.experience} exp`,
      },
      {
        icon: DollarSign,
        text: `$${teacher.hourlyRate}/hr`,
      },
      {
        icon: Watch,
        text: "1 ongoing class",
        color: "text-[#7c4cff]",
      },
      {
        icon: BookOpen,
        text: `${teacher.subjects.map((subject) => subject).join(", ")}`,
      },
    ],
  });

  if (isLoading) {
    return <Loader className="py-14" />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <section className="py-[140px] px-4">
      <div className="container flex flex-col items-center justify-center gap-[60px] w-full max-w-7xl mx-auto">
        {/* Search & Filters Wrapper */}
        <div className="flex flex-col items-start p-5 gap-2 bg-[#f5f4f8] w-full">
          {/* Search Row */}
          <div className="flex w-full items-center gap-3">
            {/* Input + Search (pilled container on mobile, inline on desktop) */}
            <div className="flex w-full justify-between items-center py-2 pr-2 shadow-[0px_4px_4px_#031d9540] focus-within:ring-1 focus-within:ring-primary rounded-full">
              <Input
                type="text"
                className="h-[50px] px-4 w-full shadow-none border-none font-medium text-[#757575] text-base sm:text-lg bg-transparent focus-visible:ring-0"
                placeholder="Search Subjects or Tutors here"
              />
              <Button className="px-5 sm:px-8 py-2 sm:py-3 rounded-full h-auto font-medium text-sm sm:text-base hover:bg-secondary">
                <Search className="w-4 h-4 mr-1" /> Search
              </Button>
            </div>

            {/* Filter Button (only visible on mobile) */}
            <Button className="flex sm:hidden flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#D9E2FF] text-primary font-medium shadow-sm">
              <Filter className="w-5 h-5" />
              <span className="text-xs">Filter</span>
            </Button>
          </div>

          {/* Dropdown Filters (hidden on mobile, shown on desktop) */}
          <div className="hidden sm:flex items-start gap-9 pt-5 w-full self-stretch">
            {FILTERS.map((filter, index) => (
              <div className="w-full" key={index}>
                <Select>
                  <SelectTrigger className="inline-flex h-auto rounded-sm gap-5 pl-5 pr-8 shadow-[0px_2px_4px_#031d9540] bg-white text-[#52565b] font-medium text-lg">
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={filter.value}>{filter.label}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data?.teachers.map((teacher, i) => (
            <TutorCard key={i} tutorData={mapTeacherToTutor(teacher)} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TutorList;
