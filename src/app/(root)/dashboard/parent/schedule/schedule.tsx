"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  BookOpenIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import IntroductionTabs from "@/components/schedule/introductory-calls";
import ClassesTabs from "@/components/schedule/classes";

const upcomingData = [
  {
    id: 1,
    title: "Mathematics Class with David Patterson",
    student: "James Patterson",
    tutor: "David Patterson",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    grade: "Grade 11",
    subject: "Mathematics",
    image: "/images/tutor-3.png",
    reschedulable: true,
  },
  {
    id: 2,
    title: "Mathematics Class with David Patterson",
    student: "James Patterson",
    tutor: "David Patterson",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    grade: "Grade 11",
    subject: "Mathematics",
    image: "/images/tutor-3.png",
    reschedulable: true,
  },
];

const historyData = [
  {
    id: 1,
    title: "Elements of UIUX",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
    subject: "Mathematics",
    image: "/images/tutor-3.png",
  },
  {
    id: 2,
    title: "Coding for Dummies",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
    subject: "Mathematics",
    image: "/images/tutor-3.png",
  },
];

export default function ClassTabs() {
  return (
    <Tabs defaultValue="upcoming" className="w-full max-w-6xl mx-auto">
      {/* Tabs Header */}
      <TabsList className="flex justify-start gap-10 mb-4 bg-transparent px-4 sm:px-10">
        <TabsTrigger
          value="classes"
          className="text-lg font-aero-trial text-gray-600 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none px-0"
        >
          Classes
        </TabsTrigger>
        <TabsTrigger
          value="introductory"
          className="text-lg font-aero-trial text-gray-600 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none px-0"
        >
          Introductory Calls
        </TabsTrigger>
      </TabsList>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl shadow-md w-full mb-3">
        {/* Upcoming Classes Tab */}
        <TabsContent value="classes" className="space-y-10">
          <ClassesTabs />
        </TabsContent>

        {/* Class History Tab */}

        {/* Class History Tab */}
        <TabsContent value="introductory" className="space-y-10">
          <IntroductionTabs />
        </TabsContent>
      </div>
    </Tabs>
  );
}
