"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Clock, DollarSign, Star } from "lucide-react";
import AboutTutor from "@/components/tutors/AboutTutor";
import MyQualificationsSection from "@/components/tutors/QualificationsSection";
import DashboardTabs from "@/components/tutors/DashboardTabs";

const tutor = {
  name: "Ryan Patterson",
  rating: 4.8,
  reviewCount: 200,
  avatar: "/images/tutor-1.png",
  countryFlag: "/images/flags/usa.png",
  badges: [
    { text: "Grade 1-4", color: "bg-[#7c4cff26] text-[#7c4cff]" },
    { text: "Age 4-12", color: "bg-[#4c76ff26] text-[#4c76ff]" },
    { text: "4 Subjects", color: "bg-[#ff9d4c26] text-[#ff9d4c]" },
    { text: "WAT Joint", color: "bg-[#c6f6d5] text-[#038536]" },
  ],
  online: true,
  price: 98,
  schedule: "Mon - Sat",
  ongoingClass: 1,
  duration: "30mins",
  subjects: ["Mathematics", "History", "Physics", "Music"],
  joinDate: "29, May 2025",
};

export default function TutorProfile() {
  return (
    <div className="flex flex-col gap-6 items-center py-10">
      {/* Card + Video Side by Side */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl items-stretch">
        {/* Tutor Card */}
        <Card className="flex flex-col md:flex-row  gap-6 p-6 rounded-xl shadow-md flex-1 h-full">
          {/* Left Profile Section */}
          <div className="flex flex-col items-center gap-3 min-w-[160px]">
            <Image
              src={tutor.avatar}
              alt={tutor.name}
              width={200}
              height={200}
              className="rounded-full object-cover border-4 border-green-500 shadow"
            />
            <p className="text-green-600 text-sm font-semibold">
              {tutor.online ? "ONLINE" : "OFFLINE"}
            </p>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            {/* Name + Flag */}
            <div className="flex items-center gap-2">
              <Image
                src={tutor.countryFlag}
                alt="Flag"
                width={20}
                height={14}
                className="rounded-sm"
              />
              <h1 className="text-[48px] font-aero-trial font-medium md:text-2xl ">
                {tutor.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-medium">{tutor.rating}/5</span>
              <div className="flex text-yellow-500">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(tutor.rating) ? "fill-current" : ""
                      }`}
                    />
                  ))}
              </div>
              <span className="text-lg text-gray-500">
                {tutor.reviewCount} Reviews
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {tutor.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 text-lg rounded-md font-medium ${badge.color}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>

            {/* Details */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-2xl text-gray-800">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {tutor.duration}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />${tutor.price}/class
                </div>
              </div>
              <div>{tutor.schedule}</div>
              <div className="text-green-600 font-medium">
                {tutor.ongoingClass} Ongoing Class
              </div>
            </div>

            {/* Subjects */}
            <div className="mt-3 text-2xl text-gray-700">
              {tutor.subjects.join(". ")}.
            </div>

            {/* Joined */}
            <p className="mt-2 text-lg flex items-end justify-end text-gray-500 uppercase">
              Joined {tutor.joinDate}
            </p>
          </div>
        </Card>

        {/* Video Section (separate card) */}
        <div className="relative w-[300px] overflow-hidden rounded-lg shadow">
          <Image
            src={tutor.avatar}
            alt="Tutor video preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Buttons Outside Card */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-6xl justify-start">
        <Button className="bg-primary text-white px-6 rounded-full">
          Book Introduction Call
        </Button>
        <Button className="bg-secondary text-white px-6 rounded-full">
          Book A Class
        </Button>
        <Button variant="outline" className="px-6 rounded-full">
          Send Message
        </Button>
      </div>
      <DashboardTabs />
    </div>
  );
}
