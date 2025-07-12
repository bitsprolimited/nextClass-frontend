"use client";
import ErrorComponent from "@/components/ErrorComponent";
import Loader from "@/components/Loader";
import LearnersSection from "@/components/parents/learnersSection";
import LessonNotesSection from "@/components/parents/lessonNotesSection";
import TransactionsHistory from "@/components/parents/transactionHistory";
import Link from "next/link";
import ReviewsPanel from "@/components/tutors/ReviewsPanel";
import { useUser } from "@/hooks/useUser";
import {
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import { JSX } from "react";

export const Profile = (): JSX.Element => {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <Loader />;
  if (isError || !user) return <ErrorComponent />;

  const address = Object.values(user.user.address).join(", ");

  return (
    <div className="flex flex-col gap-8 items-center py-10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/ryan.png" // Make sure this matches your image path
            alt="Ryan Patterson"
            width={496}
            height={496}
            className="rounded-full  object-cover"
          />
          <p className="text-green-600 font-semibold mt-2">ONLINE</p>
        </div>

        {/* Info Card */}
        <div className="bg-[#f4f4f4] p-6 md:p-8 rounded-xl shadow w-full">
          <div className="flex justify-between items-center mb-6">
            <span className="bg-[#031d95] text-white text-sm px-4 py-1 rounded-md font-medium">
              Parent
            </span>

            <Link href="/dashboard/parent/edit" passHref>
              <button className="text-sm font-medium text-[#031D95] hover:underline">
                Edit Profile
              </button>
            </Link>
          </div>

          <div className="mt-4 flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#2c241b]">
            <Image
              src="/images/USA.png"
              alt="US Flag"
              className="inline-block rounded-sm"
              width={68}
              height={32}
            />
            <h1 className="font-aero">{user.user.fullName}</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 mt-8 text-[#2c241b]">
            <div className="flex flex-col gap-2">
              <Clock className="w-5 h-5" />
              <span>0 classes Attended</span>
            </div>
            <div className="flex flex-col gap-2">
              <DollarSign className="w-5 h-5" />
              <span>$0 paid</span>
            </div>
            <div className="flex flex-col gap-2">
              <Users className="w-5 h-5" />
              <span>{user.user?.children?.length || 0} Learners</span>
            </div>
            <div className="flex flex-col gap-2 text-green-700">
              <PlayCircle className="w-5 h-5" />
              <span>0 Ongoing Class</span>
            </div>
          </div>

          {/* <div className="text-right text-sm text-[#031d9580] font-medium mt-6">
            JOINED {}
          </div> */}
        </div>
      </div>

      {/* Contact Info */}
      <div className="w-full max-w-6xl mt-8 p-6 flex flex-wrap gap-6 justify-center md:justify-between">
        {/* Phone */}
        <div className="flex items-center gap-4">
          <div className="bg-[#4c76ff45] border border-[#4c75ff] p-4 rounded-lg">
            <Phone className="w-[34px] h-[34px]" />
          </div>
          <p className="text-[#292d32] font-medium text-lg">
            {user.user.phoneNumber}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="bg-[#4cff9a45] border border-[#4cff99] p-4 rounded-lg">
            <Mail className="w-[34px] h-[34px]" color="#039536" />
          </div>
          <p className="text-[#292d32] font-medium text-lg">
            {user.user.email}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4">
          <div className="bg-[#ff4cff45] border border-[#ff4cff] p-4 rounded-lg">
            <MapPin className="w-[34px] h-[34px]" color="#8B0395" />
          </div>
          <p className="text-[#2c241b] font-medium text-lg">{address}</p>
        </div>
      </div>
      {/* Divider */}
      <hr className="w-full max-w-6xl border-t border-gray-300 my-8" />
      <LearnersSection learners={user.user.children} />
      <LessonNotesSection />
      <ReviewsPanel />
      <TransactionsHistory />
    </div>
  );
};
