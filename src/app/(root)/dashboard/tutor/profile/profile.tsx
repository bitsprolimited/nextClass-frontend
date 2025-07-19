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
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { JSX } from "react";
import AboutTutor from "@/components/tutors/AboutTutor";
import MyQualificationsSection from "@/components/tutors/QualificationsSection";

// export const Profile = (): JSX.Element => {
//   const { data: user, isLoading, isError } = useUser();

//   if (isLoading) return <Loader />;
//   if (isError || !user) return <ErrorComponent />;

//   const address = Object.values(user.user.address).join(", ");
export default function Profile() {
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
          <div className="flex justify-between gap-10 items-center">
            <p className="text-green-600 font-semibold mt-2">ONLINE</p>
            <button className="text-sm font-medium text-[#031D95] hover:underline mt-2">
              Change Image
            </button>
          </div>
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
            <div className="flex flex-col">
              <h1 className="font-aero">Ryan Patterson</h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-[#2c241b] font-medium text-sm">4.8/5</p>
                <div className="flex text-yellow-500">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                </div>
                <p className="text-[#666] text-sm">200 Reviews</p>
              </div>
            </div>
            {/* {user.user.fullName} */}
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
              <span>4 Learners</span>
              {/* {user.user?.children?.length || 0} */}
            </div>
            <div className="flex flex-col gap-2">
              <Users className="w-5 h-5" />
              <span>Mon - Sat</span>
            </div>
            <div className="flex flex-col gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Mathematics. History. Physics. Music.</span>
            </div>
          </div>

          <div className="text-right text-sm text-[#031d9580] font-medium mt-6">
            JOINED {}
          </div>
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
            090xxxxxxxx
            {/* {user.user.phoneNumber} */}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="bg-[#4cff9a45] border border-[#4cff99] p-4 rounded-lg">
            <Mail className="w-[34px] h-[34px]" color="#039536" />
          </div>
          <p className="text-[#292d32] font-medium text-lg">
            ryan@gmail.com
            {/* {user.user.email} */}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4">
          <div className="bg-[#ff4cff45] border border-[#ff4cff] p-4 rounded-lg">
            <MapPin className="w-[34px] h-[34px]" color="#8B0395" />
          </div>
          <p className="text-[#2c241b] font-medium text-lg">Wuse</p>
        </div>
      </div>
      {/* Divider */}
      <hr className="w-full max-w-6xl border-t border-gray-300 my-8" />

      <AboutTutor />
      <MyQualificationsSection />
    </div>
  );
}
