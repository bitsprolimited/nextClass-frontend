// app/dashboard/page.tsx
"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useMemo, useState } from "react";

import AlertRotator from "@/components/alerts/AlertRotator";
import ErrorComponent from "@/components/ErrorComponent";
import Loader from "@/components/Loader";

import { useUser } from "@/hooks/useUser";

import UpcomingIntroductionTabs from "@/components/parents/upcoming-Introductory";
import { useModalStore } from "@/store/useModal";
import { Teacher } from "@/types";

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: user, isLoading, isError } = useUser();
  const { openModal } = useModalStore();

  // ✅ Dynamic checklist based on user data
  const steps = useMemo(() => {
    if (!user?.user) return [];

    const userData = user.user as Teacher;

    return [
      {
        id: 1,
        label: "Add a Payment Method",
        completed: !!userData.bankDetails?.accountNumber,
      },
      {
        id: 2,
        label: "Career Experience",
        completed: !!(userData.experience && userData.experience),
      },
      {
        id: 3,
        label: "Add Full Address",
        completed: !!(
          userData.address?.street &&
          userData.address?.city &&
          userData.address?.state &&
          userData.address?.country
        ),
      },
      {
        id: 4,
        label: "Education",
        completed: !!(
          userData.qualifications && userData.qualifications.length > 0
        ),
      },
      {
        id: 5,
        label: "Add Profile Picture",
        completed: !!(
          userData.profilePicture && userData.profilePicture.trim().length > 0
        ),
      },
      {
        id: 6,
        label: "Add Introductory Video",
        completed: !!(
          userData.introductionVideoUrl &&
          userData.introductionVideoUrl.trim().length > 0
        ),
      },
      {
        id: 7,
        label: "Accept First Introductory Call",
        completed: userData.isProfileComplete || false,
      },
    ];
  }, [user]);

  if (isLoading) return <Loader />;
  if (isError || !user) return <ErrorComponent />;

  return (
    <>
      <div className="min-h-screen bg-[#F8F7FC]">
        <div className="flex w-full py-10 px-6">
          <div className="flex flex-col max-w-7xl mx-auto w-full space-y-10">
            {/* Header */}
            <div className="flex sm:flex-row justify-between items-start sm:items-center">
              <div className="flex flex-col item-start gap-1">
                <h1 className="text-xl sm:text-5xl font-medium font-aero-trial text-zeus">
                  My Dashboard
                </h1>
                <p className="text-zeus">Are you ready to teach today?</p>
              </div>

              <ButtonGroup>
                <Button
                  variant="outline"
                  className="bg-primary hover:bg-secondary h-auto text-white rounded-full px-4 sm:px-8 py-3 text-base font-medium"
                >
                  View My Schedule
                </Button>
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="pl-2! py-3 h-auto text-base font-medium bg-primary hover:bg-secondary text-white"
                    >
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="[--radius:1rem]">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => openModal("setAvailability", {})}
                      >
                        <Calendar />
                        Set Availability
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </div>
            {/* Alert Box */}
            <AlertRotator user={user.user as Teacher} />
            {/* Next Class Card */}
            {/* <div className="bg-[#FFF5E9] rounded-xl shadow-md mt-6 flex flex-col w-full md:max-w-7xl md:mx-auto">
              <div className="relative pt-6 px-6 md:pt-4 md:pl-6 md:pr-4">
                <h2 className="hidden md:block text-2xl font-bold font-aero-trial text-gray-800 tracking-wide md:self-start">
                  Your Next Class
                </h2>

                <div className="flex items-center justify-between md:hidden">
                  <h2 className="text-lg font-bold font-aero-trial text-gray-800 tracking-wide">
                    Your Next Class
                  </h2>
                  <button className="bg-[#FF9500] hover:bg-[#E38500] text-white font-semibold px-4 py-1.5 rounded-full text-sm">
                    Join Class
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 pt-2 w-full">
                <div className="flex items-start md:items-center gap-4 md:gap-6 grow">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                    <Image
                      src="/images/tutor-3.png"
                      alt="Class Tutor"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h1 className="text-base md:text-[32px] font-medium font-aero-trial text-gray-900 mb-1 md:mb-2">
                      Basics of Algebra
                    </h1>
                    <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-xl text-gray-700 font-medium items-center">
                      <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                        <MdOutlineCalendarMonth />
                        <span>Mon, May 26</span>
                      </div>
                      <div className="hidden md:block w-px h-6 bg-gray-300 mx-3 self-center" />
                      <div className="flex flex-col mt-3 md:items-center leading-none">
                        <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                          <Clock className="w-3 h-3 text-gray-600" />
                          <span>9:00am - 9:30</span>
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-500 md:ml-2 ml-5 md:pt-0.5">
                          30 minutes
                        </span>
                      </div>
                      <div className="hidden md:block w-px h-6 bg-gray-300 mx-3 self-center" />
                      <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                        <IoBookOutline />
                        <span>Mathematics</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block md:ml-6">
                  <button className="bg-[#FF9500] hover:bg-[#E38500] text-white font-semibold py-3 md:py-4 px-8 rounded-full transition duration-200 shadow-md">
                    Join Class
                  </button>
                </div>
              </div>
            </div> */}
            {/* Two-column Section */}
            <div className="flex flex-col-reverse lg:flex-row gap-6">
              {/* Upcoming Intro Tab */}
              <UpcomingIntroductionTabs />

              {/* Profile Setup Checklist Card */}
              <div className="w-full lg:max-w-[360px] h-full rounded-2xl bg-[#f8f6f4] shadow-md p-6 flex flex-col">
                {/* Header */}
                <h2 className="text-2xl font-bold font-aero-trial leading-tight text-gray-900 mb-6">
                  Finish Setting Up <br />
                  your Profile.
                </h2>

                {/* Desktop view */}
                <div className="hidden sm:flex flex-col justify-between flex-1 divide-y divide-gray-200">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className="w-full flex items-center justify-between flex-1 py-3"
                    >
                      <div className="flex items-center gap-3">
                        {step.completed ? (
                          <CheckCircle className="text-[#1B55E3] w-5 h-5" />
                        ) : (
                          <AlertCircle className="text-[#FF7A00] w-5 h-5" />
                        )}
                        <span
                          className={`text-base font-semibold ${
                            step.completed ? "text-gray-900" : "text-gray-800"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile carousel view */}
                <div className="flex sm:hidden gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className="shrink-0 w-60 shadow-sm snap-center px-4 py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {step.completed ? (
                          <CheckCircle className="text-primary w-5 h-5" />
                        ) : (
                          <AlertCircle className="text-secondary w-5 h-5" />
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            step.completed ? "text-gray-900" : "text-gray-800"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
