"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassItem, MOCK_UPCOMING_CLASSES } from "@/lib/constants";
import { Badge } from "lucide-react";

export default function TutorClassesCard({}: { classes?: ClassItem[] }) {
  return (
    <Card className="p-0 rounded-xl border border-gray-100 shadow-sm h-[400px] overflow-y-auto">
      <h2 className="text-xl text-gray-400 font-semibold p-4 pb-0">Classes</h2>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-white border-b h-auto p-0 flex justify-start space-x-8 px-4 pt-4">
          <TabsTrigger
            value="upcoming"
            className="text-base font-semibold text-gray-400 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 rounded-none pb-2"
          >
            Upcoming Classes
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="text-base font-semibold text-gray-400 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 rounded-none pb-2"
          >
            Class History
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Classes Content */}
        <TabsContent value="upcoming" className="pt-2 px-4">
          {MOCK_UPCOMING_CLASSES.map((session, idx) => (
            <div key={idx} className="py-4">
              {/* ... (Session details remain the same) ... */}
              {/* Top Row: ID + Price */}
              <div className="flex justify-between items-start">
                <p className="text-base font-semibold text-[#0B0B0B]">
                  #{session.id}
                </p>
                <p className="text-lg font-semibold text-[#0B0B0B]">
                  ₦{session.price.toLocaleString()}
                </p>
              </div>

              {/* Tutor, Learner, Date, Status */}
              <div className="flex justify-between items-center flex-wrap gap-y-1 mt-1">
                <p className="flex flex-col">
                  <span className="text-gray-500">Tutor </span>
                  <span className="font-medium text-gray-800">
                    {session.tutor}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-gray-500">Learner </span>
                  <span className="font-medium text-gray-800">
                    {session.learner}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-gray-500">Date/Time </span>
                  <span className="font-medium text-gray-800">
                    {session.dateTime}
                  </span>
                </p>

                <div className="text-right">
                  <Badge className="bg-[#FFA30033] text-[#FFA300] font-medium hover:bg-[#FFA30033]">
                    {session.status}
                  </Badge>
                </div>
              </div>

              {/* Divider */}
              <div className="my-2 border-t border-gray-100" />

              {/* Grade / Subject / Session • Reschedule Count */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p className="font-medium text-gray-400">
                  Grade {session.grade} • {session.subject} •{" "}
                  {session.sessionsCount} Session
                </p>
                <p className="text-gray-500 text-sm">
                  Reschedule Count: {session.rescheduleCount}
                </p>
              </div>

              {/* Separator between cards */}
              {idx !== MOCK_UPCOMING_CLASSES.length - 1 && (
                <div className="mt-4 border-b border-gray-200" />
              )}
            </div>
          ))}
        </TabsContent>

        {/* Class History Content (using the same content for now) */}
        <TabsContent value="history" className="pt-2 px-4">
          {MOCK_UPCOMING_CLASSES.map((session, idx) => (
            <div key={idx} className="py-4">
              {/* ... (Class History content remains the same) ... */}
              {/* Top Row: ID + Price */}
              <div className="flex justify-between items-start">
                <p className="text-base font-semibold text-[#0B0B0B]">
                  #{session.id}
                </p>
                <p className="text-lg font-semibold text-[#0B0B0B]">
                  ₦{session.price.toLocaleString()}
                </p>
              </div>

              {/* Tutor, Learner, Date, Status */}
              <div className="flex justify-between items-center flex-wrap gap-y-1 mt-1">
                <p className="flex flex-col">
                  <span className="text-gray-500">Tutor </span>
                  <span className=" text-gray-800">{session.tutor}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-gray-500">Learner </span>
                  <span className=" text-gray-800">{session.learner}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-gray-500">Date/Time </span>
                  <span className=" text-gray-800">{session.dateTime}</span>
                </p>

                <div className="text-right">
                  <Badge className="bg-[#FFA30033] text-[#FFA300] font-medium hover:bg-[#FFA30033]">
                    {session.status}
                  </Badge>
                </div>
              </div>

              {/* Divider */}
              <div className="my-2 border-t border-gray-100" />

              {/* Grade / Subject / Session • Reschedule Count */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p className="font-medium text-gray-400">
                  Grade {session.grade} • {session.subject} •{" "}
                  {session.sessionsCount} Session
                </p>
                <p className="text-gray-500 text-sm">
                  Reschedule Count: {session.rescheduleCount}
                </p>
              </div>

              {/* Separator between cards */}
              {idx !== MOCK_UPCOMING_CLASSES.length - 1 && (
                <div className="mt-4 border-b border-gray-200" />
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
