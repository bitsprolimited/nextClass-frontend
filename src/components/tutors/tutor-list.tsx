import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  Search,
  Star,
  Watch,
} from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

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
  rating: string;
  image: string;
  reviewCount: number;
  badges: { text: string; color: string }[];
  details: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    color?: string;
  }[];
};

export const TUTORS = [
  {
    name: "Ade Adeyemi",
    rating: "4.5/5",
    image: "/images/tutor-1.png",
    reviewCount: 5,
    badges: [
      { text: "Grade 1-4", color: "text-[#7c4cff] bg-[#7c4cff4c]" },
      { text: "Age 4-6", color: "text-[#4c76ff] bg-[#4c76ff4c]" },
      { text: "4 Subjects", color: "text-[#ff9d4c] bg-[#ff9d4c4c]" },
    ],
    details: [
      {
        icon: Clock,
        text: "30mins/class",
      },
      {
        icon: DollarSign,
        text: "$1000/class",
      },
      {
        icon: Calendar,
        text: "mon - fri",
      },
      {
        icon: Watch,
        text: "1 ongoing class",
        color: "text-[#7c4cff]",
      },
      { icon: BookOpen, text: "Maths, Physics, Chemistry" },
    ],
  },
  {
    name: "Ade Adeyemi",
    rating: "4.5/5",
    image: "/images/tutor-1.png",
    reviewCount: 5,
    badges: [
      { text: "Grade 1-4", color: "text-[#7c4cff] bg-[#7c4cff4c]" },
      { text: "Age 4-6", color: "text-[#4c76ff] bg-[#4c76ff4c]" },
      { text: "4 Subjects", color: "text-[#ff9d4c] bg-[#ff9d4c4c]" },
    ],
    details: [
      {
        icon: Clock,
        text: "30mins/class",
      },
      {
        icon: DollarSign,
        text: "$1000/class",
      },
      {
        icon: Calendar,
        text: "mon - fri",
      },
      {
        icon: Watch,
        text: "1 ongoing class",
        color: "text-[#7c4cff]",
      },
      { icon: BookOpen, text: "Maths, Physics, Chemistry" },
    ],
  },
  {
    name: "Ade Adeyemi",
    rating: "4.5/5",
    image: "/images/tutor-1.png",
    reviewCount: 5,
    badges: [
      { text: "Grade 1-4", color: "text-[#7c4cff] bg-[#7c4cff4c]" },
      { text: "Age 4-6", color: "text-[#4c76ff] bg-[#4c76ff4c]" },
      { text: "4 Subjects", color: "text-[#ff9d4c] bg-[#ff9d4c4c]" },
    ],
    details: [
      {
        icon: Clock,
        text: "30mins/class",
      },
      {
        icon: DollarSign,
        text: "$1000/class",
      },
      {
        icon: Calendar,
        text: "mon - fri",
      },
      {
        icon: Watch,
        text: "1 ongoing class",
        color: "text-[#7c4cff]",
      },
      { icon: BookOpen, text: "Maths, Physics, Chemistry" },
    ],
  },
];

function TutorCard({ tutorData }: { tutorData: Tutor }): React.JSX.Element {
  return (
    <Card className="relative w-full max-w-[400px] md:max-w-none bg-white rounded-[10px] p-0 border-none">
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
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="fill-yellow-500 text-yellow-500 w-3 h-3"
                  />
                ))}
              </div>
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
      <div className="hidden md:block">
        <CardContent className="flex flex-col gap-4 mt-4 pt-10 group hover:bg-primary rounded-[10px]">
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
              <h2 className="font-medium text-2xl text-zeus group-hover:text-white">
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

          {/* Details */}
          <div className="w-full group-hover:hidden">
            <ul className="flex flex-wrap justify-between gap-[8px_20px]">
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
          <div className="hidden group-hover:flex justify-center gap-2 mt-10">
            <Button className="h-auto bg-secondary hover:text-secondary hover:bg-white border-secondary border-2">
              View Profile
            </Button>
            <Button className="h-auto hover:bg-secondary text-secondary hover:text-white bg-white border-secondary border-2">
              Schedule a Meeting
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function TutorList(): React.JSX.Element {
  return (
    <section className="py-[140px] px-4">
      <div className="container flex flex-col items-center justify-center gap-[60px] w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-start p-5 gap-2 bg-[#f5f4f8] w-full">
          <div className="flex w-full justify-between items-center py-3 pr-6 shadow-[0px_4px_4px_#031d9540] focus-within:ring-1 focus-within:ring-primary rounded-sm">
            <Input
              type="text"
              className="h-[60px] px-5 py-[20px] w-full shadow-none border-none font-medium text-[#757575] text-2xl bg-transparent focus-visible:ring-0"
              placeholder="Search subjects or tutors here..."
            />
            <Button className="px-[50px] py-4 rounded-full h-auto font-medium text-lg hover:bg-secondary">
              <Search className="w-4 h-4" /> Search
            </Button>
          </div>
          <div className="flex items-start gap-9 pt-5 w-full self-stretch">
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
            {/* <Button className="text-xl h-auto py-4 px-10 rounded-full bg-secondary hover:bg-primary">
            Filter
          </Button> */}
          </div>
        </div>
        <div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {TUTORS.map((tutor, index) => (
            <TutorCard key={index} tutorData={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TutorList;
