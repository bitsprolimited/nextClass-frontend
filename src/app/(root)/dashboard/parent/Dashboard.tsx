"use client";

import TutorList from "@/components/tutors/tutor-list";
import { Button } from "@/components/ui/button";

import AlertRotator from "@/components/alerts/AlertRotator";
import HowItWorksSection from "@/components/landing/how-it-works";
import LearnersList from "@/components/parents/LearnersList";
import RecentlyCalledTutors from "@/components/parents/recentlyCalledTutors";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

import ErrorComponent from "@/components/ErrorComponent";
import Loader from "@/components/Loader";
import UpcomingCallTabs from "@/components/parents/upcoming-Introductory";

export default function Dashboard() {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <Loader />;
  if (isError || !user) return <ErrorComponent />;

  return (
    <>
      {/* Header Section */}
      <div className="flex w-full bg-[#F8F7FC] font-montserrat">
        <div className="w-full max-w-7xl mx-auto py-5 lg:py-[60px] space-y-5 lg:space-y-10">
          <div className="flex  md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 px-5">
            <div>
              <h1 className="text-[20px] md:text-[48px] font-medium text-[#2C1E1E] tracking-normal font-aero-trial">
                My Dashboard
              </h1>
              <p className="text-[#544E4E] text-xs md:text-lg mt-1">
                What would you like to do?
              </p>
            </div>

            <Link href="/dashboard/schedule" passHref>
              <Button className="bg-[#FFA500] hover:bg-[#FFA500]/90 text-white rounded-full px-5 py-2 md:px-8 md:py-3 text-[12px] md:text-base font-medium w-full md:w-auto h-auto">
                View Schedule
              </Button>
            </Link>
          </div>

          {/* Alert Banner */}
          <AlertRotator user={user.user} />
          {/* Main Dashboard Content */}
          <div className="flex flex-col-reverse lg:flex-row gap-6">
            {/* Upcoming Class */}
            <UpcomingCallTabs />

            {/* Student List */}
            <LearnersList learners={user?.user?.children} />
          </div>
        </div>
      </div>
      <div className="pt-4lg:pt-10 bg-white">
        <RecentlyCalledTutors />
        <TutorList />
        <HowItWorksSection />
      </div>
    </>
  );
}
