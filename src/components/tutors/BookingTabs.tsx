"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarDays, Bookmark, User } from "lucide-react";
import Image from "next/image";

const bookings = [
  {
    id: "1",
    tutorName: "James Patterson",
    price: "$120",
    date: "16/06/2025",
    time: "9:00am",
    transactionId: "123163ye657dbhwbdbjjk",
    studentName: "David Patterson",
    grade: "Grade 11",
    subject: "Mathematics",
    sessions: 2,
    image: "/images/tutor-3.png",
    status: "booked",
  },
  {
    id: "2",
    tutorName: "James Patterson",
    price: "$120",
    date: "16/06/2025",
    time: "9:00am",
    transactionId: "123163ye657dbhwbdbjjk",
    studentName: "David Patterson",
    grade: "Grade 11",
    subject: "Mathematics",
    sessions: 2,
    image: "/images/tutor-3.png",
    status: "paid",
  },
];

const statusStyle = {
  booked: "bg-[#FEE9C5] text-[#FDB833]",
  paid: "bg-[#D4E9DD] text-[#378660]",
};

export default function BookingsTabs() {
  const renderCards = (filter?: string) => {
    const filtered = filter
      ? bookings.filter((b) => b.status === filter)
      : bookings;

    return (
      <div className="space-y-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#F9F7F5] rounded-2xl pt-6 pb-14 px-6 flex items-start shadow-md space-x-6"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt="Tutor"
              width={144}
              height={144}
              className="rounded-md object-cover border"
            />

            {/* Content */}
            <div className="flex-1 space-y-3">
              {/* Tutor Name */}
              <h3 className="text-[32px] font-aeroTrial">{item.tutorName}</h3>

              {/* Price + Status */}
              <div className="flex justify-between items-center">
                <p className="text-[#3F5ADA] text-[30px] font-bold">
                  {item.price}
                </p>
                <div
                  className={`text-[20px] font-semibold px-5 py-1 rounded-full ${
                    statusStyle[item.status as keyof typeof statusStyle]
                  }`}
                >
                  {item.status === "booked" ? "Booked" : "Paid"}
                </div>
              </div>

              {/* Date & Transaction */}
              <div className="flex items-center text-[24px] text-gray-600 space-x-6">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {item.date}{" "}
                    {item.time && (
                      <span className="text-[20px] text-gray-400">
                        {item.time}
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-8 w-px bg-gray-300 mx-4" />
                <div className="flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-black">{item.transactionId}</span>
                </div>
              </div>

              {/* Student Info */}
              <div className="flex flex-wrap text-[24px] text-gray-500 gap-x-10 gap-y-1 pt-1 mt-10">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {item.studentName}
                </span>
                <span>• {item.grade}</span>
                <span>• {item.subject}</span>
                <span>• {item.sessions} Sessions</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue="all" className="w-full mt-10">
      <TabsList className="flex justify-start space-x-6 bg-transparent p-0 mb-6">
        <TabsTrigger
          value="all"
          className="data-[state=active]:border-b-2 border-primary pb-2 text-lg"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="booked"
          className="data-[state=active]:border-b-2 border-primary pb-2 text-lg"
        >
          Booked
        </TabsTrigger>
        <TabsTrigger
          value="paid"
          className="data-[state=active]:border-b-2 border-primary pb-2 text-lg"
        >
          History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">{renderCards()}</TabsContent>
      <TabsContent value="booked">{renderCards("booked")}</TabsContent>
      <TabsContent value="paid">{renderCards("paid")}</TabsContent>
    </Tabs>
  );
}
