"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Calendar1,
  Clock,
  DollarSign,
  Mail,
  Star,
  Watch,
} from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";

import DashboardTabs from "@/components/tutors/DashboardTabs";
import { useTutor } from "@/hooks/useTutors";
import { getScheduleString } from "@/lib/utils";
import { format } from "date-fns";
import Loader from "@/components/Loader";
import ErrorComponent from "@/components/ErrorComponent";
import { BookIntroductoryCallModal } from "@/components/modals/BookIntroductoryCallModal";
import { Session } from "@/services/session";
import { BookAClassModal } from "@/components/modals/bookAClass/BookAClassModal";

export default function TutorProfile({
  id,
  session,
}: {
  id: string;
  session: Session | null;
}) {
  const { data: tutor, isLoading, error } = useTutor(id);

  if (isLoading) return <Loader />;
  if (error) return <ErrorComponent />;

  const badges = [
    { text: tutor?.grades[0], color: "bg-[#7c4cff26] text-[#7c4cff]" },
    { text: "Age 4-12", color: "bg-[#4c76ff26] text-[#4c76ff]" },
    {
      text: `${tutor?.subjects?.length} subjects`,
      color: "bg-[#ff9d4c26] text-[#ff9d4c]",
    },
    { text: tutor?.timezone, color: "bg-[#c6f6d5] text-[#038536]" },
  ];

  console.log(tutor);

  const schedule = getScheduleString(tutor?.availability || []);
  return (
    <div className="flex flex-col gap-6 items-center py-10">
      {/* Card + Video Side by Side */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl items-center">
        {/* Tutor Card */}
        <Card className="flex flex-col md:flex-row  gap-6 p-6 rounded-xl shadow-md flex-1 h-full font-montserrat">
          {/* Left Profile Section */}
          <div className="flex flex-col items-center gap-3 min-w-[160px]">
            <Image
              src={tutor?.profilePicture || "/images/tutor-1.png"}
              alt={tutor?.fullName || "Tutor"}
              width={200}
              height={200}
              className="rounded-full size-[200px] object-cover border-4 border-green-500 shadow"
            />
            <p className="text-green-600 text-sm font-semibold">
              {true ? "ONLINE" : "OFFLINE"}
            </p>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            {/* Name + Flag */}
            <div className="flex items-center gap-2">
              <Image
                src={"/images/USA.png"}
                alt="Flag"
                width={20}
                height={14}
                className="rounded-sm"
              />
              <h1 className="text-[48px] font-aero-trial font-medium md:text-2xl capitalize">
                {tutor?.fullName}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-medium">{tutor?.rating}/5</span>
              <div className="flex text-yellow-500">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(Number(tutor?.rating))
                          ? "fill-current"
                          : ""
                      }`}
                    />
                  ))}
              </div>
              <span className="text-lg text-gray-500">{0} Reviews</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-md font-medium text-sm ${badge.color}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 items-start gap-x-6 gap-y-2 mt-5 text-lg text-gray-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {"1hr"}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />${tutor?.hourlyRate}/class
              </div>
              <div className="flex items-center gap-2">
                <Calendar1 className="size-4" />
                {schedule}
              </div>
              <div className="flex items-center gap-2 text-[#007b0c] font-medium">
                <Watch className="size-4" />
                {1} Ongoing Class
              </div>
            </div>

            {/* Subjects */}
            <div className="mt-3 text-lg text-gray-700 flex items-center gap-2 capitalize">
              <BookOpen className="size-4" />
              {tutor?.subjects.join(". ")}.
            </div>

            {/* Joined */}
            <p className="mt-4 text-[#031d9580] text-xs flex items-end justify-end uppercase">
              Joined {format(tutor?.createdAt || new Date(), "PPP")}
            </p>
          </div>
        </Card>

        {/* Video Section (separate card) */}
        <div className="relative w-[300px] overflow-hidden rounded-lg shadow h-full">
          <ReactPlayer
            src={tutor?.introductionVideoUrl}
            poster={tutor?.profilePicture || "/images/tutor-1.png"}
            className="object-cover w-full h-full"
            controls
            autoPlay
            muted
            crossOrigin="anonymous"
            loop
            width="100%"
            height="100%"
          />
        </div>
      </div>

      {/* Buttons Outside Card */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-6xl justify-start">
        {tutor && (
          <BookIntroductoryCallModal
            session={session}
            tutor={tutor}
            duration={15}
          />
        )}
        {tutor && (
          <BookAClassModal session={session} tutor={tutor} duration={30} />
        )}
        <Button variant="outline" className="px-6 rounded-full">
          <Mail className="w-4 h-4" /> Send Message
        </Button>
      </div>
      {tutor && <DashboardTabs tutor={tutor} />}
    </div>
  );
}
